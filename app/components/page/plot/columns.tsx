import { type ColumnDef } from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { MoreHorizontal, Edit, Trash2, Eye } from 'lucide-react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export type Plot = {
    id: string
    name: string
    area: number
    status: 'currently_planting' | 'currently_sowing' | 'waiting'
    crop: string
    startDate: string
    expectedHarvest: string
    location: string
}

export const columns: ColumnDef<Plot>[] = [
    {
        id: 'select',
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value: boolean) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value: boolean) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: 'name',
        header: 'Tên lô'
    },
    {
        accessorKey: 'crop',
        header: 'Loại cây trồng'
    },
    {
        accessorKey: 'area',
        header: 'Diện tích (m²)',
        cell: ({ row }) => {
            const area = row.getValue('area') as number
            return `${area.toLocaleString()} m²`
        }
    },
    {
        accessorKey: 'status',
        header: 'Trạng thái',
        cell: ({ row }) => {
            const status = row.getValue('status') as string
            const statusMap = {
                currently_planting: { label: 'Đang trồng', variant: 'default' as const },
                currently_sowing: { label: 'Đang ươm', variant: 'secondary' as const },
                waiting: { label: 'Đang chờ', variant: 'outline' as const }
            }
            const statusInfo = statusMap[status as keyof typeof statusMap]
            return <Badge variant={statusInfo.variant}>{statusInfo.label}</Badge>
        }
    },
    {
        accessorKey: 'startDate',
        header: 'Ngày bắt đầu'
    },
    {
        accessorKey: 'expectedHarvest',
        header: 'Dự kiến thu hoạch'
    },
    {
        accessorKey: 'location',
        header: 'Vị trí'
    },
    {
        id: 'actions',
        enableHiding: false,
        cell: () => {
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Mở menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem className="cursor-pointer">
                            <Eye className="mr-2 h-4 w-4" />
                            Xem chi tiết
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer">
                            <Edit className="mr-2 h-4 w-4" />
                            Chỉnh sửa
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer text-destructive">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Xóa
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]
