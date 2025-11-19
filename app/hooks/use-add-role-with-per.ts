import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { useMemo } from 'react'
import type { Permission } from '@/types/permission'
import type { CreateRolePermissionRequest } from '@/types/role-permission'
import { createRolePermission } from '@/apis/role-permissions'
import { useRolesQuery } from './use-roles-query'

const formSchema = z.object({
    roleId: z.string().min(1),
    permissionId: z.string().min(1)
})

export type AddRoleWithPerFormValues = z.infer<typeof formSchema>

interface UseAddRoleWithPerProps {
    permission: Permission
    excludedRoleIds: string[]
    onSuccess?: () => void
}

export function useAddRoleWithPer({ permission, excludedRoleIds, onSuccess }: UseAddRoleWithPerProps) {
    const { roles } = useRolesQuery({
        status: 'active'
    })

    const roleOptions = useMemo(
        () =>
            roles
                .filter((role) => !excludedRoleIds.includes(role.id))
                .map((role) => ({
                    value: role.id,
                    label: role.name
                })),
        [roles, excludedRoleIds]
    )

    const createRP = useMutation({
        mutationFn: (data: CreateRolePermissionRequest) => createRolePermission(data),
        onSuccess: () => {
            toast.success('Quyền đã được gán thành công')
            if (onSuccess) {
                onSuccess()
            }
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })

    const form = useForm<AddRoleWithPerFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            roleId: '',
            permissionId: permission.id
        }
    })

    const onSubmit = (data: AddRoleWithPerFormValues) => {
        createRP.mutate({
            roleId: data.roleId,
            permissionId: data.permissionId
        })
    }

    return {
        form,
        roleOptions,
        onSubmit,
        createRP
    }
}

