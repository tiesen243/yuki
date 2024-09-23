import type { NextPage } from 'next'
import Link from 'next/link'
import { redirect } from 'next/navigation'

import { auth } from '@yuki/auth'
import { Button } from '@yuki/ui/button'
import { CardDescription, CardFooter, CardHeader, CardTitle } from '@yuki/ui/card'
import { DiscordIcon } from '@yuki/ui/icons'

import type { Props } from '@/app/(auth)/_components/login-form'
import { LoginForm } from '@/app/(auth)/_components/login-form'
import { seo } from '@/lib/seo'
import { getBaseUrl } from '@/lib/utils'

const Page: NextPage<Props> = async (props) => {
  const session = await auth()
  if (session) redirect(props.searchParams.redirect ?? '/')

  return (
    <>
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>Enter your email below to login to your account</CardDescription>
      </CardHeader>

      <LoginForm {...props} setCookies={setCookies} />

      <CardFooter className="flex-col">
        <Button variant="outline" className="w-full" asChild>
          <Link href={`/api/auth/discord?redirect=${props.searchParams.redirect ?? '/'}`}>
            <DiscordIcon className="mr-4 size-6" /> Login with Discord
          </Link>
        </Button>
      </CardFooter>
    </>
  )
}

export default Page

export const metadata = seo({
  title: 'Sign in',
  description: 'Sign in to your account',
  url: '/sign-in',
})

const setCookies = async (cookie: { name: string; value: string; attributes: object }) => {
  'use server'
  const { cookies } = await import('next/headers')
  cookies().set(cookie.name, cookie.value, {
    ...cookie.attributes,
    domain: new URL(getBaseUrl()).hostname.replace(/^.*?\.(.*)/, '$1'),
  })
}
