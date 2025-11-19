'use no memo'
import {
    type ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
    getPaginationRowModel,
    getSortedRowModel,
    getFilteredRowModel,
    type SortingState,
    type ColumnFiltersState,
    type RowSelectionState,
    type OnChangeFn
} from '@tanstack/react-table'
import { useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import type { PaginationResponse } from '@/types/permission'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    selectedRows?: RowSelectionState
    onSelectedRowsChange?: OnChangeFn<RowSelectionState>
    pagination?: PaginationResponse
}

export function TablePlot<TData, TValue>({
    columns,
    data,
    selectedRows = {},
    onSelectedRowsChange,
    pagination
}: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = useState<SortingState>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        onRowSelectionChange: onSelectedRowsChange || (() => {}),
        pageCount: pagination?.total_pages || 0,
        rowCount: pagination?.total || 0,
        state: {
            sorting,
            columnFilters,
            rowSelection: selectedRows
        }
    })

    return (
        <div>
            <div className='overflow-hidden rounded-lg border'>
                <Table>
                    <TableHeader className='bg-muted'>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id} className='font-medium px-6 py-3'>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(header.column.columnDef.header, header.getContext())}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id} className='px-6 py-3'>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className='h-24 text-center'>
                                    Không có dữ liệu.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className='flex items-center justify-end space-x-2 py-4'>
                <Button
                    variant='outline'
                    size='icon'
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    <ChevronLeftIcon className='size-4' />
                </Button>
                <Select
                    value={table.getState().pagination.pageIndex?.toString() || '1'}
                    onValueChange={(value: string) => table.setPageIndex(Number(value))}
                >
                    <SelectTrigger className='w-24'>
                        <SelectValue placeholder='Chọn trang' />
                        <SelectContent>
                            {Array.from({ length: pagination?.total_pages || 0 }, (_, index) => (
                                <SelectItem key={index} value={index.toString()}>
                                    {index + 1}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </SelectTrigger>
                </Select>
                <Button
                    variant='outline'
                    size='icon'
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    <ChevronRightIcon className='size-4' />
                </Button>
            </div>
        </div>
    )
}
