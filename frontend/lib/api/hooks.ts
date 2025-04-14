'use client'

import { toast } from 'sonner'
import { useProgress } from '@/providers/progress-provider'
import { UseMutationOptions, UseMutationResult, useMutation } from '@tanstack/react-query'

// Generic wrapper for API mutations with loading states and error handling
export function useApiMutation<TData, TError, TVariables, TContext>(
  mutationFn: (variables: TVariables) => Promise<TData>,
  options?: Omit<UseMutationOptions<TData, TError, TVariables, TContext>, 'mutationFn'>
): UseMutationResult<TData, TError, TVariables, TContext> {
  const { setIsLoading } = useProgress()

  return useMutation<TData, TError, TVariables, TContext>({
    mutationFn,
    onMutate: variables => {
      setIsLoading(true)
      return options?.onMutate?.(variables)
    },
    onSuccess: (data, variables, context) => {
      setIsLoading(false)
      options?.onSuccess?.(data, variables, context)
    },
    onError: (error, variables, context) => {
      setIsLoading(false)

      // Display error toast if not handled by the caller
      if (!options?.onError) {
        toast.error('Error', {
          description: (error as any)?.message || 'Something went wrong',
        })
      }

      options?.onError?.(error, variables, context)
    },
    onSettled: (data, error, variables, context) => {
      setIsLoading(false)
      options?.onSettled?.(data, error, variables, context)
    },
    ...options,
  })
}
