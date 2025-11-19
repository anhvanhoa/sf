import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import type { UseQueryOptions, UseMutationOptions } from '@tanstack/react-query'

// Custom hook for API calls with automatic error handling
export function useApiQuery<TData, TError = Error>(
  queryKey: readonly unknown[],
  queryFn: () => Promise<TData>,
  options?: Omit<UseQueryOptions<TData, TError>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey,
    queryFn,
    ...options,
  })
}

// Custom hook for API mutations with automatic error handling
export function useApiMutation<TData, TVariables, TError = Error>(
  mutationFn: (variables: TVariables) => Promise<TData>,
  options?: UseMutationOptions<TData, TError, TVariables>
) {
  return useMutation({
    mutationFn,
    ...options,
  })
}

// Hook for optimistic updates
export function useOptimisticMutation<TData, TVariables, TError = Error>(
  mutationFn: (variables: TVariables) => Promise<TData>,
  options: {
    queryKey: readonly unknown[]
    optimisticUpdate: (oldData: TData | undefined, variables: TVariables) => TData
    rollbackUpdate: (oldData: TData | undefined, variables: TVariables) => TData
    onError?: (error: TError, variables: TVariables, context: { previousData: TData | undefined } | undefined) => void
    onSettled?: (data: TData | undefined, error: TError | null, variables: TVariables, context: { previousData: TData | undefined } | undefined) => void
  } & Omit<UseMutationOptions<TData, TError, TVariables>, 'mutationFn' | 'onMutate' | 'onError' | 'onSettled'>
) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn,
    onMutate: async (variables: TVariables): Promise<{ previousData: TData | undefined }> => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: options.queryKey })

      // Snapshot the previous value
      const previousData = queryClient.getQueryData<TData>(options.queryKey)

      // Optimistically update to the new value
      queryClient.setQueryData(options.queryKey, (old: TData | undefined) =>
        options.optimisticUpdate(old, variables)
      )

      // Return a context object with the snapshotted value
      return { previousData }
    },
    onError: (err: TError, variables: TVariables, context: { previousData: TData | undefined } | undefined) => {
      // If the mutation fails, use the context returned from onMutate to roll back
      if (context?.previousData !== undefined) {
        queryClient.setQueryData(options.queryKey, context.previousData)
      }
      options.onError?.(err, variables, context)
    },
    onSettled: (data: TData | undefined, error: TError | null, variables: TVariables, context: { previousData: TData | undefined } | undefined) => {
      // Always refetch after error or success
      queryClient.invalidateQueries({ queryKey: options.queryKey })
      options.onSettled?.(data, error, variables, context)
    },
    ...options,
  })
}
