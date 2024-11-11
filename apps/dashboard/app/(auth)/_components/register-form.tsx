import Link from 'next/link'

import { Button } from '@yuki/ui/button'
import { Input } from '@yuki/ui/input'
import { Label } from '@yuki/ui/label'

export const RegisterForm: React.FC = () => {
  return (
    <div className="grid gap-4">
      {fields.map((field) => (
        <div className="grid gap-2">
          <Label htmlFor={field.name} className="capitalize">
            {field.name === 'confirmPassword' ? 'Confirm Password' : field.name}
          </Label>
          <Input {...field} />
        </div>
      ))}

      <Button className="w-full">Register</Button>
    </div>
  )
}

const fields = [
  { name: 'name' as const, type: 'text', placeholder: 'Yukikaze' },
  { name: 'email' as const, type: 'email', placeholder: 'yuki@tiesen.id.vn' },
  { name: 'password' as const, type: 'password', placeholder: '********' },
  { name: 'confirmPassword' as const, type: 'password', placeholder: '********' },
]
