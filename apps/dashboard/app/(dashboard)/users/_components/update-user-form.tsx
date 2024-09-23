'use client'

import { useRouter } from 'next/navigation'

// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { User } from '@yuki/db'
import { Button } from '@yuki/ui/button'
import { CardContent } from '@yuki/ui/card'
import { FormField } from '@yuki/ui/form-field'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@yuki/ui/select'
import { toast } from '@yuki/ui/sonner'

import { api } from '@/lib/trpc/react'

export const UpdateUserForm: React.FC<{ user: User }> = ({ user }) => {
  const router = useRouter()

  const { mutate, isPending, error } = api.user.update.useMutation({
    onSuccess: async (data) => {
      router.back()
      toast.success(`User ${data.name} updated`)
      await new Promise((resolve) => setTimeout(resolve, 150))
      router.refresh()
    },
    onError: (e) => !e.data?.zodError && toast.error(e.message),
  })

  const action = async (formData: FormData) => {
    const role = formData.get('role') as 'ADMIN' | 'USER'
    mutate({ id: user.id, role })
  }

  return (
    <CardContent className="space-y-4" asChild>
      <form action={action}>
        <FormField
          name="role"
          label="Role"
          message={error?.data?.zodError?.role?.at(0)}
          disabled={isPending}
          asChild
        >
          <Select defaultValue={user.role}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ADMIN">Admin</SelectItem>
              <SelectItem value="USER">User</SelectItem>
            </SelectContent>
          </Select>
        </FormField>

        <Button className="w-full" disabled={isPending}>
          {isPending ? 'Updating...' : 'Update'}
        </Button>
      </form>
    </CardContent>
  )
}
