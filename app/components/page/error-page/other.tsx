import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { AlertTriangle, RefreshCcw, Home } from 'lucide-react'
import { Link } from 'react-router'
import { cn } from '@/lib/utils'

type TheErrorPageProps = {
    message: string
    retry?: () => void
    className?: string
}

const TheErrorPage = ({ message, retry, className }: TheErrorPageProps) => {
    return (
        <div className={cn('min-h-[calc(100vh-100px)] flex items-center justify-center bg-background p-4', className)}>
            <Card className='max-w-md w-full text-center shadow-none'>
                <CardHeader>
                    <div className='flex justify-center mb-4'>
                        <div className='rounded-full bg-destructive/10 p-6'>
                            <AlertTriangle className='size-16 text-destructive' />
                        </div>
                    </div>
                    <CardTitle className='text-4xl font-bold mb-2'>Lỗi</CardTitle>
                </CardHeader>
                <CardContent className='space-y-4'>
                    <p className='text-muted-foreground'>
                        {message}
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
                        <Button 
                            variant='outline' 
                            className='w-full sm:w-auto' 
                            onClick={retry}
                        >
                            <RefreshCcw className='h-4 w-4' />
                            Thử lại
                        </Button>
                    )}
                </CardFooter>
            </Card>
        </div>
    )
}

export default TheErrorPage
