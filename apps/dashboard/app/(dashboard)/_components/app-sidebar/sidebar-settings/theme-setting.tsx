'use client'

import { useEffect, useState } from 'react'

import { useTheme } from '@yuki/ui'
import { Loader2Icon, MoonIcon, SunIcon } from '@yuki/ui/icons'
import { SidebarMenuButton, SidebarMenuItem } from '@yuki/ui/sidebar'

export const ThemeSetting: React.FC = () => {
  const { theme, setTheme } = useTheme()
  const Icon = theme === 'dark' ? SunIcon : MoonIcon
  const text = theme === 'dark' ? 'Light' : 'Dark'
  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark')

  const [isMounted, setMounted] = useState<boolean>(false)
  useEffect(() => setMounted(true), [])
  if (!isMounted)
    return (
      <SidebarMenuItem>
        <SidebarMenuButton>
          <Loader2Icon className="animate-spin" />
          <span>Loading...</span>
        </SidebarMenuButton>
      </SidebarMenuItem>
    )

  return (
    <SidebarMenuItem>
      <SidebarMenuButton onClick={toggleTheme}>
        <Icon />
        <span>{text} mode</span>
      </SidebarMenuButton>
    </SidebarMenuItem>
  )
}
