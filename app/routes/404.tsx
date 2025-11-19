import type { Route } from './+types/404'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { FileQuestion, Home, ArrowLeft } from 'lucide-react'
import { Link, useNavigate } from 'react-router'

export function meta({}: Route.MetaArgs) {
    return [
        { title: '404 - Trang không tìm thấy' },
        { name: 'description', content: 'Trang bạn đang tìm kiếm không tồn tại' }
    ]
}

export default function NotFound404() {
    const navigate = useNavigate()
    return (
        <div className="min-h-[calc(100vh-100px)] flex items-center justify-center bg-background p-4">
            <Card className="max-w-md w-full text-center">
                <CardHeader>
                    <div className="flex justify-center mb-4">
                        <div className="rounded-full bg-muted p-6">
                            <FileQuestion className="size-16 text-muted-foreground" />
                        </div>
                    </div>
                    <CardTitle className="text-4xl font-bold mb-2">404</CardTitle>
                    <CardDescription className="text-lg">
                        Trang không tìm thấy
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-muted-foreground">
                        Rất tiếc, trang bạn đang tìm kiếm không tồn tại hoặc đã bị xóa. Vui lòng kiểm tra lại đường dẫn hoặc quay lại trang chủ.
                    </p>
                </CardContent>
                <CardFooter className="flex flex-col gap-2 sm:flex-row sm:justify-center">
                    <Button asChild variant="default" className="w-full sm:w-auto">
                        <Link to="/">
                            <Home className="h-4 w-4" />
                            Về trang chủ
                        </Link>
                    </Button>
                    <Button 
                        variant="outline" 
                        className="w-full sm:w-auto"
                        onClick={() => navigate(-1)}
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Quay lại
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}

