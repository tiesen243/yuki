import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'

const selectTriggerVariants = cva(
  'border-input ring-offset-background placeholder:text-muted-foreground focus:ring-ring flex h-9 w-full items-center justify-between rounded-md border bg-transparent px-3 py-2 text-sm whitespace-nowrap shadow-xs focus:ring-1 focus:outline-hidden disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1',
)
type SelectTriggerVariants = VariantProps<typeof selectTriggerVariants>

const scrollButtonVariants = cva('flex cursor-default items-center justify-center py-1')
type ScrollButtonVariants = VariantProps<typeof scrollButtonVariants>

const selectContentVariants = cva(
  'bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border shadow-md',
  {
    variants: {
      position: {
        'item-aligned': '',
        popper:
          'data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1',
      },
    },
    defaultVariants: {
      position: 'item-aligned',
    },
  },
)
type SelectContentVariants = VariantProps<typeof selectContentVariants>

const selectViewportVariants = cva('p-1', {
  variants: {
    position: {
      'item-aligned': '',
      popper:
        'h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]',
    },
  },
  defaultVariants: {
    position: 'item-aligned',
  },
})
type SelectViewportVariants = VariantProps<typeof selectViewportVariants>

const selectLabelVariants = 'px-2 py-1.5 text-sm font-semibold'

const selectItemVariants =
  'focus:bg-accent focus:text-accent-foreground relative flex w-full cursor-default items-center rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden select-none data-disabled:pointer-events-none data-disabled:opacity-50'

const selectItemIndicatorWrapper =
  'absolute right-2 flex h-3.5 w-3.5 items-center justify-center'

const selectSeparatorVariants = 'bg-muted -mx-1 my-1 h-px'

export type {
  SelectTriggerVariants,
  ScrollButtonVariants,
  SelectContentVariants,
  SelectViewportVariants,
}
export {
  selectTriggerVariants,
  scrollButtonVariants,
  selectContentVariants,
  selectViewportVariants,
  selectLabelVariants,
  selectItemVariants,
  selectItemIndicatorWrapper,
  selectSeparatorVariants,
}
