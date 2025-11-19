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
import { useState, useEffect, useRef } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import type { PaginationResponse } from '@/types/common'
import { Skeleton } from '@/components/ui/skeleton'

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    isLoading?: boolean
    selectedRows?: RowSelectionState
    onSelectedRowsChange?: OnChangeFn<RowSelectionState>
    pagination?: PaginationResponse
    onPageChange?: (page: number) => void
    onNextPage?: () => void
    onPreviousPage?: () => void
    getRowId?: (row: TData) => string
}

export function DataTable<TData, TValue>({
    columns = [],
    data = [],
    isLoading = false,
    selectedRows = {},
    onSelectedRowsChange,
    pagination,
    onPageChange,
    onNextPage,
    onPreviousPage,
    getRowId
}: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = useState<SortingState>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const prevPageRef = useRef<number | undefined>(undefined)
    const hasServerPagination = Boolean(pagination)
    const pageSize = pagination?.pageSize || 10
    const pageIndex = pagination?.page !== undefined ? pagination.page - 1 : 0
    const table = useReactTable({
        data,
        columns,
        getRowId: getRowId,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        onRowSelectionChange: onSelectedRowsChange || (() => {}),
        manualPagination: hasServerPagination,
        pageCount: hasServerPagination ? pagination?.totalPages : undefined,
        rowCount: hasServerPagination ? pagination?.total : undefined,
        state: {
            sorting,
            columnFilters,
            rowSelection: selectedRows,
            pagination: {
                pageIndex: pageIndex,
                pageSize: pageSize
            }
        }
    })

    // Sync table pageIndex with server pagination - only when page actually changes
    useEffect(() => {
        if (hasServerPagination && pagination?.page !== undefined && pagination.page !== prevPageRef.current) {
            const serverPageIndex = pagination.page - 1
            const currentIndex = table.getState().pagination.pageIndex
            if (currentIndex !== serverPageIndex) {
                table.setPageIndex(serverPageIndex)
            }
            prevPageRef.current = pagination.page
        }
    }, [hasServerPagination, pagination?.page, table])

    // Calculate derived values directly (no memo needed per directive)
    const currentPageIndex =
        hasServerPagination && pagination?.page !== undefined
            ? pagination.page - 1
            : table.getState().pagination.pageIndex
    const totalPages = hasServerPagination ? pagination?.totalPages || 0 : table.getPageCount()
    const totalRows = table.getRowModel().rows.length
    const canGoPrevious = hasServerPagination ? currentPageIndex > 0 : table.getCanPreviousPage()
    const canGoNext = hasServerPagination ? currentPageIndex < totalPages - 1 && totalRows > 0 : table.getCanNextPage()

    const handlePageChange = (pageIndex: number) => {
        table.setPageIndex(pageIndex)
        if (hasServerPagination) {
            const serverPage = pageIndex + 1
            onPageChange?.(serverPage)
        }
    }

    const handleNextPage = () => {
        const nextPageIndex = currentPageIndex + 1
        table.setPageIndex(nextPageIndex)
        if (hasServerPagination) {
            onNextPage?.()
        }
    }

    const handlePreviousPage = () => {
        const prevPageIndex = Math.max(0, currentPageIndex - 1)
        table.setPageIndex(prevPageIndex)
        if (hasServerPagination) {
            onPreviousPage?.()
        }
    }

    return (
        <div>
            <div className='overflow-hidden rounded-lg border'>
                <Table>
                    <TableHeader className='bg-muted'>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id} className='font-medium px-6 py-3'>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(header.column.columnDef.header, header.getContext())}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {isLoading && Array.from({ length: pageSize }).map((_, index) => (
                            <TableRow key={index}>
                                {Array.from({ length: columns.length }).map((_, cellIndex) => (
                                    <TableCell key={cellIndex} className='px-6 py-3'>
                                        <Skeleton className='h-4 w-full' />
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                        {totalRows > 0 &&
                            table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id} className='px-6 py-3'>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        {!isLoading && totalRows === 0 && (
                            <TableRow>
                                <TableCell colSpan={columns.length} className='h-24 text-center'>
                                    Không có dữ liệu.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            {totalPages > 1 && (
                <div className='flex items-center justify-center space-x-2 py-4'>
                    <Button variant='outline' size='icon' onClick={handlePreviousPage} disabled={!canGoPrevious}>
                        <ChevronLeftIcon className='size-4' />
                    </Button>
                    <Select
                        value={currentPageIndex.toString()}
                        onValueChange={(value: string) => handlePageChange(Number(value))}
                    >
                        <SelectTrigger className='w-24'>
                            <SelectValue placeholder='Chọn trang' />
                        </SelectTrigger>
                        <SelectContent>
                            {Array.from({ length: totalPages }, (_, index) => (
                                <SelectItem key={index} value={index.toString()}>
                                    {index + 1} / {totalPages}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <Button variant='outline' size='icon' onClick={handleNextPage} disabled={!canGoNext}>
                        <ChevronRightIcon className='size-4' />
                    </Button>
                </div>
            )}
        </div>
    )
}
