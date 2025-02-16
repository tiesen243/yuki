'use client'

import { buttonVariants } from '@yuki/ui/components/button'
import { cn } from '@yuki/ui/utils'
import { UploadButton as Base } from '@yuki/uploader/react'

export function UploadButton({
  disabled = false,
  ...props
}: React.ComponentProps<typeof Base>) {
  return (
    <Base
      {...props}
      content={{
        button({ isUploading, uploadProgress }) {
          if (isUploading)
            return (
              <button className={cn(buttonVariants(), 'min-w-28')} disabled>
                {uploadProgress}%
              </button>
            )

          return (
            <span
              className={cn(
                buttonVariants(),
                'min-w-28',
                disabled && 'pointer-events-none opacity-50',
              )}
            >
              Choose File
            </span>
          )
        },
      }}
      appearance={{ allowedContent: 'text-muted-foreground' }}
    />
  )
}
