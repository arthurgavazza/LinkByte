'use client'

import type React from 'react'

import { useState } from 'react'
import Link from 'next/link'
import { Eye, EyeOff, Loader2 } from 'lucide-react'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { useAuth } from '@/providers/auth-provider'

// Define the Zod schema for form validation
const loginSchema = z.object({
  username: z.string().min(1, 'Username or email is required'),
  password: z.string().min(1, 'Password is required'),
  rememberMe: z.boolean().default(true),
})

// Infer the type from the schema
type LoginFormValues = z.infer<typeof loginSchema>

interface LoginFormProps {
  onSuccess?: () => void
}

export function LoginForm({ onSuccess }: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [generalError, setGeneralError] = useState('')
  const { login } = useAuth()

  // Initialize React Hook Form with Zod validation
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: '',
      password: '',
      rememberMe: true,
    },
  })

  // Form submission handler
  const onSubmit: SubmitHandler<LoginFormValues> = async (data) => {
    // Clear any previous general errors
    setGeneralError('')

    try {
      console.log('LoginForm: Attempting to login with', data.username);
      await login(data.username, data.password);
      // The redirect will be handled by the auth provider and router guard
      // No need to call onSuccess here as the navigation will be automatic
    } catch (error) {
      console.error('LoginForm: Login failed', error);
      setGeneralError('Invalid username/email or password. Please try again.');
    }
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      {generalError && (
        <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
          {generalError}
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="username">Username or email</Label>
        <Input
          id="username"
          type="text"
          autoComplete="username"
          {...register('username')}
          className={errors.username ? 'border-destructive' : ''}
        />
        {errors.username && <p className="text-sm text-destructive">{errors.username.message}</p>}
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="password">Password</Label>
          <Link
            href="/forgot-password"
            className="text-sm font-medium text-primary hover:text-primary/90"
          >
            Forgot password?
          </Link>
        </div>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? 'text' : 'password'}
            autoComplete="current-password"
            {...register('password')}
            className={errors.password ? 'border-destructive pr-10' : 'pr-10'}
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
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="rememberMe"
          checked={watch('rememberMe')}
          onCheckedChange={(checked) => setValue('rememberMe', checked === true)}
        />
        <Label
          htmlFor="rememberMe"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Remember me
        </Label>
      </div>

      <div>
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Signing in...
            </>
          ) : (
            'Sign in'
          )}
        </Button>
      </div>
    </form>
  )
}
