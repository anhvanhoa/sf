'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { ArrowLeft, KeyRound, Eye, EyeOff, CheckCircle } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Spinner } from '@/components/ui/spinner'
import Footer from './footer'
import { useResetPasswordByToken } from '@/hooks/use-auth'
import { toast } from 'sonner'

interface ChangePasswordFormProps {
    onBack: () => void
    variant?: 'standalone' | 'embedded'
    token: string
}

const ChangePasswordForm = ({ onBack, variant = 'standalone', token }: ChangePasswordFormProps) => {
    const [step, setStep] = useState<'form' | 'success'>('form')
    const reset = useResetPasswordByToken()
    const [showPasswords, setShowPasswords] = useState({
        new: false,
        confirm: false
    })

    const schema = z
        .object({
            new_password: z.string().min(1, 'Mật khẩu mới là bắt buộc').min(6, 'Mật khẩu phải có ít nhất 6 ký tự'),
            confirm_password: z.string().min(1, 'Xác nhận mật khẩu là bắt buộc')
        })
        .refine((data) => data.new_password === data.confirm_password, {
            path: ['confirm_password'],
            message: 'Mật khẩu xác nhận không khớp'
        })

    type FormValues = z.infer<typeof schema>

    const form = useForm<FormValues>({
        resolver: zodResolver(schema),
        defaultValues: {
            new_password: '',
            confirm_password: ''
        }
    })

    const onSubmit = (values: FormValues) => {
        reset.mutate(
            { ...values, token },
            {
                onSuccess: () => setStep('success'),
                onError: (error) => toast.error(error.message)
            }
        )
    }

    const togglePasswordVisibility = (field: keyof typeof showPasswords) => {
        setShowPasswords((prev) => ({
            ...prev,
            [field]: !prev[field]
        }))
    }

    const Wrapper: React.FC<{ children: React.ReactNode; color: 'purple' | 'green' }> = ({ children, color }) => {
        if (variant === 'embedded') return <>{children}</>
        const colorMap = {
            purple: 'from-purple-50 to-violet-100',
            green: 'from-green-50 to-emerald-100'
        }
        return (
            <div className={`min-h-screen bg-gradient-to-br ${colorMap[color]} flex items-center justify-center p-4`}>
                {children}
            </div>
        )
    }

    if (step === 'success') {
        return (
            <Wrapper color='green'>
                <Card className='w-full max-w-md'>
                    <CardHeader className='text-center'>
                        <div className='mx-auto mb-4 w-16 h-16 bg-green-100 rounded-full flex items-center justify-center'>
                            <CheckCircle className='w-8 h-8 text-green-600' />
                        </div>
                        <CardTitle className='text-2xl font-bold text-gray-900'>Đổi mật khẩu thành công!</CardTitle>
                        <CardDescription className='text-gray-600'>
                            Mật khẩu của bạn đã được cập nhật thành công
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button onClick={onBack} className='w-full' size='lg'>
                            <ArrowLeft className='w-4 h-4 mr-2' />
                            Quay về Dashboard
                        </Button>
                    </CardContent>
                </Card>
            </Wrapper>
        )
    }

    return (
        <Wrapper color='purple'>
            <Card className='w-full max-w-md'>
                <CardHeader className='text-center'>
                    <CardTitle className='text-2xl font-bold'>Đổi mật khẩu</CardTitle>
                    <CardDescription className='text-muted-foreground'>
                        Cập nhật mật khẩu mới cho tài khoản của bạn
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
                            <FormField
                                control={form.control}
                                name='new_password'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel required>Mật khẩu mới</FormLabel>
                                        <FormControl>
                                            <div className='relative'>
                                                <Input
                                                    type={showPasswords.new ? 'text' : 'password'}
                                                    placeholder='Nhập mật khẩu mới'
                                                    className='pr-10'
                                                    {...field}
                                                />
                                                <Button
                                                    type='button'
                                                    variant='ghost'
                                                    size='sm'
                                                    className='absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent'
                                                    onClick={() => togglePasswordVisibility('new')}
                                                >
                                                    {showPasswords.new ? (
                                                        <EyeOff className='h-4 w-4 text-gray-400' />
                                                    ) : (
                                                        <Eye className='h-4 w-4 text-gray-400' />
                                                    )}
                                                </Button>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name='confirm_password'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel required>Xác nhận mật khẩu mới</FormLabel>
                                        <FormControl>
                                            <div className='relative'>
                                                <Input
                                                    type={showPasswords.confirm ? 'text' : 'password'}
                                                    placeholder='Nhập lại mật khẩu mới'
                                                    className='pr-10'
                                                    {...field}
                                                />
                                                <Button
                                                    type='button'
                                                    variant='ghost'
                                                    size='sm'
                                                    className='absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent'
                                                    onClick={() => togglePasswordVisibility('confirm')}
                                                >
                                                    {showPasswords.confirm ? (
                                                        <EyeOff className='h-4 w-4 text-gray-400' />
                                                    ) : (
                                                        <Eye className='h-4 w-4 text-gray-400' />
                                                    )}
                                                </Button>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className='flex gap-2'>
                                <Button
                                    type='button'
                                    variant='outline'
                                    size='icon'
                                    onClick={onBack}
                                    disabled={reset.isPending}
                                >
                                    <ArrowLeft className='w-4 h-4' />
                                </Button>
                                <Button type='submit' className='flex-1' disabled={reset.isPending}>
                                    {reset.isPending ? (
                                        <>
                                            <Spinner />
                                            Đang cập nhật...
                                        </>
                                    ) : (
                                        <>
                                            <KeyRound className='w-4 h-4' />
                                            Cập nhật
                                        </>
                                    )}
                                </Button>
                            </div>
                        </form>
                    </Form>
                    <Footer className='mt-4' />
                </CardContent>
            </Card>
        </Wrapper>
    )
}

export default ChangePasswordForm
