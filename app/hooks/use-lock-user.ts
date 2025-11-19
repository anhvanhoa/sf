import { useMutation } from '@tanstack/react-query'
import { lockUser } from '@/apis/user'
import type { LockUserRequest, User } from '@/types/user'
import { setFormErrors } from '@/lib/error'
import z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'

const lockUserSchema = z.object({
    reason: z.string().min(1, 'Lý do khóa người dùng là bắt buộc')
})

type LockUserFormValues = z.infer<typeof lockUserSchema>

interface UseLockUserProps {
    user?: User
    onSuccess?: () => void
}

export function useLockUser({ user, onSuccess }: UseLockUserProps) {
    const form = useForm<LockUserFormValues>({
        resolver: zodResolver(lockUserSchema),
        defaultValues: {
            reason: ''
        }
    })
    const lockUserMutation = useMutation({
        mutationFn: ({ id, body }: { id: string; body: LockUserRequest }) => lockUser(id, body),
        onError: (error: Error) => setFormErrors(form, error, (error) => toast.error(error.message)),
        onSuccess: () => {
            form.reset()
            if (onSuccess) onSuccess()
        }
    })

    const onSubmit = async (values: LockUserFormValues) => {
        if (!user?.id) return
        lockUserMutation.mutate({ id: user.id, body: values })
    }

    return {
        form,
        lockUserMutation,
        isLoading: lockUserMutation.isPending,
        onSubmit
    }
}
