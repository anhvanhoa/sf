// Permission types based on swagger definitions
import type { PaginationRequest, PaginationResponse, DeleteResponse, CountResponse } from "./common"

export interface Permission {
    id?: string
    resource?: string
    action?: string
    description?: string
    isPublic?: boolean
    createdAt?: string // date-time
    updatedAt?: string // date-time
}

export interface CreatePermissionRequest {
    resource?: string
    action?: string
    description?: string
    isPublic?: boolean
}

export interface CreatePermissionResponse {
    permission?: Permission
}

export interface GetPermissionResponse {
    permission?: Permission
}

export interface UpdatePermissionBody {
    description?: string
    isPublic?: boolean
}

export interface UpdatePermissionResponse {
    permission?: Permission
}

export type DeletePermissionResponse = DeleteResponse
export type DeleteByResourceAndActionResponse = DeleteResponse
export type CountByResourceResponse = CountResponse


export interface FilterPermissionRequest {
    resource?: string
    action?: string
}

export interface ListPermissionsRequest {
    pagination?: PaginationRequest
    filter?: FilterPermissionRequest
}

export interface ListPermissionsResponse {
    permissions?: Permission[]
    pagination?: PaginationResponse
}

export interface GetDataFilterResponse {
    resources?: string[]
}
