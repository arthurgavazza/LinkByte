'use client'

import { useRouter } from 'next/navigation'
import { SignupForm } from './signup-form'

export function SignupFormWrapper() {
  const router = useRouter()

  const handleSuccess = () => {
    router.push('/dashboard')
  }

  return <SignupForm onSuccess={handleSuccess} />
}
