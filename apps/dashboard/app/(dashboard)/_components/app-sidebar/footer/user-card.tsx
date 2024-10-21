import { ChevronsUpDown } from 'lucide-react'

import type { User } from '@yuki/db'
import { Avatar, AvatarFallback, AvatarImage } from '@yuki/ui/avatar'

export const UserCard: React.FC<{ user: User; icon?: boolean }> = ({ user, icon }) => (
  <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm transition-all">
    <Avatar className="h-7 w-7 rounded-md">
      <AvatarImage src={user.avatar ?? user.discord?.avatar} alt={user.name} />
      <AvatarFallback>{user.name.slice(0, 2)}</AvatarFallback>
    </Avatar>

    <div className="grid flex-1">
      <div className="font-medium">
        {user.name}
        {user.discord && <span className="text-muted-foreground"> ({user.discord.username})</span>}
      </div>
      <div className="overflow-hidden text-xs text-muted-foreground">
        <div className="line-clamp-1">{user.email}</div>
      </div>
    </div>

    {icon && <ChevronsUpDown className="ml-auto mr-0.5 h-4 w-4 text-muted-foreground/50" />}
  </div>
)
