import * as React from 'react'
import {
    Activity,
    AlertTriangle,
    BarChart3,
    Bot,
    Droplets,
    Gauge,
    Home,
    Map,
    Settings2,
    Shield,
    Square,
    Thermometer,
    Zap
} from 'lucide-react'

import { NavMain } from '@/components/layout/nav-main'
import { NavProjects } from '@/components/layout/nav-projects'
import { NavUser } from '@/components/layout/nav-user'
import { TeamSwitcher } from '@/components/layout/team-switcher'
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from '@/components/ui/sidebar'
import { useIsActive } from '@/lib/lib'
import { useAuthContext } from '@/components/providers/auth-provider'

const data = {
    user: {
        name: 'Nông dân',
        email: 'farmer@smartfarming.com',
        avatar: 'https:/ui.shadcn.com/avatars/shadcn.jpg'
    },
    teams: [
        {
            name: 'Trang trại chính',
            logo: Map,
            plan: 'Premium'
        },
        {
            name: 'Nhà kính A',
            logo: Thermometer,
            plan: 'Standard'
        },
        {
            name: 'Khu vực B',
            logo: Droplets,
            plan: 'Basic'
        }
    ],
    projects: [
        {
            name: 'Nhà kính thông minh',
            url: '/projects/greenhouse',
            icon: Thermometer
        },
        {
            name: 'Hệ thống tưới tự động',
            url: '/projects/irrigation',
            icon: Droplets
        },
        {
            name: 'Giám sát môi trường',
            url: '/projects/monitoring',
            icon: Gauge
        }
    ]
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const { profile } = useAuthContext()
    const isDashboardActive = useIsActive(['/'])
    const isMonitoringActive = useIsActive(['/monitoring'])
    const isPlotsActive = useIsActive(['/plots'])
    const isAutomationActive = useIsActive(['/automation'])
    const isAlertsActive = useIsActive(['/alerts'])
    const isAiPredictionsActive = useIsActive(['/ai-predictions'])
    const isReportsActive = useIsActive(['/reports'])
    const isAdminActive = useIsActive(['/admin'])
    const isPermissionsActive = useIsActive(['/permissions'])
    const isRolesActive = useIsActive(['/roles'])

    const navMain = [
        {
            title: 'Tổng quan',
            url: '/',
            icon: Home,
            isActive: isDashboardActive,
            items: [
                {
                    title: 'Dashboard chính',
                    url: '/'
                },
                {
                    title: 'Trạng thái hệ thống',
                    url: '/status'
                },
                {
                    title: 'Thống kê nhanh',
                    url: '/quick-stats'
                },
                {
                    title: 'Hoạt động gần đây',
                    url: '/recent-activity'
                }
            ]
        },
        {
            title: 'Giám sát môi trường',
            url: '/monitoring',
            icon: Activity,
            isActive: isMonitoringActive,
            items: [
                {
                    title: 'Thời gian thực',
                    url: '/monitoring/realtime'
                },
                {
                    title: 'Biểu đồ nhiệt độ',
                    url: '/monitoring/temperature'
                },
                {
                    title: 'Biểu đồ độ ẩm',
                    url: '/monitoring/humidity'
                },
                {
                    title: 'Lịch sử dữ liệu',
                    url: '/monitoring/history'
                }
            ]
        },
        {
            title: 'Quản lý lô',
            url: '/plots',
            icon: Square,
            isActive: isPlotsActive,
            items: [
                {
                    title: 'Danh sách lô',
                    url: '/plots'
                },
                {
                    title: 'Thêm lô mới',
                    url: '/plots/add'
                },
                {
                    title: 'Theo dõi cây trồng',
                    url: '/plots/crops'
                },
                {
                    title: 'Lịch sử canh tác',
                    url: '/plots/history'
                },
                {
                    title: 'Bản đồ lô',
                    url: '/plots/map'
                }
            ]
        },
        {
            title: 'Tự động điều khiển',
            url: '/automation',
            icon: Zap,
            isActive: isAutomationActive,
            items: [
                {
                    title: 'Hệ thống tưới',
                    url: '/automation/irrigation'
                },
                {
                    title: 'Điều khiển quạt',
                    url: '/automation/fans'
                },
                {
                    title: 'Chiếu sáng',
                    url: '/automation/lighting'
                },
                {
                    title: 'Cài đặt ngưỡng',
                    url: '/automation/thresholds'
                }
            ]
        },
        {
            title: 'Cảnh báo & Thông báo',
            url: '/alerts',
            icon: AlertTriangle,
            isActive: isAlertsActive,
            items: [
                {
                    title: 'Cảnh báo môi trường',
                    url: '/alerts/environment'
                },
                {
                    title: 'Cảnh báo thiết bị',
                    url: '/alerts/devices'
                },
                {
                    title: 'Cài đặt thông báo',
                    url: '/alerts/settings'
                },
                {
                    title: 'Lịch sử cảnh báo',
                    url: '/alerts/history'
                }
            ]
        },
        {
            title: 'AI Dự đoán',
            url: '/ai-predictions',
            icon: Bot,
            isActive: isAiPredictionsActive,
            items: [
                {
                    title: 'Dự đoán tưới tiêu',
                    url: '/ai-predictions/irrigation'
                },
                {
                    title: 'Gợi ý bón phân',
                    url: '/ai-predictions/fertilizer'
                },
                {
                    title: 'Lịch thu hoạch',
                    url: '/ai-predictions/harvest'
                },
                {
                    title: 'Phân tích xu hướng',
                    url: '/ai-predictions/trends'
                }
            ]
        },
        {
            title: 'Báo cáo & Thống kê',
            url: '/reports',
            icon: BarChart3,
            isActive: isReportsActive,
            items: [
                {
                    title: 'Báo cáo sản lượng',
                    url: '/reports/production'
                },
                {
                    title: 'Thống kê môi trường',
                    url: '/reports/environment'
                },
                {
                    title: 'Hiệu suất thiết bị',
                    url: '/reports/performance'
                },
                {
                    title: 'Xuất báo cáo',
                    url: '/reports/export'
                }
            ]
        },
        {
            title: 'Quản trị hệ thống',
            url: '/admin',
            icon: Settings2,
            isActive: isAdminActive,
            items: [
                {
                    title: 'Quản lý người dùng',
                    url: '/users'
                },
                {
                    title: 'Quản lý thiết bị',
                    url: '/admin/devices'
                },
                {
                    title: 'Quản lý khu vực',
                    url: '/admin/areas'
                },
                {
                    title: 'Cài đặt hệ thống',
                    url: '/admin/settings'
                }
            ]
        },
        {
            title: 'Quản trị phân quyền',
            url: '/permissions',
            icon: Shield,
            isActive: isPermissionsActive || isRolesActive,
            items: [
                {
                    title: 'Danh sách quyền',
                    url: '/permissions'
                },
                {
                    title: 'Danh sách vai trò',
                    url: '/roles'
                }
            ]
        }
    ]

    return (
        <Sidebar collapsible='icon' {...props}>
            <SidebarHeader>
                <TeamSwitcher teams={data.teams} />
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={navMain} />
                <NavProjects projects={data.projects} />
            </SidebarContent>
            <SidebarFooter>
                {profile && <NavUser user={profile.user} />}
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}
