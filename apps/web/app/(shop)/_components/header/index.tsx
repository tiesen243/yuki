import { Brand } from './brand'
import { Category } from './category'
import { MobileSidebar } from './mobile-sidebar'
import { Search } from './search'
import { User } from './user'

export const Header: React.FC = () => (
  <header className="sticky inset-0 z-50 border-b bg-background/70 py-2 backdrop-blur-xl backdrop-saturate-150">
    <div className="container flex items-center justify-between gap-4">
      <MobileSidebar />

      <Brand />

      <Category className="hidden md:flex" itemClassName="hover:text-muted-foreground" />

      <Search className="hidden flex-1 md:flex" />

      <User />
    </div>
  </header>
)
