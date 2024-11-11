'use client'

import { useRouter } from 'next/navigation'

import type { RouterInputs } from '@yuki/api/root'
import { Button } from '@yuki/ui/button'
import { Input } from '@yuki/ui/input'
import { Label } from '@yuki/ui/label'
import { toast } from '@yuki/ui/sonner'

import { api } from '@/lib/tprc/react'

export const RegisterForm: React.FC = () => {
  const router = useRouter()
  const { mutate, isPending, error } = api.user.register.useMutation({
    onError: (e) => toast.error(e.message),
    onSuccess: () => {
      toast.success('Register success')
      router.push('/sign-in')
    },
  })
  return (
    <form
      className="space-y-4"
      onSubmit={async (e) => {
        e.preventDefault()
        const form = new FormData(e.currentTarget)
        mutate(Object.fromEntries(form) as RouterInputs['user']['register'])
      }}
    >
      {fields.map((field) => (
        <div className="grid gap-2">
          <Label htmlFor={field.name} className="capitalize">
            {field.name === 'confirmPassword' ? 'Confirm Password' : field.name}
          </Label>
          <Input {...field} disabled={isPending} />
          {error?.data?.zodError?.[field.name] && (
            <p className="text-sm text-destructive">{error.data.zodError[field.name]}</p>
          )}
        </div>
      ))}

      <Button className="w-full" disabled={isPending}>
        Register
      </Button>
    </form>
  )
}

const fields = [
  { name: 'name' as const, type: 'text', placeholder: 'Yukikaze' },
  { name: 'email' as const, type: 'email', placeholder: 'yuki@tiesen.id.vn' },
  { name: 'password' as const, type: 'password', placeholder: '********' },
  { name: 'confirmPassword' as const, type: 'password', placeholder: '********' },
]
