// Common types used across multiple modules

/**
 * Pagination request parameters
 */
export interface PaginationRequest {
    page?: number
    pageSize?: number
    sortBy?: string
    sortOrder?: string
    search?: string
}

/**
 * Pagination response data
 */
export interface PaginationResponse {
    total?: number
    page?: number
    pageSize?: number
    totalPages?: number
}

/**
 * Common delete response
 */
export interface DeleteResponse {
    success?: boolean
    message?: string
}

/**
 * Common count response
 */
export interface CountResponse {
    count?: string // int64 format
}

/**
 * Common exists response
 */
export interface ExistsResponse {
    exists?: boolean
}

type FieldViolation = {
    elements: {
        fieldName: string
    }[]
}

export interface Violation {
    field: FieldViolation
    message: string
}

export type DetailsRpcStatus = {
    '@type': string
    violations: Array<Violation>
}

export interface RpcStatus {
    code: number
    message: string
    details: Array<DetailsRpcStatus>
}


export type CommonStatus = 'active' | 'inactive'
