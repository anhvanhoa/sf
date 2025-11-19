'use client'

import { useState } from 'react'
import { BadgeCheck, Bell, ChevronsUpDown, CreditCard, LogOut, Sparkles } from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from '@/components/ui/dialog'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from '@/components/ui/sidebar'
import { useLogout } from '@/hooks/use-auth'
import { useLocation, useNavigate } from 'react-router'
import { toast } from 'sonner'
import { useAuthContext } from '@/components/providers/auth-provider'
import type { UserInfo } from '@/types/auth'

export function NavUser({ user }: { user: UserInfo }) {
    const location = useLocation()
    const { isMobile } = useSidebar()
    const { setProfile } = useAuthContext()
    const logout = useLogout()
    const navigate = useNavigate()
    const [showLogoutDialog, setShowLogoutDialog] = useState(false)
    const fullName = user.fullName?.charAt(0).toUpperCase() || 'N/A'
    const onLogout = () => {
        logout.mutate(undefined, {
            onSuccess: () => {
                setProfile(undefined)
                toast.success('Đăng xuất thành công')
                navigate(`/auth/login?redirect=${location.pathname}`, {
                    replace: true
                })
            },
            onError: (error) => {
                toast.error(error.message)
            }
        })
    }

    const handleLogoutClick = () => {
        setShowLogoutDialog(true)
    }

    const handleConfirmLogout = () => {
        setShowLogoutDialog(false)
        onLogout()
    }
    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton
                            size='lg'
                            className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
                        >
                            <Avatar className='h-8 w-8 rounded-lg'>
                                <AvatarImage src={user.avatar} alt={user.fullName} />
                                <AvatarFallback className='rounded-lg'>{fullName}</AvatarFallback>
                            </Avatar>
                            <div className='grid flex-1 text-left text-sm leading-tight'>
                                <span className='truncate font-medium'>{user.fullName}</span>
                                <span className='truncate text-xs'>{user.email}</span>
                            </div>
                            <ChevronsUpDown className='ml-auto size-4' />
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className='w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg'
                        side={isMobile ? 'bottom' : 'right'}
                        align='end'
                        sideOffset={4}
                    >
                        <DropdownMenuLabel className='p-0 font-normal'>
                            <div className='flex items-center gap-2 px-1 py-1.5 text-left text-sm'>
                                <Avatar className='h-8 w-8 rounded-lg'>
                                    <AvatarImage src={user.avatar} alt={user.fullName} />
                                    <AvatarFallback className='rounded-lg'>
                                        {fullName}
                                    </AvatarFallback>
                                </Avatar>
                                <div className='grid flex-1 text-left text-sm leading-tight'>
                                    <span className='truncate font-medium'>{user.fullName}</span>
                                    <span className='truncate text-xs'>{user.email}</span>
                                </div>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem>
                                <Sparkles />
                                Upgrade to Pro
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem>
                                <BadgeCheck />
                                Account
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <CreditCard />
                                Billing
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Bell />
                                Notifications
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={handleLogoutClick} className='cursor-pointer text-red-500!'>
                            <LogOut className='text-red-500' />
                            Log out
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>

            <Dialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Xác nhận đăng xuất</DialogTitle>
                        <DialogDescription>Bạn có chắc chắn muốn đăng xuất khỏi tài khoản của mình?</DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button size={'sm'} variant='outline' onClick={() => setShowLogoutDialog(false)}>
                            Hủy
                        </Button>
                        <Button
                            size={'sm'}
                            variant='destructive'
                            onClick={handleConfirmLogout}
                            disabled={logout.isPending}
                        >
                            {logout.isPending ? 'Đang đăng xuất...' : 'Đăng xuất'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </SidebarMenu>
    )
}
