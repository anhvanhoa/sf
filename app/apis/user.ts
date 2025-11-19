import { api } from '@/lib/axios'
import {
  type GetUsersRequest,
  type GetUsersResponse,
  type GetUserByIdResponse,
  type UpdateUserResponse,
  type UpdateUserBody,
  type CreateUserRequest,
  type CreateUserResponse,
  type LockUserRequest,
  type LockUserResponse,
  type UnlockUserResponse,
} from '@/types/user'

export async function getUsers(params?: GetUsersRequest) {
  return api.get<GetUsersResponse>('/users', { params })
}

export async function getUserById(id: string) {
  return api.get<GetUserByIdResponse>(`/users/${id}`)
}

export async function createUser(body: CreateUserRequest) {
  return api.post<CreateUserResponse>('/users', body)
}

export async function updateUser(id: string, body: UpdateUserBody) {
  return api.put<UpdateUserResponse>(`/users/${id}`, body)
}

export async function lockUser(id: string, body: LockUserRequest) {
  return api.put<LockUserResponse>(`/users/${id}/lock`, body)
}

export async function unlockUser(id: string) {
  return api.put<UnlockUserResponse>(`/users/${id}/unlock`, {})
}

export const userApi = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  lockUser,
  unlockUser,
}
