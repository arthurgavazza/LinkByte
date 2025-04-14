'use client'

import { toast as sonnerToast } from 'sonner'

export interface ToastProps {
  title?: string
  description?: string
  variant?: 'default' | 'destructive'
}

export const useToast = () => {
  const toast = ({ title, description, variant = 'default' }: ToastProps) => {
    if (variant === 'destructive') {
      return sonnerToast.error(title, {
        description,
      })
    }

    return sonnerToast.success(title, {
      description,
    })
  }

  return {
    toast,
  }
}

// Export Sonner's toast directly for convenience
export { toast } from 'sonner'
