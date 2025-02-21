import { buttonVariants } from '@yuki/ui/components/button'
import { cn } from '@yuki/ui/utils'
import { UploadButton as Base } from '@yuki/uploader/react'

export function UploadButton({ ...props }: React.ComponentProps<typeof Base>) {
  return (
    <Base
      {...props}
      config={{
        ...props.config,
        cn,
      }}
      appearance={{
        button: buttonVariants({ size: 'sm' }),
        allowedContent: 'text-muted-foreground',
      }}
    />
  )
}
