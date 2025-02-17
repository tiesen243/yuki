import { useId } from 'react'
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

  const id = useId()
  const formId = `${id}-${props.name}`

  return (
    <div className={cn('grid gap-2', className)}>
      <Label htmlFor={formId}>{label}</Label>
      <Comp {...props} id={formId} aria-invalid={error ? 'true' : 'false'} />
      {message && <span className="text-muted-foreground text-xs">{message}</span>}
      <span className="text-destructive text-xs">{error}</span>
    </div>
  )
}

export { FormField }
