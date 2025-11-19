import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/layout/app-sidebar'
import { Separator } from '@/components/ui/separator'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
import { Link, Outlet, useLocation } from 'react-router'
import { getBreadcrumbs } from '@/lib/lib'

export default function Main() {
    const { pathname } = useLocation()
    const breadcrumbs = getBreadcrumbs(pathname)
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <header className='flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 border-b'>
                    <div className='flex items-center gap-2 px-4'>
                        <SidebarTrigger className='-ml-1' />
                        <Separator orientation='vertical' className='mr-2 data-[orientation=vertical]:h-4' />
                        <Breadcrumb>
                            <BreadcrumbList>
                                {breadcrumbs.map((breadcrumb) => {
                                    if (breadcrumb.href === pathname) {
                                        return (
                                            <BreadcrumbItem key={breadcrumb.href}>
                                                <BreadcrumbPage className='first-letter:uppercase'>
                                                    {breadcrumb.label}
                                                </BreadcrumbPage>
                                            </BreadcrumbItem>
                                        )
                                    }
                                    return (
                                        <div key={breadcrumb.href} className='flex items-center gap-x-2.5'>
                                            <BreadcrumbItem>
                                                <Link to={breadcrumb.href} className='first-letter:uppercase'>
                                                    {breadcrumb.label}
                                                </Link>
                                            </BreadcrumbItem>
                                            <BreadcrumbSeparator className='hidden md:block' />
                                        </div>
                                    )
                                })}
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>
                </header>
                <Outlet />
            </SidebarInset>
        </SidebarProvider>
    )
}
