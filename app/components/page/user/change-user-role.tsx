import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Loader2 } from 'lucide-react'
import { useEffect, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { MultiSelect } from '@/components/ui/multi-select'
import { useRolesQuery } from '@/hooks/use-roles-query'
import { attachUserRoles, listUserRoles } from '@/apis/user-roles'
import { toast } from 'sonner'
import { useQuery } from '@tanstack/react-query'
import { Skeleton } from '@/components/ui/skeleton'
import ErrorPage from '../error-page'

interface ChangeUserRoleProps {
    userId?: string
    open: boolean
    onOpenChange: (open: boolean) => void
    onSuccess?: () => void
}

const changeUserRoleSchema = z.object({
    roleIds: z.array(z.string())
})

type ChangeUserRoleFormValues = z.infer<typeof changeUserRoleSchema>

export const ChangeUserRole = ({ userId, open, onOpenChange, onSuccess }: ChangeUserRoleProps) => {
    const { roles, isLoading: isLoadingRoles } = useRolesQuery({
        status: 'active'
    })

    const userRolesQuery = useQuery({
        queryKey: ['user-roles', userId],
        queryFn: () => listUserRoles({ filter: { userId } }),
        enabled: Boolean(userId) && open,
        staleTime: 1000 * 60 * 5
    })

    const currentRoleIds = useMemo(() => {
        return (userRolesQuery.data?.userRoles?.map((ur) => ur.roleId).filter(Boolean) as string[]) || []
    }, [userRolesQuery.data])

    const roleOptions = useMemo(() => {
        return roles.map((role) => ({ value: role.id, label: role.name || '' })).filter((opt) => opt.value && opt.label)
    }, [roles])

    const form = useForm<ChangeUserRoleFormValues>({
        resolver: zodResolver(changeUserRoleSchema),
        defaultValues: {
            roleIds: currentRoleIds
        }
    })

    useEffect(() => {
        if (open) {
            form.reset({
                roleIds: currentRoleIds
            })
        }
    }, [currentRoleIds, open, form])

    const onSubmit = async (values: ChangeUserRoleFormValues) => {
        if (!userId) {
            toast.error('Không tìm thấy ID người dùng')
            return
        }
        try {
            await attachUserRoles({
                userIds: [userId],
                roleIds: values.roleIds
            })

            form.reset({
                roleIds: []
            })
            onOpenChange(false)
            if (onSuccess) {
                onSuccess()
            }
            toast.success('Cập nhật vai trò thành công!')
        } catch (error) {
            console.error('Error updating user roles:', error)
            const message = error instanceof Error ? error.message : 'Có lỗi xảy ra'
            toast.error(`Lỗi: ${message}`)
        }
    }

    const isLoading = form.formState.isSubmitting || isLoadingRoles || userRolesQuery.isLoading

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className='max-w-2xl'>
                <DialogHeader>
                    <DialogTitle>Thay đổi vai trò</DialogTitle>
                    <DialogDescription>
                        Chọn các vai trò cho người dùng. Bạn có thể chọn nhiều vai trò.
                    </DialogDescription>
                </DialogHeader>
                {userRolesQuery.isSuccess && (
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
                            <FormField
                                control={form.control}
                                name='roleIds'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Vai trò</FormLabel>
                                        <FormControl>
                                            {isLoadingRoles ? (
                                                <Skeleton className='h-10 w-full' />
                                            ) : (
                                                <MultiSelect
                                                    options={roleOptions}
                                                    placeholder='Chọn vai trò...'
                                                    notFoundText='Không tìm thấy vai trò nào'
                                                    textSearch='Tìm kiếm vai trò...'
                                                    value={field.value}
                                                    onChange={field.onChange}
                                                    maxLength={80}
                                                    classTrigger='w-full'
                                                    variant='secondary'
                                                />
                                            )}
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <DialogFooter className='gap-2'>
                                <Button
                                    type='button'
                                    variant='outline'
                                    onClick={() => onOpenChange(false)}
                                    disabled={isLoading}
                                >
                                    Hủy
                                </Button>
                                <Button type='submit' disabled={isLoading}>
                                    {isLoading ? (
                                        <>
                                            <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                                            Đang lưu...
                                        </>
                                    ) : (
                                        'Cập nhật'
                                    )}
                                </Button>
                            </DialogFooter>
                        </form>
                    </Form>
                )}
                {userRolesQuery.error && (
                    <ErrorPage className='min-h-full' error={userRolesQuery.error} retry={userRolesQuery.refetch} />
                )}
            </DialogContent>
        </Dialog>
    )
}
