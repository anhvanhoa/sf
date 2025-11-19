import { useQuery } from '@tanstack/react-query'
import { getUsers } from '@/apis/user'
import type { PaginationRequest } from '@/types/common'
import type { UserFilter } from '@/types/user'
import { useMemo } from 'react'

interface UseUsersQueryParams {
    pagination: PaginationRequest
    filter?: UserFilter
}

export function useUsersQuery({ pagination, filter }: UseUsersQueryParams) {
    const { data, isLoading, error, ...rest } = useQuery({
        queryKey: [
            'users',
            {
                pagination,
                filter,
            },
        ],
        queryFn: () =>
            getUsers({
                pagination,
                filter,
            }),
        staleTime: 1000 * 60 * 5,
    })

    const users = useMemo(() => data?.users || [], [data])
    const paginationData = data?.pagination

    return {
        users,
        paginationData,
        isLoading,
        error,
        ...rest,
    }
}

