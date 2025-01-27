'use client'

import { Button } from '@yuki/ui/button'
import { MoonIcon, SunIcon } from '@yuki/ui/icons'
import { useTheme } from '@yuki/ui/utils'

import { useMounted } from '@/hooks/use-mounted'

export const ThemeBtn: React.FC = () => {
  const { theme, setTheme } = useTheme()
  const isMounted = useMounted()
  if (!isMounted)
    return (
      <Button variant="outline" size="icon" className="bg-primary/10 animate-pulse" />
    )

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => {
        setTheme(theme === 'dark' ? 'light' : 'dark')
      }}
    >
      {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
    </Button>
  )
}
