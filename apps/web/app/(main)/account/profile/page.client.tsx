'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useMutation, useQuery } from '@tanstack/react-query'

import { signIn } from '@yuki/auth'
import { Button } from '@yuki/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@yuki/ui/dialog'
import { DiscordIcon, GoogleIcon } from '@yuki/ui/icons'
import { Input } from '@yuki/ui/input'
import { Label } from '@yuki/ui/label'
import { toast } from '@yuki/ui/sonner'
import { UploadButton } from '@yuki/ui/upload-button'

import { useTRPC } from '@/lib/trpc/react'

const providers = [
  { name: 'discord' as const, Icon: DiscordIcon },
  { name: 'google' as const, Icon: GoogleIcon },
]

export const LinkedAccountList: React.FC = () => {
  const trpc = useTRPC()
  const { data: linkedAccounts, isLoading } = useQuery(
    trpc.user.getLinkedAccounts.queryOptions(),
  )

  if (isLoading || !linkedAccounts)
    return providers.map((provider) => (
      <li key={provider.name} className="flex items-center gap-2">
        <provider.Icon className="size-4" />
        <div className="w-32 animate-pulse rounded bg-current">&nbsp;</div>
        <Button size="sm" variant="outline" className="w-20" disabled>
          Link
        </Button>
      </li>
    ))

  const accountMap = new Map(linkedAccounts.map((acc) => [acc.provider, acc]))
  return providers.map((provider) => {
    const linkedAccount = accountMap.get(provider.name)

    return (
      <li key={provider.name} className="flex items-center gap-2">
        <provider.Icon className="size-4" />
        {linkedAccount ? (
          <>
            <p className="w-32">{linkedAccount.providerAccountName}</p>
            <UnlinkButton provider={provider.name} />
          </>
        ) : (
          <>
            <p className="text-muted-foreground w-32">Not linked</p>
            <LinkButton provider={provider.name} />
          </>
        )}
      </li>
    )
  })
}

const UnlinkButton: React.FC<{ provider: string }> = ({ provider }) => {
  const router = useRouter()
  const trpc = useTRPC()

  const { mutate, isPending } = useMutation(
    trpc.user.unlinkAccount.mutationOptions({
      onSuccess: () => {
        router.refresh()
      },
    }),
  )

  return (
    <Button
      size="sm"
      variant="outline"
      className="w-20"
      onClick={() => {
        mutate({ provider })
      }}
      disabled={isPending}
    >
      {isPending ? 'Unlinking...' : 'Unlink'}
    </Button>
  )
}

const LinkButton: React.FC<{ provider: 'discord' | 'google' }> = ({
  provider,
}) => (
  <Button
    size="sm"
    variant="outline"
    className="w-20"
    onClick={async () => {
      await signIn(provider)
    }}
  >
    Link
  </Button>
)

export const EditProfileForm: React.FC<{ name: string; image: string }> = (
  props,
) => {
  const [formData, setFormData] = useState(props)
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const trpc = useTRPC()

  const { mutate, isPending } = useMutation(
    trpc.user.updateProfile.mutationOptions({
      onSuccess: () => {
        router.refresh()
        setOpen(false)
      },
    }),
  )

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Edit profile</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault()
            mutate(formData)
          }}
        >
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              className="col-span-3"
              value={formData.name}
              onChange={(e) => {
                setFormData((prev) => ({ ...prev, name: e.target.value }))
              }}
              disabled={isPending}
            />
          </div>
          <div className="grid place-items-center gap-4">
            <Image
              src={formData.image}
              alt={props.name}
              width={100}
              height={100}
            />
            <UploadButton
              endpoint="userImageUploader"
              onClientUploadComplete={(res) => {
                setFormData((prev) => ({
                  ...prev,
                  image: res.at(0)?.ufsUrl ?? props.image,
                }))
              }}
              onUploadError={(error: Error) => {
                toast.error(error.message)
              }}
              disabled={isPending}
            />
          </div>
          <DialogFooter>
            <Button disabled={isPending}>Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
