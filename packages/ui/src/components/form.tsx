import type { StandardSchemaV1 } from '@standard-schema/spec'
import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'

import { cn } from '@yuki/ui/utils'

type FormSchema = StandardSchemaV1
type InferInput<T extends FormSchema> = StandardSchemaV1.InferInput<T>

interface UseFormParams<TSchema extends FormSchema, TData = unknown> {
  schema: TSchema
  defaultValues: InferInput<TSchema>
  submitFn: (values: InferInput<TSchema>) => Promise<TData> | TData
  onSuccess?: (data: TData) => Promise<void> | void
  onError?: (error: string) => Promise<void> | void
}

function useForm<TSchema extends FormSchema, TData = unknown>(
  params: UseFormParams<TSchema, TData>,
) {
  const { schema, defaultValues, submitFn, onSuccess, onError } = params

  const formValuesRef = React.useRef<InferInput<TSchema>>(defaultValues)
  const prevValidatedValuesRef = React.useRef<Record<string, unknown>>({})
  const [isPending, startTransition] = React.useTransition()
  const [data, setData] = React.useState<TData>()
  const [error, setError] = React.useState<{
    message: string
    fieldErrors: Record<string, string>
  }>({
    message: '',
    fieldErrors: {},
  })
  const [resetKey, setResetKey] = React.useState(0)

  // Memoize stable functions to prevent unnecessary re-renders
  const getFieldValues = React.useCallback(() => formValuesRef.current, [])

  const getFieldValue = React.useCallback(
    (name: string) => formValuesRef.current[name as keyof InferInput<TSchema>],
    [],
  )

  const setFieldValue = React.useCallback((name: string, value: unknown) => {
    const currentValues = formValuesRef.current
    formValuesRef.current = {
      // @ts-expect-error - this is a known issue with TypeScript
      ...currentValues,
      [name]: value,
    } as InferInput<TSchema>
  }, [])

  // Extract validation logic for reusability
  const validateField = React.useCallback(
    async (fieldName: string) => {
      const res = await schema['~standard'].validate(formValuesRef.current)

      if (res.issues) {
        const fieldIssue = res.issues.find((issue) => {
          const pathSegment = issue.path?.[0]
          return typeof pathSegment === 'string' && pathSegment === fieldName
        })
        return fieldIssue?.message ?? ''
      }
      return ''
    },
    [schema],
  )

  const handleBlur = React.useCallback(
    async (event: React.FocusEvent<HTMLInputElement>) => {
      const { name } = event.target
      const currentValue =
        formValuesRef.current[name as keyof InferInput<TSchema>]

      // Skip validation if value hasn't changed
      if (prevValidatedValuesRef.current[name] === currentValue) return

      prevValidatedValuesRef.current[name] = currentValue
      const fieldError = await validateField(name)

      setError((prev) => ({
        message: fieldError ? 'Validation error' : '',
        fieldErrors: {
          ...prev.fieldErrors,
          [name]: fieldError,
        },
      }))
    },
    [validateField],
  )

  const handleSubmit = React.useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      event.stopPropagation()

      const parsed = await schema['~standard'].validate(formValuesRef.current)

      if (parsed.issues) {
        const fieldErrors = parsed.issues.reduce<Record<string, string>>(
          (acc, issue) => {
            const pathSegment = issue.path?.[0]
            if (typeof pathSegment === 'string') {
              acc[pathSegment] = issue.message
            }
            return acc
          },
          {},
        )

        setError({ message: 'Validation error', fieldErrors })
        return
      }

      startTransition(async () => {
        try {
          const result = await submitFn(parsed.value)
          setData(result)
          setError({ message: '', fieldErrors: {} })
          await onSuccess?.(result)
        } catch (err) {
          const message = err instanceof Error ? err.message : 'Unknown error'
          setData(undefined)
          setError({ message, fieldErrors: {} })
          await onError?.(message)
        }
      })
    },
    [schema, submitFn, onSuccess, onError],
  )

  const reset = React.useCallback(() => {
    formValuesRef.current = structuredClone(defaultValues)
    prevValidatedValuesRef.current = {}
    setError({ message: '', fieldErrors: {} })
    setData(undefined)
    setResetKey((prev) => prev + 1)
  }, [defaultValues])

  return React.useMemo(
    () => ({
      data,
      error,
      value: getFieldValues(),
      isPending,
      getFieldValue,
      setFieldValue,
      handleBlur,
      handleSubmit,
      reset,
      resetKey,
    }),
    [
      data,
      error,
      isPending,
      getFieldValues,
      getFieldValue,
      setFieldValue,
      handleBlur,
      handleSubmit,
      reset,
      resetKey,
    ],
  )
}

