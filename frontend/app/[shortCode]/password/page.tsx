'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'

// Define the password schema
const passwordSchema = z.object({
  password: z.string().min(1, 'Password is required')
})

type PasswordFormValues = z.infer<typeof passwordSchema>

export default function PasswordProtectedPage({ params }: { params: { shortCode: string } }) {
  const { shortCode } = params
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      password: ''
    }
  })

  const onSubmit = async (data: PasswordFormValues) => {
    setIsSubmitting(true)

    try {
      // Use direct fetch to verify the password
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/links/${shortCode}/verify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          password: data.password
        }),
        credentials: 'include' // Important for cookies
      })

      if (!response.ok) {
        if (response.status === 401) {
          toast.error('Incorrect password', {
            description: 'The password you entered is incorrect. Please try again.'
          })
          return
        }
        throw new Error(`Error verifying password: ${response.statusText}`)
      }

      const result = await response.json()
      
      // Redirect to the original URL
      window.location.href = result.original_url
    } catch (error: any) {
      toast.error('Error accessing link', {
        description: 'An error occurred while trying to access this link. Please try again.'
      })
      console.error('Error verifying password:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6 rounded-lg border bg-background p-6 shadow-md">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-bold">Password Protected Link</h1>
          <p className="text-muted-foreground">
            This link is password protected. Please enter the password to continue.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter password"
              {...register('password')}
              className={errors.password ? 'border-destructive' : ''}
            />
            {errors.password && (
              <p className="text-sm text-destructive">{errors.password.message}</p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Verifying...' : 'Access Link'}
          </Button>
        </form>
        
        <div className="text-center text-sm text-muted-foreground">
          <Link href="/" className="underline hover:text-foreground">
            Return to home page
          </Link>
        </div>
      </div>
    </div>
  )
} 