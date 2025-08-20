'use client'

import * as React from 'react'
import { Check, ChevronDown } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

type MultiSelectProps = {
    options: {
        value: string
        label: string
    }[]
    placeholder?: string
    notFoundText?: string
    className?: string
    classTrigger?: string
    value?: string[]
    onChange?: (value: string[]) => void
    textSearch?: string
    variant?: 'secondary' | 'default'
    maxLength?: number
}

export function MultiSelect({
    options,
    placeholder = 'Select...',
    notFoundText = 'No item found.',
    className,
    classTrigger,
    value,
    onChange,
    textSearch = 'Search...',
    variant = 'default',
    maxLength = 14
}: MultiSelectProps) {
    const [open, setOpen] = React.useState(false)
    const valueSelected = options.filter((item) => value?.includes(item.value))
    const onSelect = (selectedValue: string) => {
        if (!onChange) return
        const currentValues = value || []
        const isSelected = currentValues.includes(selectedValue)
        onChange(isSelected ? currentValues.filter((v) => v !== selectedValue) : [...currentValues, selectedValue])
    }
    const text = valueSelected.map((item) => item.label).join(', ')
    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant={variant}
                    role='combobox'
                    aria-expanded={open}
                    className={cn('justify-between h-auto', classTrigger)}
                >
                    {valueSelected.length > 0 && (
                        <span className='line-clamp-1'>
                            {text.slice(0, maxLength)}
                            {text.length > maxLength && '...'}
                        </span>
                    )}
                    {!valueSelected.length && <span className='text-muted-foreground font-normal'>{placeholder}</span>}
                    <ChevronDown className='opacity-50' />
                </Button>
            </PopoverTrigger>
            <PopoverContent className={cn('p-0 rounded-xl', className)} side='bottom' align='end'>
                <Command className='rounded-xl'>
                    <CommandInput placeholder={textSearch} className='h-9' />
                    <CommandList>
                        <CommandEmpty className='text-muted-foreground font-normal text-sm py-3 text-center'>
                            {notFoundText}
                        </CommandEmpty>
                        <CommandGroup>
                            {options.map((item) => (
                                <CommandItem
                                    key={item.value}
                                    value={item.value}
                                    onSelect={onSelect}
                                    className='cursor-pointer'
                                >
                                    {item.label}
                                    <Check
                                        className={cn(
                                            'ml-auto',
                                            value?.includes(item.value) ? 'opacity-100' : 'opacity-0'
                                        )}
                                    />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