// Split contexts for better performance - components only re-render when relevant data changes
interface FormStateContextValue {
  isPending: boolean
  data: unknown
  error: { message: string; fieldErrors: Record<string, string> }
  resetKey: number
}

interface FormActionsContextValue {
  handleBlur: (
    event: React.FocusEvent<HTMLInputElement>,
  ) => Promise<void> | void
}

interface FieldValueContextValue {
  getFieldValue: (name: string) => unknown
  setFieldValue: (name: string, value: unknown) => void
}

const FormStateContext = React.createContext<FormStateContextValue | null>(null)
const FormActionsContext = React.createContext<FormActionsContextValue | null>(
  null,
)
const FieldValueContext = React.createContext<FieldValueContextValue | null>(
  null,
)

// Custom hooks for context access with error handling
const useFormStateContext = () => {
  const context = React.useContext(FormStateContext)
  if (!context)
    throw new Error('useFormStateContext must be used within a Form')
  return context
}

const useFormActionsContext = () => {
  const context = React.useContext(FormActionsContext)
  if (!context)
    throw new Error('useFormActionsContext must be used within a Form')
  return context
}

const useFieldValueContext = () => {
  const context = React.useContext(FieldValueContext)
  if (!context)
    throw new Error('useFieldValueContext must be used within a Form')
  return context
}

interface FormProps<T extends FormSchema>
  extends Omit<React.ComponentProps<'form'>, 'onSubmit'> {
  form: ReturnType<typeof useForm<T>>
}

function Form<T extends FormSchema>({
  className,
  form,
  ...props
}: FormProps<T>) {
  const {
    isPending,
    error,
    data,
    getFieldValue,
    setFieldValue,
    handleBlur,
    handleSubmit,
    resetKey,
  } = form

  // Memoize context values to prevent unnecessary re-renders
  const formStateValue = React.useMemo(
    () => ({ isPending, data, error, resetKey }),
    [isPending, data, error, resetKey],
  )

  const formActionsValue = React.useMemo(() => ({ handleBlur }), [handleBlur])

  const fieldValueValue = React.useMemo(
    () => ({ getFieldValue, setFieldValue }),
    [getFieldValue, setFieldValue],
  )

  return (
    <FormStateContext.Provider value={formStateValue}>
      <FormActionsContext.Provider value={formActionsValue}>
        <FieldValueContext.Provider value={fieldValueValue}>
          <form
            data-slot="form"
            className={cn('grid gap-4', className)}
            onSubmit={handleSubmit}
            {...props}
          />
        </FieldValueContext.Provider>
      </FormActionsContext.Provider>
    </FormStateContext.Provider>
  )
}

interface FormFieldContextValue {
  name: string
  formItemId?: string
  formDescriptionId?: string
  formMessageId?: string
}

const FormFieldContext = React.createContext<FormFieldContextValue | null>(null)

interface FormFieldProps {
  name: string
  render: (props: {
    name: string
    value: unknown
    onChange: (
      event: React.ChangeEvent<HTMLInputElement> | string | number | boolean,
    ) => void
    onBlur: (event: React.FocusEvent<HTMLInputElement>) => Promise<void> | void
  }) => React.ReactNode
}

