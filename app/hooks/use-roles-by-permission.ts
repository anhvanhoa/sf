import { useQuery } from '@tanstack/react-query'
import { rolePermissionApi } from '@/apis/role-permissions'
import { useMemo } from 'react'

export function useRolesByPermission(permissionId: string | null) {
  const { data, isLoading, error, ...rest } = useQuery({
    queryKey: ['roles-by-permission', permissionId],
    queryFn: () => rolePermissionApi.getRolesByPermissionID(permissionId!),
    enabled: Boolean(permissionId),
    staleTime: 1000 * 60 * 5,
  })

  const roles = useMemo(() => data?.roles || [], [data])

  return {
    roles,
    isLoading,
    error,
    ...rest,
  }
}

