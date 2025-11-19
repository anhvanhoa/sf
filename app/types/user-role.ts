// UserRole types based on swagger definitions
import type { PaginationResponse, CountResponse, ExistsResponse, PaginationRequest } from "./common"

export interface UserRole {
  userId?: string
  roleId?: string
  createdAt?: string // date-time
}

export interface CreateUserRoleRequest {
  userId?: string
  roleId?: string
}

export interface CreateUserRoleResponse {
  data?: UserRole
}


export interface UserRoleFilter {
  userId?: string
  roleId?: string
}

export interface ListUserRolesRequest {
  pagination?: PaginationRequest
  filter?: UserRoleFilter
}

export interface ListUserRolesResponse {
  userRoles?: UserRole[]
  pagination?: PaginationResponse
}

export type CountUserRolesResponse = CountResponse
export type CountByRoleIDResponse = CountResponse
export type CountByUserIDResponse = CountResponse

export interface DeleteByRoleIDResponse {
  success?: boolean
}

export interface DeleteByUserIDResponse {
  success?: boolean
}

export interface DeleteUserRoleResponse {
  success?: boolean
}

export type ExistsUserRoleResponse = ExistsResponse

export interface Permission {
  resource?: string
  action?: string
}

export interface Scope {
  resource?: string
  resourceData?: Record<string, string>
  action?: string
}

export interface GetUserPermissionsResponse {
  userId?: string
  roles?: string[]
  permissions?: Permission[]
  scopes?: Scope[]
}

export interface AttachUserRolesRequest {
  roleIds?: string[]
  userIds?: string[]
}

export interface AttachUserRolesResponse {
  userRoles?: UserRole[]
}

export interface CreateManyUserRolesRequest {
  user_roles?: CreateUserRoleRequest[]
}

export interface CreateManyUserRolesResponse {
  user_roles?: UserRole[]
}

