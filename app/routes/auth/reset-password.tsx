import { Spinner } from '@/components/ui/spinner'
import type { Route } from './+types/reset-password'
import ChangePasswordForm from '@/components/page/auth/change-password-form'
import { useCheckToken } from '@/hooks/use-auth'
import { Navigate, useNavigate } from 'react-router'

export function meta({}: Route.MetaArgs) {
    return [
        { title: 'Đặt lại mật khẩu - Nông nghiệp thông minh' },
        { name: 'description', content: 'Thiết lập mật khẩu mới cho tài khoản của bạn' }
    ]
}

export default function ResetPassword({ params }: Route.ComponentProps) {
    const navigate = useNavigate()
    const { token } = params
    const checkToken = useCheckToken(token)
    if (!checkToken.isPending && !checkToken.isSuccess) {
        return <Navigate to='/' />
    }
    return (
        <div className='min-h-screen grid grid-cols-1'>
            <div className='flex items-center justify-center p-6 bg-gray-50'>
                <div className='w-full max-w-md'>
                    {checkToken.isPending ? (
                        <div className='flex items-center justify-center'>
                            <Spinner />
                        </div>
                    ) : (
                        <ChangePasswordForm
                            variant='embedded'
                            onBack={() => {
                                navigate('/')
                            }}
                            token={token}
                        />
                    )}
                </div>
            </div>
        </div>
    )
}
