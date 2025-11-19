import type { PaginationRequest } from "@/types/common"

export const DEFAULT_PAGE = 1
export const DEFAULT_PAGE_SIZE = 10
export const DEFAULT_SORT_BY = 'id'
export const DEFAULT_SORT_ORDER = 'desc'

export const DEFAULT_PAGINATION_REQUEST: PaginationRequest = {
    page: DEFAULT_PAGE,
    pageSize: DEFAULT_PAGE_SIZE,
    sortBy: DEFAULT_SORT_BY,
    sortOrder: DEFAULT_SORT_ORDER,
}