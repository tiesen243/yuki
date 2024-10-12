'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { Button } from '@yuki/ui/button'
import { CardContent } from '@yuki/ui/card'
import { FormField } from '@yuki/ui/form-field'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@yuki/ui/select'
import { toast } from '@yuki/ui/sonner'
import { Textarea } from '@yuki/ui/textarea'
import { UploadDropzone } from '@yuki/uploader/react'

import { api } from '@/lib/trpc/react'

export const PageClient: React.FC = () => {
  const router = useRouter()

  const [{ categories }] = api.category.getAll.useSuspenseQuery({ limit: 9999 })
  const [uploader, setUploader] = useState<{ image?: string; isLoading: boolean }>({
    image: '/assets/logo.svg',
    isLoading: false,
  })

  const { mutate, isPending, error } = api.product.create.useMutation({
    onSuccess: async (data) => {
      router.back()
      toast.success(`Product ${data.name} created`)
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
      price: Number(data.price),
      stock: Number(data.stock),
      category: String(data.category),
      image: uploader.image,
    })
  }

  return (
    <CardContent className="grid grid-cols-2 gap-4" asChild>
      <form action={action}>
        {fields.map((field) => (
          <FormField
            {...field}
            key={field.name}
            label={field.name.charAt(0).toUpperCase() + field.name.slice(1)}
            message={error?.data?.zodError?.[field.name]?.at(0)}
            disabled={isPending}
            {...(field.name === 'description' && {
              asChild: true,
              children: <Textarea className="h-4/5" />,
              className: 'row-span-2',
            })}
          />
        ))}

        <FormField
          label="Category"
          name="category"
          disabled={isPending}
          message={error?.data?.zodError?.category?.at(0)}
          asChild
        >
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormField>

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

const fields = [
  { name: 'name' as const, type: 'text' },
  { name: 'description' as const, type: 'text' },
  { name: 'price' as const, type: 'number', step: 'any' },
  { name: 'stock' as const, type: 'number' },
]
