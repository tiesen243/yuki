import { cookies } from 'next/headers'

import { CardDescription, CardHeader, CardTitle } from '@yuki/ui/card'

import { env } from '@/env'
import { createMetadata } from '@/lib/metadata'
import { SignInForm } from './page.client'

export default function SignInPage() {
  const setToken = async (token: string, expiresAt: Date) => {
    'use server'
    ;(await cookies()).set('auth_token', token, {
      httpOnly: true,
      path: '/',
      secure: env.NODE_ENV === 'production',
      sameSite: 'lax',
      expires: expiresAt,
    })
  }
  return (
    <>
      <CardHeader>
        <CardTitle>Sign In</CardTitle>
        <CardDescription>Enter your credentials to access your account</CardDescription>
      </CardHeader>

      <SignInForm setToken={setToken} />
    </>
  )
}

export const metadata = createMetadata({
  title: 'Sign In',
  description: 'Sign in to your account',
})
