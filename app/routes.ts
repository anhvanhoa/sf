import { type RouteConfig, index, layout, route } from '@react-router/dev/routes'

export default [
    layout('components/layout/main.tsx', [
        index('routes/dashboard.tsx'), 
        route('plots', 'routes/plot/index.tsx')
    ]),
] satisfies RouteConfig
