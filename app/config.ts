import { z } from 'zod'

const rawEnv = {
    VITE_API_URL: import.meta.env.VITE_API_URL,
    VITE_API_TIMEOUT: import.meta.env.VITE_API_TIMEOUT,
    VITE_ENABLE_API_LOGGING: import.meta.env.VITE_ENABLE_API_LOGGING,
}

const configSchema = z.object({
    VITE_API_URL: z.string().url().default('/api'),
    VITE_API_TIMEOUT: z.coerce.number().positive().default(10000),
    VITE_ENABLE_API_LOGGING: z.enum(['true', 'false']).transform((val) => val === 'true').default(false),
})

const parsedConfig = configSchema.safeParse(rawEnv)

if (!parsedConfig.success) {
    console.error('Invalid environment variables:', parsedConfig.error.message)
    throw new Error('Invalid environment variables')
}

export const config = parsedConfig.data