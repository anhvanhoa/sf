import { useMemo } from 'react'
import { useSearchParams } from 'react-router'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import type { Permission } from '@/types/permission'

export function usePermissionEdit(permissions: Permission[]) {
    const [searchParams, setSearchParams] = useSearchParams()
    const queryClient = useQueryClient()
    const editPermissionId = searchParams.get('edit')

    const editingPermission = useMemo(() => {
        return permissions.find((permission) => permission.id === editPermissionId)
    }, [permissions, editPermissionId])

    const handleOpenChange = () => {
        setSearchParams((prev) => {
            prev.delete('edit')
            return prev
        })
    }

    const handleSuccess = () => {
        queryClient.invalidateQueries({ queryKey: ['permissions'] })
        handleOpenChange()
        toast.success('Cập nhật quyền thành công!')
    }

    return {
        editPermissionId,
        editingPermission,
        isOpen: Boolean(editPermissionId),
        handleOpenChange,
        handleSuccess,
    }
}

