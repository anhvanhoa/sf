import { DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog'
import { Form, FormField, FormItem, FormLabel, FormControl } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import type { Permission } from '@/types/permission'
import { SingleSelect } from '@/components/ui/single-select'
import { useAddRoleWithPer } from '@/hooks/use-add-role-with-per'

interface AddRoleWithPerProps {
    permission: Permission
    open: boolean
    onOpenChange: (open: boolean) => void,
    excludedRoleIds: string[],
    onSuccess?: () => void
}

const AddRoleWithPer = ({ permission, onOpenChange, excludedRoleIds, onSuccess }: AddRoleWithPerProps) => {
    const { form, roleOptions, onSubmit } = useAddRoleWithPer({
        permission,
        excludedRoleIds,
        onSuccess
    })
    return (
        <>
            <DialogHeader>
                <DialogTitle>Thêm vai trò mới cho quyền {permission?.action}</DialogTitle>
                <DialogDescription>
                    Chọn các vai trò để gán cho quyền{' '}
                    <span className='font-semibold text-primary'>{permission?.action}</span>.
                </DialogDescription>
            </DialogHeader>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
                    <FormField
                        control={form.control}
                        name='roleId'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel required>Vai trò</FormLabel>
                                <FormControl>
                                    <SingleSelect
                                        options={roleOptions}
                                        placeholder='Chọn vai trò...'
                                        notFoundText='Không tìm thấy vai trò nào'
                                        textSearch='Tìm kiếm vai trò...'
                                        variant='secondary'
                                        value={field.value}
                                        onChange={field.onChange}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <DialogFooter>
                        <Button size='sm' variant='outline' onClick={() => onOpenChange(false)}>
                            Hủy
                        </Button>
                        <Button size='sm' type='submit'>
                            Thêm
                        </Button>
                    </DialogFooter>
                </form>
            </Form>
        </>
    )
}

export default AddRoleWithPer
