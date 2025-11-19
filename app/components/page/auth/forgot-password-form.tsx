'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { ArrowLeft, KeyRound, Loader2, CheckCircle, Mail, Send } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import Footer from './footer'
import { toast } from 'sonner'
import { useForgotPassword } from '@/hooks/use-auth'
import { Alert, AlertDescription } from '@/components/ui/alert'

interface ForgotPasswordFormProps {
    onBack: () => void
    variant?: 'standalone' | 'embedded'
}

const ForgotPasswordForm = ({ onBack, variant = 'standalone' }: ForgotPasswordFormProps) => {
    const [step, setStep] = useState<'method' | 'otp' | 'reset' | 'success'>('method')
    const [loading, setLoading] = useState(false)

    const methodSchema = z.object({
        email: z.string().email('Email không hợp lệ')
    })
    type MethodValues = z.infer<typeof methodSchema>
    const methodForm = useForm<MethodValues>({
        resolver: zodResolver(methodSchema),
        defaultValues: { email: '' }
    })

    const forgotPassword = useForgotPassword()

    const resetSchema = z
        .object({
            newPassword: z.string().min(6, 'Mật khẩu phải có ít nhất 6 ký tự'),
            confirmPassword: z.string().min(1, 'Xác nhận mật khẩu là bắt buộc')
        })
        .refine((v) => v.newPassword === v.confirmPassword, {
            message: 'Mật khẩu xác nhận không khớp',
            path: ['confirmPassword']
        })
    type ResetValues = z.infer<typeof resetSchema>
    const resetForm = useForm<ResetValues>({
        resolver: zodResolver(resetSchema),
        defaultValues: { newPassword: '', confirmPassword: '' }
    })

    const handleSendCode = () => {
        forgotPassword.mutate(
            { email: methodForm.getValues('email') },
            {
                onError: (error) => toast.error(error.message)
            }
        )
    }

    const handleResetPassword = async () => {
        setLoading(true)
        try {
            await new Promise((resolve) => setTimeout(resolve, 1500))
            setStep('success')
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Cập nhật thất bại'
            resetForm.setError('root', { type: 'server', message })
        } finally {
            setLoading(false)
        }
    }

    const Wrapper: React.FC<{ children: React.ReactNode; color: 'orange' | 'purple' | 'green' }> = ({
        children,
        color
    }) => {
        if (variant === 'embedded') return <>{children}</>
        const colorMap = {
            orange: 'from-orange-50 to-amber-100',
            purple: 'from-purple-50 to-violet-100',
            green: 'from-green-50 to-emerald-100'
        }
        return (
            <div className={`min-h-screen bg-gradient-to-br ${colorMap[color]} flex items-center justify-center p-4`}>
                {children}
            </div>
        )
    }

    if (step === 'reset') {
        return (
            <Wrapper color='purple'>
                <Card className='w-full max-w-md shadow-lg border border-purple-100/60'>
                    <CardHeader className='text-center'>
                        <div className='mx-auto mb-4 w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center'>
                            <KeyRound className='w-8 h-8 text-purple-600' />
                        </div>
                        <CardTitle className='text-2xl font-bold text-gray-900'>Đặt lại mật khẩu</CardTitle>
                        <CardDescription className='text-gray-600'>
                            Nhập mật khẩu mới cho tài khoản của bạn
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Form {...resetForm}>
                            <form onSubmit={resetForm.handleSubmit(handleResetPassword)} className='space-y-4'>
                                <FormField
                                    control={resetForm.control}
                                    name='newPassword'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Mật khẩu mới *</FormLabel>
                                            <FormControl>
                                                <Input type='password' placeholder='Nhập mật khẩu mới' {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={resetForm.control}
                                    name='confirmPassword'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Xác nhận mật khẩu mới *</FormLabel>
                                            <FormControl>
                                                <Input type='password' placeholder='Nhập lại mật khẩu mới' {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <div className='flex gap-2'>
                                    <Button
                                        type='button'
                                        variant='outline'
                                        onClick={() => setStep('otp')}
                                        className='flex-1'
                                        disabled={loading}
                                    >
                                        <ArrowLeft className='w-4 h-4 mr-2' />
                                        Quay lại
                                    </Button>
                                    <Button type='submit' className='flex-1' disabled={loading}>
                                        {loading ? (
                                            <>
                                                <Loader2 className='w-4 h-4 mr-2 animate-spin' />
                                                Đang cập nhật...
                                            </>
                                        ) : (
                                            'Đặt lại mật khẩu'
                                        )}
                                    </Button>
                                </div>
                            </form>
                        </Form>
                    </CardContent>
                </Card>
            </Wrapper>
        )
    }

    if (step === 'success') {
        return (
            <Wrapper color='green'>
                <Card className='w-full max-w-md shadow-lg border border-green-100/60'>
                    <CardHeader className='text-center'>
                        <div className='mx-auto mb-4 w-16 h-16 bg-green-100 rounded-full flex items-center justify-center'>
                            <CheckCircle className='w-8 h-8 text-green-600' />
                        </div>
                        <CardTitle className='text-2xl font-bold text-gray-900'>Đặt lại mật khẩu thành công!</CardTitle>
                        <CardDescription className='text-gray-600'>
                            Mật khẩu của bạn đã được cập nhật thành công
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button onClick={onBack} className='w-full' size='lg'>
                            <ArrowLeft className='w-4 h-4 mr-2' />
                            Quay về trang chủ
                        </Button>
                    </CardContent>
                </Card>
            </Wrapper>
        )
    }

    return (
        <Wrapper color='orange'>
            <Card className='w-full max-w-md shadow-lg'>
                <CardHeader className='text-center'>
                    <CardTitle className='text-2xl font-bold'>Quên mật khẩu</CardTitle>
                    <CardDescription className='text-muted-foreground'>
                        Chọn phương thức để đặt lại mật khẩu
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...methodForm}>
                        {forgotPassword.isSuccess && (
                            <Alert className='border-green-500/20 bg-green-50/50 mb-4'>
                                <AlertDescription className='text-green-600'>
                                    Mã đã được gửi đến email của bạn. Vui lòng kiểm tra email để đặt lại mật khẩu.
                                </AlertDescription>
                            </Alert>
                        )}
                        <form onSubmit={methodForm.handleSubmit(handleSendCode)} className='space-y-4'>
                            <FormField
                                control={methodForm.control}
                                name='email'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel required>Email</FormLabel>
                                        <FormControl>
                                            <div className='relative'>
                                                <Mail className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400' />
                                                <Input placeholder='Nhập email' {...field} className='pl-9' />
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
                                    disabled={forgotPassword.isPending}
                                >
                                    <ArrowLeft className='w-4 h-4' />
                                </Button>
                                <Button type='submit' className='flex-1' disabled={forgotPassword.isPending}>
                                    {forgotPassword.isPending && (
                                        <>
                                            <Loader2 className='w-4 h-4 mr-2 animate-spin' />
                                            Đang gửi...
                                        </>
                                    )}
                                    {!forgotPassword.isPending && (
                                        <>
                                            <Send className='w-4 h-4' />
                                            Xác nhận
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

export default ForgotPasswordForm
