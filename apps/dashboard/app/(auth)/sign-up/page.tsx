import Link from 'next/link'

import { Button } from '@yuki/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@yuki/ui/card'
import { DiscordIcon } from '@yuki/ui/icons'

import { RegisterForm } from '@/app/(auth)/_components/register-form'
import { seo } from '@/lib/seo'

const Page: React.FC = () => (
  <Card className="w-screen max-w-screen-md border-background md:border-border">
    <CardHeader>
      <CardTitle className="text-2xl">Register</CardTitle>
      <CardDescription>Enter your information below to create an account</CardDescription>
    </CardHeader>

    <CardContent>
      <RegisterForm />

      <Button type="button" variant="outline" className="mt-4 w-full" asChild>
        <Link href="/api/auth/discord">
          <DiscordIcon /> Login with Discord
        </Link>
      </Button>

      <div className="mt-4 text-center text-sm">
        Already have an account?{' '}
        <Link href="/sign-in" className="underline">
          Sign in
        </Link>
      </div>
    </CardContent>
  </Card>
)

export default Page

export const metadata = seo({
  title: 'Register',
  url: '/sign-up',
})
