'use client'

import Link from 'next/link'
import { useMutation, useSuspenseQuery } from '@tanstack/react-query'

import type { RouterOutputs } from '@yukinu/api'
import { Badge } from '@yukinu/ui/badge'
import { Button } from '@yukinu/ui/button'
import { PencilIcon, TrashIcon } from '@yukinu/ui/icons'
import { toast } from '@yukinu/ui/sonner'
import { Typography } from '@yukinu/ui/typography'

import { useTRPC } from '@/trpc/react'

export const AddressList: React.FC = () => {
  const { trpc } = useTRPC()
  const { data } = useSuspenseQuery(trpc.address.all.queryOptions())

  return data.map((address) => (
    <AddressCard key={address.id} address={address} />
  ))
}

const AddressCard: React.FC<{
  address: RouterOutputs['address']['all'][number]
}> = ({ address }) => {
  const { trpc, queryClient } = useTRPC()
  const { mutate: remove, isPending: isRemoving } = useMutation({
    ...trpc.address.remove.mutationOptions(),
    onSuccess: () =>
      queryClient.invalidateQueries(trpc.address.all.queryFilter()),
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const { mutate: setDefault, isPending: isSetting } = useMutation({
    ...trpc.address.update.mutationOptions(),
    onSuccess: () =>
      queryClient.invalidateQueries(trpc.address.all.queryFilter()),
    onError: (error) => {
      toast.error(error.message)
    },
  })

  return (
    <div className="bg-card relative min-w-48 rounded-xl p-4 shadow-md">
      <div className="flex w-[80%] items-center gap-2">
        {address.default ? (
          <Badge variant="info">Default</Badge>
        ) : (
          <Button
            size="sm"
            variant="ghost"
            className="text-info hover:bg-info/10 dark:hover:bg-info/20 hover:text-info"
            onClick={() => {
              setDefault({ ...address, default: true })
            }}
            disabled={isSetting}
          >
            Set as Default
          </Button>
        )}
        <Typography variant="h5" component="h3" className="mb-0">
          {address.name}
        </Typography>
        <div className="bg-border h-9 w-0.5" />
        <Typography
          variant="h6"
          component="h4"
          className="text-muted-foreground mb-0"
        >
          {address.phone}
        </Typography>
      </div>

      <div className="absolute top-0 right-0 z-10 grid gap-1 p-4">
        <Button variant="ghost" asChild>
          <Link href={`/profile/address/${address.id}`}>
            <PencilIcon />
            <span className="sr-only sm:not-sr-only">Edit</span>
          </Link>
        </Button>

        <Button
          variant="ghost"
          className="text-destructive hover:bg-destructive/10 dark:hover:bg-destructive/20 hover:text-destructive"
          onClick={() => {
            remove({ id: address.id })
          }}
          disabled={isRemoving}
        >
          <TrashIcon />
          <span className="sr-only sm:not-sr-only">Delete</span>
        </Button>
      </div>

      <div className="grid w-[80%] gap-1">
        <Typography className="truncate">{address.address}</Typography>
        <Typography className="truncate">
          {address.city}, {address.state} {address.postalCode}
        </Typography>
      </div>
    </div>
  )
}

export const AddressCardSkeleton: React.FC = () => (
  <div className="bg-card relative min-w-48 rounded-xl p-4 shadow-md">
    <div className="flex w-[80%] items-center gap-2">
      <Typography
        variant="h4"
        component="h3"
        className="w-28 animate-pulse rounded-md bg-current"
      >
        &nbsp;
      </Typography>
      <div className="bg-border h-9 w-0.5" />
      <Typography
        variant="h5"
        component="h4"
        className="w-40 animate-pulse rounded-md bg-current"
      >
        &nbsp;
      </Typography>
    </div>

    <div className="absolute top-0 right-0 z-10 grid gap-1 p-4">
      <Button variant="ghost">
        <PencilIcon />
        <span className="sr-only sm:not-sr-only">Edit</span>
      </Button>

      <Button
        variant="ghost"
        className="text-destructive hover:bg-destructive/10 dark:hover:bg-destructive/20 hover:text-destructive"
      >
        <TrashIcon />
        <span className="sr-only sm:not-sr-only">Delete</span>
      </Button>
    </div>

    <div className="grid w-[80%] gap-1">
      <Typography className="animate-pulse truncate rounded-md bg-current">
        &nbsp;
      </Typography>
      <Typography className="animate-pulse truncate rounded-md bg-current">
        &nbsp;
      </Typography>
    </div>
  </div>
)
