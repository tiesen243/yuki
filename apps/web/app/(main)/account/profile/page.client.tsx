'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

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
import { DiscordIcon, GithubIcon, GoogleIcon } from '@yuki/ui/icons'
import { Input } from '@yuki/ui/input'
import { Label } from '@yuki/ui/label'
import { toast } from '@yuki/ui/sonner'
import { UploadButton } from '@yuki/ui/upload-button'

import { api } from '@/lib/trpc/react'

export const LinkedAccountList: React.FC = () => {
  const [linkedAccounts] = api.user.getLinkedAccounts.useSuspenseQuery()

  const accountMap = new Map(linkedAccounts.map((acc) => [acc.provider, acc]))
  return providers.map((provider) => {
    const linkedAccount = accountMap.get(provider.name)

    return (
      <li key={provider.name} className="flex items-center gap-2">
        <provider.Icon className="size-4" />

        {linkedAccount ? (
          <>
            <p className="w-32">{linkedAccount.name}</p>
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

export const LinkedAccountSkeleton: React.FC = () =>
  providers.map((provider) => (
    <li key={provider.name} className="flex items-center gap-2">
      <provider.Icon className="size-4" />
      <div className="w-32 animate-pulse rounded bg-current">&nbsp;</div>
      <Button size="sm" variant="outline" className="w-20" disabled>
        Link
      </Button>
    </li>
  ))

const providers = [
  { name: 'discord', Icon: DiscordIcon },
  { name: 'github', Icon: GithubIcon },
  { name: 'google', Icon: GoogleIcon },
]

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

export const EditProfileForm: React.FC<{ name: string; image: string }> = (props) => {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState(props)
  const router = useRouter()

  const { mutate, isPending } = api.user.updateProfile.useMutation({
    onSuccess: () => {
      router.refresh()
      setOpen(false)
    },
  })

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
            <Image src={formData.image} alt={props.name} width={100} height={100} />
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
