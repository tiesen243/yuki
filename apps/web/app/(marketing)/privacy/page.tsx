import { Typography } from '@yuki/ui/typography'

export default function PrivacyPolicyPage() {
  return (
    <main className="container max-w-4xl py-12">
      <Typography variant="h1" className="mb-6">
        Privacy Policy
      </Typography>
      <Typography className="mb-4">
        Last updated: {new Date().toLocaleDateString()}
      </Typography>

      <article className="space-y-8">
        <section>
          <Typography variant="h2" className="border-b">
            Introduction
          </Typography>
          <Typography className="mb-4">
            This Privacy Policy explains how we collect, use, disclose, and
            safeguard your information when you use our service. Please read
            this privacy policy carefully. If you do not agree with the terms of
            this privacy policy, please do not access the application.
          </Typography>
        </section>

        <section>
          <Typography variant="h2" className="border-b">
            Information We Collect
          </Typography>
          <Typography className="mb-4">
            We collect information that you provide directly to us when using
            our services.
          </Typography>
          <Typography variant="h3" className="mt-4 text-lg font-semibold">
            Personal Data
          </Typography>
          <Typography className="mb-4">
            While using our Service, we may ask you to provide us with certain
            personally identifiable information that can be used to contact or
            identify you. This may include, but is not limited to:
          </Typography>
          <Typography variant="ul" className="mb-4">
            <li>Email address</li>
            <li>First name and last name</li>
            <li>Phone number</li>
            <li>Address, State, Province, ZIP/Postal code, City</li>
          </Typography>
        </section>

        <section>
          <Typography variant="h2" className="border-b">
            How We Use Your Information
          </Typography>
          <Typography className="mb-4">
            We use the collected information for various purposes:
          </Typography>
          <Typography variant="ul" className="mb-4">
            <li>To provide and maintain our service</li>
            <li>To notify you about changes to our service</li>
            <li>To provide customer support</li>
            <li>To detect, prevent and address technical issues</li>
            <li>
              To provide you with news, special offers and general information
              about other goods, services and events
            </li>
            <li>To improve our website experience and product offerings</li>
          </Typography>
        </section>

        <section>
          <Typography variant="h2" className="border-b">
            Data Security
          </Typography>
          <Typography className="mb-4">
            We implement appropriate security measures to protect your personal
            information. However, please be aware that no method of transmission
            over the internet, or method of electronic storage is 100% secure
            and we cannot guarantee the absolute security of your data.
          </Typography>
        </section>

        <section>
          <Typography variant="h2" className="border-b">
            Cookies and Tracking
          </Typography>
          <Typography className="mb-4">
            We use cookies and similar tracking technologies to track activity
            on our service and hold certain information. Cookies are files with
            small amounts of data which may include an anonymous unique
            identifier.
          </Typography>
          <Typography className="mb-4">
            You can instruct your browser to refuse all cookies or to indicate
            when a cookie is being sent. However, if you do not accept cookies,
            you may not be able to use some portions of our service.
          </Typography>
        </section>

        <section>
          <Typography variant="h2" className="border-b">
            Changes to This Privacy Policy
          </Typography>
          <Typography className="mb-4">
            We may update our Privacy Policy from time to time. We will notify
            you of any changes by posting the new Privacy Policy on this page.
            You are advised to review this Privacy Policy periodically for any
            changes.
          </Typography>
        </section>

        <section>
          <Typography variant="h2" className="border-b">
            Contact Us
          </Typography>
          <Typography className="mb-4">
            If you have any questions about this Privacy Policy, please contact
            us:
          </Typography>
          <Typography variant="ul" className="mb-4">
            <li>By email: privacy@example.com</li>
            <li>By visiting the contact page on our website</li>
          </Typography>
        </section>
      </article>
    </main>
  )
}
