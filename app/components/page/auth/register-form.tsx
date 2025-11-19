'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { ArrowLeft, UserPlus, Loader2, CheckCircle } from 'lucide-react'
import { useState } from 'react'
import { useRegister, useVerifyAccount } from '@/hooks/use-auth'
import type { RegisterRequest, VerifyAccountRequest } from '@/types/auth'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

interface RegisterFormProps {
    onBack: () => void
}

const RegisterForm = ({ onBack }: RegisterFormProps) => {
    const [step, setStep] = useState<'form' | 'verification' | 'success'>('form')
    const [verificationToken, setVerificationToken] = useState<string>('')
    
    const registerMutation = useRegister()
    const verifyAccountMutation = useVerifyAccount()

    const schema = z.object({
        email: z.string().email('Email không hợp lệ'),
        fullName: z.string().min(1, 'Họ tên là bắt buộc'),
        password: z.string().min(6, 'Mật khẩu phải có ít nhất 6 ký tự'),
        confirmPassword: z.string().min(1, 'Xác nhận mật khẩu là bắt buộc'),
    }).refine((data) => data.password === data.confirmPassword, {
        message: 'Mật khẩu xác nhận không khớp',
        path: ['confirmPassword'],
    })

    type RegisterValues = z.infer<typeof schema>

    const form = useForm<RegisterValues>({
        resolver: zodResolver(schema),
        defaultValues: { email: '', fullName: '', password: '', confirmPassword: '' },
    })

    const onSubmit = (values: RegisterValues) => {
        const registerData: RegisterRequest = {
            email: values.email,
            fullName: values.fullName,
            password: values.password,
            confirmPassword: values.confirmPassword,
        }
        registerMutation.mutate(registerData, {
            onSuccess: (response) => {
                if (response.token) {
                    setVerificationToken(response.token)
                }
                setStep('verification')
            },
            onError: (error) => {
                const message = error instanceof Error ? error.message : 'Đăng ký thất bại'
                form.setError('root', { type: 'server', message })
            },
        })
    }

    const verifySchema = z.object({
        verificationCode: z.string().min(1, 'Mã xác thực là bắt buộc'),
    })

    type VerifyValues = z.infer<typeof verifySchema>

    const verifyForm = useForm<VerifyValues>({
        resolver: zodResolver(verifySchema),
        defaultValues: { verificationCode: '' },
    })

    const onVerify = (values: VerifyValues) => {
        const verifyData: VerifyAccountRequest = {
            token: verificationToken || values.verificationCode,
        }
        verifyAccountMutation.mutate(verifyData, {
            onSuccess: () => setStep('success'),
            onError: (error) => {
                const message = error instanceof Error ? error.message : 'Xác thực thất bại'
                verifyForm.setError('root', { type: 'server', message })
            },
        })
    }

    if (step === 'verification') {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
                <Card className="w-full max-w-md">
                    <CardHeader className="text-center">
                        <div className="mx-auto mb-4 w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                            <CheckCircle className="w-8 h-8 text-green-600" />
                        </div>
                        <CardTitle className="text-2xl font-bold text-gray-900">
                            Xác thực email
                        </CardTitle>
                        <CardDescription className="text-gray-600">
                            Chúng tôi đã gửi mã xác thực đến email của bạn
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Form {...verifyForm}>
                            <form onSubmit={verifyForm.handleSubmit(onVerify)} className="space-y-4">
                                <FormField
                                    control={verifyForm.control}
                                    name="verificationCode"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Mã xác thực 6 số</FormLabel>
                                            <FormControl>
                                                <Input
                                                    maxLength={6}
                                                    className="text-center text-lg tracking-widest"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                            <div className="flex gap-2">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={onBack}
                                    className="flex-1"
                                    disabled={verifyAccountMutation.isPending}
                                >
                                    <ArrowLeft className="w-4 h-4 mr-2" />
                                    Quay lại
                                </Button>
                                <Button
                                    type="submit"
                                    className="flex-1"
                                    disabled={verifyAccountMutation.isPending}
                                >
                                    {verifyAccountMutation.isPending ? (
                                        <>
                                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                            Đang xác thực...
                                        </>
                                    ) : (
                                        'Xác thực'
                                    )}
                                </Button>
                            </div>
                            </form>
                        </Form>
                    </CardContent>
                </Card>
            </div>
        )
    }

    if (step === 'success') {
        return (
            <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
                <Card className="w-full max-w-md">
                    <CardHeader className="text-center">
                        <div className="mx-auto mb-4 w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                            <CheckCircle className="w-8 h-8 text-green-600" />
                        </div>
                        <CardTitle className="text-2xl font-bold text-gray-900">
                            Đăng ký thành công!
                        </CardTitle>
                        <CardDescription className="text-gray-600">
                            Tài khoản của bạn đã được tạo và xác thực thành công
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button
                            onClick={onBack}
                            className="w-full"
                            size="lg"
                        >
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Quay về trang chủ
                        </Button>
                    </CardContent>
                </Card>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
            <Card className="w-full max-w-md">
                <CardHeader className="text-center">
                    <div className="mx-auto mb-4 w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                        <UserPlus className="w-8 h-8 text-blue-600" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-gray-900">
                        Đăng ký tài khoản
                    </CardTitle>
                    <CardDescription className="text-gray-600">
                        Tạo tài khoản mới để sử dụng hệ thống
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email *</FormLabel>
                                        <FormControl>
                                            <Input type="email" placeholder="Nhập email của bạn" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="fullName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Họ tên *</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Nhập họ tên của bạn" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Mật khẩu *</FormLabel>
                                        <FormControl>
                                            <Input type="password" placeholder="Nhập mật khẩu" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="confirmPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Xác nhận mật khẩu *</FormLabel>
                                        <FormControl>
                                            <Input type="password" placeholder="Nhập lại mật khẩu" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {form.formState.errors.root && (
                                <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
                                    {form.formState.errors.root.message}
                                </div>
                            )}

                            <div className="flex gap-2">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={onBack}
                                    className="flex-1"
                                    disabled={registerMutation.isPending}
                                >
                                    <ArrowLeft className="w-4 h-4 mr-2" />
                                    Quay lại
                                </Button>
                                <Button
                                    type="submit"
                                    className="flex-1"
                                    disabled={registerMutation.isPending}
                                >
                                    {registerMutation.isPending ? (
                                        <>
                                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                            Đang đăng ký...
                                        </>
                                    ) : (
                                        'Đăng ký'
                                    )}
                                </Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
}

export default RegisterForm
