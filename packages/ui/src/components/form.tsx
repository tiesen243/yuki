import type { StandardSchemaV1 } from '@standard-schema/spec'
import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'

import { cn } from '@yuki/ui/utils'

function useForm<TSchema extends StandardSchemaV1, TData = unknown>(params: {
  schema: TSchema
  defaultValues: StandardSchemaV1.InferInput<TSchema>
  submitFn: (
    values: StandardSchemaV1.InferInput<TSchema>,
  ) => Promise<TData> | TData
  onSuccess?: (data: TData) => Promise<void> | void
  onError?: (error: string) => Promise<void> | void
}) {
  const { schema, defaultValues, submitFn, onSuccess, onError } = params

  const formValuesRef = React.useRef(defaultValues)
  const prevValidatedValuesRef = React.useRef<Record<string, unknown>>({})
  const [isPending, startTransition] = React.useTransition()
  const [data, setData] = React.useState<TData | undefined>(undefined)
  const [error, setError] = React.useState<FormStateContextValue['error']>({
    message: '',
    fieldErrors: {},
  })
  const [resetKey, setResetKey] = React.useState(0)

  const getFieldValues = React.useMemo(() => () => formValuesRef.current, [])
  const getFieldValue = React.useMemo(
    () => (name: keyof StandardSchemaV1.InferInput<TSchema>) =>
      formValuesRef.current[name] as never,
    [],
  )
  const setFieldValue = React.useCallback(
    (
      name: keyof StandardSchemaV1.InferInput<TSchema>,
      value: StandardSchemaV1.InferInput<TSchema>[keyof StandardSchemaV1.InferInput<TSchema>],
    ) => {
      ;(formValuesRef.current as never)[name] = value as never
    },
    [],
  )

  const handleBlur = React.useCallback(
    async (event: React.FocusEvent<HTMLInputElement>) => {
      const { name } = event.target
      const currentValue =
        formValuesRef.current[name as keyof typeof formValuesRef.current]

      if (prevValidatedValuesRef.current[name] === currentValue) return

      prevValidatedValuesRef.current[name] = currentValue

      const res = await schema['~standard'].validate(formValuesRef.current)
      if (res.issues)
        setError((prev) => ({
          message: 'Validation error',
          fieldErrors: {
            ...prev.fieldErrors,
            [name]:
              res.issues.find((issue) => issue.path?.at(0) === name)?.message ??
              '',
          },
        }))
      else
        setError((prev) => ({
          message: '',
          fieldErrors: {
            ...prev.fieldErrors,
            [name]: '',
          },
        }))
    },
    [schema],
  )

  const handleSubmit = React.useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      event.stopPropagation()

      const parsed = await schema['~standard'].validate(formValuesRef.current)
      if (parsed.issues) {
        setError({
          message: 'Validation error',
          fieldErrors: parsed.issues.reduce<Record<string, string>>(
            (acc, issue) => ({
              ...acc,
              [issue.path as never]: issue.message,
            }),
            {},
          ) as Record<keyof StandardSchemaV1.InferInput<TSchema>, string>,
        })
        if (onError) await onError('Validation error')
        return
      }

      startTransition(async () => {
        try {
          const data = await submitFn(parsed.value)
          setData(data)
          if (onSuccess) await onSuccess(data)
          setError({ message: '', fieldErrors: {} })
        } catch (error) {
          let message: string
          if (error instanceof Error) message = error.message
          else message = 'Unknown error'

          setData(undefined)
          setError({ message, fieldErrors: {} })
          if (onError) await onError(message)
        }
      })
    },
    [onError, onSuccess, schema, submitFn],
  )

  const reset = React.useCallback(() => {
    formValuesRef.current = defaultValues
    prevValidatedValuesRef.current = {}
    setError({ message: '', fieldErrors: {} })
    setData(undefined)
    setResetKey((prev) => prev + 1)
  }, [defaultValues])

  return {
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
  }
}

interface FormStateContextValue {
  isPending: boolean
  data: unknown
  error: { message?: string; fieldErrors: Record<string, string> }
  handleBlur: (
    event: React.FocusEvent<HTMLInputElement>,
  ) => Promise<void> | void
  resetKey: number
}

const FormStateContext = React.createContext<FormStateContextValue>(
  {} as FormStateContextValue,
)

