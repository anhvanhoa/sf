import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { deleteRolePermission } from '@/apis/role-permissions'
import type { Permission } from '@/types/permission'
import { useRolesByPermission } from './use-roles-by-permission'

interface UseViewRolesProps {
    permission?: Permission
    onOpenChange: (open: boolean) => void
}

export function useViewRoles({ permission, onOpenChange }: UseViewRolesProps) {
    const [deleteRoleId, setDeleteRoleId] = useState<string | null>(null)
    const [addRole, setAddRole] = useState(false)
    const { roles, isLoading, error, refetch } = useRolesByPermission(permission?.id || null)

    const deleteRole = useMutation({
        mutationFn: (roleId: string) => deleteRolePermission(roleId, permission?.id || ''),
        onSuccess: () => {
            toast.success('Xóa vai trò thành công!')
            setDeleteRoleId(null)
            refetch()
        },
        onError: (error: Error) => {
            toast.error(error.message || 'Có lỗi xảy ra khi xóa vai trò')
        }
    })

    const confirmDeleteRole = (roleId: string) => {
        setDeleteRoleId(roleId)
    }

    const cancelDelete = () => {
        setDeleteRoleId(null)
    }

    const cancelDeleteRole = (open: boolean) => {
        if (!open) {
            setDeleteRoleId(null)
            setAddRole(false)
        }
        onOpenChange(open)
    }

    const onSubmitDeleteRole = () => {
        if (!deleteRoleId) {
            toast.error('Không tìm thấy vai trò')
            return
        }
        deleteRole.mutate(deleteRoleId)
    }

    return {
        roles,
        isLoading,
        error,
        refetch,
        deleteRoleId,
        addRole,
        setAddRole,
        deleteRole,
        confirmDeleteRole,
        cancelDelete,
        cancelDeleteRole,
        onSubmitDeleteRole
    }
}

