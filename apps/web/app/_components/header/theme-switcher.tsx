import {
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from '@yuki/ui/dropdown-menu'
import { LaptopIcon, MoonIcon, SunIcon, SunMoonIcon } from '@yuki/ui/icons'
import { useTheme } from '@yuki/ui/utils'

export const ThemeSwitcher: React.FC = () => {
  const { theme, setTheme } = useTheme()

  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger className="data-[variant=destructive]:*:[svg]:!text-destructive [&_svg:not([class*='text-'])]:text-muted-foreground gap-2 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4">
        <SunMoonIcon /> Apperance
      </DropdownMenuSubTrigger>
      <DropdownMenuPortal>
        <DropdownMenuSubContent>
          <DropdownMenuItem
            className={
              theme === 'light' ? 'text-foreground' : 'text-muted-foreground'
            }
            onClick={() => {
              setTheme('light')
            }}
          >
            <SunIcon /> Light mode
            <DropdownMenuShortcut>⌘L</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem
            className={
              theme === 'dark' ? 'text-foreground' : 'text-muted-foreground'
            }
            onClick={() => {
              setTheme('dark')
            }}
          >
            <MoonIcon /> Dark mode
            <DropdownMenuShortcut>⌘D</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem
            className={
              theme === 'system' ? 'text-foreground' : 'text-muted-foreground'
            }
            onClick={() => {
              setTheme('system')
            }}
          >
            <LaptopIcon /> System
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuSubContent>
      </DropdownMenuPortal>
    </DropdownMenuSub>
  )
}