interface FieldValueContextValue<TSchema extends StandardSchemaV1> {
  getFieldValue: (name: keyof StandardSchemaV1.InferInput<TSchema>) => unknown
  setFieldValue: (
    name: keyof StandardSchemaV1.InferInput<TSchema>,
    value: StandardSchemaV1.InferInput<TSchema>[keyof StandardSchemaV1.InferInput<TSchema>],
  ) => void
  handleBlur: (
    event: React.FocusEvent<HTMLInputElement>,
  ) => Promise<void> | void
}

const FieldValueContext = React.createContext<
  FieldValueContextValue<StandardSchemaV1>
>({} as FieldValueContextValue<StandardSchemaV1>)

function Form<T extends StandardSchemaV1>({
  className,
  form,
  ...props
}: React.ComponentProps<'form'> & { form: ReturnType<typeof useForm<T>> }) {
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

  const formStateContextValue = React.useMemo(
    () => ({
      isPending,
      data,
      error,
      handleBlur,
      resetKey,
    }),
    [isPending, data, error, handleBlur, resetKey],
  )

  const fieldValueContextValue = React.useMemo(
    () => ({ getFieldValue, setFieldValue, handleBlur }),
    [getFieldValue, setFieldValue, handleBlur],
  )

  return (
    <FormStateContext value={formStateContextValue}>
      <FieldValueContext value={fieldValueContextValue}>
        <form
          data-slot="form"
          className={cn('grid gap-4', className)}
          onSubmit={handleSubmit}
          {...props}
        />
      </FieldValueContext>
    </FormStateContext>
  )
}

interface FormFieldContextValue {
  name: string
  formItemId?: string
  formDescriptionId?: string
  formMessageId?: string
}

const FormFieldContext = React.createContext<FormFieldContextValue>(
  {} as FormFieldContextValue,
)

function FormField({
  name,
  render,
}: {
  name: string
  render: (props: {
    name: string
    value: string
    onChange: (
      event: React.ChangeEvent<HTMLInputElement> | string | number | boolean,
    ) => void
    onBlur: (event: React.FocusEvent<HTMLInputElement>) => Promise<void> | void
  }) => React.ReactNode
}) {
  const fieldValueContext = React.use(FieldValueContext)
  const formStateContext = React.use(FormStateContext)
  const { getFieldValue, setFieldValue } = fieldValueContext
  const { handleBlur, resetKey } = formStateContext

  const [localValue, setLocalValue] = React.useState(() =>
    getFieldValue(name as never),
  )

  const prevNameRef = React.useRef(name)

  React.useEffect(() => {
    const shouldUpdate = prevNameRef.current !== name || resetKey !== 0
    if (shouldUpdate) {
      setLocalValue(getFieldValue(name as never))
      prevNameRef.current = name
    }
  }, [getFieldValue, name, resetKey])

  const handleChange = React.useCallback(
    (
      event: React.ChangeEvent<HTMLInputElement> | string | number | boolean,
    ) => {
      let newValue: unknown

      if (event && typeof event === 'object' && 'target' in event) {
        if (event.target.type === 'number')
          newValue = event.target.valueAsNumber
        else if (event.target.type === 'checkbox')
          newValue = event.target.checked
        else if (event.target.type === 'date')
          newValue = event.target.valueAsDate
        else newValue = event.target.value
      } else newValue = event

      setLocalValue(newValue as never)

      requestAnimationFrame(() => {
        setFieldValue(name as never, newValue as never)
      })
    },
    [name, setFieldValue],
  )

  const renderedField = React.useMemo(
    () =>
      render({
        name,
        value: localValue as string,
        onChange: handleChange,
        onBlur: handleBlur,
      }),
    [render, name, localValue, handleChange, handleBlur],
  )

  return <FormFieldContext value={{ name }}>{renderedField}</FormFieldContext>
}

interface FormItemContextValue {
  id: string
}

const FormItemContext = React.createContext<FormItemContextValue>(
  {} as FormItemContextValue,
)

function FormItem({ className, ...props }: React.ComponentProps<'fieldset'>) {
  const id = React.useId()
  const { isPending } = useFormField()

  return (
    <FormItemContext value={{ id }}>
      <fieldset
        data-slot="form-item"
        className={cn('grid gap-1', className)}
        disabled={isPending}
        {...props}
      />
    </FormItemContext>
  )
}

function useFormField() {
  const formState = React.use(FormStateContext)
  const formField = React.use(FormFieldContext)
  const formItem = React.use(FormItemContext)

  const { id } = formItem
  const fieldName = formField.name
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
