import * as React from 'react'

import { cn } from '@yuki/ui/utils'

import {
  tableBodyVariants,
  tableCaptionVariants,
  tableCellVariants,
  tableFooterVariants,
  tableHeaderVariants,
  tableHeadVariants,
  tableRowVariants,
  tableVariants,
} from './variants'

const Table: React.FC<React.ComponentProps<'table'>> = ({ className, ...props }) => (
  <div className="relative w-full overflow-auto">
    <table className={cn(tableVariants({ className }))} {...props} />
  </div>
)
Table.displayName = 'Table'

const TableHeader: React.FC<React.ComponentProps<'thead'>> = ({
  className,
  ...props
}) => <thead className={cn(tableHeaderVariants({ className }))} {...props} />
TableHeader.displayName = 'TableHeader'

const TableBody: React.FC<React.ComponentProps<'tbody'>> = ({ className, ...props }) => (
  <tbody className={cn(tableBodyVariants({ className }))} {...props} />
)
TableBody.displayName = 'TableBody'

const TableFooter: React.FC<React.ComponentProps<'tfoot'>> = ({
  className,
  ...props
}) => <tfoot className={cn(tableFooterVariants({ className }))} {...props} />
TableFooter.displayName = 'TableFooter'

const TableRow: React.FC<React.ComponentProps<'tr'>> = ({ className, ...props }) => (
  <tr className={cn(tableRowVariants({ className }))} {...props} />
)
TableRow.displayName = 'TableRow'

const TableHead: React.FC<React.ComponentProps<'th'>> = ({ className, ...props }) => (
  <th className={cn(tableHeadVariants({ className }))} {...props} />
)
TableHead.displayName = 'TableHead'

const TableCell: React.FC<React.TdHTMLAttributes<HTMLTableCellElement>> = ({
  className,
  ...props
}) => <td className={cn(tableCellVariants({ className }))} {...props} />
TableCell.displayName = 'TableCell'

const TableCaption: React.FC<React.ComponentProps<'caption'>> = ({
  className,
  ...props
}) => <caption className={cn(tableCaptionVariants({ className }))} {...props} />
TableCaption.displayName = 'TableCaption'

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
}
