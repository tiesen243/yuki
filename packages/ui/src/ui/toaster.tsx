'use client'

import { CircleAlert, CircleCheck } from 'lucide-react'

import { useToast } from '@yuki/ui/hooks/use-toast'
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from '@yuki/ui/toast'

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props} className="justify-start">
            {props.variant === 'destructive' ? <CircleAlert /> : <CircleCheck />}
            <div className="grid gap-1">
              {title && <ToastTitle className="flex">{title}</ToastTitle>}
              {description && <ToastDescription>{description}</ToastDescription>}
            </div>
            {action}
            <ToastClose />
          </Toast>
        )
      })}
      <ToastViewport />
    </ToastProvider>
  )
}
