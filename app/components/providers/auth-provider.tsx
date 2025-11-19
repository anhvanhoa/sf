import React from 'react'
import type { ProfileResponse } from '@/types/auth'
import { useRefreshToken } from '@/hooks/use-auth'
import { PERMISSIONS } from '@/constant/permission'

type Profile = Omit<ProfileResponse, 'message'>

type PermissionValue = { resource: string; action: string }
type ToBooleanObject<T> = {
    [K in keyof T]: T[K] extends PermissionValue
        ? boolean
        : T[K] extends Record<string, unknown>
          ? ToBooleanObject<T[K]>
          : never
}

type HasPermissionType = ToBooleanObject<typeof PERMISSIONS>

interface AuthContextValue {
    isAuthenticated: boolean
    profile: Profile | undefined
    setProfile: (profile?: Profile) => void
    hasPermission: HasPermissionType
}

export const AuthContext = React.createContext<AuthContextValue | undefined>(undefined)

// Helper function để kiểm tra permission
function checkPermission(
    permissions: Array<{ resource: string; action: string }> | undefined,
    requiredResource: string,
    requiredAction: string
): boolean {
    if (!permissions) return false
    return permissions.some(
        (p) => p.resource === requiredResource && p.action === requiredAction
    )
}

// Helper function để kiểm tra xem object có phải là PermissionValue không
function isPermissionValue(value: unknown): value is PermissionValue {
    return (
        typeof value === 'object' &&
        value !== null &&
        'resource' in value &&
        'action' in value &&
        typeof (value as PermissionValue).resource === 'string' &&
        typeof (value as PermissionValue).action === 'string'
    )
}

// Helper function để tạo object hasPermission từ PERMISSIONS
function createHasPermission(
    permissions: Array<{ resource: string; action: string }> | undefined
): HasPermissionType {
    const result: Record<string, unknown> = {}
    
    for (const [key, value] of Object.entries(PERMISSIONS)) {
        if (isPermissionValue(value)) {
            // Leaf node - permission value
            result[key] = checkPermission(permissions, value.resource, value.action)
        } else if (value && typeof value === 'object') {
            // Nested object
            const nestedResult: Record<string, boolean> = {}
            for (const [nestedKey, nestedValue] of Object.entries(value)) {
                if (isPermissionValue(nestedValue)) {
                    nestedResult[nestedKey] = checkPermission(
                        permissions,
                        nestedValue.resource,
                        nestedValue.action
                    )
                }
            }
            result[key] = nestedResult
        }
    }
    
    return result as HasPermissionType
}

export function AuthProvider({
    children,
    profile: initialProfile,
}: {
    children: React.ReactNode
    profile?: Profile
}) {
    const refreshToken = useRefreshToken()
    const [profile, setProfile] = React.useState<Profile | undefined>(initialProfile)
  
    const hasPermission = React.useMemo<HasPermissionType>(
        () => createHasPermission(profile?.permissions),
        [profile?.permissions]
    )
  
    const value = React.useMemo<AuthContextValue>(
        () => ({
            profile,
            isAuthenticated: Boolean(profile),
            setProfile,
            hasPermission,
        }),
        [profile, setProfile, hasPermission]
    )

    React.useEffect(() => {
        if (initialProfile) {
            setProfile(initialProfile)
        }
    }, [initialProfile])

    React.useEffect(() => {
        refreshToken.mutate()
        const interval = setInterval(
            () => {
                refreshToken.mutate()
            },
            1000 * 60 * 5 // 5 minutes
        )
        return () => {
            clearInterval(interval)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuthContext(): AuthContextValue {
    const ctx = React.useContext(AuthContext)
    if (!ctx) {
        throw new Error('useAuthContext must be used within AuthProvider')
    }
    return ctx
}
