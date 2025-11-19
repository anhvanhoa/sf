import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogClose
} from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import type { Permission } from '@/types/permission'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { useEditPermission } from '@/hooks/use-edit-permission'

interface EditPermissionProps {
    permission?: Permission
    open: boolean
    onOpenChange: (open: boolean) => void
    onSuccess?: () => void
}

export const EditPermission = ({ permission, open, onOpenChange, onSuccess }: EditPermissionProps) => {
    const { form, onSubmit, resetForm, updatePermissionMutation } = useEditPermission({
        permission,
        open,
        onOpenChange,
        onSuccess
    })

    return (
        <div>
            <Dialog open={open} onOpenChange={onOpenChange}>
                <DialogContent className='max-w-2xl'>
                    <DialogHeader>
                        <DialogTitle>
                            Chỉnh sửa quyền
                            <span className='pl-1 text-rose-500'>{permission?.action}</span>
                        </DialogTitle>
                        <DialogDescription>
                            Cập nhật thông tin quyền. Các trường có dấu * là bắt buộc.
                        </DialogDescription>
                    </DialogHeader>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
                            <FormField
                                control={form.control}
                                name='description'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Mô tả</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder='Mô tả chi tiết về quyền này...'
                                                rows={3}
                                                className='resize-none'
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name='isPublic'
                                render={({ field }) => (
                                    <FormItem className='flex items-center'>
                                        <FormControl>
                                            <Checkbox
                                                id='edit-isPublic'
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                        </FormControl>
                                        <FormLabel>Quyền công khai (ai cũng có thể truy cập)</FormLabel>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <DialogFooter className='gap-2'>
                                <Button
                                    size='sm'
                                    type='button'
                                    variant='outline'
                                    onClick={resetForm}
                                    disabled={updatePermissionMutation.isPending}
                                >
                                    Làm mới
                                </Button>
                                <DialogClose asChild disabled={updatePermissionMutation.isPending}>
                                    <Button size='sm' type='button' variant='outline'>
                                        Hủy
                                    </Button>
                                </DialogClose>
                                <Button size='sm' type='submit' disabled={updatePermissionMutation.isPending}>
                                    {updatePermissionMutation.isPending && (
                                        <>
                                            <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                                            Đang cập nhật...
                                        </>
                                    )}
                                    {!updatePermissionMutation.isPending && 'Cập nhật'}
                                </Button>
                            </DialogFooter>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
        </div>
    )
}
