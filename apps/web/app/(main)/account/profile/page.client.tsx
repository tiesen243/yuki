'use client'

import { useRouter } from 'next/navigation'

import { Button } from '@yuki/ui/button'
import { DiscordIcon, GithubIcon } from '@yuki/ui/icons'

import { api } from '@/lib/trpc/react'

export const LinkedAccountList: React.FC = () => {
  const [linkedAccounts] = api.user.getLinkedAccounts.useSuspenseQuery()

  return ['discord', 'github'].map((provider) => (
    <li key={provider} className="flex w-1/2 items-center gap-2">
      {Icons[provider as 'discord' | 'github']}
      {linkedAccounts.some((acc) => acc.provider === provider) ? (
        <>
          <p>{linkedAccounts.find((acc) => acc.provider === provider)?.name}</p>
          <UnlinkButton provider={provider} />
        </>
      ) : (
        <>
          <p color="muted">Not linked</p>
          <LinkButton provider={provider} />
        </>
      )}
    </li>
  ))
}

export const LinkedAccountSkeleton: React.FC = () => (
  <>
    <li className="flex w-1/2 items-center gap-2">
      {Icons.discord}
      <div className="w-20 animate-pulse rounded bg-current">&nbsp;</div>
      <Button
        size="sm"
        variant="outline"
        className="bg-secondary hover:bg-primary/20 border-primary/20"
        disabled
      >
        Link
      </Button>
    </li>
    <li className="flex w-1/2 items-center gap-2">
      {Icons.github}
      <div className="w-20 animate-pulse rounded bg-current">&nbsp;</div>
      <Button
        size="sm"
        variant="outline"
        className="bg-secondary hover:bg-primary/20 border-primary/20"
        disabled
      >
        Link
      </Button>
    </li>
  </>
)

const Icons = {
  discord: <DiscordIcon />,
  github: <GithubIcon />,
}

const UnlinkButton: React.FC<{ provider: string }> = ({ provider }) => {
  const router = useRouter()
  const unlink = api.user.unlinkAccount.useMutation({
    onSuccess: () => {
      router.refresh()
    },
  })

  return (
    <Button
      size="sm"
      variant="outline"
      className="bg-secondary hover:bg-primary/20 border-primary/20"
      onClick={() => {
        unlink.mutate({ provider })
      }}
      disabled={unlink.isPending}
    >
      {unlink.isPending ? 'Unlinking...' : 'Unlink'}
    </Button>
  )
}

const LinkButton: React.FC<{ provider: string }> = ({ provider }) => (
  <form action={`/api/auth/${provider}`}>
    <Button
      size="sm"
      variant="outline"
      className="bg-secondary hover:bg-primary/20 border-primary/20"
    >
      Link
    </Button>
  </form>
)
