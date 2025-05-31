import Form from 'next/form'

import { cn } from '@yuki/ui'
import { SearchIcon } from '@yuki/ui/icons'
import { Input } from '@yuki/ui/input'

export const Searchbar: React.FC<
  Omit<React.ComponentProps<typeof Form>, 'action'>
> = ({ className, ...props }) => {
  return (
    <Form {...props} action="/shop" className={cn('relative', className)}>
      <Input name="search" placeholder="Search..." className="pr-8" />
      <button className="absolute top-2.5 right-2 z-10">
        <SearchIcon className="stroke-muted-foreground hover:stroke-foreground size-4" />
      </button>
    </Form>
  )
}
