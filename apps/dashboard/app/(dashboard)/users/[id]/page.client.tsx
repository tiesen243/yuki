'use client'

import { useRouter } from 'next/navigation'

import { Button } from '@yuki/ui/button'
import { CardContent, CardHeader, CardTitle } from '@yuki/ui/card'
import { FormField } from '@yuki/ui/form-field'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@yuki/ui/select'
import { toast } from '@yuki/ui/sonner'

import { api } from '@/lib/trpc/react'

export const PageClient: React.FC<{ id: string }> = ({ id }) => {
  const router = useRouter()

  const [{ user }] = api.user.getOne.useSuspenseQuery({ id })
  const { mutate, isPending, error } = api.user.updateRole.useMutation({
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
    <>
      <CardHeader>
        <CardTitle>Edit {user.name}</CardTitle>
      </CardHeader>

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
            {isPending ? 'Saving...' : 'Save changes'}
          </Button>
        </form>
      </CardContent>
    </>
  )
}
