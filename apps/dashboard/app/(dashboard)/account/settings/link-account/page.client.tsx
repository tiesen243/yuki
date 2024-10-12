'use client'

import { useRouter } from 'next/navigation'

import { Button } from '@yuki/ui/button'

import { api } from '@/lib/trpc/react'

export const UnlinkAccountBtn: React.FC = () => {
  const router = useRouter()
  const { mutate, isPending } = api.auth.unlinkDiscord.useMutation({
    onSuccess: () => router.refresh(),
  })

  return (
    <Button size="sm" onClick={() => mutate()} disabled={isPending}>
      Unlink Account
    </Button>
  )
}
