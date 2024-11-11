import Link from 'next/link'

import { Button } from '@yuki/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@yuki/ui/card'
import { DiscordIcon } from '@yuki/ui/icons'

import { LoginForm } from '@/app/(auth)/_components/login-form'
import { seo } from '@/lib/seo'

const Page: React.FC = () => (
  <Card className="w-screen max-w-screen-md border-background md:border-border">
    <CardHeader>
      <CardTitle className="text-2xl">Login</CardTitle>
      <CardDescription>Enter your email below to login to your account</CardDescription>
    </CardHeader>

    <CardContent>
      <LoginForm />

      <Button variant="outline" className="mt-4 w-full" asChild>
        <Link href="/api/auth/discord">
          <DiscordIcon /> Login with Discord
        </Link>
      </Button>

      <div className="mt-4 text-center text-sm">
        Don&apos;t have an account?{' '}
        <Link href="/sign-up" className="underline">
          Sign up
        </Link>
      </div>
    </CardContent>
  </Card>
)

export default Page

export const metadata = seo({
  title: 'Login',
  url: '/sign-in',
})
