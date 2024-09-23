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

export const CreateCategoryForm: React.FC = () => {
  const router = useRouter()

  const [uploader, setUploader] = useState<{ image?: string; isLoading: boolean }>({
    image: '/assets/logo.svg',
    isLoading: false,
  })

  const { mutate, isPending, error } = api.category.create.useMutation({
    onSuccess: async () => {
      router.push('/categories')
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
      description: String(data.description),
      image: uploader.image,
    })
  }

  return (
    <CardContent asChild>
      <form action={action} className="space-y-4">
        {fields.map((field) => (
          <FormField
            key={field.name}
            label={field.name.charAt(0).toUpperCase() + field.name.slice(1)}
            name={field.name}
            type={field.type}
            message={error?.data?.zodError?.[field.name]?.at(0)}
            disabled={isPending}
          />
        ))}

        <div className="grid grid-cols-2 gap-4">
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

          <Image src={uploader.image ?? ''} alt="product-preview" width={200} height={200} />
        </div>

        <Button className="w-full" disabled={isPending || uploader.isLoading}>
          {isPending ? 'Creating...' : 'Create'}
        </Button>
      </form>
    </CardContent>
  )
}

const fields = [
  { name: 'name' as const, type: 'text' },
  { name: 'description' as const, type: 'text' },
]
