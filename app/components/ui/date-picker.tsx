'use client'

import * as React from 'react'
import { format } from 'date-fns'
import { vi } from 'date-fns/locale'
import { CalendarIcon } from 'lucide-react'
import type { DayPickerProps } from 'react-day-picker'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Tooltip, TooltipContent, TooltipTrigger } from './tooltip'

interface DatePickerProps {
    date?: Date
    onSelect?: (date: Date | undefined) => void
    placeholder?: string
    disabled?: boolean
    className?: string
    fromDate?: Date
    toDate?: Date
    captionLayout?: DayPickerProps['captionLayout']
}

export function DatePicker({
    date,
    onSelect,
    placeholder = 'Chọn ngày',
    disabled = false,
    className,
    fromDate,
    toDate,
    captionLayout = 'dropdown'
}: DatePickerProps) {
    const [open, setOpen] = React.useState(false)

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <Tooltip>
                <PopoverTrigger asChild>
                    <TooltipTrigger asChild>
                        <Button
                            variant='secondary'
                            className={cn(
                                'w-full justify-between text-left font-normal h-auto py-2.5',
                                !date && 'text-muted-foreground',
                                className
                            )}
                            disabled={disabled}
                        >
                            {date ? format(date, 'dd/MM/yyyy', { locale: vi }) : <span>{placeholder}</span>}
                            <CalendarIcon className='h-4 w-4' />
                        </Button>
                    </TooltipTrigger>
                </PopoverTrigger>
                <TooltipContent>
                    <p>Nhấn để chọn ngày</p>
                </TooltipContent>
            </Tooltip>
            <PopoverContent className='w-auto p-0' align='start'>
                <Calendar
                    mode='single'
                    selected={date}
                    onSelect={(selectedDate) => {
                        onSelect?.(selectedDate)
                        setOpen(false)
                    }}
                    initialFocus
                    fromDate={fromDate}
                    toDate={toDate}
                    captionLayout={captionLayout}
                    locale={vi}
                />
            </PopoverContent>
        </Popover>
    )
}
