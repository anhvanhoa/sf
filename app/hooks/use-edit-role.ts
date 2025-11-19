import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import type { Role } from '@/types/role'
import { createRole, updateRole } from '@/apis/roles'

const roleSchema = z.object({
    name: z.string().min(1, 'Tên vai trò là bắt buộc'),
    description: z.string().optional(),
    variant: z.string().optional(),
    status: z.enum(['active', 'inactive'])
})

export type RoleFormValues = z.infer<typeof roleSchema>

const defaultValues: RoleFormValues = {
    name: '',
    description: '',
    variant: '',
    status: 'active'
}

interface UseEditRoleProps {
    role?: Role
    open: boolean
    onOpenChange: (open: boolean) => void
    onSuccess?: () => void
    isCreate?: boolean
}

export function useEditRole({ role, open, onOpenChange, onSuccess, isCreate = false }: UseEditRoleProps) {
    const form = useForm<RoleFormValues>({
        resolver: zodResolver(roleSchema),
        defaultValues
    })

    const createRoleMutation = useMutation({
        mutationFn: (values: RoleFormValues) => createRole(values),
        onSuccess: () => {
            form.reset(defaultValues)
            onOpenChange(false)
            if (onSuccess) {
                onSuccess()
            }
        },
        onError: (error: Error) => {
            toast.error(error.message)
        }
    })

    const updateRoleMutation = useMutation({
        mutationFn: ({ id, values }: { id: string; values: RoleFormValues }) => updateRole(id, values),
        onSuccess: () => {
            form.reset(defaultValues)
            onOpenChange(false)
            if (onSuccess) {
                onSuccess()
            }
        },
        onError: (error: Error) => {
            toast.error(error.message)
        }
    })

    useEffect(() => {
        if (open) {
            if (isCreate || !role) {
                form.reset(defaultValues)
            } else if (role) {
                form.reset(role)
            }
        }
    }, [role, open, isCreate, form])

    const onSubmit = async (values: RoleFormValues) => {
        if (isCreate || !role?.id) {
            createRoleMutation.mutate(values)
        } else {
            if (!role?.id) {
                toast.error('Không tìm thấy ID vai trò')
                return
            }
            updateRoleMutation.mutate({ id: role.id, values })
        }
    }

    const resetForm = () => {
        if (isCreate || !role) {
            form.reset(defaultValues)
        } else if (role) {
            form.reset(role)
        }
    }

    const isLoading = form.formState.isSubmitting

    return {
        form,
        onSubmit,
        resetForm,
        isLoading,
        createRoleMutation,
        updateRoleMutation
    }
}

