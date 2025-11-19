import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Loader2 } from 'lucide-react'
import type { Role } from '@/types/role'
import { useEditRole } from '@/hooks/use-edit-role'

const COLOR_OPTIONS = [
    { value: '#3b82f6', label: 'Xanh dương', name: 'Blue' },
    { value: '#10b981', label: 'Xanh lá', name: 'Green' },
    { value: '#f59e0b', label: 'Cam', name: 'Orange' },
    { value: '#ef4444', label: 'Đỏ', name: 'Red' },
    { value: '#8b5cf6', label: 'Tím', name: 'Purple' },
    { value: '#ec4899', label: 'Hồng', name: 'Pink' },
    { value: '#06b6d4', label: 'Xanh cyan', name: 'Cyan' },
    { value: '#f97316', label: 'Cam đậm', name: 'Deep Orange' },
    { value: '#84cc16', label: 'Vàng xanh', name: 'Lime' },
    { value: '#6366f1', label: 'Chàm', name: 'Indigo' },
    { value: '#14b8a6', label: 'Ngọc lam', name: 'Teal' },
    { value: '#a855f7', label: 'Tím đậm', name: 'Violet' }
]

interface EditRoleProps {
    role?: Role
    open: boolean
    onOpenChange: (open: boolean) => void
    onSuccess?: () => void
    isCreate?: boolean
}

export const EditRole = ({ role, open, onOpenChange, onSuccess, isCreate = false }: EditRoleProps) => {
    const { form, onSubmit, resetForm, isLoading } = useEditRole({
        role,
        open,
        onOpenChange,
        onSuccess,
        isCreate
    })

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className='max-w-2xl'>
                <DialogHeader>
                    <DialogTitle>{isCreate ? 'Thêm vai trò mới' : 'Chỉnh sửa vai trò'}</DialogTitle>
                    <DialogDescription>
                        {isCreate
                            ? 'Tạo vai trò mới trong hệ thống. Các trường có dấu * là bắt buộc.'
                            : 'Cập nhật thông tin vai trò. Các trường có dấu * là bắt buộc.'}
                    </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
                        <FormField
                            control={form.control}
                            name='name'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel required>Tên vai trò</FormLabel>
                                    <FormControl>
                                        <Input placeholder='Nhập tên vai trò...' disabled={isLoading} {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name='description'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Mô tả</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            className='resize-none'
                                            placeholder='Mô tả chi tiết về vai trò này...'
                                            rows={3}
                                            disabled={isLoading}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className='grid grid-cols-2 gap-4'>
                            <FormField
                                control={form.control}
                                name='variant'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Mã màu</FormLabel>
                                        <Select onValueChange={field.onChange} value={field.value} disabled={isLoading}>
                                            <FormControl>
                                                <SelectTrigger className='w-full'>
                                                    <div className='flex items-center gap-2 flex-1 min-w-0'>
                                                        <SelectValue placeholder='Chọn mã màu' />
                                                    </div>
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {COLOR_OPTIONS.map((color) => (
                                                    <SelectItem key={color.value} value={color.value}>
                                                        <span className='flex items-center gap-2'>
                                                            <span
                                                                className='inline-block size-4 rounded-full border border-border shrink-0'
                                                                style={{ backgroundColor: color.value }}
                                                            />
                                                            <span>{color.label}</span>
                                                            <span className='text-xs text-muted-foreground ml-auto'>
                                                                {color.value}
                                                            </span>
                                                        </span>
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name='status'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel required>Trạng thái</FormLabel>
                                        <Select onValueChange={field.onChange} value={field.value} disabled={isLoading}>
                                            <FormControl>
                                                <SelectTrigger className='w-full'>
                                                    <SelectValue placeholder='Chọn trạng thái' />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value='active'>Hoạt động</SelectItem>
                                                <SelectItem value='inactive'>Không hoạt động</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <DialogFooter className='gap-2'>
                            <Button type='button' variant='outline' onClick={resetForm} disabled={isLoading}>
                                Làm mới
                            </Button>
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
                                ) : isCreate ? (
                                    'Tạo mới'
                                ) : (
                                    'Cập nhật'
                                )}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
