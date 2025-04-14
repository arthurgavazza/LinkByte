'use client'

import { AxiosError } from 'axios'
import { toast } from 'sonner'

// Type for error response from the API
export interface ErrorResponse {
  detail?: string
  message?: string
  errors?: Record<string, string[]>
  status_code?: number
}

// Check if an error is an API error response
export function isApiError(error: unknown): error is AxiosError<ErrorResponse> {
  return error instanceof Error && 'isAxiosError' in error && (error as any).isAxiosError === true
}

// Check if response is an error from server action
export function isActionError<T extends { error?: string }>(
  result: T | { error: string }
): result is { error: string } {
  return 'error' in result && typeof result.error === 'string'
}

// Extract a user-friendly error message from any error
export function getErrorMessage(error: unknown): string {
  if (isApiError(error)) {
    const data = error.response?.data

    if (data?.detail) {
      return data.detail
    }

    if (data?.message) {
      return data.message
    }

    if (data?.errors) {
      // Join all error messages
      return Object.entries(data.errors)
        .map(([field, messages]) => `${field}: ${messages.join(', ')}`)
        .join('; ')
    }

    if (error.message) {
      return error.message
    }
  }

  if (error instanceof Error) {
    return error.message
  }

  return 'An unexpected error occurred'
}

// Show a toast with an error message
export function showErrorToast(error: unknown, title = 'Error'): void {
  const message = getErrorMessage(error)

  toast.error(title, {
    description: message,
  })
}

// Show a success toast
export function showSuccessToast(message: string, title = 'Success'): void {
  toast.success(title, {
    description: message,
  })
}
