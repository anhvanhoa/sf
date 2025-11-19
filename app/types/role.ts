// Role types based on swagger definitions
import type { CommonStatus, DeleteResponse } from './common'
export interface Role {
    id: string
    name: string
    description: string
    variant?: string
    status?: CommonStatus
    createdBy?: string
    createdAt?: string // date-time format
    updatedAt?: string // date-time format
}

export interface CreateRoleRequest {
    name?: string
    description?: string
    variant?: string
    status?: CommonStatus
    createdBy?: string
}

export interface CreateRoleResponse {
    success?: boolean
    message?: string
}

export interface GetAllRolesQueryParams {
    search?: string
    status?: CommonStatus
}

export interface GetAllRolesResponse {
    roles?: Role[]
}

export interface GetRoleByIdResponse {
    role: Role
}

export interface UpdateRoleBody {
    name?: string
    description?: string
    variant?: string
    status?: CommonStatus
}

export interface UpdateRoleResponse {
    role: Role
}

export type DeleteRoleResponse = DeleteResponse

export interface CheckRoleExistRequest {
    name?: string
}

export interface CheckRoleExistResponse {
    exists?: boolean
}
