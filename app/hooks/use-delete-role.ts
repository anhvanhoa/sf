import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import type { Role } from '@/types/role'
import { deleteRole } from '@/apis/roles'

interface UseDeleteRoleProps {
    role?: Role
    onOpenChange: (open: boolean) => void
    onSuccess?: () => void
}

export function useDeleteRole({ role, onOpenChange, onSuccess }: UseDeleteRoleProps) {
    const deleteRoleMutation = useMutation({
        mutationFn: (id: string) => deleteRole(id),
        onSuccess: () => {
            toast.success('Xóa vai trò thành công!')
            onOpenChange(false)
            if (onSuccess) {
                onSuccess()
            }
        },
        onError: (error: Error) => {
            toast.error(error.message || 'Có lỗi xảy ra khi xóa vai trò')
        }
    })

    const onSubmit = () => {
        if (!role?.id) {
            toast.error('Không tìm thấy vai trò')
            return
        }
        deleteRoleMutation.mutate(role.id)
    }

    return {
        onSubmit,
        deleteRoleMutation
    }
}

