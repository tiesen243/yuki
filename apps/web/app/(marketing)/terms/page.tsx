import { Typography } from '@yuki/ui/typography'

import { createMetadata } from '@/lib/metadata'

export default function TermsOfServicePage() {
  return (
    <main className="container max-w-4xl py-12">
      <Typography variant="h1" className="mb-6">
        Terms of Service
      </Typography>
      <Typography className="mb-4">
        Last updated: {new Date().toLocaleDateString()}
      </Typography>

      <article className="space-y-8">
        <section>
          <Typography variant="h2" className="border-b">
            1. Acceptance of Terms
          </Typography>
          <Typography className="mb-4">
            By accessing and using this website, you accept and agree to be
            bound by the terms and provision of this agreement.
          </Typography>
          <Typography className="mb-4">
            If you do not agree to abide by the above, you are not authorized to
            use or access this website and its services.
          </Typography>
        </section>

        <section>
          <Typography variant="h2" className="border-b">
            2. Use License
          </Typography>
          <Typography className="mb-4">
            Permission is granted to temporarily download one copy of the
            materials (information or software) on this website for personal,
            non-commercial transitory viewing only.
          </Typography>
          <Typography className="mb-4">
            This is the grant of a license, not a transfer of title, and under
            this license you may not:
          </Typography>
          <Typography variant="ul" className="mb-4">
            <li>Modify or copy the materials</li>
            <li>
              Use the materials for any commercial purpose or for any public
              display
            </li>
            <li>
              Attempt to reverse engineer any software contained on the website
            </li>
            <li>
              Remove any copyright or other proprietary notations from the
              materials
            </li>
            <li>
              Transfer the materials to another person or &quot;mirror&quot; the
              materials on any other server
            </li>
          </Typography>
          <Typography className="mb-4">
            This license shall automatically terminate if you violate any of
            these restrictions and may be terminated by us at any time.
          </Typography>
        </section>

        <section>
          <Typography variant="h2" className="border-b">
            3. Disclaimer
          </Typography>
          <Typography className="mb-4">
            The materials on this website are provided on an &apos;as is&apos;
            basis. We make no warranties, expressed or implied, and hereby
            disclaim and negate all other warranties including, without
            limitation, implied warranties or conditions of merchantability,
            fitness for a particular purpose, or non-infringement of
            intellectual property or other violation of rights.
          </Typography>
          <Typography className="mb-4">
            Further, we do not warrant or make any representations concerning
            the accuracy, likely results, or reliability of the use of the
            materials on this website or otherwise relating to such materials or
            on any sites linked to this website.
          </Typography>
        </section>

        <section>
          <Typography variant="h2" className="border-b">
            4. Limitations
          </Typography>
          <Typography className="mb-4">
            In no event shall we or our suppliers be liable for any damages
            (including, without limitation, damages for loss of data or profit,
            or due to business interruption) arising out of the use or inability
            to use the materials on our website.
          </Typography>
          <Typography className="mb-4">
            Because some jurisdictions do not allow limitations on implied
            warranties, or limitations of liability for consequential or
            incidental damages, these limitations may not apply to you.
          </Typography>
        </section>

        <section>
          <Typography variant="h2" className="border-b">
            5. Revisions and Errata
          </Typography>
          <Typography className="mb-4">
            The materials appearing on our website may include technical,
            typographical, or photographic errors. We do not warrant that any of
            the materials on this website are accurate, complete, or current. We
            may make changes to the materials contained on this website at any
            time without notice.
          </Typography>
        </section>

        <section>
          <Typography variant="h2" className="border-b">
            6. Links
          </Typography>
          <Typography className="mb-4">
            We have not reviewed all of the sites linked to this website and are
            not responsible for the contents of any such linked site. The
            inclusion of any link does not imply endorsement by us of the site.
            Use of any such linked website is at the user&apos;s own risk.
          </Typography>
        </section>

        <section>
          <Typography variant="h2" className="border-b">
            7. Governing Law
          </Typography>
          <Typography className="mb-4">
            These terms and conditions are governed by and construed in
            accordance with the laws and you irrevocably submit to the exclusive
            jurisdiction of the courts in that location.
          </Typography>
        </section>

        <section>
          <Typography variant="h2" className="border-b">
            8. Terms of Service Modifications
          </Typography>
          <Typography className="mb-4">
            We may revise these terms of service for our website at any time
            without notice. By using this website, you are agreeing to be bound
            by the then current version of these terms of service.
          </Typography>
        </section>
      </article>
    </main>
  )
}

export const metadata = createMetadata({
  title: 'Terms of Service',
  openGraph: {
    images: `/api/og?title=Terms%20of%20Service`,
    url: '/terms',
  },
})
