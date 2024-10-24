import { Button } from '@yuki/ui/button'
import { SearchIcon } from '@yuki/ui/icons'
import { Input } from '@yuki/ui/input'

import { Brand } from '@/app/_components/brand'
import { Categories } from './categories'
import { User } from './user'

export const Header: React.FC = () => (
  <header className="sticky inset-0 z-50 border-b bg-background/70 py-2 backdrop-blur-xl backdrop-saturate-150">
    <div className="container flex items-center justify-between gap-4">
      <Brand />

      <div className="flex-1">
        <form className="flex items-center gap-2">
          <Input name="q" type="search" placeholder="What are you looking for?" />
          <Button variant="outline" size="icon" className="aspect-square">
            <SearchIcon />
          </Button>
        </form>
        <Categories />
      </div>

      <User />
    </div>
  </header>
)
