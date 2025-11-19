import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogClose
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Loader2, Unlock } from 'lucide-react'
import type { User } from '@/types/user'
import { useUnlockUser } from '@/hooks/use-unlock-user'

interface UnlockUserProps {
    user?: User
    open: boolean
    onOpenChange: (open: boolean) => void
    onSuccess?: () => void
    reason?: string
}

export const UnlockUser = ({ user, open, onOpenChange, onSuccess, reason }: UnlockUserProps) => {
    const unlockUserMutation = useUnlockUser()
    const onSubmit = async () => {
        if (!user?.id) return
        unlockUserMutation.mutate(user.id, {
            onSuccess: () => {
                onOpenChange(false)
                if (onSuccess) {
                    onSuccess()
                }
            }
        })
    }
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className='max-w-md'>
                <DialogHeader>
                    <div className='flex items-center gap-3'>
                        <div className='rounded-full bg-green-600/10 p-2'>
                            <Unlock className='size-4 text-green-600' />
                        </div>
                        <DialogTitle>Mở khóa người dùng</DialogTitle>
                    </div>
                    {user && (
                        <DialogDescription>
                            Bạn có chắc chắn muốn mở khóa người dùng{' '}
                            <span className='font-semibold text-foreground'>{user.fullName || user.email}</span>? Người
                            dùng sẽ có thể truy cập vào hệ thống sau khi mở khóa.
                            {reason && (
                                <p className='pt-2 text-sm text-muted-foreground'>
                                    <span className='font-semibold text-foreground'>Lý do cũ:</span> {reason}
                                </p>
                            )}
                        </DialogDescription>
                    )}
                </DialogHeader>

                <DialogFooter className='gap-2'>
                    <DialogClose asChild>
                        <Button size='sm' variant='outline' disabled={unlockUserMutation.isPending}>
                            Hủy
                        </Button>
                    </DialogClose>
                    <Button size='sm' onClick={onSubmit} disabled={unlockUserMutation.isPending}>
                        {unlockUserMutation.isPending && (
                            <span className='flex items-center gap-2'>
                                <Loader2 className='size-4 animate-spin' />
                                Đang mở khóa...
                            </span>
                        )}
                        {!unlockUserMutation.isPending && 'Xác nhận'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
