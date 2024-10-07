'use client'

import { useRouter } from 'next/navigation'
import { LogOut } from 'lucide-react'

import { DropdownMenuItem } from '@yuki/ui/dropdown-menu'

import { signOut } from '@/lib/actions'
import { getClientUrl } from '@/lib/utils'

export const LogoutBtn: React.FC = () => {
  const router = useRouter()
  const handleLogout = async () => {
    await signOut()
    router.push(`${getClientUrl()}/home`)
  }

  return (
    <DropdownMenuItem onClick={handleLogout}>
      <LogOut className="mr-2 h-4 w-4 text-muted-foreground" />
      Log out
    </DropdownMenuItem>
  )
}
