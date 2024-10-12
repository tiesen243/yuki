import type { NextPage } from 'next'

import { auth } from '@yuki/auth'
import { Button } from '@yuki/ui/button'
import { CardTitle } from '@yuki/ui/card'

import { UnlinkAccountBtn } from './page.client'

const Page: NextPage = async () => {
  const session = await auth()
  if (!session) return null

  return (
    <>
      <CardTitle>Linked Accounts</CardTitle>

      <ul className="mt-4 space-y-2">
        <li className="flex items-center justify-between">
          Discord:{' '}
          {session.user.discord ? (
            <>
              {session.user.discord.username} ({session.user.discord.id})
              <UnlinkAccountBtn />
            </>
          ) : (
            <>
              Not connected
              <form action="/api/auth/discord" method="get">
                <Button size="sm">Link Account</Button>
              </form>
            </>
          )}
        </li>
        <li className="flex items-center justify-between">
          Twitter: Not connected <Button size="sm">Link Account</Button>
        </li>
        <li className="flex items-center justify-between">
          GitHub: Not connected <Button size="sm">Link Account</Button>
        </li>
      </ul>
    </>
  )
}

export default Page
