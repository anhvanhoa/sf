import { useMemo } from 'react'
import { useSearchParams } from 'react-router'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import type { Role } from '@/types/role'

export function useRoleEdit(roles: Role[]) {
  const [searchParams, setSearchParams] = useSearchParams()
  const queryClient = useQueryClient()
  const editRoleId = searchParams.get('edit')
  const deleteRoleId = searchParams.get('delete')
  const createMode = searchParams.get('create') === 'true'

  const editingRole = useMemo(() => {
    return roles.find((role) => role.id === editRoleId)
  }, [roles, editRoleId])

  const deletingRole = useMemo(() => {
    return roles.find((role) => role.id === deleteRoleId)
  }, [roles, deleteRoleId])

  const handleOpenChange = () => {
    setSearchParams((prev) => {
      prev.delete('edit')
      prev.delete('create')
      return prev
    })
  }

  const handleDeleteOpenChange = () => {
    setSearchParams((prev) => {
      prev.delete('delete')
      return prev
    })
  }

  const handleSuccess = (message: string = 'Thao tác thành công!') => {
    queryClient.invalidateQueries({ queryKey: ['roles'] })
    toast.success(message)
  }

  return {
    editRoleId,
    editingRole,
    deleteRoleId,
    deletingRole,
    createMode,
    isOpen: Boolean(editRoleId) || createMode,
    isDeleteOpen: Boolean(deleteRoleId),
    handleOpenChange,
    handleDeleteOpenChange,
    handleSuccess,
  }
}

