export type Route = {
    path: string
    component: string
    name?: string
    routes?: Route[]
}

export const routes: Route[] = [
    {
        path: 'auth',
        component: 'components/layout/auth.tsx',
        routes: [
            {
                path: 'login',
                name: 'Đăng nhập',
                component: 'routes/auth/login.tsx'
            },
            {
                path: 'forgot-password',
                name: 'Quên mật khẩu',
                component: 'routes/auth/forgot-password.tsx'
            },
            {
                path: 'reset-password/:token',
                name: 'Đặt lại mật khẩu',
                component: 'routes/auth/reset-password.tsx'
            }
        ]
    },
    {
        path: '',
        component: 'components/layout/main.tsx',
        routes: [
            {
                path: '/',
                name: 'Trang chủ',
                component: 'routes/dashboard.tsx'
            },
            {
                path: 'plots',
                name: 'Quản lý lô',
                component: 'routes/plot/index.tsx'
            },
            {
                path: 'permissions',
                name: 'Quản lý quyền',
                component: 'routes/permission/index.tsx'
            },
            {
                path: 'roles',
                name: 'Quản lý vai trò',
                component: 'routes/role/index.tsx'
            },
            {
                path: 'roles/assign-permissions/:id',
                name: 'Gắn quyền cho vai trò',
                component: 'routes/role/assign-permissions.tsx'
            },
            {
                path: 'users',
                name: 'Quản lý người dùng',
                component: 'routes/user/index.tsx'
            },
            {
                path: '403',
                name: 'Truy cập bị từ chối',
                component: 'routes/403.tsx'
            },
            {
                path: '*',
                name: 'Trang không tìm thấy',
                component: 'routes/404.tsx'
            }
        ]
    }
]
