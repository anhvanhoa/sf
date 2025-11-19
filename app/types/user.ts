import type { UserInfo } from './auth'
import type { PaginationResponse, DeleteResponse, PaginationRequest } from './common'
import type { Role } from './role'

export enum UserStatus {
    ACTIVE = 'active',
    INACTIVE = 'inactive',
    LOCKED = 'locked'
}

export interface User {
    id?: string
    email?: string
    phone?: string
    password?: string
    fullName?: string
    avatar?: string
    bio?: string
    address?: string
    codeVerify?: string
    verified?: string // date-time
    createdBy?: string
    status: UserStatus
    birthday?: string // date-time
    lockedAt?: string // date-time
    createdAt?: string // date-time
    updatedAt?: string // date-time
    isSystem?: boolean
    lockedReason?: string
    lockedBy?: string
    roles?: Role[]
}

export interface UserFilter {
    status?: UserStatus
    fromDate?: string // date-time
    toDate?: string // date-time
}

export interface GetUsersRequest {
    pagination?: PaginationRequest
    filter?: UserFilter
}

export interface GetUsersResponse {
    users?: User[]
    pagination?: PaginationResponse
}

export interface GetUserByIdResponse {
    user?: User
}

export interface UpdateUserResponse {
    userInfo?: UserInfo
}

export type DeleteUserResponse = DeleteResponse

export interface CreateUserRequest {
    email?: string
    phone?: string
    password?: string
    fullName?: string
    avatar?: string
    bio?: string
    address?: string
    birthday?: string // date-time
}

export interface CreateUserResponse {
    user?: User
}

export interface UpdateUserBody {
    email?: string
    phone?: string
    fullName?: string
    avatar?: string
    bio?: string
    address?: string
    status?: string
    createdBy?: string
    roleIds?: string[]
    birthday?: string // date-time
}

export interface LockUserRequest {
    reason?: string
}

export interface LockUserResponse {
    message?: string
}

export interface UnlockUserResponse {
    message?: string
}