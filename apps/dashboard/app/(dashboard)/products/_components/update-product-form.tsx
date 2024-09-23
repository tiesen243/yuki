'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import type { Category, Product } from '@yuki/db'
import { Button } from '@yuki/ui/button'
import { CardContent } from '@yuki/ui/card'
import { FormField } from '@yuki/ui/form-field'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@yuki/ui/select'
import { toast } from '@yuki/ui/sonner'
import { UploadDropzone } from '@yuki/uploader/react'

import { api } from '@/lib/trpc/react'

export const UpdateProductForm: React.FC<{ product: Product; categories: Category[] }> = ({
  product,
  categories,
}) => {
  const router = useRouter()

  const [uploader, setUploader] = useState<{ image: string | undefined; isLoading: boolean }>({
    image: product.image,
    isLoading: false,
  })

  console.log(uploader)

  const { mutate, isPending, error } = api.product.update.useMutation({
    onSuccess: async () => {
      router.back()
      toast.success(`Product ${product.name} updated`)
      await new Promise((resolve) => setTimeout(resolve, 150))
      router.refresh()
    },
    onError: (e) => !e.data?.zodError && toast.error(e.message),
  })

  const action = async (formData: FormData) => {
    const data = Object.fromEntries(formData)
    mutate({
      ...data,
      id: product.id,
      image: uploader.image,
      price: Number(data.price),
      stock: Number(data.stock),
    })
  }

  return (
    <CardContent className="space-y-4" asChild>
      <form action={action}>
        {fields.map((field) => (
          <FormField
            key={field.name}
            label={field.name.charAt(0).toUpperCase() + field.name.slice(1)}
            name={field.name}
            type={field.type}
            defaultValue={product[field.name] ?? ''}
            message={error?.data?.zodError?.[field.name]?.at(0)}
            disabled={isPending}
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

        <div className="grid grid-cols-2 gap-4">
          <UploadDropzone
            endpoint="prodcutUploader"
            config={{ mode: 'auto' }}
            disabled={isPending}
            onUploadBegin={() => setUploader({ isLoading: true, image: undefined })}
            onClientUploadComplete={(images) => {
              if (images.length === 0) return
              setUploader({ isLoading: false, image: images[0]?.url })
              toast.success('Image uploaded')
            }}
            onUploadError={(error) => {
              toast.error(error.message)
            }}
          />

          <Image src={uploader.image ?? product.image} alt={product.id} width={200} height={200} />
        </div>

        <Button className="w-full" disabled={isPending || uploader.isLoading}>
          {isPending ? 'Updating...' : 'Update'}
        </Button>
      </form>
    </CardContent>
  )
}

const fields = [
  { name: 'name' as const, type: 'text' },
  { name: 'description' as const, type: 'text' },
  { name: 'price' as const, type: 'number' },
  { name: 'stock' as const, type: 'number' },
]
