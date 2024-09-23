'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

import type { Category } from '@yuki/db'
import { Button } from '@yuki/ui/button'
import { FormField } from '@yuki/ui/form-field'
import { toast } from '@yuki/ui/sonner'
import { UploadDropzone } from '@yuki/uploader/react'

import { api } from '@/lib/trpc/react'

export const UpdateCategoryForm: React.FC<{ categories: Category }> = ({ categories }) => {
  const router = useRouter()
  const [uploader, setUploader] = useState<{ image?: string; isLoading: boolean }>({
    image: categories.image,
    isLoading: false,
  })

  const { mutate, isPending, error } = api.category.create.useMutation({
    onSuccess: async () => {
      router.push('/categories')
      toast.success(`Category ${categories.name} updated`)
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
    <form action={action} className="space-y-4 p-4 pt-0">
      {fields.map((field) => (
        <FormField
          key={field.name}
          label={field.name.charAt(0).toUpperCase() + field.name.slice(1)}
          name={field.name}
          type={field.type}
          defaultValue={categories[field.name] ?? ''}
          message={error?.data?.zodError?.[field.name]?.at(0)}
          disabled={isPending}
        />
      ))}

      <div className="grid grid-cols-2 gap-4">
        <UploadDropzone
          endpoint="prodcutUploader"
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
        {isPending ? 'Updating...' : 'Update'}
      </Button>
    </form>
  )
}

const fields = [
  { name: 'name' as const, type: 'text' },
  { name: 'description' as const, type: 'text' },
]
