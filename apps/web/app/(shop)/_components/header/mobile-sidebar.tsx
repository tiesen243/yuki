import { MenuIcon } from 'lucide-react'

import { Button } from '@yuki/ui/button'
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTrigger } from '@yuki/ui/sheet'

import { Brand } from './brand'
import { Category } from './category'
import { Search } from './search'

export const MobileSidebar: React.FC = () => (
  <Sheet>
    <SheetTrigger className="md:hidden" asChild>
      <Button variant="outline" size="icon">
        <MenuIcon />
      </Button>
    </SheetTrigger>

    <SheetContent side="left" className="flex flex-col gap-4">
      <SheetHeader>
        <Brand className="not-sr-only text-3xl" />
      </SheetHeader>

      <Search />

      <Category
        className="flex-1 flex-col"
        itemClassName="rounded-lg px-3 py-2 hover:bg-accent hover:text-accent-foreground"
      />

      <SheetFooter>&copy; {new Date().getFullYear()} Yuki. All rights reserved.</SheetFooter>
    </SheetContent>
  </Sheet>
)
