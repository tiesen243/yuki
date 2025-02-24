import type { ZodError } from 'zod'
import * as React from 'react'
import { Label } from '@radix-ui/react-label'
import { Slot } from '@radix-ui/react-slot'

import { cn } from '@yuki/ui/utils'

type FormContextValue =
  | {
      formData: Record<string, unknown>
      updateField: (name: string, value: unknown) => void
      isPending: boolean
      errors?: ReturnType<ZodError['flatten']>['fieldErrors'] | null
    }
  | undefined

const FormContext = React.createContext<FormContextValue>(
  {} as FormContextValue,
)

const useForm = () => {
  const context = React.use(FormContext)
  if (!context) throw new Error('useForm should be used within <Form>')
  return context
}

interface FormProps<T extends (...args: never[]) => void>
  extends Omit<React.ComponentProps<'form'>, 'onSubmit'> {
  defaultValues: Partial<Parameters<T>[0]>
  onSubmit?: (data: Parameters<T>[0]) => void | Promise<void>
  isPending?: boolean
  errors?: ReturnType<ZodError['flatten']>['fieldErrors'] | null
  isReset?: boolean
  asChild?: boolean
}

function Form<T extends (...args: never[]) => void>({
  defaultValues,
  className,
  onSubmit,
  errors,
  isPending = false,
  isReset = false,
  asChild = false,
  ...props
}: FormProps<T>) {
  const [formData, setFormData] = React.useState<Parameters<T>[0]>(
    defaultValues as Parameters<T>[0],
  )

  const updateField = React.useCallback(
    (name: keyof Parameters<T>[0], value: unknown) => {
      setFormData(
        (prev) =>
          ({
            ...(prev as object),
            [name]: value,
          }) as Parameters<T>[0],
      )
    },
    [],
  )

  const handleSubmit = React.useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      if (!onSubmit) return

      event.preventDefault()
      await onSubmit(formData)
      if (isReset) setFormData(defaultValues as Parameters<T>[0])
    },
    [defaultValues, formData, isReset, onSubmit],
  )

  const Comp = asChild ? Slot : 'form'

  return (
    <FormContext.Provider value={{ formData, updateField, isPending, errors }}>
      <Comp
        {...props}
        data-slot="form"
        className={cn('grid gap-4', className)}
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
    ...fieldContext,
    id,
    name: fieldContext.name,
    error: formContext?.errors?.[fieldContext.name],
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
  }
}

function FormField({
  name,
  render,
}: FormFieldContextValue & {
  render: (field: {
    value: string
    onChange: (value: React.ChangeEvent<HTMLInputElement> | string) => void
  }) => React.ReactNode
}) {
  const { formData, updateField } = useForm()

  return (
    <FormFieldContext.Provider value={{ name }}>
      {render({
        value: formData[name] as string,
        onChange: React.useCallback(
          (value) => {
            let newValue: string | number
            if (typeof value === 'object') {
              newValue =
                value.currentTarget.type === 'number'
                  ? parseInt(value.currentTarget.value, 10)
                  : value.currentTarget.value
            } else newValue = value

            updateField(name, newValue)
          },
          [name, updateField],
        ),
      })}
    </FormFieldContext.Provider>
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
        className={cn('grid gap-2', className)}
        disabled={isPending}
      />
    </FormItemContext.Provider>
  )
}

function FormLabel({
  className,
  ...props
}: React.ComponentProps<typeof Label>) {
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
  className,
  ...props
}: React.ComponentProps<'input'> & { asChild?: boolean }) {
  const { name, error, formItemId, formDescriptionId, formMessageId } =
    useFormField()
  const Comp = asChild ? Slot : 'input'

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
      className={cn(
        !asChild &&
          'border-input file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground aria-invalid:outline-destructive/60 aria-invalid:ring-destructive/20 dark:aria-invalid:outline-destructive dark:aria-invalid:ring-destructive/50 ring-ring/10 dark:ring-ring/20 dark:outline-ring/40 outline-ring/50 aria-invalid:outline-destructive/60 dark:aria-invalid:outline-destructive dark:aria-invalid:ring-destructive/40 aria-invalid:ring-destructive/20 aria-invalid:border-destructive/60 dark:aria-invalid:border-destructive flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-4 focus-visible:outline-1 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:focus-visible:ring-[3px] aria-invalid:focus-visible:outline-none md:text-sm dark:aria-invalid:focus-visible:ring-4',
        className,
      )}
    />
  )
}

function FormDescription({
  className,
  ...props
}: React.ComponentProps<'span'>) {
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

function FormMessage({
  className,
  children,
  ...props
}: React.ComponentProps<'p'>) {
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
