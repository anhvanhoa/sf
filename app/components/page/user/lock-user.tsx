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
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { Loader2, AlertTriangle } from 'lucide-react'
import type { User } from '@/types/user'
import { useLockUser } from '@/hooks/use-lock-user'

interface LockUserProps {
    user?: User
    open: boolean
    onOpenChange: (open: boolean) => void
    onSuccess?: () => void
}

export const LockUser = ({ user, open, onOpenChange, onSuccess }: LockUserProps) => {
    const { form, isLoading, onSubmit } = useLockUser({ user, onSuccess })
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className='max-w-md'>
                <DialogHeader>
                    <div className='flex items-center gap-3'>
                        <div className='rounded-full bg-destructive/10 p-2'>
                            <AlertTriangle className='size-4 text-destructive' />
                        </div>
                        <DialogTitle>Khóa người dùng</DialogTitle>
                    </div>
                    {user && (
                        <DialogDescription>
                            Người dùng{' '}
                            <span className='font-semibold text-foreground'>{user.fullName || user.email}</span> sẽ bị
                            khóa. Người dùng không thể truy cập vào hệ thống sau khi khóa.
                        </DialogDescription>
                    )}
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
                        <FormField
                            control={form.control}
                            name='reason'
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Textarea
                                            placeholder='Nhập lý do khóa người dùng...'
                                            className='resize-none'
                                            rows={4}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <DialogFooter className='gap-2'>
                            <DialogClose asChild>
                                <Button size='sm' variant='outline' disabled={isLoading}>
                                    Hủy
                                </Button>
                            </DialogClose>
                            <Button size='sm' type='submit' disabled={isLoading}>
                                {isLoading && (
                                    <span className='flex items-center gap-2'>
                                        <Loader2 className='size-4 animate-spin' />
                                        Đang khóa...
                                    </span>
                                )}
                                {!isLoading && 'Xác nhận'}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
