import { Button } from '@yuki/ui/button'
import { FormField } from '@yuki/ui/form-field'

export const PageClient: React.FC = () => {
  return (
    <form className="space-y-4">
      {fields.map((field) => (
        <FormField key={field.name} {...field} />
      ))}

      <Button className="w-full">Login</Button>
    </form>
  )
}

const fields = [
  { name: 'email' as const, label: 'Email', type: 'email' },
  { name: 'password' as const, label: 'Password', type: 'password' },
]
