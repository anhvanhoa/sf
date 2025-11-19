import { useMemo } from 'react'
import { useSearchParams } from 'react-router'
import type { Permission } from '@/types/permission'

export function usePermissionRoles(permissions: Permission[]) {
    const [searchParams, setSearchParams] = useSearchParams()
    const rolesPermissionId = searchParams.get('roles')

    const selectedPermission = useMemo(() => {
        return permissions.find((permission) => permission.id === rolesPermissionId)
    }, [permissions, rolesPermissionId])

    const handleOpenChange = () => {
        setSearchParams((prev) => {
            prev.delete('roles')
            return prev
        })
    }

    return {
        rolesPermissionId,
        selectedPermission,
        isOpen: Boolean(rolesPermissionId),
        handleOpenChange,
    }
}

