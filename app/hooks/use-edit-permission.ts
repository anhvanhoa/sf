import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import type { Permission, UpdatePermissionBody } from '@/types/permission'
import { updatePermission } from '@/apis/permission'

export const updatePermissionSchema = z.object({
    description: z.string().optional(),
    isPublic: z.boolean().optional()
})

export type UpdatePermissionFormValues = z.infer<typeof updatePermissionSchema>

interface UseEditPermissionProps {
    permission?: Permission
    open: boolean
    onOpenChange: (open: boolean) => void
    onSuccess?: () => void
}

export function useEditPermission({ permission, open, onOpenChange, onSuccess }: UseEditPermissionProps) {
    const form = useForm<UpdatePermissionFormValues>({
        resolver: zodResolver(updatePermissionSchema),
        defaultValues: {
            description: permission?.description || '',
            isPublic: permission?.isPublic || false
        }
    })

    const updatePermissionMutation = useMutation({
        mutationFn: ({ id, values }: { id: string; values: UpdatePermissionBody }) => updatePermission(id, values),
        onSuccess: () => {
            toast.success('Cập nhật quyền thành công!')
            onOpenChange(false)
            if (onSuccess) {
                onSuccess()
            }
        },
        onError: (error: Error) => {
            toast.error(error.message || 'Có lỗi xảy ra khi cập nhật quyền')
        }
    })

    useEffect(() => {
        if (permission && open) {
            form.reset({
                description: permission.description || '',
                isPublic: permission.isPublic || false
            })
        }
    }, [permission, open, form])

    const onSubmit = (values: UpdatePermissionFormValues) => {
        if (!permission?.id) {
            toast.error('Không tìm thấy quyền')
            return
        }
        updatePermissionMutation.mutate({ id: permission.id, values })
    }

    const resetForm = () => {
        if (permission) {
            form.reset({
                description: permission.description || '',
                isPublic: permission.isPublic || false
            })
        }
    }

    return {
        form,
        onSubmit,
        resetForm,
        updatePermissionMutation
    }
}

