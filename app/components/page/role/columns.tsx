import { type ColumnDef } from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Settings, ShieldCheck, Trash2 } from 'lucide-react'
import type { Role } from '@/types/role'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { Link } from 'react-router'
import { useAuthContext } from '@/components/providers/auth-provider'

export type RoleTableRow = Role & {
    id: string
}

export const columns: ColumnDef<RoleTableRow>[] = [
    {
        id: 'name',
        accessorKey: 'name',
        header: 'Tên vai trò',
        cell: ({ row }) => {
            const name = row.getValue('name') as string
            const variant = (row.getValue('variant') as string | undefined) || '#3b82f6'
            return (
                <div className='inline-block relative px-2 py-0.5'>
                    <span
                        className='rounded-md absolute top-0 left-0 w-full h-full'
                        style={{ backgroundColor: variant, opacity: 0.2 }}
                    ></span>
                    <span style={{ color: variant }} className='font-semibold'>
                        {name}
                    </span>
                </div>
            )
        }
    },
    {
        id: 'description',
        accessorKey: 'description',
        header: 'Mô tả',
        cell: ({ row }) => {
            const description = row.getValue('description') as string
            return <span className='text-muted-foreground'>{description || '-'}</span>
        }
    },
    {
        id: 'variant',
        accessorKey: 'variant',
        header: 'Biến thể',
        cell: ({ row }) => {
            const variant = row.getValue('variant') as string
            return variant ? <Badge variant='secondary'>{variant}</Badge> : '-'
        }
    },
    {
        id: 'status',
        accessorKey: 'status',
        header: 'Trạng thái',
        cell: ({ row }) => {
            const status = row.getValue('status') as string
            return status ? (
                <Badge variant={status === 'active' ? 'default' : 'secondary'}>
                    {status === 'active' ? 'Hoạt động' : status === 'inactive' ? 'Không hoạt động' : status}
                </Badge>
            ) : (
                '-'
            )
        }
    },
    {
        id: 'createdAt',
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
        cell: ({ row }) => <CellAction role={row.original} />
    }
]

const CellAction = ({ role }: { role: RoleTableRow }) => {
    const { hasPermission } = useAuthContext()
    const canEdit = hasPermission.ROLE.EDIT
    const canDelete = hasPermission.ROLE.DELETE
    const canAssignPermissions = hasPermission.ROLE.ASSIGN_PERMISSIONS
    return (
        <div className='flex items-center gap-2'>
            {canEdit && (
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Link to={`/roles?edit=${role.id}`}>
                            <Button variant='ghost' className='h-8 w-8 p-0'>
                                <Settings className='size-4' />
                            </Button>
                        </Link>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Chỉnh sửa</p>
                    </TooltipContent>
                </Tooltip>
            )}
            {canDelete && (
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Link to={`/roles?delete=${role.id}`}>
                            <Button variant='ghost' className='h-8 w-8 p-0 text-destructive hover:text-destructive'>
                                <Trash2 className='size-4' />
                            </Button>
                        </Link>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Xóa</p>
                    </TooltipContent>
                </Tooltip>
            )}
            {canAssignPermissions && (
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Link to={`/roles/assign-permissions/${role.id}`}>
                            <Button variant='ghost' className='h-8 w-8 p-0'>
                                <ShieldCheck className='size-4' />
                            </Button>
                        </Link>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Gán quyền</p>
                    </TooltipContent>
                </Tooltip>
            )}
        </div>
    )
}
