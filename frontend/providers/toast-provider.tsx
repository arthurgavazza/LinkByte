'use client'

import { Toaster, toast } from 'sonner'

export function ToastProvider() {
  return (
    <Toaster
      position="bottom-right"
      toastOptions={{
        duration: 5000,
      }}
    />
  )
}

// Helper functions for consistent toast usage
export const toastSuccess = ({ title, description }: { title?: string; description: string }) => {
  toast.success(title || 'Success', {
    description,
  })
}

export const toastError = ({ title, description }: { title?: string; description: string }) => {
  toast.error(title || 'Error', {
    description,
  })
}

export const toastInfo = ({ title, description }: { title?: string; description: string }) => {
  toast.info(title || 'Info', {
    description,
  })
}
