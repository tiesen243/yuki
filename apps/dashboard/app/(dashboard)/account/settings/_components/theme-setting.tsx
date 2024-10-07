'use client'

import { useTheme } from '@yuki/ui'
import { AccordionContent, AccordionItem, AccordionTrigger } from '@yuki/ui/accordion'
import { Label } from '@yuki/ui/label'
import { Switch } from '@yuki/ui/switch'

export const ThemeSetting: React.FC = () => {
  const { theme, setTheme } = useTheme()

  return (
    <AccordionItem value="theme-setting">
      <AccordionTrigger>Theme Setting</AccordionTrigger>
      <AccordionContent className="flex items-center justify-between">
        <Label htmlFor="theme-switch">Dark Mode</Label>

        <Switch
          id="theme-switch"
          checked={theme === 'dark'}
          onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
        />
      </AccordionContent>
    </AccordionItem>
  )
}
