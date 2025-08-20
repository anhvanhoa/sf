import { useLocation } from 'react-router'

const isServer = typeof window === 'undefined'

const isActive = (paths: string[], matchPath?: string) => {
    if (!matchPath) {
        if (!isServer) matchPath = window.location.pathname
        else return false
    }
    return paths.some((path) => matchPath.startsWith(path))
}

const useIsActive = (paths: string[]) => {
    const location = useLocation()
    return paths.some((path) => location.pathname.startsWith(path))
}

export { isActive, isServer, useIsActive }
