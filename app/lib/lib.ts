import { useLocation } from 'react-router'
import { routes } from './config-routes'

const isServer = typeof window === 'undefined'

export const isActive = (paths: string[], matchPath?: string) => {
    if (!matchPath) {
        if (!isServer) matchPath = window.location.pathname
        else return false
    }
    return paths.some((path) => matchPath.startsWith(path))
}

export const useIsActive = (paths: string[]) => {
    const location = useLocation()
    return paths.some((path) => location.pathname.startsWith(path))
}

const renderRouteName = (r: (typeof routes)[number]): Record<string, string> => {
    const isRoutes = r.routes && r.routes.length > 0
    if (isRoutes && r.routes) {
        return r.routes.reduce(
            (acc, rc) => {
                if (rc.name && rc.path) {
                    if (rc.path === '/') {
                        acc[`/${r.path}`] = rc.name
                    } else {
                        if (r.path === '') {
                            acc[`/${rc.path}`] = rc.name
                        } else {
                            acc[`/${r.path}/${rc.path}`] = rc.name
                        }
                    }
                }
                if (rc.routes) {
                    return {
                        ...acc,
                        ...renderRouteName(rc)
                    }
                }
                return acc
            },
            {} as Record<string, string>
        )
    }
    if (r.path === '/' && r.name) {
        return {
            ['/']: r.name
        }
    }
    if (r.name) {
        return {
            [`/${r.path}`]: r.name
        }
    }
    return {}
}

export const routeNameMap: Record<string, string> = routes.reduce(
    (acc, r) => {
        return {
            ...acc,
            ...renderRouteName(r)
        }
    },
    {} as Record<string, string>
)

const matchRoutePattern = (pattern: string, url: string): boolean => {
    const regexPattern = pattern.replace(/:[^/]+/g, '[^/]+')
    const regex = new RegExp(`^${regexPattern}$`)
    return regex.test(url)
}

const findRouteName = (url: string): string | undefined => {
    if (routeNameMap[url]) {
        return routeNameMap[url]
    }
    
    for (const [pattern, name] of Object.entries(routeNameMap)) {
        if (matchRoutePattern(pattern, url)) {
            return name
        }
    }
    
    return undefined
}

export const getBreadcrumbs = (url: string) => {
    if (url === '/') {
        return [
            {
                href: '/',
                label: routeNameMap['/'] || 'Tổng quan'
            }
        ]
    }
    const crumbs = url
        .split('/')
        .filter(Boolean)
        .reduce((acc: { href: string; label: string }[], _segment, index, array) => {
            const href = `/${array.slice(0, index + 1).join('/')}`
            const routeName = findRouteName(href)
            if (routeName) {
                return [
                    ...acc,
                    {
                        href,
                        label: routeName
                    }
                ]
            }
            return acc
        }, [] as { href: string; label: string }[])
    return [
        {
            href: '/',
            label: routeNameMap['/'] || 'Tổng quan'
        },
        ...crumbs
    ]
}
