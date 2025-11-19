import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
import type { User } from '@/types/user'
import { useEditUser } from '@/hooks/use-form-user'
import ErrorPage from '@/components/page/error-page'
import FormUser from './FormUser'

interface EditUserProps {
    user?: User
    userId?: string
    open: boolean
    onOpenChange: (open: boolean) => void
    onSuccess?: () => void
}

export const EditUser = ({ user, userId, open, onOpenChange, onSuccess }: EditUserProps) => {
    const { form, isLoading, onSubmit, resetForm, queryUser } = useEditUser({
        user,
        userId,
        open,
        onSuccess
    })
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className='max-w-2xl'>
                <DialogHeader>
                    <DialogTitle>Chỉnh sửa người dùng</DialogTitle>
                    <DialogDescription>
                        Cập nhật thông tin người dùng. Các trường có dấu * là bắt buộc.
                    </DialogDescription>
                </DialogHeader>
                {(queryUser.isSuccess || user) && (
                    <FormUser
                        isEdit={true}
                        form={form}
                        onSubmit={onSubmit}
                        isLoading={isLoading}
                        resetForm={resetForm}
                        onCancel={() => onOpenChange(false)}
                    />
                )}
                {queryUser.error && (
                    <ErrorPage className='min-h-full' error={queryUser.error} retry={queryUser.refetch} />
                )}
            </DialogContent>
        </Dialog>
    )
}
