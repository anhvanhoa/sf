import { Button } from '@/components/ui/button'
import { Card, CardTitle } from '@/components/ui/card'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Filter, Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { MultiSelect } from '@/components/ui/multi-select'
import { useState } from 'react'
const statuses = [
    {
        value: 'all',
        label: 'Tất cả'
    },
    {
        value: 'active',
        label: 'Đang trồng'
    },
    {
        value: 'active',
        label: 'Đang ươm'
    },
    {
        value: 'active',
        label: 'Đang chờ'
    }
]
const Plots = () => {
    const [selectedStatuses, setSelectedStatuses] = useState<string[]>([])
    return (
        <div>
            <Card className='border-none shadow-none'>
                <Accordion type='single' collapsible>
                    <AccordionItem value='item'>
                        <div className='flex justify-between items-center px-4 border-b pb-6'>
                            <div>
                                <CardTitle>Danh sách lô trồng</CardTitle>
                                <p className='text-sm text-muted-foreground pt-0.5'>
                                    Hiện đang có 10 lô trồng, 6 lô đang trồng, 3 lô ươm và 1 lô đang chờ.
                                </p>
                            </div>
                            <div className='flex items-center gap-x-2'>
                                <Button className='rounded-full'>Tạo mới</Button>
                                <AccordionTrigger asChild>
                                    <Button
                                        className='rounded-full justify-center items-center p-0'
                                        size='icon'
                                        variant='secondary'
                                    >
                                        <Filter className='size-4' />
                                    </Button>
                                </AccordionTrigger>
                            </div>
                        </div>
                        <AccordionContent>
                            <div className='px-4 py-4 border-b flex items-center justify-end gap-x-2'>
                                <div className='flex items-center bg-muted rounded-full p-1'>
                                    <Input placeholder='Tìm kiếm lô trồng' className='p-1.5 px-4' />
                                    <Button
                                        className='rounded-full bg-background hover:bg-background/50'
                                        size='icon'
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
                                    classTrigger='w-40 py-2.5 rounded-full'
                                    variant='secondary'
                                />
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </Card>
        </div>
    )
}

export default Plots
