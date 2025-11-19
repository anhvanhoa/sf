import { ApiError } from '@/lib/error'
import { useNavigate } from 'react-router'

const useErrorPage = (error: unknown, redirectTo: string) => {
    const navigate = useNavigate()
    const options = {
        replace: true,
    }
    if (error instanceof ApiError) {
        if (error.status === 403) {
            throw navigate(`/403?redirect=${redirectTo}`, options)
        }
        if (error.status === 404) {
            throw navigate(`/404?redirect=${redirectTo}`, options)
        }
    }
    return null
}

export default useErrorPage
