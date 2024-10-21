import { Slot } from '@radix-ui/react-slot'

import { cn } from '@yuki/ui'
import { Input } from '@yuki/ui/input'
import { Label } from '@yuki/ui/label'

interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  description?: string
  message?: string
  asChild?: boolean
}

const FormField: React.FC<FormFieldProps> = ({
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
      {label && (
        <Label htmlFor={props.name} className={message ? 'text-destructive' : undefined}>
          {label}
        </Label>
      )}
      <Comp {...props} className={message ? 'border-destructive' : undefined} />
      {description && <p className="text-sm text-muted-foreground">{description}</p>}
      {message && <p className="text-sm text-destructive">{message}</p>}
    </div>
  )
}

export { FormField, type FormFieldProps }
