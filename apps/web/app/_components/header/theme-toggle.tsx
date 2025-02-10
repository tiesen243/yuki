'use client'

import { useTheme } from 'next-themes'

import { Button } from '@yuki/ui/button'
import { MoonIcon, SunIcon } from '@yuki/ui/icons'

import { useMounted } from '@/hooks/use-mounted'

export const ThemeBtn: React.FC = () => {
  const { theme, setTheme } = useTheme()
  const isMounted = useMounted()
  if (!isMounted)
    return (
      <Button
        variant="outline"
        size="icon"
        className="bg-primary/10 hidden animate-pulse md:inline-flex"
      />
    )

  return (
    <Button
      variant="outline"
      size="icon"
      className="hidden md:inline-flex"
      onClick={() => {
        setTheme(theme === 'dark' ? 'light' : 'dark')
      }}
    >
      <span className="sr-only">Toggle theme</span>
      {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
    </Button>
  )
}

export const SidebarThemeToggle: React.FC = () => {
  const { theme, setTheme } = useTheme()
  const isMounted = useMounted()

  if (!isMounted)
    return (
      <button className="bg-primary/10 animate-pulse rounded-lg px-2 py-1 transition-colors">
        &nbsp;
      </button>
    )

  return (
    <button
      className="text-foreground hover:bg-background/40 inline-flex items-center gap-2 rounded-lg px-2 py-1 text-start capitalize transition-colors"
      onClick={() => {
        setTheme(theme === 'dark' ? 'light' : 'dark')
      }}
    >
      {theme === 'dark' ? <SunIcon size={16} /> : <MoonIcon size={16} />}

      <span>{theme} Mode</span>
    </button>
  )
}
