import { useQuery } from '@tanstack/react-query'
import { listPermissions } from '@/apis/permission'
import type { PaginationRequest } from '@/types/permission'
import { useMemo } from 'react'

interface UsePermissionsQueryParams {
    pagination: PaginationRequest
    selectedResources?: string
}

export function usePermissionsQuery({ pagination, selectedResources }: UsePermissionsQueryParams) {
    const { data, isLoading, error, ...rest } = useQuery({
        queryKey: [
            'permissions',
            {
                pagination,
                filter: { resource: selectedResources },
            },
        ],
        queryFn: () =>
            listPermissions({
                pagination,
                filter: {
                    resource: selectedResources,
                },
            }),
        staleTime: 1000 * 60 * 5,
    })

    const permissions = useMemo(() => data?.permissions || [], [data])
    const paginationData = data?.pagination

    return {
        permissions,
        paginationData,
        isLoading,
        error,
        ...rest,
    }
}

