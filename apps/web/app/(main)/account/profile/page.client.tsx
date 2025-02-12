'use client'

import { useRouter } from 'next/navigation'

import { Button } from '@yuki/ui/button'
import { DiscordIcon, GithubIcon, GoogleIcon } from '@yuki/ui/icons'

import { api } from '@/lib/trpc/react'

export const LinkedAccountList: React.FC = () => {
  const [linkedAccounts] = api.user.getLinkedAccounts.useSuspenseQuery()

  return (['discord', 'github', 'google'] as const).map((provider) => (
    <li key={provider} className="flex items-center gap-2">
      {ProviderIcon[provider]}

      {linkedAccounts.some((acc) => acc.provider === provider) ? (
        <>
          <p className="w-32">
            {linkedAccounts.find((acc) => acc.provider === provider)?.name}
          </p>
          <UnlinkButton provider={provider} />
        </>
      ) : (
        <>
          <p className="text-muted-foreground w-32">Not linked</p>
          <LinkButton provider={provider} />
        </>
      )}
    </li>
  ))
}

export const LinkedAccountSkeleton: React.FC = () =>
  (['discord', 'github', 'google'] as const).map((provider) => (
    <li key={provider} className="flex items-center gap-2">
      {ProviderIcon[provider]}
      <div className="w-32 animate-pulse rounded bg-current">&nbsp;</div>
      <Button size="sm" variant="outline" className="w-20" disabled>
        Link
      </Button>
    </li>
  ))

const ProviderIcon = {
  discord: <DiscordIcon />,
  github: <GithubIcon />,
  google: <GoogleIcon />,
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
      className="w-20"
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
    <Button size="sm" variant="outline" className="w-20">
      Link
    </Button>
  </form>
)
