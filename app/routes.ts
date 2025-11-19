import { type RouteConfig, type RouteConfigEntry, index, layout, prefix, route } from '@react-router/dev/routes'
import { routes, type Route } from './lib/config-routes'

const renderRoute = (r: Route): RouteConfigEntry => {
    const isRoutes = r.routes && r.routes.length > 0
    if (isRoutes && r.routes) {
        return layout(r.component, prefix(r.path, r.routes.map((rc) => renderRoute(rc))))
    }
    if (r.path === '/') {
        return index(r.component)
    }
    return route(r.path, r.component)
}

export default routes.map((r) => renderRoute(r)) satisfies RouteConfig
