import { DropdownMenuItem } from '@yuki/ui/dropdown-menu'
import { LogOut } from '@yuki/ui/icons'

import { signOut } from './signout-btn.server'

export const SignoutBtn: React.FC = () => (
  <DropdownMenuItem className="gap-2" onClick={() => signOut()}>
    <LogOut className="h-4 w-4 text-muted-foreground" />
    Sign out
  </DropdownMenuItem>
)
