import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import FormUser from './FormUser'
import { useCreateUser } from '@/hooks/use-form-user'

interface AddUserProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    onSuccess?: (id?: string) => void
}

const AddUser = ({ open, onOpenChange, onSuccess }: AddUserProps) => {
    const { form, isLoading, onSubmit, resetForm } = useCreateUser(onSuccess)
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className='max-w-2xl'>
                <DialogHeader>
                    <DialogTitle>Thêm người dùng</DialogTitle>
                </DialogHeader>
                <FormUser
                    isEdit={false}
                    form={form}
                    onSubmit={onSubmit}
                    isLoading={isLoading}
                    resetForm={resetForm}
                    onCancel={() => onOpenChange(false)}
                />
            </DialogContent>
        </Dialog>
    )
}

export default AddUser
