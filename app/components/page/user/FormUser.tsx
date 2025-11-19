import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Eye, EyeOff, Loader2 } from 'lucide-react'
import { type UseFormReturn } from 'react-hook-form'
import { DatePicker } from '@/components/ui/date-picker'
import { formatRFC3339 } from 'date-fns'
import type { UserFormValues } from '@/hooks/use-form-user'
import { useState } from 'react'

interface FormUserProps {
    form: UseFormReturn<UserFormValues>
    onSubmit: (data: UserFormValues) => void
    isLoading: boolean
    resetForm: () => void
    onCancel: () => void
    isEdit?: boolean
}

const FormUser = ({ form, onSubmit, isLoading, resetForm, onCancel, isEdit = false }: FormUserProps) => {
    const [showPasswords, setShowPasswords] = useState({
        password: false,
        confirmPassword: false
    })

    const togglePasswordVisibility = (field: 'password' | 'confirmPassword') => () => {
        setShowPasswords((prev) => ({
            ...prev,
            [field]: !prev[field]
        }))
    }

    const IconShow = (field: 'password' | 'confirmPassword') => {
        return showPasswords[field] ? (
            <EyeOff className='h-4 w-4 text-gray-400' />
        ) : (
            <Eye className='h-4 w-4 text-gray-400' />
        )
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className='max-h-[70vh] overflow-y-auto space-y-3 p-2'>
                    <FormField
                        control={form.control}
                        name='fullName'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel required>Họ và tên</FormLabel>
                                <FormControl>
                                    <Input placeholder='Nhập họ và tên...' disabled={isLoading} {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name='email'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel required>Email</FormLabel>
                                <FormControl>
                                    <Input type='email' placeholder='Nhập email...' disabled={isLoading} {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {!isEdit && (
                        <>
                            <FormField
                                control={form.control}
                                name='password'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel required>Mật khẩu</FormLabel>
                                        <FormControl>
                                            <div className='relative'>
                                                <Input
                                                    type={showPasswords.password ? 'text' : 'password'}
                                                    placeholder='Nhập mật khẩu...'
                                                    disabled={isLoading}
                                                    {...field}
                                                />
                                                <Button
                                                    type='button'
                                                    variant='ghost'
                                                    size='sm'
                                                    className='absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent'
                                                    onClick={togglePasswordVisibility('password')}
                                                >
                                                    {IconShow('password')}
                                                </Button>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name='confirmPassword'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel required>Xác nhận mật khẩu</FormLabel>
                                        <FormControl>
                                            <div className='relative'>
                                                <Input
                                                    type={showPasswords.confirmPassword ? 'text' : 'password'}
                                                    placeholder='Nhập lại mật khẩu...'
                                                    disabled={isLoading}
                                                    {...field}
                                                />
                                                <Button
                                                    type='button'
                                                    variant='ghost'
                                                    size='sm'
                                                    className='absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent'
                                                    onClick={togglePasswordVisibility('confirmPassword')}
                                                >
                                                    {IconShow('confirmPassword')}
                                                </Button>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </>
                    )}
                    <FormField
                        control={form.control}
                        name='phone'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Số điện thoại</FormLabel>
                                <FormControl>
                                    <Input
                                        type='tel'
                                        placeholder='Nhập số điện thoại...'
                                        disabled={isLoading}
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name='address'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Địa chỉ</FormLabel>
                                <FormControl>
                                    <Input placeholder='Nhập địa chỉ...' disabled={isLoading} {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name='birthday'
                        render={({ field }) => {
                            return (
                                <FormItem>
                                    <FormLabel>Ngày sinh</FormLabel>
                                    <FormControl>
                                        <DatePicker
                                            date={field.value ? new Date(field.value) : undefined}
                                            onSelect={(date) => {
                                                const newDate = date ? formatRFC3339(date) : undefined
                                                field.onChange(newDate)
                                            }}
                                            placeholder='Chọn ngày sinh'
                                            disabled={isLoading}
                                            toDate={new Date()}
                                            captionLayout='dropdown'
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )
                        }}
                    />

                    <FormField
                        control={form.control}
                        name='bio'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Giới thiệu</FormLabel>
                                <FormControl>
                                    <Textarea
                                        className='resize-none'
                                        placeholder='Mô tả về người dùng...'
                                        rows={3}
                                        disabled={isLoading}
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name='avatar'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>URL Avatar</FormLabel>
                                <FormControl>
                                    <Input placeholder='Nhập URL avatar...' disabled={isLoading} {...field} />
                                </FormControl>
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
                <div className='flex justify-end gap-2 pt-4'>
                    <Button size='sm' type='button' variant='outline' onClick={resetForm} disabled={isLoading}>
                        Làm mới
                    </Button>
                    <Button type='button' variant='outline' size='sm' onClick={onCancel} disabled={isLoading}>
                        Hủy
                    </Button>
                    <Button size='sm' type='submit' disabled={isLoading}>
                        {isLoading && (
                            <>
                                <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                                Đang lưu...
                            </>
                        )}
                        {!isLoading && 'Cập nhật'}
                    </Button>
                </div>
            </form>
        </Form>
    )
}

export default FormUser
