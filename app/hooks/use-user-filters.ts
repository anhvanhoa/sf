import { useState, useCallback } from 'react'
import { useDebouncedCallback } from 'use-debounce'
import type { PaginationRequest } from '@/types/common'
import type { UserFilter } from '@/types/user'
import { DEFAULT_PAGINATION_REQUEST } from '@/constant/panigation'

export function useUserFilters() {
    const [pagination, setPagination] = useState<PaginationRequest>(DEFAULT_PAGINATION_REQUEST)
    const [search, setSearch] = useState<string>('')
    const [filter, setFilter] = useState<UserFilter | undefined>(undefined)

    const debouncedSetSearch = useDebouncedCallback((value: string) => {
        setPagination((prev) => ({ ...prev, search: value, page: 1 }))
    }, 500)

    const handleSearchChange = useCallback((value: string) => {
        setSearch(value)
        debouncedSetSearch(value)
    }, [debouncedSetSearch])

    const handleFilterChange = useCallback((newFilter: UserFilter | undefined) => {
        setFilter(newFilter)
        setPagination((prev) => ({ ...prev, page: 1 }))
    }, [])

    const handleNextPage = useCallback(() => {
        setPagination((prev) => ({ ...prev, page: (prev.page || 0) + 1 }))
    }, [])

    const handlePreviousPage = useCallback(() => {
        setPagination((prev) => ({ ...prev, page: (prev.page || 0) - 1 }))
    }, [])

    const handlePageChange = useCallback((page: number) => {
        setPagination((prev) => ({ ...prev, page }))
    }, [])

    const handleRefresh = useCallback(() => {
        setPagination(DEFAULT_PAGINATION_REQUEST)
        setSearch('')
        setFilter(undefined)
    }, [])

    return {
        pagination,
        search,
        filter,
        setPagination,
        handleSearchChange,
        handleFilterChange,
        handleNextPage,
        handlePreviousPage,
        handlePageChange,
        handleRefresh,
    }
}

