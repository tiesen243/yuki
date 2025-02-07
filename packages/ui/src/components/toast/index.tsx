'use client'

import type { ToasterProps } from 'sonner'
import * as React from 'react'
import { useTheme } from 'next-themes'
import { Toaster as ToasterPrimitive } from 'sonner'

const Toaster = React.forwardRef<
  React.ComponentRef<typeof ToasterPrimitive>,
  ToasterProps
>(({ ...props }, ref) => {
  const { theme = 'system' } = useTheme()

  return <ToasterPrimitive ref={ref} theme={theme as ToasterProps['theme']} {...props} />
})
Toaster.displayName = 'Toaster'

export { Toaster }
export { toast } from 'sonner'
