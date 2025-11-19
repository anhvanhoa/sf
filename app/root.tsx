import {
    isRouteErrorResponse,
    Links,
    Meta,
    Outlet,
    replace,
    Scripts,
    ScrollRestoration,
} from 'react-router'

import type { Route } from './+types/root'
import { QueryProvider } from './components/providers/query-provider'
import { AuthProvider } from '@/components/providers/auth-provider'
import { Toaster } from '@/components/ui/sonner'
import './app.css'
import { authApi } from './apis/auth'
import NotFound404 from './routes/404'

export const links: Route.LinksFunction = () => [
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossOrigin: 'anonymous'
    },
    {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap'
    }
]

export function Layout({ children }: { children: React.ReactNode }) {
    return (
        <html lang='en'>
            <head>
                <meta charSet='utf-8' />
                <meta name='viewport' content='width=device-width, initial-scale=1' />
                <Meta />
                <Links />
            </head>
            <body>
                <QueryProvider>
                    {children}
                    <ScrollRestoration />
                </QueryProvider>
                <Scripts />
            </body>
        </html>
    )
}

export function shouldRevalidate() {
    return false
}

const AUTH_PATHS = ['/auth/login', '/auth/forgot-password', '/auth/reset-password']

const isAuthPath = (pathname: string): boolean => {
    return AUTH_PATHS.some(path => pathname.startsWith(path))
}

export const clientLoader = async ({ request }: Route.ClientLoaderArgs) => {
    const url = new URL(request.url)
    const pathname = url.pathname
    const isOnAuthPage = isAuthPath(pathname)
    let profile = await authApi.getProfile().catch(() => null)
    if (!profile) {
        try {
            await authApi.refreshToken()
            profile = await authApi.getProfile().catch(() => null)
        } catch {
            if (!isOnAuthPage) {
                throw replace('/auth/login')
            }
            return undefined
        }
    }

    if (profile && isOnAuthPage) {
        throw replace('/')
    }

    if (!profile && !isOnAuthPage) {
        throw replace('/auth/login')
    }

    return profile ?? undefined
}

export default function App({ loaderData  }: Route.ComponentProps) {
    return (
        <AuthProvider profile={loaderData}>
            <Outlet />
            <Toaster position='top-right' />
        </AuthProvider>
    )
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
    if (isRouteErrorResponse(error) && error.status === 404) {
        return <NotFound404 />
    }

    let message = 'Oops!'
    let details = 'An unexpected error occurred.'
    let stack: string | undefined

    if (isRouteErrorResponse(error)) {
        message = 'Error'
        details = error.statusText || details
    } else if (error && error instanceof Error) {
        details = error.message
        stack = error.stack
    }

    return (
        <main className='pt-16 p-4 container mx-auto'>
            <h1>{message}</h1>
            <p>{details}</p>
            {stack && (
                <pre className='w-full p-4 overflow-x-auto'>
                    <code>{stack}</code>
                </pre>
            )}
        </main>
    )
}