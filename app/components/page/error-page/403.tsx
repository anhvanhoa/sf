import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ShieldX, Home, RefreshCcw } from 'lucide-react'
import { Link } from 'react-router'
import { Spinner } from '@/components/ui/spinner'
import { cn } from '@/lib/utils'

type Forbidden403Props = {
    retry?: () => void
    retryLoading?: boolean
    className?: string
}

export default function Forbidden403({ retry, retryLoading, className }: Forbidden403Props) {
    return (
        <div className={cn('min-h-[calc(100vh-100px)] flex items-center justify-center bg-background p-4', className)}>
            <Card className='max-w-md w-full text-center shadow-none'>
                <CardHeader>
                    <div className='flex justify-center mb-4'>
                        <div className='rounded-full bg-destructive/10 p-6'>
                            <ShieldX className='size-16 text-destructive' />
                        </div>
                    </div>
                    <CardTitle className='text-4xl font-bold mb-2'>403</CardTitle>
                    <CardDescription className='text-lg'>Truy cập bị từ chối</CardDescription>
                </CardHeader>
                <CardContent className='space-y-4'>
                    <p className='text-muted-foreground'>
                        Rất tiếc, bạn không có quyền truy cập trang này. Vui lòng liên hệ quản trị viên nếu bạn cho rằng
                        đây là lỗi.
                    </p>
                </CardContent>
                <CardFooter className='flex flex-col gap-2 sm:flex-row sm:justify-center'>
                    <Button asChild variant='default' className='w-full sm:w-auto'>
                        <Link to='/'>
                            <Home className='h-4 w-4' />
                            Về trang chủ
                        </Link>
                    </Button>
                    {retry && (
                        <Button variant='outline' className='w-full sm:w-auto' onClick={retry} disabled={retryLoading}>
                            {retryLoading ? <Spinner className='h-4 w-4' /> : <RefreshCcw className='h-4 w-4' />}
                            {retryLoading ? 'Vui lòng chờ...' : 'Thử lại'}
                        </Button>
                    )}
                </CardFooter>
            </Card>
        </div>
    )
}
