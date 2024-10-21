import { Button } from '@yuki/ui/button'
import { FormField } from '@yuki/ui/form-field'

export type A = string

export const PageClient: React.FC = () => {
  return (
    <form className="space-y-4">
      {fields.map((field) => (
        <FormField key={field.name} {...field} />
      ))}

      <Button className="w-full">Register</Button>
    </form>
  )
}

const fields = [
  { name: 'name' as const, label: 'Name', type: 'text' },
  { name: 'email' as const, label: 'Email', type: 'email' },
  { name: 'password' as const, label: 'Password', type: 'password' },
  { name: 'confirmPassword' as const, label: 'Confirm Password', type: 'password' },
]
