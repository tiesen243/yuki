import { Button } from '@yuki/ui/button'
import { Typography } from '@yuki/ui/typography'

export default function IndexPage() {
  return (
    <main className="container space-y-4 py-4">
      <div className="flex gap-4">
        {(['default', 'success', 'warning', 'info', 'muted'] as const).map(
          (color) => (
            <Typography key={color} color={color} variant="h5">
              {color}
            </Typography>
          ),
        )}
      </div>

      <div className="flex gap-4">
        {(
          [
            'default',
            'secondary',
            'success',
            'warning',
            'info',
            'destructive',
            'ghost',
            'outline',
            'link',
          ] as const
        ).map((variant) => (
          <Button key={variant} variant={variant}>
            {variant}{' '}
          </Button>
        ))}
      </div>
    </main>
  )
}
