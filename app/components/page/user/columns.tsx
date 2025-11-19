import { type ColumnDef } from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { MoreHorizontal } from 'lucide-react'
import { UserStatus, type User } from '@/types/user'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Link } from 'react-router'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { useAuthContext } from '@/components/providers/auth-provider'
import type { Role } from '@/types/role'

export type UserTableRow = User & {
    id: string
}

export const columns: ColumnDef<UserTableRow>[] = [
    {
        accessorKey: 'fullName',
        header: 'Họ và tên',
        cell: ({ row }) => {
            const fullName = row.getValue('fullName') as string
            const email = row.original.email
            const avatar = row.original.avatar
            const initials = fullName
                ? fullName
                      .split(' ')
                      .map((n) => n[0])
                      .join('')
                      .toUpperCase()
                      .slice(0, 2)
                : email?.[0]?.toUpperCase() || 'U'
            return (
                <div className='flex items-center gap-3'>
                    <Avatar className='size-8'>
                        <AvatarImage src={avatar} alt={fullName || email} />
                        <AvatarFallback>{initials}</AvatarFallback>
                    </Avatar>
                    <div>
                        <div className='font-medium'>{fullName || '-'}</div>
                        {email && <div className='text-sm text-muted-foreground'>{email}</div>}
                    </div>
                </div>
            )
        }
    },
    {
        accessorKey: 'phone',
        header: 'Số điện thoại',
        cell: ({ row }) => {
            const phone = row.getValue('phone') as string
            return <span className='text-muted-foreground'>{phone || '-'}</span>
        }
    },
    {
        accessorKey: 'status',
        header: 'Trạng thái',
        cell: ({ row }) => {
            const status = row.getValue('status') as UserStatus | string
            if (!status) return '-'
            const statusMap: Record<string, { label: string; variant: 'default' | 'secondary' | 'destructive' }> = {
                active: { label: 'Hoạt động', variant: 'default' },
                inactive: { label: 'Không hoạt động', variant: 'secondary' },
                locked: { label: 'Đã khóa', variant: 'destructive' }
            }
            const statusInfo = statusMap[status] || { label: status, variant: 'secondary' as const }
            return <Badge variant={statusInfo.variant}>{statusInfo.label}</Badge>
        }
    },
    {
        accessorKey: 'address',
        header: 'Địa chỉ',
        cell: ({ row }) => {
            const address = row.getValue('address') as string
            return <span className='text-muted-foreground'>{address || '-'}</span>
        }
    },
    {
        accessorKey: 'roles',
        header: 'Vai trò',
        cell: ({ row }) => {
            const roles = row.getValue('roles') as Role[]
            return (
                <span className='space-x-1'>
                    {roles.map((role) => (
                            <Badge key={role.id} style={{ backgroundColor: role.variant || '#3b82f6' }}>
                                {role.name}
                            </Badge>
                        ))}
                </span>
            )
        }
    },
    {
        accessorKey: 'createdAt',
        header: 'Ngày tạo',
        cell: ({ row }) => {
            const date = row.getValue('createdAt') as string
            if (!date) return '-'
            return new Date(date).toLocaleDateString('vi-VN', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit'
            })
        }
    },
    {
        id: 'actions',
        enableHiding: false,
        header: 'Thao tác',
        cell: ({ row }) => <CellAction user={row.original} />
    }
]

const CellAction = ({ user }: { user: UserTableRow }) => {
    const { hasPermission } = useAuthContext()
    const canLock = hasPermission.USER.LOCK
    const canEdit = hasPermission.USER.EDIT
    const canChangeRole = hasPermission.ROLE.CHANGE_ROLE
    const canUnlock = hasPermission.USER.UNLOCK
    return (
        <DropdownMenu>
            <Tooltip>
                <TooltipTrigger asChild>
                    <DropdownMenuTrigger asChild>
                        <Button variant='ghost' className='h-8 w-8 p-0 rounded-full'>
                            <MoreHorizontal className='size-4' />
                        </Button>
                    </DropdownMenuTrigger>
                </TooltipTrigger>
                <TooltipContent side='left'>
                    <p>Mở thao tác</p>
                </TooltipContent>
            </Tooltip>
            <DropdownMenuContent align='end'>
                {canEdit && (
                    <DropdownMenuItem asChild>
                        <Link to={`/users?edit=${user.id}`}>Chỉnh sửa</Link>
                    </DropdownMenuItem>
                )}
                {canChangeRole && (
                    <DropdownMenuItem asChild>
                        <Link to={`/users?change-role=${user.id}`}>Thay đổi vai trò</Link>
                    </DropdownMenuItem>
                )}
                {canLock && user.status !== UserStatus.LOCKED && (
                    <DropdownMenuItem asChild>
                        <Link to={`/users?locked=${user.id}`} className='text-destructive!'>
                            Khóa
                        </Link>
                    </DropdownMenuItem>
                )}
                {canUnlock && user.status === UserStatus.LOCKED && (
                    <DropdownMenuItem asChild>
                        <Link to={`/users?unlock=${user.id}`}>Mở khóa</Link>
                    </DropdownMenuItem>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
