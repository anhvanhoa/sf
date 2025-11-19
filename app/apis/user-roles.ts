import { api } from '@/lib/axios'
import type {
  CreateUserRoleRequest,
  CreateUserRoleResponse,
  CreateManyUserRolesRequest,
  CreateManyUserRolesResponse,
  AttachUserRolesRequest,
  AttachUserRolesResponse,
  ListUserRolesRequest,
  ListUserRolesResponse,
  CountUserRolesResponse,
  CountByRoleIDResponse,
  CountByUserIDResponse,
  DeleteByRoleIDResponse,
  DeleteByUserIDResponse,
  DeleteUserRoleResponse,
  ExistsUserRoleResponse,
  GetUserPermissionsResponse,
} from '@/types/user-role'

export async function listUserRoles(params?: ListUserRolesRequest) {
  return api.get<ListUserRolesResponse>('/user-roles', { params })
}

export async function createUserRole(data: CreateUserRoleRequest) {
  return api.post<CreateUserRoleResponse>('/user-roles', data)
}

export async function attachUserRoles(data: AttachUserRolesRequest) {
  return api.post<AttachUserRolesResponse>('/user-roles/attach', data)
}

export async function createManyUserRoles(data: CreateManyUserRolesRequest) {
  return api.post<CreateManyUserRolesResponse>('/user-roles/many', data)
}

export async function countUserRoles() {
  return api.get<CountUserRolesResponse>('/user-roles/count')
}

export async function deleteUserRolesByRoleID(role_id: string) {
  return api.delete<DeleteByRoleIDResponse>(`/user-roles/role/${role_id}`)
}

export async function countUserRolesByRoleID(role_id: string) {
  return api.get<CountByRoleIDResponse>(`/user-roles/role/${role_id}/count`)
}

export async function deleteUserRolesByUserID(user_id: string) {
  return api.delete<DeleteByUserIDResponse>(`/user-roles/user/${user_id}`)
}

export async function countUserRolesByUserID(user_id: string) {
  return api.get<CountByUserIDResponse>(`/user-roles/user/${user_id}/count`)
}

export async function getUserPermissions(user_id: string) {
  return api.get<GetUserPermissionsResponse>(`/user-roles/user/${user_id}/permissions`)
}

export async function existsUserRole(user_id: string, role_id: string) {
  return api.get<ExistsUserRoleResponse>(`/user-roles/user/${user_id}/role/${role_id}/exists`)
}

export async function deleteUserRole(user_id: string, role_id: string) {
  return api.delete<DeleteUserRoleResponse>(`/user-roles/${user_id}/${role_id}`)
}

export const userRoleApi = {
  listUserRoles,
  createUserRole,
  attachUserRoles,
  createManyUserRoles,
  countUserRoles,
  deleteUserRolesByRoleID,
  countUserRolesByRoleID,
  deleteUserRolesByUserID,
  countUserRolesByUserID,
  getUserPermissions,
  existsUserRole,
  deleteUserRole,
}

