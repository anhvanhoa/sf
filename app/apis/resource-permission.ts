import { api } from '@/lib/axios'
import type {
  CreateResourcePermissionRequest,
  CreateResourcePermissionResponse,
  CreateManyResourcePermissionsRequest,
  CreateManyResourcePermissionsResponse,
  ListResourcePermissionsRequest,
  ListResourcePermissionsResponse,
  GetResourcePermissionResponse,
  UpdateResourcePermissionBody,
  UpdateResourcePermissionResponse,
  DeleteResourcePermissionResponse,
  DeleteByUserIDResponse,
} from '@/types/resource-permission'

/**
 * List resource permissions with filters and pagination
 */
export async function listResourcePermissions(params?: ListResourcePermissionsRequest) {
  return api.get<ListResourcePermissionsResponse>('/resource-permissions', { params })
}

/**
 * Create a new resource permission
 */
export async function createResourcePermission(data: CreateResourcePermissionRequest) {
  return api.post<CreateResourcePermissionResponse>('/resource-permissions', data)
}

/**
 * Create many resource permissions
 */
export async function createManyResourcePermissions(data: CreateManyResourcePermissionsRequest) {
  return api.post<CreateManyResourcePermissionsResponse>('/resource-permissions/many', data)
}

/**
 * Get resource permission by ID
 */
export async function getResourcePermission(id: string) {
  return api.get<GetResourcePermissionResponse>(`/resource-permissions/${id}`)
}

/**
 * Update resource permission by ID
 */
export async function updateResourcePermission(id: string, body: UpdateResourcePermissionBody) {
  return api.put<UpdateResourcePermissionResponse>(`/resource-permissions/${id}`, body)
}

/**
 * Delete resource permission by ID
 */
export async function deleteResourcePermission(id: string) {
  return api.delete<DeleteResourcePermissionResponse>(`/resource-permissions/${id}`)
}

/**
 * Delete resource permissions by user ID
 */
export async function deleteResourcePermissionsByUserID(user_id: string) {
  return api.delete<DeleteByUserIDResponse>(`/resource-permissions/user/${user_id}`)
}

export const resourcePermissionApi = {
  listResourcePermissions,
  createResourcePermission,
  createManyResourcePermissions,
  getResourcePermission,
  updateResourcePermission,
  deleteResourcePermission,
  deleteResourcePermissionsByUserID,
}

