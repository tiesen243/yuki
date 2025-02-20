import type { ZodError } from 'zod'
import * as React from 'react'
import { Label } from '@radix-ui/react-label'
import { Slot } from '@radix-ui/react-slot'

import { Input } from '@yuki/ui/components/input'
import { cn } from '@yuki/ui/utils'

type FormContextValue =
  | { isPending: boolean; errors?: ReturnType<ZodError['flatten']>['fieldErrors'] | null }
  | undefined

const FormContext = React.createContext<FormContextValue>({} as FormContextValue)

const useForm = () => {
  const context = React.use(FormContext)
  if (!context) throw new Error('useForm should be used within <Form>')
  return context
}

interface FormProps<T extends (...args: never[]) => void>
  extends Omit<React.ComponentProps<'form'>, 'onSubmit'> {
  onSubmit?: (data: Parameters<T>[0]) => void | Promise<void>
  isPending?: boolean
  errors?: ReturnType<ZodError['flatten']>['fieldErrors'] | null
  asChild?: boolean
}

function Form<T extends (...args: never[]) => void>({
  className,
  onSubmit,
  errors,
  isPending = false,
  asChild = false,
  ...props
}: FormProps<T>) {
  const handleSubmit = React.useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      if (!onSubmit) return

      event.preventDefault()
      const formData = new FormData(event.currentTarget)
      const data = Object.fromEntries(formData) as Parameters<T>[0]
      await onSubmit(data)
    },
    [onSubmit],
  )

  const Comp = asChild ? Slot : 'form'

  return (
    <FormContext.Provider value={{ isPending, errors }}>
      <Comp
        {...props}
        data-slot="form"
        className={cn('space-y-4', className)}
        onSubmit={handleSubmit}
      />
    </FormContext.Provider>
  )
}

interface FormFieldContextValue {
  id?: string
  name: string
  error?: string[]
  formItemId?: string
  formDescriptionId?: string
  formMessageId?: string
  render?: () => React.ReactNode
}

const FormFieldContext = React.createContext<FormFieldContextValue>(
  {} as FormFieldContextValue,
)

const useFormField = () => {
  const formContext = React.use(FormContext)
  const fieldContext = React.use(FormFieldContext)
  const itemContext = React.use(FormItemContext)

  if (!fieldContext.name)
    throw new Error('useFormField should be used within <FormField>')

  const { id } = itemContext

  return {
    id,
    name: fieldContext.name,
    error: formContext?.errors?.[fieldContext.name],
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
  }
}

function FormField({ name, render }: FormFieldContextValue) {
  if (!render)
    throw new Error('FormField requires a render prop to display field content')

  return (
    <FormFieldContext.Provider value={{ name }}>{render()}</FormFieldContext.Provider>
  )
}

interface FormItemContextValue {
  id: string
}
const FormItemContext = React.createContext<FormItemContextValue>(
  {} as FormItemContextValue,
)

function FormItem({ className, ...props }: React.ComponentProps<'fieldset'>) {
  const { isPending } = useForm()
  const id = React.useId()

  return (
    <FormItemContext.Provider value={{ id }}>
      <fieldset
        {...props}
        data-slot="form-item"
        className={cn('space-y-2', className)}
        disabled={isPending}
      />
    </FormItemContext.Provider>
  )
}

function FormLabel({ className, ...props }: React.ComponentProps<typeof Label>) {
  const { error, formItemId } = useFormField()

  return (
    <Label
      {...props}
      data-slot="form-label"
      htmlFor={formItemId}
      className={cn(
        'text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50',
        error && 'text-destructive',
        className,
      )}
    />
  )
}

function FormControl({
  asChild,
  ...props
}: React.ComponentProps<'input'> & { asChild?: boolean }) {
  const { name, error, formItemId, formDescriptionId, formMessageId } = useFormField()
  const Comp = asChild ? Slot : Input

  return (
    <Comp
      {...props}
      data-slot="form-control"
      id={formItemId}
      name={name}
      aria-describedby={
        !error ? formDescriptionId : `${formDescriptionId} ${formMessageId}`
      }
      aria-invalid={!!error}
    />
  )
}

function FormDescription({ className, ...props }: React.ComponentProps<'span'>) {
  const { formDescriptionId } = useFormField()

  return (
    <span
      {...props}
      data-slot="form-description"
      id={formDescriptionId}
      className={cn('text-muted-foreground text-xs', className)}
    />
  )
}

function FormMessage({ className, children, ...props }: React.ComponentProps<'p'>) {
  const { error, formMessageId } = useFormField()

  const body = error ? String(error) : children
  if (!body) return null

  return (
    <p
      {...props}
      data-slot="form-message"
      id={formMessageId}
      className={cn('text-destructive text-xs font-medium', className)}
    >
      {body}
    </p>
  )
}

export {
  useFormField,
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
}
