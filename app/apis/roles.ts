import { api } from '@/lib/axios'
import type {
  CreateRoleRequest,
  CreateRoleResponse,
  GetAllRolesQueryParams,
  GetAllRolesResponse,
  GetRoleByIdResponse,
  UpdateRoleBody,
  UpdateRoleResponse,
  DeleteRoleResponse,
  CheckRoleExistRequest,
  CheckRoleExistResponse,
} from '@/types/role'

export async function getAllRoles(params?: GetAllRolesQueryParams) {
  return api.get<GetAllRolesResponse>('/roles', { params })
}

export async function getRoleById(id: string) {
  return api.get<GetRoleByIdResponse>(`/roles/${id}`)
}

export async function createRole(data: CreateRoleRequest) {
  return api.post<CreateRoleResponse>('/roles', data)
}

export async function updateRole(id: string, body: UpdateRoleBody) {
  return api.put<UpdateRoleResponse>(`/roles/${id}`, body)
}

export async function deleteRole(id: string) {
  return api.delete<DeleteRoleResponse>(`/roles/${id}`)
}

export async function checkRoleExist(data: CheckRoleExistRequest) {
  return api.post<CheckRoleExistResponse>('/roles/check-exist', data)
}

export const roleApi = {
  getAllRoles,
  getRoleById,
  createRole,
  updateRole,
  deleteRole,
  checkRoleExist,
}

