import { Typography } from '@yuki/ui/typography'

export function MapSection() {
  return (
    <div className="overflow-hidden rounded-lg border">
      <div className="bg-muted/30 relative aspect-video w-full">
        {/* This would typically be a Google Maps iframe or a map component */}
        {/* For this example, I'm using a placeholder */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="p-4 text-center">
            <Typography variant="p" color="muted">
              Map placeholder - would integrate with Google Maps or similar
              service
            </Typography>
          </div>
        </div>
        <div className="from-background/80 pointer-events-none absolute inset-0 bg-gradient-to-t to-transparent" />
      </div>
      <div className="p-4">
        <Typography variant="p" className="text-sm">
          <strong>Yuki Headquarters</strong>
          <br />
          123 Skibidi Street, Tokyo, Japan 100-0001
        </Typography>
        <a
          href="https://maps.google.com/?q=Tokyo+Japan"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary mt-2 inline-block text-sm hover:underline"
        >
          Get directions
        </a>
      </div>
    </div>
  )
}
