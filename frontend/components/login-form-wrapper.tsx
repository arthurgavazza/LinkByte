'use client'

import { LoginForm } from './login-form'

export function LoginFormWrapper() {
  // No need for manual navigation, the auth provider will handle redirects
  return <LoginForm />
}
