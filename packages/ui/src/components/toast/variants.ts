import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'

const toastViewportVariants = cva(
  'fixed top-0 z-100 flex max-h-screen w-full flex-col-reverse p-4 sm:top-auto sm:right-0 sm:bottom-0 sm:flex-col md:max-w-[420px]',
)
type ToastViewportVariants = VariantProps<typeof toastViewportVariants>

const toastVariants = cva(
  'group data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full sm:data-[state=open]:slide-in-from-bottom-full pointer-events-auto relative flex w-full items-center justify-between space-x-2 overflow-hidden rounded-md border p-4 pr-6 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none',
  {
    variants: {
      variant: {
        default: 'bg-card text-card-foreground border',
        success:
          'border-[hsl(145,92%,91%)] bg-[hsl(143,85%,96%)] text-[hsl(140,100%,27%)] dark:border-[hsl(147,100%,12%)] dark:bg-[hsl(150,100%,6%)] dark:text-[hsl(150,86%,65%)]',
        info: 'border-[hsl(221,91%,91%)] bg-[hsl(208,100%,97%)] text-[hsl(210,92%,45%)] dark:border-[hsl(223,100%,12%)] dark:bg-[hsl(215,100%,6%)] dark:text-[hsl(216,87%,65%)]',
        warning:
          'border-[hsl(49,91%,91%)] bg-[hsl(49,100%,97%)] text-[hsl(31,92%,45%)] dark:border-[hsl(60,100%,12%)] dark:bg-[hsl(64,100%,6%)] dark:text-[hsl(46,87%,65%)]',
        error:
          'border-[hsl(359,100%,94%)] bg-[hsl(359,100%,97%)] text-[hsl(360,100%,45%)] dark:border-[hsl(357,89%,16%)] dark:bg-[hsl(358,76%,10%)] dark:text-[hsl(358,100%,81%)]',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)
type ToastVariants = VariantProps<typeof toastVariants>

const toastActionVariants = cva(
  'hover:bg-secondary focus:ring-ring inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium transition-colors focus:ring-1 focus:outline-hidden disabled:pointer-events-none disabled:opacity-50',
)
type ToastActionVariants = VariantProps<typeof toastActionVariants>

const toastCloseVariants = cva(
  'text-foreground/50 hover:text-foreground absolute top-1 right-1 rounded-md p-1 opacity-0 transition-opacity group-hover:opacity-100 focus:opacity-100 focus:ring-1 focus:outline-hidden',
)
type ToastCloseVariants = VariantProps<typeof toastCloseVariants>

const toastTitleVariants = cva('text-sm font-semibold [&+div]:text-xs')
type ToastTitleVariants = VariantProps<typeof toastTitleVariants>

const toastDescriptionVariants = cva('text-sm opacity-90')
type ToastDescriptionVariants = VariantProps<typeof toastDescriptionVariants>

export type {
  ToastViewportVariants,
  ToastVariants,
  ToastActionVariants,
  ToastCloseVariants,
  ToastTitleVariants,
  ToastDescriptionVariants,
}
export {
  toastViewportVariants,
  toastVariants,
  toastActionVariants,
  toastCloseVariants,
  toastTitleVariants,
  toastDescriptionVariants,
}
