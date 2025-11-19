import { api } from '@/lib/axios'
import type {
  CreatePermissionRequest,
  CreatePermissionResponse,
  GetPermissionResponse,
  UpdatePermissionBody,
  UpdatePermissionResponse,
  DeletePermissionResponse,
  DeleteByResourceAndActionResponse,
  CountByResourceResponse,
  ListPermissionsRequest,
  ListPermissionsResponse,
  GetDataFilterResponse,
} from '@/types/permission'

/**
 * List permissions with filters and pagination
 */
export async function listPermissions(params?: ListPermissionsRequest) {
  return api.get<ListPermissionsResponse>('/permissions', { params })
}

/**
 * Create a new permission
 */
export async function createPermission(data: CreatePermissionRequest) {
  return api.post<CreatePermissionResponse>('/permissions', data)
}

/**
 * Get permission by ID
 */
export async function getPermission(id: string) {
  return api.get<GetPermissionResponse>(`/permissions/${id}`)
}

/**
 * Update permission by ID
 */
export async function updatePermission(id: string, body: UpdatePermissionBody) {
  return api.put<UpdatePermissionResponse>(`/permissions/${id}`, body)
}

/**
 * Delete permission by ID
 */
export async function deletePermission(id: string) {
  return api.delete<DeletePermissionResponse>(`/permissions/${id}`)
}

/**
 * Count permissions by resource
 */
export async function countPermissionsByResource(resource: string) {
  return api.get<CountByResourceResponse>(`/permissions/${resource}/count`)
}

/**
 * Delete permission by resource and action
 */
export async function deletePermissionByResourceAndAction(resource: string, action: string) {
  return api.delete<DeleteByResourceAndActionResponse>(`/permissions/${resource}/${action}`)
}

/**
 * Get data filter (resources list for filtering)
 */
export async function getDataFilter() {
  return api.get<GetDataFilterResponse>('/permissions/data-filter')
}

export const permissionApi = {
  listPermissions,
  createPermission,
  getPermission,
  updatePermission,
  deletePermission,
  countPermissionsByResource,
  deletePermissionByResourceAndAction,
  getDataFilter,
}

