import { useState, useCallback } from 'react'
import { useDebouncedCallback } from 'use-debounce'
import type { PaginationRequest } from '@/types/permission'
import { DEFAULT_PAGINATION_REQUEST } from '@/constant/panigation'

export function usePermissionFilters() {
    const [pagination, setPagination] = useState<PaginationRequest>({
        ...DEFAULT_PAGINATION_REQUEST,
        sortBy: 'resource',
        sortOrder: 'asc',
    })
    const [search, setSearch] = useState<string>('')
    const [selectedResources, setSelectedResources] = useState<string | undefined>(undefined)

    const debouncedSetSearch = useDebouncedCallback((value: string) => {
        setPagination((prev) => ({ ...prev, search: value, page: 1 }))
    }, 500)

    const handleSearchChange = useCallback((value: string) => {
        setSearch(value)
        debouncedSetSearch(value)
    }, [debouncedSetSearch])

    const handleSelectedResourcesChange = useCallback((resources?: string) => {
        setSelectedResources(resources)
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
        setSelectedResources(undefined)
    }, [])

    return {
        pagination,
        search,
        selectedResources,
        setPagination,
        handleSearchChange,
        handleSelectedResourcesChange,
        handleNextPage,
        handlePreviousPage,
        handlePageChange,
        handleRefresh,
    }
}

