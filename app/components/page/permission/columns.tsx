import { type ColumnDef } from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { MoreHorizontal } from 'lucide-react'
import type { Permission } from '@/types/permission'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { Link } from 'react-router'
import { Checkbox } from '@/components/ui/checkbox'
import { useAuthContext } from '@/components/providers/auth-provider'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

export type PermissionTableRow = Permission & {
    id: string
}

export const columns: ColumnDef<PermissionTableRow>[] = [
    {
        id: 'select',
        header: ({ table }) => (
            <Checkbox
                checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
                onCheckedChange={(value: boolean) => table.toggleAllPageRowsSelected(!!value)}
                aria-label='Select all'
            />
        ),
        cell: ({ row }) => {
            return (
                <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(value: boolean) => row.toggleSelected(!!value)}
                    aria-label='Select row'
                />
            )
        },
        enableSorting: false,
        enableHiding: false
    },
    {
        accessorKey: 'resource',
        header: 'Tài nguyên'
    },
    {
        accessorKey: 'action',
        header: 'Hành động'
    },
    {
        accessorKey: 'description',
        header: 'Mô tả',
        cell: ({ row }) => {
            const description = row.getValue('description') as string
            return <span className='text-muted-foreground'>{description || '-'}</span>
        }
    },
    {
        accessorKey: 'isPublic',
        header: 'Công khai',
        cell: ({ row }) => {
            const isPublic = row.getValue('isPublic') as boolean
            return <Badge variant={isPublic ? 'default' : 'secondary'}>{isPublic ? 'Công khai' : 'Riêng tư'}</Badge>
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
        cell: ({ row }) => {
            const permission = row.original
            return <CellAction permission={permission} />
        }
    }
]

const CellAction = ({ permission }: { permission: PermissionTableRow }) => {
    const { hasPermission } = useAuthContext()
    const canEdit = hasPermission.PERMISSION.EDIT
    return (
        <DropdownMenu>
            <Tooltip>
                <TooltipTrigger asChild>
                    <DropdownMenuTrigger asChild>
                        <Button variant='ghost' className='h-8 w-8 p-0'>
                            <MoreHorizontal className='size-4' />
                        </Button>
                    </DropdownMenuTrigger>
                </TooltipTrigger>
                <TooltipContent side='left'>Mở thao tác</TooltipContent>
            </Tooltip>
            <DropdownMenuContent>
                {canEdit && (
                    <DropdownMenuItem asChild>
                        <Link to={`/permissions?edit=${permission.id}`}>Chỉnh sửa</Link>
                    </DropdownMenuItem>
                )}
                <DropdownMenuItem asChild>
                    <Link to={`/permissions?roles=${permission.id}`}>Vai trò được gán</Link>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

const generateColumns = (excludeColumns: string[]) => {
    return columns.filter((column) => !excludeColumns.includes(column.id as string))
}

export const permissionsColumns: ColumnDef<PermissionTableRow>[] = generateColumns(['select'])
export const assignPermissionsColumns: ColumnDef<PermissionTableRow>[] = generateColumns(['actions'])
