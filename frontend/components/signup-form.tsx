'use client'

import type React from 'react'

import { useState } from 'react'
import { Eye, EyeOff, Loader2 } from 'lucide-react'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
import { useAuth } from '@/providers/auth-provider'

// Define the Zod schema for form validation
const signupSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Email is invalid'),
  username: z
    .string()
    .min(1, 'Username is required')
    .min(3, 'Username must be at least 3 characters')
    .regex(
      /^[a-zA-Z0-9_-]+$/,
      'Username can only contain letters, numbers, underscores and hyphens'
    ),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(8, 'Password must be at least 8 characters')
    .regex(
      /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Password must contain at least one uppercase letter, one lowercase letter, and one number'
    ),
})

// Infer the type from the schema
type SignupFormValues = z.infer<typeof signupSchema>

// Internal component that doesn't directly use the router
interface SignupFormProps {
  onSuccess?: () => void
}

export function SignupForm({ onSuccess }: SignupFormProps) {
  const [showPassword, setShowPassword] = useState(false)
  const { register: registerUser } = useAuth()

  // Initialize React Hook Form with Zod validation
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: '',
      username: '',
      password: '',
    },
  })

  // Form submission handler
  const onSubmit: SubmitHandler<SignupFormValues> = async (data) => {
    try {
      await registerUser(data.email, data.username, data.password)
      toast.success('Account created!', {
        description: "You've successfully signed up for LinkByte.",
      })
      onSuccess?.()
    } catch (error) {
      if (error instanceof Error) {
        toast.error('Registration failed', {
          description: error.message || 'Please try again.',
        })
      } else {
        toast.error('Something went wrong', {
          description: 'Your sign up request failed. Please try again.',
        })
      }
    }
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-2">
        <Label htmlFor="email">Email address</Label>
        <Input
          id="email"
          type="email"
          autoComplete="email"
          {...register('email')}
          className={errors.email ? 'border-destructive' : ''}
          placeholder="you@example.com"
        />
        {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="username">Username</Label>
        <Input
          id="username"
          type="text"
          autoComplete="username"
          {...register('username')}
          className={errors.username ? 'border-destructive' : ''}
          placeholder="johndoe"
        />
        {errors.username && <p className="text-sm text-destructive">{errors.username.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? 'text' : 'password'}
            autoComplete="new-password"
            {...register('password')}
            className={errors.password ? 'border-destructive pr-10' : 'pr-10'}
            placeholder="••••••••"
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4 text-muted-foreground" />
            ) : (
              <Eye className="h-4 w-4 text-muted-foreground" />
            )}
            <span className="sr-only">{showPassword ? 'Hide password' : 'Show password'}</span>
          </Button>
        </div>
        {errors.password && <p className="text-sm text-destructive">{errors.password.message}</p>}
        <p className="text-sm text-muted-foreground">
          Must be at least 8 characters with a number and uppercase letter
        </p>
      </div>

      <div>
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creating account...
            </>
          ) : (
            'Sign up'
          )}
        </Button>
      </div>

      <div className="text-center text-sm text-muted-foreground">
        By signing up, you agree to our{' '}
        <a href="/terms" className="font-medium text-primary hover:text-primary/90">
          Terms of Service
        </a>{' '}
        and{' '}
        <a href="/privacy" className="font-medium text-primary hover:text-primary/90">
          Privacy Policy
        </a>
        .
      </div>
    </form>
  )
}
