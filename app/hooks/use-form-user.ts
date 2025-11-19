import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery } from '@tanstack/react-query'
import type { User } from '@/types/user'
import { createUser, getUserById, updateUser } from '@/apis/user'
import { setFormErrors } from '@/lib/error'
import { toast } from 'sonner'

export const userSchema = z
    .object({
        email: z.string().email('Email không hợp lệ').min(1, 'Email là bắt buộc'),
        phone: z.string().optional(),
        fullName: z.string().min(1, 'Họ và tên là bắt buộc'),
        avatar: z.string().optional(),
        bio: z.string().optional(),
        address: z.string().optional(),
        status: z.enum(['active', 'inactive', 'locked']),
        birthday: z.string().optional(),
        password: z.string().optional(),
        confirmPassword: z.string().optional()
    })
    .refine(
        (data) => {
            if (!data.password) {
                return true
            }
            return data.password === data.confirmPassword
        },
        {
            message: 'Mật khẩu xác nhận không khớp',
            path: ['confirmPassword']
        }
    )

export type UserFormValues = z.infer<typeof userSchema>

const defaultValues: UserFormValues = {
    email: '',
    phone: '',
    fullName: '',
    avatar: '',
    bio: '',
    address: '',
    status: 'active',
    birthday: undefined,
    password: '',
    confirmPassword: ''
}

interface UseEditUserProps {
    user?: User
    userId?: string
    open: boolean
    onSuccess?: () => void
}

export function useEditUser({ user, userId, open, onSuccess }: UseEditUserProps) {
    const queryUser = useQuery({
        queryKey: ['user', userId],
        queryFn: () => getUserById(userId!),
        enabled: Boolean(userId) && open && !user,
        staleTime: 1000 * 60 * 5
    })

    const currentUser = user || queryUser.data?.user
    const form = useForm<UserFormValues>({
        resolver: zodResolver(userSchema),
        defaultValues
    })

    const updateUserMutation = useMutation({
        mutationFn: (values: UserFormValues) => {
            const userIdToUpdate = currentUser?.id || userId
            if (!userIdToUpdate) {
                throw new Error('Không tìm thấy ID người dùng')
            }
            return updateUser(userIdToUpdate, values)
        },
        onSuccess: () => {
            if (onSuccess) {
                onSuccess()
            }
        },
        onError: (error: Error) => {
            setFormErrors(form, error, (error) => {
                toast.error(error.message)
            })
        }
    })

    useEffect(() => {
        if (open) {
            if (!currentUser) {
                form.reset(defaultValues)
            } else {
                form.reset(currentUser)
            }
        }
    }, [currentUser, open, form])

    const onSubmit = async (values: UserFormValues) => {
        updateUserMutation.mutate(values)
    }

    const resetForm = () => {
        if (!currentUser) {
            form.reset(defaultValues)
        } else {
            form.reset(currentUser)
        }
    }

    const isLoading = queryUser.isLoading || updateUserMutation.isPending
    return {
        form,
        currentUser,
        isLoading,
        onSubmit,
        resetForm,
        updateUserMutation,
        queryUser
    }
}

export function useCreateUser(onSuccess?: (id?: string) => void) {
    const form = useForm<UserFormValues>({
        resolver: zodResolver(userSchema),
        defaultValues
    })

    const createUserMutation = useMutation({
        mutationFn: (values: UserFormValues) => createUser(values),
        onSuccess: (data) => {
            form.reset(defaultValues)
            if (onSuccess) {
                onSuccess(data.user?.id)
            }
        },
        onError: (error: Error) => {
            setFormErrors(form, error, (error) => {
                toast.error(error.message)
            })
        }
    })

    const onSubmit = async (values: UserFormValues) => {
        createUserMutation.mutate(values)
    }

    const resetForm = () => {
        form.reset(defaultValues)
    }

    return {
        createUserMutation,
        form,
        isLoading: createUserMutation.isPending,
        onSubmit,
        resetForm
    }
}
