import { Slot } from '@radix-ui/react-slot'

import { cn } from '..'
import { Input } from './input'
import { Label } from './label'

interface FormFieldProps extends React.ComponentProps<'input'> {
  label?: string
  description?: string
  message?: string
  asChild?: string
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  description,
  message,
  className,
  asChild,
  ...props
}) => {
  const Comp = asChild ? Slot : Input

  return (
    <div className={cn('space-y-2', className)}>
      {label && <Label htmlFor={props.name}>{label}</Label>}
      <Comp {...props} />
      {description && <p className="text-xs text-muted-foreground">{description}</p>}
      {message && <p className="text-xs text-destructive">{message}</p>}
    </div>
  )
}
