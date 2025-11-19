import { useNavigate, useSearchParams } from 'react-router'
import type { Route } from './+types/login'
import LoginForm from '@/components/page/auth/login-form'

export function meta({}: Route.MetaArgs) {
    return [
        { title: 'Đăng nhập - Nông nghiệp thông minh' },
        { name: 'description', content: 'Đăng nhập vào hệ thống quản lý nông nghiệp thông minh' }
    ]
}

export default function Login() {
    const [searchParams] = useSearchParams()
    const redirect = searchParams.get('redirect') || '/'
    const navigate = useNavigate()
    return (
        <div className='min-h-screen grid grid-cols-1'>
            <div className='flex items-center justify-center p-6 bg-gray-50'>
                <div className='w-full max-w-md'>
                    <LoginForm
                        onBack={() => { navigate('/') }}
                        onLoginSuccess={() => { navigate(redirect) }}
                    />
                </div>
            </div>
        </div>
    )
}
