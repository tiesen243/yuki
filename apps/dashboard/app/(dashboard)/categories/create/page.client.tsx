'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

import { Button } from '@yuki/ui/button'
import { CardContent } from '@yuki/ui/card'
import { FormField } from '@yuki/ui/form-field'
import { toast } from '@yuki/ui/sonner'
import { UploadDropzone } from '@yuki/uploader/react'

import { api } from '@/lib/trpc/react'

export const PageClient: React.FC = () => {
  const router = useRouter()

  const [uploader, setUploader] = useState<{ image?: string; isLoading: boolean }>({
    image: '/assets/logo.svg',
    isLoading: false,
  })

  const { mutate, isPending, error } = api.category.create.useMutation({
    onSuccess: async () => {
      router.back()
      toast.success('Category created')
      await new Promise((resolve) => setTimeout(resolve, 150))
      router.refresh()
    },
    onError: (e) => !e.data?.zodError && toast.error(e.message),
  })

  const action = async (formData: FormData) => {
    const data = Object.fromEntries(formData)
    mutate({
      name: String(data.name),
      image: uploader.image,
    })
  }

  return (
    <CardContent className="grid grid-cols-2 gap-4" asChild>
      <form action={action}>
        <FormField
          name="name"
          label="Name"
          message={error?.data?.zodError?.name?.at(0)}
          disabled={isPending}
          className="col-span-2"
        />

        <UploadDropzone
          endpoint="categoryUploader"
          config={{ mode: 'auto' }}
          disabled={isPending}
          onUploadBegin={() => setUploader({ isLoading: true, image: uploader.image })}
          onClientUploadComplete={(images) => {
            if (images.length === 0) return
            setUploader({ isLoading: false, image: images[0]?.url })
            toast.success('Image uploaded')
          }}
          onUploadError={(error) => {
            toast.error(error.message)
          }}
        />

        <Image
          src={uploader.image ?? ''}
          alt="product-preview"
          width={200}
          height={200}
          className="mx-auto aspect-square w-full object-contain"
        />

        <Button className="w-full" disabled={isPending || uploader.isLoading}>
          {isPending ? 'Creating...' : 'Create'}
        </Button>

        <Button type="button" variant="outline" onClick={() => router.back()} disabled={isPending}>
          Cancel
        </Button>
      </form>
    </CardContent>
  )
}
