import { cookies } from 'next/headers'

import { CardDescription, CardHeader, CardTitle } from '@yuki/ui/card'

import { env } from '@/env'
import { createMetadata } from '@/lib/metadata'
import { SignInForm } from '../_components/sign-in-form'

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
        <CardDescription>Sign in to your account</CardDescription>
      </CardHeader>

      <SignInForm setToken={setToken} />
    </>
  )
}

export const metadata = createMetadata({
  title: 'Sign In',
  description: 'Sign in to your account',
})
