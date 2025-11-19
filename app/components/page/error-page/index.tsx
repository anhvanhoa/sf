import { ApiError } from '@/lib/error'
import Forbidden403 from './403'
import NotFound404 from './404'
import TheErrorPage from './other'

type ErrorPageProps = {
    error: Error
    retry?: () => void
    retryLoading?: boolean,
    className?: string
}

const ErrorPage = ({ error, retry, retryLoading, className }: ErrorPageProps) => {
    if (error instanceof ApiError) {
        if (error.status === 403) {
            return <Forbidden403 retry={retry} retryLoading={retryLoading} className={className} />
        }
        if (error.status === 404) {
            return <NotFound404 className={className} />
        }
    }
    return <TheErrorPage message={error.message ?? 'Đã xảy ra lỗi không xác định'} retry={retry} className={className} />
}

export default ErrorPage
