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
    <main className="container grid min-h-[95dvh] place-items-center">
      <Card className="w-full max-w-xl">
        {children}

        <CardFooter className="flex-col gap-4" asChild>
          <form>
            <div className="text-muted-foreground flex w-full items-center gap-1 text-center">
              <div className="bg-muted-foreground h-px w-full" />
              <span className="whitespace-nowrap">OR CONTINUE WITH</span>
              <div className="bg-muted-foreground h-px w-full" />
            </div>

            {providers.map((p) => (
              <Button
                key={p.name}
                variant="outline"
                className="w-full"
                formAction={`/api/auth/${p.name}`}
              >
                <p.Icon /> <span className="w-32">Continue with {p.name}</span>
              </Button>
            ))}
          </form>
        </CardFooter>
      </Card>
    </main>
  )
}

const providers = [
  { name: 'Discord', Icon: DiscordIcon },
  { name: 'Github', Icon: GithubIcon },
  { name: 'Google', Icon: GoogleIcon },
]
