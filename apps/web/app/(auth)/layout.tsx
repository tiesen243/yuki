import { redirect } from 'next/navigation'

import { auth } from '@yuki/auth'
import { Button } from '@yuki/ui/button'
import { Card, CardFooter } from '@yuki/ui/card'

export default async function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await auth()
  if (session.user) redirect('/')

  return (
    <main className="container grid min-h-[90dvh] place-items-center">
      <Card className="w-full max-w-xl">
        {children}

        <form>
          <CardFooter className="flex-col gap-2">
            <span className="text-muted-foreground relative w-full text-center">
              <div className="bg-muted-foreground absolute top-1/2 left-0 h-px w-[48%]" />
              or
              <div className="bg-muted-foreground absolute top-1/2 right-0 h-px w-[48%]" />
            </span>
            <Button variant="outline" className="w-full" formAction="/api/auth/github">
              Continue with Github
            </Button>
            <Button variant="outline" className="w-full" formAction="/api/auth/discord">
              Continue with Discord
            </Button>
          </CardFooter>
        </form>
      </Card>
    </main>
  )
}
