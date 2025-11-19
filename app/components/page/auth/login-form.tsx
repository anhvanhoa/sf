'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Eye, EyeOff, Mail, KeyIcon, ArrowLeft, LogIn } from 'lucide-react'
import { useState } from 'react'
import { useLogin } from '@/hooks/use-auth'
import type { LoginRequest } from '@/types/auth'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link } from 'react-router'
import { toast } from 'sonner'
import { Spinner } from '@/components/ui/spinner'
import Footer from './footer'
import { useAuthContext } from '@/components/providers/auth-provider'

interface LoginFormProps {
    onBack: () => void
    onLoginSuccess?: () => void
}

const LoginForm = ({ onBack, onLoginSuccess }: LoginFormProps) => {
    const [showPassword, setShowPassword] = useState(false)
    const loginMutation = useLogin()
    const { setProfile } = useAuthContext()

    const schema = z.object({
        emailOrPhone: z
            .string()
            .regex(
                /^0\d{9}$|^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                'Email hoặc số điện thoại không hợp lệ'
            ),
        password: z.string().min(6, 'Mật khẩu phải có ít nhất 6 ký tự')
    })

    type FormValues = z.infer<typeof schema>

    const form = useForm<FormValues>({
        resolver: zodResolver(schema),
        defaultValues: { emailOrPhone: '', password: '' }
    })

    const onSubmit = (values: FormValues) => {
        const payload: LoginRequest = values
        loginMutation.mutate(payload, {
            onSuccess: (response) => {
                setProfile({
                    user: response.user,
                    roles: [],
                    permissions: [],
                    scopes: [],
                })
                toast.success('Đăng nhập thành công')
                onLoginSuccess?.()
            },
            onError: (error) => toast.error(error.message)
        })
    }

    return (
        <Card className='w-full max-w-md shadow-lg'>
            <CardHeader className='text-center'>
                <CardTitle className='text-2xl font-bold'>Đăng nhập</CardTitle>
                <CardDescription className='text-muted-foreground'>
                    Truy cập bảng điều khiển quản trị của bạn
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
                        <FormField
                            control={form.control}
                            name='emailOrPhone'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel required>Email hoặc số điện thoại</FormLabel>
                                    <FormControl>
                                        <div className='relative'>
                                            <Mail className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400' />
                                            <Input
                                                tabIndex={1}
                                                placeholder='Nhập email hoặc số điện thoại'
                                                autoComplete='email'
                                                autoFocus
                                                className='pl-9'
                                                {...field}
                                            />
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name='password'
                            render={({ field }) => (
                                <FormItem>
                                    <div className='flex items-center justify-between'>
                                        <FormLabel required>Mật khẩu</FormLabel>
                                        <Button
                                            variant='link'
                                            className='p-0 h-auto text-sm text-blue-500 hover:no-underline'
                                            asChild
                                        >
                                            <Link to='/auth/forgot-password'>Quên mật khẩu?</Link>
                                        </Button>
                                    </div>
                                    <div className='relative'>
                                        <FormControl>
                                            <div>
                                                <KeyIcon className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400' />
                                                <Input
                                                    tabIndex={2}
                                                    type={showPassword ? 'text' : 'password'}
                                                    className='pl-9 pr-10'
                                                    autoComplete='current-password'
                                                    placeholder='Nhập mật khẩu'
                                                    {...field}
                                                />
                                            </div>
                                        </FormControl>
                                        <Button
                                            type='button'
                                            variant='ghost'
                                            size='sm'
                                            className='absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent'
                                            onClick={() => setShowPassword(!showPassword)}
                                            tabIndex={-1}
                                        >
                                            {showPassword ? (
                                                <EyeOff className='h-4 w-4 text-gray-400' />
                                            ) : (
                                                <Eye className='h-4 w-4 text-gray-400' />
                                            )}
                                        </Button>
                                    </div>
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
                                disabled={loginMutation.isPending}
                            >
                                <ArrowLeft className='w-4 h-4' />
                            </Button>
                            <Button type='submit' className='flex-1' disabled={loginMutation.isPending} tabIndex={3}>
                                {loginMutation.isPending ? (
                                    <>
                                        <Spinner />
                                        Đang đăng nhập...
                                    </>
                                ) : (
                                    <>
                                        <LogIn className='w-4 h-4' />
                                        Đăng nhập
                                    </>
                                )}
                            </Button>
                        </div>

                        <Footer />
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}

export default LoginForm
