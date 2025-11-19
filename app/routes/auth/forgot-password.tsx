import type { Route } from './+types/forgot-password'
import ForgotPasswordForm from '@/components/page/auth/forgot-password-form'
import { useNavigate } from 'react-router'

export function meta({}: Route.MetaArgs) {
    return [
        { title: 'Quên mật khẩu - Nông nghiệp thông minh' },
        { name: 'description', content: 'Khôi phục mật khẩu cho tài khoản hệ thống quản lý nông nghiệp thông minh' }
    ]
}

export default function ForgotPassword() {
    const navigate = useNavigate()

    return (
        <div className='min-h-screen grid grid-cols-1'>
            <div className='flex items-center justify-center p-6 bg-gray-50'>
                <div className='w-full max-w-md'>
                    <ForgotPasswordForm
                        variant='embedded'
                        onBack={() => {
                            navigate('/')
                        }}
                    />
                </div>
            </div>
        </div>
    )
}
