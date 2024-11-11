'use client'

import { useEffect, useState } from 'react'

import { useTheme } from '@yuki/ui'
import { MoonIcon, SunIcon } from '@yuki/ui/icons'
import { SidebarMenuButton, SidebarMenuItem } from '@yuki/ui/sidebar'

export const ChangeTheme: React.FC = () => {
  const { theme, setTheme } = useTheme()

  const [isMounted, setIsMounted] = useState<boolean>(false)
  useEffect(() => setIsMounted(true), [])
  if (!isMounted)
    return (
      <SidebarMenuItem>
        <SidebarMenuButton>Loading...</SidebarMenuButton>
      </SidebarMenuItem>
    )

  return (
    <SidebarMenuItem>
      <SidebarMenuButton onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
        {theme === 'light' ? <MoonIcon /> : <SunIcon />}
        <span>{theme === 'light' ? 'Dark Mode' : 'Light Mode'}</span>
      </SidebarMenuButton>
    </SidebarMenuItem>
  )
}
