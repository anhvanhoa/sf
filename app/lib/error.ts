import type { DetailsRpcStatus } from '@/types/common'
import type { FieldValues, Path, UseFormReturn } from 'react-hook-form'
import { replace } from 'react-router'

export class ApiError extends Error {
    constructor(
        message: string,
        public status: number,
        public details?: Array<DetailsRpcStatus>
    ) {
        super(message)
        this.name = 'ApiError'
        this.details = details
    }
}

export const handleLoaderError = (error: unknown, redirectTo: string) => {
    if (error instanceof ApiError) {
        if (error.status === 403) {
            throw replace(`403?redirect=${redirectTo}`)
        }
        return null
    }
    return null
}

export const isApiError = (error: unknown): error is ApiError => {
    return error instanceof ApiError
}

export const setFormErrors = <T extends FieldValues>(form: UseFormReturn<T>, error?: Error, cb?: (error: Error) => void) => {
    if (!error) return
    if (!isApiError(error) || !error.details || !error.details.length) {
        if (cb) {
            cb(error)
        }
        return
    }
    error.details.forEach((detail) => {
        detail.violations.forEach((violation) => {
            const firtElement = violation.field.elements[0] as { fieldName: Path<T> }
            if (firtElement) {
                form.setError(firtElement.fieldName as Path<T>, { message: violation.message })
            }
        })
    })
}
