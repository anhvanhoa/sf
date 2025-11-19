import type { Route } from './+types/403'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ShieldX, Home, ArrowLeft } from 'lucide-react'
import { Link, useNavigate, useSearchParams } from 'react-router'

export function meta({}: Route.MetaArgs) {
    return [
        { title: '403 - Truy cập bị từ chối' },
        { name: 'description', content: 'Bạn không có quyền truy cập trang này' }
    ]
}

export default function Forbidden403() {
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const redirect = searchParams.get('redirect') || '/'
    return (
        <div className="min-h-[calc(100vh-100px)] flex items-center justify-center bg-background p-4">
            <Card className="max-w-md w-full text-center">
                <CardHeader>
                    <div className="flex justify-center mb-4">
                        <div className="rounded-full bg-destructive/10 p-6">
                            <ShieldX className="size-16 text-destructive" />
                        </div>
                    </div>
                    <CardTitle className="text-4xl font-bold mb-2">403</CardTitle>
                    <CardDescription className="text-lg">
                        Truy cập bị từ chối
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-muted-foreground">
                        Rất tiếc, bạn không có quyền truy cập trang này. Vui lòng liên hệ quản trị viên nếu bạn cho rằng đây là lỗi.
                    </p>
                </CardContent>
                <CardFooter className="flex flex-col gap-2 sm:flex-row sm:justify-center">
                    <Button asChild variant="default" className="w-full sm:w-auto">
                        <Link to="/">
                            <Home className="mr-2 h-4 w-4" />
                            Về trang chủ
                        </Link>
                    </Button>
                    <Button     
                        variant="outline" 
                        className="w-full sm:w-auto"
                        onClick={() => navigate(redirect, { replace: true })}
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Quay lại
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}

