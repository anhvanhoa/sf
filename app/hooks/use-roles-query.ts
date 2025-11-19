import { useQuery } from '@tanstack/react-query'
import { getAllRoles } from '@/apis/roles'
import { useMemo } from 'react'
import type { CommonStatus } from '@/types/common'

export interface UseRolesQueryOptions {
  status?: CommonStatus
}

export function useRolesQuery({ status }: UseRolesQueryOptions = {}) {
  const { data, isLoading, error, ...rest } = useQuery({
    queryKey: ['roles', status],
    queryFn: () => getAllRoles({ status }),
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

