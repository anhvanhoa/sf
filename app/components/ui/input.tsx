import * as React from 'react'

import { cn } from '@/lib/utils'
import { cva } from 'class-variance-authority'

const inputVariants = cva(
    cn(
        'file:text-foreground placeholder:text-muted-foreground flex w-full min-w-0 rounded-md px-3 py-1 text-base transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
    ),
    {
        variants: {
            variant: {
                default: 'bg-muted py-2.5 aria-invalid:bg-red-100 dark:aria-invalid:bg-red-900/20 aria-invalid:border-destructive',
                outline: 'border-input border bg-transparent dark:bg-input/30 selection:bg-primary selection:text-primary-foreground aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive'
            }
        }
    }
)

function Input({
    className,
    type,
    variant = 'default',
    ...props
}: React.ComponentProps<'input'> & { variant?: 'default' | 'outline' }) {
    return <input type={type} data-slot='input' className={cn(inputVariants({ variant }), className)} {...props} />
}

export { Input }
