'use client'

import { useEffect, useState } from 'react'

import { Button } from '@yuki/ui/button'
import { MoonIcon, SunIcon } from '@yuki/ui/icons'
import { useTheme } from '@yuki/ui/utils'

export const ThemeBtn: React.FC = () => {
  const { theme, setTheme } = useTheme()

  const [isMounted, setMount] = useState<boolean>(false)
  useEffect(() => {
    setMount(true)
  }, [])
  if (!isMounted) return null

  const toggle = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      className="fixed right-4 bottom-4"
      onClick={toggle}
    >
      {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
    </Button>
  )
}
