import type { ToastRootProps } from 'radix-vue'
import type { HTMLAttributes } from 'vue'

import type { ToastVariants } from './variants'

export { default as ToastProvider } from './toast-provider.vue'
export { default as ToastViewport } from './toast-viewport.vue'
export { default as Toast } from './toast.vue'
export { default as ToastTitle } from './toast-title.vue'
export { default as ToastDescription } from './toast-description.vue'
export { default as ToastAction } from './toast-action.vue'
export { default as ToastClose } from './toast-close.vue'

export { default as Toaster } from './toaster.vue'

export interface ToastProps extends ToastRootProps {
  class?: HTMLAttributes['class']
  variant?: ToastVariants['variant']
  onOpenChange?: ((value: boolean) => void) | undefined
}
