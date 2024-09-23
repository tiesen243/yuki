import type { NextPage } from 'next'
import Link from 'next/link'

import { Button } from '@yuki/ui/button'
import { CardDescription, CardFooter, CardHeader, CardTitle } from '@yuki/ui/card'
import { DiscordIcon } from '@yuki/ui/icons'

import { RegisterForm } from '@/app/(auth)/_components/register-form'
import { seo } from '@/lib/seo'

const Page: NextPage = () => (
  <>
    <CardHeader>
      <CardTitle className="text-2xl">Register</CardTitle>
      <CardDescription>Enter your email below to register for an account</CardDescription>
    </CardHeader>

    <RegisterForm />

    <CardFooter className="flex-col">
      <Button variant="outline" className="w-full" asChild>
        <Link href={`/api/auth/discord`}>
          <DiscordIcon className="mr-4 size-6" /> Login with Discord
        </Link>
      </Button>
    </CardFooter>
  </>
)

export default Page

export const metadata = seo({
  title: 'Sign up',
  description: 'Sign up for an account',
  url: '/sign-up',
})
