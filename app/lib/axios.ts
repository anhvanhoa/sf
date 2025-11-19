import axios from 'axios'
import { config as appConfig } from '@/config'
import type { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { ApiError } from './error'
import { convertParamsToQueryString } from './query-client'
import type { DetailsRpcStatus } from '@/types/common'

// Create axios instance with default configuration
export const apiClient: AxiosInstance = axios.create({
    baseURL: appConfig.VITE_API_URL || '/api',
    timeout: appConfig.VITE_API_TIMEOUT, // milliseconds
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
})

// Request interceptor
apiClient.interceptors.request.use(
    (config) => {
        // Log request in development
        if (appConfig.VITE_ENABLE_API_LOGGING) {
            console.log(`🚀 ${config.method?.toUpperCase()} ${config.url}`, config.data)
        }

        return config
    },
    (error) => {
        console.error('Request error:', error)
        return Promise.reject(error)
    }
)

// Response interceptor
apiClient.interceptors.response.use(
    (response: AxiosResponse) => {
        // Log response in development
        if (appConfig.VITE_ENABLE_API_LOGGING) {
            console.log(`✅ ${response.config.method?.toUpperCase()} ${response.config.url}`, response.data)
        }

        return response
    },
    (error) => {
        if (error.response) {
            const { status, data } = error.response
            if (appConfig.VITE_ENABLE_API_LOGGING) {
                console.error(`❌ ${error.config?.method?.toUpperCase()} ${error.config?.url}`, {
                    status,
                    data
                })
            }
        } else if (error.request) {
            console.error('Network error:', error.message)
        } else {
            console.error('Error:', error.message)
        }
        return Promise.reject(error)
    }
)

// Generic API request function using axios
export async function apiRequest<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<T> {
    try {
        const response = await apiClient.request<T>({
            url,
            ...config,
            params: convertParamsToQueryString(config?.params),
        })
        return response.data
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const axiosError = error as unknown as AxiosError<{ message?: string, details?: Array<DetailsRpcStatus> }>
            const message = axiosError.response?.data.message || axiosError.message || 'API request failed'
            const messageFirtUpper = message.charAt(0).toUpperCase() + message.slice(1)
            const status = axiosError.response?.status || 500
            throw new ApiError(messageFirtUpper, status, axiosError.response?.data.details)
        }
        throw new ApiError(error instanceof Error ? error.message : 'Unknown error', 500 as const)
    }
}
// Convenience methods
export const api = {
    get: <T>(url: string, config?: AxiosRequestConfig) => apiRequest<T>(url, { ...config, method: 'GET' }),

    post: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
        apiRequest<T>(url, { ...config, method: 'POST', data }),

    put: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
        apiRequest<T>(url, { ...config, method: 'PUT', data }),

    patch: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
        apiRequest<T>(url, { ...config, method: 'PATCH', data }),

    delete: <T>(url: string, config?: AxiosRequestConfig) => apiRequest<T>(url, { ...config, method: 'DELETE' })
}

export default apiClient
