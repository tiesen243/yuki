import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'

const badgeVariants = cva(
  'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize',
  {
    variants: {
      variant: {
        Default: 'bg-card text-card-foregound',
        NEW: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
        PENDING: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
        CONFIRMED: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
        PROCESSING:
          'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
        DELIVERED:
          'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200',
        CANCELLED: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',

        UNPAID: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
        PAID: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
        REFUND: 'bg-violet-100 text-violet-800 dark:bg-violet-900 dark:text-violet-200',
      },
    },
    defaultVariants: {
      variant: 'Default',
    },
  },
)

type BadgeVariants = VariantProps<typeof badgeVariants>

export { badgeVariants }
export type { BadgeVariants }
