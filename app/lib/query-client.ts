import { QueryClient } from '@tanstack/react-query'

// Create a client
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // With SSR, we usually want to set some default staleTime
      // above 0 to avoid refetching immediately on the client
      staleTime: 60 * 1000, // 1 minute
      retry: (failureCount, error) => {
        // Don't retry on 4xx errors
        if (error instanceof Error && 'status' in error) {
          const status = error.status as number
          if (status >= 400 && status < 500) {
            return false
          }
        }
        // Retry up to 3 times for other errors
        return failureCount < 3
      },
    },
    mutations: {
      retry: false, // Don't retry mutations by default
    },
  },
})

// {"pagination": {"page": 1, "page_size": 10, "search": "test"}} -> {"pagination.page":1,"pagination.page_size":10,"pagination.search":"test"}
export function convertParamsToQueryString(params: Record<string, unknown> | undefined) {
  if (!params) return {}
  const flatten = (obj: Record<string, unknown>, prefix = ''): Record<string, unknown> => {
    const result: Record<string, unknown> = {}
    for (const [key, value] of Object.entries(obj)) {
      const fullKey = prefix ? `${prefix}.${key}` : key
      if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
        Object.assign(result, flatten(value as Record<string, unknown>, fullKey))
      } else {
        result[fullKey] = value
      }
    }
    return result
  }
  
  return flatten(params)
}