function FormField({ name, render }: FormFieldProps) {
  const { getFieldValue, setFieldValue } = useFieldValueContext()
  const { handleBlur } = useFormActionsContext()
  const { resetKey } = useFormStateContext()

  const [localValue, setLocalValue] = React.useState(() => getFieldValue(name))

  // Optimize effect dependencies
  React.useEffect(() => {
    setLocalValue(getFieldValue(name))
  }, [getFieldValue, name, resetKey])

  // Extract change handler value parsing logic
  const parseChangeValue = React.useCallback(
    (
      event: React.ChangeEvent<HTMLInputElement> | string | number | boolean,
    ) => {
      if (typeof event === 'object' && 'target' in event) {
        const { target } = event
        switch (target.type) {
          case 'number':
            return target.valueAsNumber
          case 'checkbox':
            return target.checked
          case 'date':
            return target.valueAsDate
          default:
            return target.value
        }
      }
      return event
    },
    [],
  )

  const handleChange = React.useCallback(
    (
      event: React.ChangeEvent<HTMLInputElement> | string | number | boolean,
    ) => {
      const newValue = parseChangeValue(event)
      setLocalValue(newValue)

      // Use scheduler for non-urgent updates
      React.startTransition(() => {
        setFieldValue(name, newValue)
      })
    },
    [name, setFieldValue, parseChangeValue],
  )

  const fieldContext = React.useMemo(() => ({ name }), [name])

  const renderedField = React.useMemo(
    () =>
      render({
        name,
        value: localValue,
        onChange: handleChange,
        onBlur: handleBlur,
      }),
    [render, name, localValue, handleChange, handleBlur],
  )

  return (
    <FormFieldContext.Provider value={fieldContext}>
      {renderedField}
    </FormFieldContext.Provider>
  )
}

interface FormItemContextValue {
  id: string
}

const FormItemContext = React.createContext<FormItemContextValue | null>(null)

const useFormItemContext = () => {
  const context = React.useContext(FormItemContext)
  if (!context)
    throw new Error('useFormItemContext must be used within a FormItem')
  return context
}

function FormItem({ className, ...props }: React.ComponentProps<'div'>) {
  const id = React.useId()
  const contextValue = React.useMemo(() => ({ id }), [id])

  return (
    <FormItemContext.Provider value={contextValue}>
      <div
        data-slot="form-item"
        className={cn('grid gap-1', className)}
        {...props}
      />
    </FormItemContext.Provider>
  )
}

function useFormField() {
  const formState = useFormStateContext()
  const formField = React.useContext(FormFieldContext)
  const formItem = useFormItemContext()

  if (!formField) {
    throw new Error('useFormField must be used within a FormField')
  }

  const { id } = formItem
  const { name: fieldName } = formField
  const fieldError = formState.error.fieldErrors[fieldName]

  return React.useMemo(
    () => ({
      id,
      name: fieldName,
      isPending: formState.isPending,
      error: fieldError,
      formItemId: `${id}-form-item`,
      formDescriptionId: `${id}-form-item-description`,
      formMessageId: `${id}-form-item-message`,
    }),
    [id, fieldName, fieldError, formState.isPending],
  )
}

function FormLabel({ className, ...props }: React.ComponentProps<'label'>) {
  const { formItemId, error } = useFormField()

  return (
    <label
      data-slot="form-label"
      data-error={!!error}
      htmlFor={formItemId}
      className={cn(
        'flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50',
        'data-[error=true]:text-destructive',
        className,
      )}
      {...props}
    />
  )
}

function FormControl(props: React.ComponentProps<'input'>) {
  const { formItemId, formDescriptionId, formMessageId, isPending, error } =
    useFormField()

  return (
    <Slot
      data-slot="form-control"
      id={formItemId}
      disabled={isPending}
      aria-describedby={
        !error ? formDescriptionId : `${formDescriptionId} ${formMessageId}`
      }
      aria-invalid={!!error}
      aria-disabled={isPending}
      {...props}
    />
  )
}

function FormDescription({ className, ...props }: React.ComponentProps<'p'>) {
  const { formDescriptionId } = useFormField()

  return (
    <p
      data-slot="form-description"
      id={formDescriptionId}
      className={cn('text-muted-foreground text-sm', className)}
      {...props}
    />
  )
}

function FormMessage({
  className,
  children,
  ...props
}: React.ComponentProps<'p'>) {
  const { formMessageId, error } = useFormField()
  const body = error ? String(error) : children

  if (!body) return null

  return (
    <p
      data-slot="form-message"
      id={formMessageId}
      className={cn('text-destructive text-sm', className)}
      {...props}
    >
      {body}
    </p>
  )
}

export {
  useForm,
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
}
