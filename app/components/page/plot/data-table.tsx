
'use no memo'
import { type ColumnDef, flexRender, getCoreRowModel, useReactTable, getSortedRowModel, getFilteredRowModel, type SortingState, type ColumnFiltersState, type RowSelectionState, type OnChangeFn } from '@tanstack/react-table'
import { useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    selectedRows?: RowSelectionState
    onSelectedRowsChange?: OnChangeFn<RowSelectionState>
}

export function TablePlot<TData, TValue>({ 
    columns, 
    data, 
    selectedRows = {}, 
    onSelectedRowsChange 
}: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = useState<SortingState>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        onRowSelectionChange: onSelectedRowsChange || (() => {}),
        state: {
            sorting,
            columnFilters,
            rowSelection: selectedRows,
        },
    })

    return (
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
    )
}
