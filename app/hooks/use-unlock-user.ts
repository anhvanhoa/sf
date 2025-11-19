import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { unlockUser } from '@/apis/user'

export function useUnlockUser() {
    return useMutation({
        mutationFn: (id: string) => unlockUser(id),
        onError: (error: Error) => toast.error(error.message)
    })
}

