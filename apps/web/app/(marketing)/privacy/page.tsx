import { Typography } from '@yuki/ui/typography'

export default function PrivacyPolicyPage() {
  return (
    <main className="container max-w-4xl py-12">
      <Typography level="h1" className="mb-6">
        Privacy Policy
      </Typography>

      <article>
        <Typography level="h2" className="border-b">
          Introduction
        </Typography>
        <Typography className="mb-4">
          Last updated: {new Date().toLocaleDateString()}
        </Typography>

        <Typography level="h2" className="border-b">
          Information We Collect
        </Typography>
        <Typography className="mb-4">
          We collect information that you provide directly to us when using our services.
        </Typography>

        <Typography level="h2" className="border-b">
          How We Use Your Information
        </Typography>
        <Typography level="ul" className="mb-4">
          <li>To provide and maintain our service</li>
          <li>To notify you about changes to our service</li>
          <li>To provide customer support</li>
          <li>To detect, prevent and address technical issues</li>
        </Typography>

        <Typography level="h2" className="border-b">
          Data Security
        </Typography>
        <Typography className="mb-4">
          We implement appropriate security measures to protect your personal information.
        </Typography>

        <Typography level="h2" className="border-b">
          Changes to This Privacy Policy
        </Typography>
        <Typography className="mb-4">
          We may update our Privacy Policy from time to time. We will notify you of any
          changes by posting the new Privacy Policy on this page.
        </Typography>

        <Typography level="h2" className="border-b">
          Contact Us
        </Typography>
        <Typography className="mb-4">
          If you have any questions about this Privacy Policy, please contact us.
        </Typography>
      </article>
    </main>
  )
}
