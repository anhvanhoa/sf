import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { Loader2, AlertTriangle } from 'lucide-react'
import { useForm } from 'react-hook-form'
import type { Role } from '@/types/role'
import { useDeleteRole } from '@/hooks/use-delete-role'

interface DeleteRoleProps {
    role?: Role
    open: boolean
    onOpenChange: (open: boolean) => void
    onSuccess?: () => void
}

export const DeleteRole = ({ role, open, onOpenChange, onSuccess }: DeleteRoleProps) => {
    const form = useForm({
        defaultValues: {}
    })

    const { onSubmit, deleteRoleMutation } = useDeleteRole({
        role,
        onOpenChange,
        onSuccess
    })

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className='max-w-md'>
                <DialogHeader>
                    <div className='flex items-center gap-3'>
                        <div className='rounded-full bg-destructive/10 p-2'>
                            <AlertTriangle className='h-5 w-5 text-destructive' />
                        </div>
                        <div>
                            <DialogTitle>Xóa vai trò</DialogTitle>
                            <DialogDescription>Bạn có chắc chắn muốn xóa vai trò này?</DialogDescription>
                        </div>
                    </div>
                </DialogHeader>

                {role && (
                    <div className='py-4'>
                        <p className='text-sm text-muted-foreground'>
                            Vai trò <span className='font-semibold text-foreground'>{role.name}</span> sẽ bị xóa vĩnh
                            viễn. Hành động này không thể hoàn tác.
                        </p>
                    </div>
                )}

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <DialogFooter className='gap-2'>
                            <Button
                                type='button'
                                variant='outline'
                                onClick={() => onOpenChange(false)}
                                disabled={deleteRoleMutation.isPending}
                            >
                                Hủy
                            </Button>
                            <Button type='submit' variant='destructive' disabled={deleteRoleMutation.isPending}>
                                {deleteRoleMutation.isPending && (
                                    <>
                                        <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                                        Đang xóa...
                                    </>
                                )}
                                {!deleteRoleMutation.isPending && 'Xóa'}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
