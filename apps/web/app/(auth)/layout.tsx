import { redirect } from 'next/navigation'

import { auth } from '@yuki/auth'
import { Button } from '@yuki/ui/button'
import { Card, CardFooter } from '@yuki/ui/card'
import { DiscordIcon, GithubIcon, GoogleIcon } from '@yuki/ui/icons'

export default async function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await auth()
  if (session.user) redirect('/')

  return (
    <main className="container flex min-h-[calc(100dvh-5rem)] flex-col items-center justify-center gap-8">
      <Card className="w-full max-w-md">
        {children}

        <CardFooter className="w-full flex-col gap-4">
          <div className="after:border-border relative w-full text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
            <span className="bg-background text-muted-foreground relative z-10 px-2">
              Or continue with
            </span>
          </div>

          <form className="grid w-full grid-cols-3 gap-4 *:w-full">
            {authProviders.map((provider) => (
              <Button
                key={provider.name}
                variant="outline"
                formAction={`/api/auth/${provider.name}`}
              >
                <provider.icon />
                <span className="sr-only">Login with {provider.name}</span>
              </Button>
            ))}
          </form>
        </CardFooter>
      </Card>
      <div className="text-muted-foreground hover:[&_a]:text-primary text-center text-xs text-balance [&_a]:underline [&_a]:underline-offset-4">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{' '}
        and <a href="#">Privacy Policy</a>.
      </div>
    </main>
  )
}

const authProviders = [
  { icon: DiscordIcon, name: 'Discord' },
  { icon: GithubIcon, name: 'Github' },
  { icon: GoogleIcon, name: 'Google' },
]
