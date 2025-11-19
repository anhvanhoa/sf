import { api } from '@/lib/axios'
import type {
  CreateRolePermissionRequest,
  CreateRolePermissionResponse,
  AttachRolePermissionsRequest,
  AttachRolePermissionsResponse,
  ListRolePermissionsRequest,
  ListRolePermissionsResponse,
  DeleteByPermissionIDResponse,
  DeleteRolePermissionResponse,
  DeleteByRoleIDsAndPermissionIDRequest,
  DeleteByRoleIDsAndPermissionIDResponse,
  GetRolesByPermissionIDResponse,
} from '@/types/role-permission'

export async function listRolePermissions(params?: ListRolePermissionsRequest) {
  return api.get<ListRolePermissionsResponse>('/role-permissions', { params })
}

export async function createRolePermission(data: CreateRolePermissionRequest) {
  return api.post<CreateRolePermissionResponse>('/role-permissions', data)
}

export async function attachRolePermissions(data: AttachRolePermissionsRequest) {
  return api.post<AttachRolePermissionsResponse>('/role-permissions/attach', data)
}

export async function deleteByRoleIDsAndPermissionID(data: DeleteByRoleIDsAndPermissionIDRequest) {
  return api.post<DeleteByRoleIDsAndPermissionIDResponse>('/role-permissions/bulk-delete', data)
}

export async function deleteRolePermissionsByPermissionID(permissionId: string) {
  return api.delete<DeleteByPermissionIDResponse>(`/role-permissions/permission/${permissionId}`)
}

export async function getRolesByPermissionID(permissionId: string) {
  return api.get<GetRolesByPermissionIDResponse>(`/role-permissions/permission/${permissionId}/roles`)
}

export async function deleteRolePermission(roleId: string, permissionId: string) {
  return api.delete<DeleteRolePermissionResponse>(`/role-permissions/${roleId}/${permissionId}`)
}

export const rolePermissionApi = {
  listRolePermissions,
  createRolePermission,
  attachRolePermissions,
  deleteByRoleIDsAndPermissionID,
  deleteRolePermissionsByPermissionID,
  getRolesByPermissionID,
  deleteRolePermission,
}

