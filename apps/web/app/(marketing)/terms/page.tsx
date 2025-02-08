import { Typography } from '@yuki/ui/typography'

import { createMetadata } from '@/lib/metadata'

export default function TermsOfServicePage() {
  return (
    <main className="container max-w-4xl py-12">
      <Typography level="h1" className="mb-6">
        Terms of Service
      </Typography>

      <article>
        <Typography level="h2" className="border-b">
          1. Acceptance of Terms
        </Typography>
        <Typography className="mb-4">
          By accessing and using this website, you accept and agree to be bound by the
          terms and provision of this agreement.
        </Typography>

        <Typography level="h2" className="border-b">
          2. Use License
        </Typography>
        <Typography className="mb-4">
          Permission is granted to temporarily download one copy of the materials
          (information or software) on this website for personal, non-commercial
          transitory viewing only.
        </Typography>

        <Typography level="h2" className="border-b">
          3. Disclaimer
        </Typography>
        <Typography className="mb-4">
          The materials on this website are provided on an &apos;as is&apos; basis. We
          make no warranties, expressed or implied, and hereby disclaim and negate all
          other warranties including, without limitation, implied warranties or conditions
          of merchantability, fitness for a particular purpose, or non-infringement of
          intellectual property or other violation of rights.
        </Typography>

        <Typography level="h2" className="border-b">
          4. Limitations
        </Typography>
        <Typography>
          In no event shall we or our suppliers be liable for any damages (including,
          without limitation, damages for loss of data or profit, or due to business
          interruption) arising out of the use or inability to use the materials on our
          website.
        </Typography>
      </article>
    </main>
  )
}

export const metadata = createMetadata({
  title: 'Terms of Service',
  description: 'Terms of Service',
})
