import { Slot } from '@radix-ui/react-slot'

import { Input } from '@yuki/ui/input'
import { Label } from '@yuki/ui/label'
import { cn } from '@yuki/ui/utils'

interface FormFieldProps extends React.ComponentProps<typeof Input> {
  label?: string
  message?: string
  error?: string
  asChild?: boolean
}

function FormField({
  label,
  message,
  error,
  className,
  asChild = false,
  ...props
}: FormFieldProps) {
  const Comp = asChild ? Slot : Input

  return (
    <div className={cn('grid gap-2', className)}>
      <Label htmlFor={props.name}>{label}</Label>
      <Comp {...props} id={props.name} aria-invalid={error ? 'true' : 'false'} />
      {message && <span className="text-muted-foreground text-xs">{message}</span>}
      <span className="text-destructive text-xs">{error}</span>
    </div>
  )
}

export { FormField }
