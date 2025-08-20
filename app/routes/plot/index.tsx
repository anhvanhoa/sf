import { Button } from '@/components/ui/button'
import { Card, CardTitle } from '@/components/ui/card'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Filter, Search, Trash2 } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { MultiSelect } from '@/components/ui/multi-select'
import { useState } from 'react'
import { columns, type Plot } from '@/components/page/plot/columns'
import { TablePlot } from '@/components/page/plot/data-table'
import AddPlot from '@/components/page/plot/add-plot'

const statuses = [
    {
        value: 'currently_planting',
        label: 'Đang trồng'
    },
    {
        value: 'currently_sowing',
        label: 'Đang ươm'
    },
    {
        value: 'waiting',
        label: 'Đang chờ'
    }
]

const data: Plot[] = [
    {
        id: '1',
        name: 'Lô A1',
        crop: 'Lúa',
        area: 2500,
        status: 'currently_planting',
        startDate: '15/11/2024',
        expectedHarvest: '15/02/2025',
        location: 'Khu vực 1'
    },
    {
        id: '2',
        name: 'Lô A2',
        crop: 'Ngô',
        area: 1800,
        status: 'currently_planting',
        startDate: '20/11/2024',
        expectedHarvest: '20/02/2025',
        location: 'Khu vực 1'
    },
    {
        id: '3',
        name: 'Lô B1',
        crop: 'Rau cải',
        area: 800,
        status: 'currently_sowing',
        startDate: '10/11/2024',
        expectedHarvest: '10/12/2024',
        location: 'Khu vực 2'
    },
    {
        id: '4',
        name: 'Lô B2',
        crop: 'Cà chua',
        area: 1200,
        status: 'currently_sowing',
        startDate: '12/11/2024',
        expectedHarvest: '12/01/2025',
        location: 'Khu vực 2'
    },
    {
        id: '5',
        name: 'Lô C1',
        crop: 'Dưa hấu',
        area: 1500,
        status: 'waiting',
        startDate: '01/12/2024',
        expectedHarvest: '01/03/2025',
        location: 'Khu vực 3'
    },
    {
        id: '6',
        name: 'Lô C2',
        crop: 'Khoai tây',
        area: 2000,
        status: 'currently_planting',
        startDate: '18/11/2024',
        expectedHarvest: '18/02/2025',
        location: 'Khu vực 3'
    },
    {
        id: '7',
        name: 'Lô D1',
        crop: 'Ớt',
        area: 600,
        status: 'currently_sowing',
        startDate: '08/11/2024',
        expectedHarvest: '08/12/2024',
        location: 'Khu vực 4'
    },
    {
        id: '8',
        name: 'Lô D2',
        crop: 'Hành lá',
        area: 400,
        status: 'currently_planting',
        startDate: '22/11/2024',
        expectedHarvest: '22/12/2024',
        location: 'Khu vực 4'
    },
    {
        id: '9',
        name: 'Lô E1',
        crop: 'Đậu xanh',
        area: 1000,
        status: 'waiting',
        startDate: '05/12/2024',
        expectedHarvest: '05/02/2025',
        location: 'Khu vực 5'
    },
    {
        id: '10',
        name: 'Lô E2',
        crop: 'Bắp cải',
        area: 900,
        status: 'currently_planting',
        startDate: '25/11/2024',
        expectedHarvest: '25/01/2025',
        location: 'Khu vực 5'
    }
]

const Plots = () => {
    const [selectedStatuses, setSelectedStatuses] = useState<string[]>([])
    const [selectedRows, setSelectedRows] = useState<Record<string, boolean>>({})

    // Filter data based on selected statuses
    const filteredData =
        selectedStatuses.length > 0 ? data.filter((plot) => selectedStatuses.includes(plot.status)) : data

    // Count plots by status
    const currentlyPlanting = data.filter((plot) => plot.status === 'currently_planting').length
    const currentlySowing = data.filter((plot) => plot.status === 'currently_sowing').length
    const waiting = data.filter((plot) => plot.status === 'waiting').length

    // Count selected rows
    const selectedCount = Object.keys(selectedRows).length

    const handleBulkDelete = () => {
        if (selectedCount > 0) {
            // Here you would typically show a confirmation dialog
            console.log(
                'Deleting selected plots:',
                Object.keys(selectedRows).filter((key) => selectedRows[key])
            )
        }
    }

    return (
        <div>
            <Card className='border-none shadow-none gap-y-0'>
                <Accordion type='single' collapsible defaultValue='item'>
                    <AccordionItem value='item'>
                        <div className='flex justify-between items-center px-4 border-b pb-6'>
                            <div>
                                <CardTitle>Danh sách lô trồng</CardTitle>
                                <p className='text-sm text-muted-foreground pt-0.5'>
                                    Hiện đang có {data.length} lô trồng, {currentlyPlanting} lô đang trồng,{' '}
                                    {currentlySowing} lô ươm và {waiting} lô đang chờ.
                                </p>
                            </div>
                            <div className='flex items-center gap-x-2'>
                                <AddPlot />
                                <AccordionTrigger asChild>
                                    <Button
                                        className='rounded-full gap-x-1 justify-center items-center p-0 [&[data-state=open]]:bg-primary [&[data-state=open]]:text-primary-foreground'
                                        variant='secondary'
                                    >
                                        <Filter className='size-4' />
                                        Lọc
                                    </Button>
                                </AccordionTrigger>
                            </div>
                        </div>
                        <AccordionContent className='pb-0'>
                            <div className='px-4 py-2 border-b flex items-center justify-between gap-x-2'>
                                <span className='text-sm text-muted-foreground'>Đã chọn {selectedCount} lô trồng</span>
                                <div className='flex items-center gap-x-2'>
                                    <div className='flex items-center bg-muted rounded-full p-1'>
                                        <Input placeholder='Tìm kiếm lô trồng' className='py-1 px-2.5' />
                                        <Button
                                            className='rounded-full bg-background hover:bg-background/50 h-auto px-1.5! py-1.5'
                                            variant='secondary'
                                        >
                                            <Search className='size-4' />
                                        </Button>
                                    </div>
                                    <MultiSelect
                                        options={statuses}
                                        value={selectedStatuses}
                                        onChange={setSelectedStatuses}
                                        textSearch='Tìm kiếm...'
                                        placeholder='Chọn trạng thái'
                                        className='w-40'
                                        classTrigger='w-40 rounded-full'
                                        variant='secondary'
                                    />
                                    <Button
                                        variant='destructive'
                                        disabled={selectedCount === 0}
                                        onClick={handleBulkDelete}
                                        className='rounded-full'
                                    >
                                        <Trash2 className='size-4' />
                                        Xóa hàng loạt
                                    </Button>
                                </div>
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
                <div className='px-4 pt-4'>
                    <TablePlot
                        columns={columns}
                        data={filteredData}
                        selectedRows={selectedRows}
                        onSelectedRowsChange={setSelectedRows}
                    />
                </div>
            </Card>
        </div>
    )
}

export default Plots
