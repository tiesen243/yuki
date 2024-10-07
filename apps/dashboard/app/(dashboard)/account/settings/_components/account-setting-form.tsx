'use client'

import { useState } from 'react'

import type { User } from '@yuki/db'
import { Avatar, AvatarFallback, AvatarImage } from '@yuki/ui/avatar'
import { Button } from '@yuki/ui/button'
import { FormField } from '@yuki/ui/form-field'
import { toast } from '@yuki/ui/sonner'
import { UploadButton } from '@yuki/uploader/react'

import { api } from '@/lib/trpc/react'

export const AccountSettingForm: React.FC<{ user: User }> = ({ user }) => {
  const [uploader, setUploader] = useState<{ image?: string; isLoading: boolean }>({
    image: user.avatar ?? '',
    isLoading: false,
  })

  const { mutate, isPending, error } = api.user.updateProfile.useMutation({
    onError: (e) => !e.data?.zodError && toast.error(e.message),
    onSuccess: () => toast.success('Profile updated successfully'),
  })

  const action = async (formData: FormData) => {
    mutate({
      name: String(formData.get('name')),
      avatar: String(uploader.image ?? user.avatar),
      address: String(formData.get('address')),
      city: String(formData.get('city')),
      state: String(formData.get('state')),
      zipCode: Number(formData.get('zipCode')),
      country: String(formData.get('country')),
    })
  }

  return (
    <form action={action} className="mx-auto max-w-screen-md">
      <div className="mx-auto flex w-fit flex-col gap-4">
        <Avatar className="size-32">
          <AvatarImage src={uploader.image} alt="profile" />
          <AvatarFallback>{user.name.slice(0, 1).toUpperCase()}</AvatarFallback>
        </Avatar>

        <UploadButton
          endpoint="avatarUploader"
          config={{ mode: 'auto' }}
          disabled={isPending}
          onUploadBegin={() => setUploader({ isLoading: true, image: uploader.image })}
          onClientUploadComplete={(images) => {
            if (images.length === 0) return
            setUploader({ isLoading: false, image: images[0]?.url })
            toast.success('Avatar updated successfully')
          }}
          onUploadError={(error) => {
            toast.error(error.message)
          }}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        {fields.map((field) => (
          <FormField
            key={field.name}
            {...field}
            defaultValue={field.name === 'name' ? user.name : user.address?.[field.name]}
            disabled={isPending}
            message={error?.data?.zodError?.[field.name]?.at(0)}
          />
        ))}
      </div>

      <Button className="mt-4 w-full" disabled={uploader.isLoading || isPending}>
        Save Changes
      </Button>
    </form>
  )
}

const fields = [
  { name: 'name' as const, label: 'Name', className: 'col-span-2' },
  { name: 'address' as const, label: 'Address', className: 'col-span-2' },
  { name: 'city' as const, label: 'City' },
  { name: 'state' as const, label: 'State' },
  { name: 'zipCode' as const, label: 'Zip Code' },
  { name: 'country' as const, label: 'Country' },
]
