import type { Route } from './+types/dashboard'
import DashboardContent from '@/components/page/auth/dashboard'

export function meta({}: Route.MetaArgs) {
    return [
        { title: 'Dashboard - Nông nghiệp thông minh' },
        { name: 'description', content: 'Tổng quan hệ thống nông nghiệp thông minh' }
    ]
}

export default function Dashboard() {
    return <DashboardContent />
}
