// RolePermission types based on swagger definitions
import type { PaginationRequest, PaginationResponse, DeleteResponse } from "./common"
import type { Role } from "./role"

export interface RolePermission {
  roleId: string
  permissionId: string
  createdAt?: string // date-time
}

export interface CreateRolePermissionRequest {
  roleId?: string
  permissionId?: string
}

export interface CreateRolePermissionResponse {
  rolePermission?: RolePermission
}

export interface RolePermissionFilter {
  roleId?: string
  permissionId?: string
}

export interface ListRolePermissionsRequest {
  pagination?: PaginationRequest
  filter?: RolePermissionFilter
}

export interface ListRolePermissionsResponse {
  rolePermissions: RolePermission[]
  pagination?: PaginationResponse
}

export interface DeleteByPermissionIDResponse {
  success?: boolean
}

export type DeleteRolePermissionResponse = DeleteResponse

export interface AttachRolePermissionsRequest {
  permissionIds?: string[]
  roleIds?: string[]
}

export interface AttachRolePermissionsResponse {
  rolePermissions?: RolePermission[]
}

export interface DeleteByRoleIDsAndPermissionIDRequest {
  roleIds?: string[]
  permissionId?: string
}

export interface DeleteByRoleIDsAndPermissionIDResponse {
  message?: string
}

export interface GetRolesByPermissionIDResponse {
  roles?: Role[]
}

