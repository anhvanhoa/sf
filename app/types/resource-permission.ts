// ResourcePermission types based on swagger definitions
import type { PaginationRequest, PaginationResponse } from "./common"

export interface ResourcePermission {
    id?: string
    userId?: string
    resourceType?: string
    resourceData?: Record<string, string>
    action?: string
    createdAt?: string // date-time
    updatedAt?: string // date-time
}

export interface CreateResourcePermissionRequest {
    userId?: string
    resourceType?: string
    resourceData?: Record<string, string>
    action?: string
}

export interface CreateResourcePermissionResponse {
    resourcePermission?: ResourcePermission
}

export interface CreateManyResourcePermissionsRequest {
    resourcePermissions?: CreateResourcePermissionRequest[]
}

export interface CreateManyResourcePermissionsResponse {
    resourcePermissions?: ResourcePermission[]
}


export interface ResourcePermissionFilter {
    userId?: string
    resourceType?: string
    resourceData?: Record<string, string>
    action?: string
}

export interface ListResourcePermissionsRequest {
    pagination?: PaginationRequest
    filter?: ResourcePermissionFilter
}

export interface ListResourcePermissionsResponse {
    resourcePermissions?: ResourcePermission[]
    pagination?: PaginationResponse
}

export interface GetResourcePermissionResponse {
    resourcePermission?: ResourcePermission
}

export interface UpdateResourcePermissionBody {
    userId?: string
    resourceType?: string
    resourceData?: Record<string, string>
    action?: string
}

export interface UpdateResourcePermissionResponse {
    resourcePermission?: ResourcePermission
}

export interface DeleteResourcePermissionResponse {
    success?: boolean
}

export interface DeleteByUserIDResponse {
    success?: boolean
}
