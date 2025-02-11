import { cva } from 'class-variance-authority'

const tableVariants = cva('w-full caption-bottom text-sm')
const tableHeaderVariants = cva('[&_tr]:border-b')
const tableBodyVariants = cva('[&_tr:last-child]:border-0')
const tableFooterVariants = cva('bg-muted/50 border-t font-medium last:[&>tr]:border-b-0')
const tableRowVariants = cva(
  'hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors',
)
const tableHeadVariants = cva(
  'text-muted-foreground h-10 px-2 text-left align-middle font-medium [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]',
)
const tableCellVariants = cva(
  'p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]',
)
const tableCaptionVariants = cva('text-muted-foreground mt-4 text-sm')

export {
  tableVariants,
  tableHeaderVariants,
  tableBodyVariants,
  tableFooterVariants,
  tableRowVariants,
  tableHeadVariants,
  tableCellVariants,
  tableCaptionVariants,
}
