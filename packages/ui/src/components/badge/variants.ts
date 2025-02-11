import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'

const badgeVariants = cva(
  'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium lowercase',
  {
    variants: {
      variant: {
        NEW: 'bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100',
        PENDING: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100',
        CONFIRMED: 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100',
        PROCESSING:
          'bg-purple-100 text-purple-800 dark:bg-purple-800 dark:text-purple-100',
        SHIPPING: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-800 dark:text-indigo-100',
        DELIVERED:
          'bg-emerald-100 text-emerald-800 dark:bg-emerald-800 dark:text-emerald-100',
        CANCELED: 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100',
        FAILED: 'bg-rose-100 text-rose-800 dark:bg-rose-800 dark:text-rose-100',
        RETURNED: 'bg-orange-100 text-orange-800 dark:bg-orange-800 dark:text-orange-100',
      },
    },
    defaultVariants: {
      variant: 'NEW',
    },
  },
)

type BadgeVariants = VariantProps<typeof badgeVariants>

export { badgeVariants }
export type { BadgeVariants }
