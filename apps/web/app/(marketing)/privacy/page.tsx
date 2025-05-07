import Link from 'next/link'

import { ChevronRightIcon } from '@yuki/ui/icons'
import { Typography } from '@yuki/ui/typography'

import { PrintButton } from '../_print-button'

export default function PrivacyPolicyPage() {
  return (
    <main className="container max-w-prose py-8">
      {/* Breadcrumb */}
      <nav className="text-muted-foreground mb-6 flex items-center text-sm">
        <Link href="/home" className="hover:text-foreground transition-colors">
          Home
        </Link>
        <ChevronRightIcon className="mx-2 h-4 w-4" />
        <span className="text-foreground font-medium">Privacy Policy</span>
      </nav>

      {/* Header */}
      <div className="mb-10">
        <Typography variant="h1">Privacy Policy</Typography>
        <Typography color="muted">Last updated: May 7, 2024</Typography>
      </div>

      {/* Introduction */}
      <article>
        <Typography>
          At Yuki, we take your privacy seriously. This Privacy Policy explains
          how we collect, use, disclose, and safeguard your information when you
          visit our website, use our mobile application, or make purchases from
          us (collectively, the &quot;Services&quot;).
        </Typography>
        <Typography>
          Please read this Privacy Policy carefully. By accessing or using our
          Services, you acknowledge that you have read, understood, and agree to
          be bound by all the terms of this Privacy Policy. If you do not agree
          with our policies and practices, please do not use our Services.
        </Typography>

        <Typography variant="h2" className="mt-10">
          1. Information We Collect
        </Typography>
        <Typography>
          We may collect several types of information from and about users of
          our Services, including:
        </Typography>

        <Typography variant="h3" className="mt-8">
          1.1 Personal Information
        </Typography>
        <Typography>
          Personal information is data that can be used to identify you
          individually, such as your:
        </Typography>
        <Typography variant="ul">
          <li>Name</li>
          <li>Email address</li>
          <li>Postal address</li>
          <li>Phone number</li>
          <li>Date of birth</li>
          <li>Payment information</li>
          <li>Account login credentials</li>
        </Typography>

        <Typography variant="h3" className="mt-8">
          1.2 Non-Personal Information
        </Typography>
        <Typography>
          We may also collect non-personal information about you, including:
        </Typography>
        <Typography variant="ul">
          <li>Browser type and version</li>
          <li>Operating system</li>
          <li>Device information</li>
          <li>IP address</li>
          <li>Browsing patterns and shopping behavior</li>
          <li>Referring website addresses</li>
        </Typography>

        <Typography variant="h2" className="mt-10">
          2. How We Collect Information
        </Typography>
        <Typography>
          We collect information from you in various ways, including:
        </Typography>
        <Typography variant="ul">
          <li>When you create an account or profile</li>
          <li>When you make a purchase</li>
          <li>When you sign up for our newsletter</li>
          <li>When you participate in surveys, contests, or promotions</li>
          <li>When you contact our customer service</li>
          <li>When you browse our website or use our mobile application</li>
          <li>Through cookies and similar tracking technologies</li>
          <li>
            From third-party sources, such as business partners and service
            providers
          </li>
        </Typography>

        <Typography variant="h2" className="mt-10">
          3. How We Use Your Information
        </Typography>
        <Typography>
          We may use the information we collect about you for various purposes,
          including to:
        </Typography>
        <Typography variant="ul">
          <li>Process and fulfill your orders</li>
          <li>Create and manage your account</li>
          <li>Provide customer service and respond to your inquiries</li>
          <li>Send you transactional emails and order updates</li>
          <li>Send you marketing communications (with your consent)</li>
          <li>Personalize your shopping experience</li>
          <li>Improve our website, products, and services</li>
          <li>Analyze usage patterns and conduct research</li>
          <li>Protect against fraud and unauthorized transactions</li>
          <li>Comply with legal obligations</li>
        </Typography>

        <Typography variant="h2" className="mt-10">
          4. Information Sharing and Disclosure
        </Typography>
        <Typography>
          We may share your information with the following categories of third
          parties:
        </Typography>
        <Typography variant="ul">
          <li>
            <strong>Service Providers:</strong> We may share your information
            with third-party vendors, service providers, contractors, or agents
            who perform services for us or on our behalf, such as payment
            processing, order fulfillment, shipping, customer service, and
            marketing assistance.
          </li>
          <li>
            <strong>Business Partners:</strong> We may share your information
            with our business partners to offer you certain products, services,
            or promotions.
          </li>
          <li>
            <strong>Affiliates:</strong> We may share your information with our
            affiliates and subsidiaries for business purposes.
          </li>
          <li>
            <strong>Legal Requirements:</strong> We may disclose your
            information to comply with applicable laws and regulations, to
            respond to a subpoena, search warrant, or other lawful request for
            information we receive, or to otherwise protect our rights.
          </li>
          <li>
            <strong>Business Transfers:</strong> If we are involved in a merger,
            acquisition, or sale of all or a portion of our assets, your
            information may be transferred as part of that transaction.
          </li>
        </Typography>
        <Typography>
          We do not sell your personal information to third parties for their
          direct marketing purposes without your explicit consent.
        </Typography>

        <Typography variant="h2" className="mt-10">
          5. Cookies and Tracking Technologies
        </Typography>
        <Typography>
          We use cookies, web beacons, and similar tracking technologies to
          collect information about your browsing activities and to analyze
          website traffic. These technologies help us improve our Services and
          your experience, save your preferences, and provide you with relevant
          advertising.
        </Typography>
        <Typography>
          You can set your browser to refuse all or some browser cookies, or to
          alert you when cookies are being sent. If you disable or refuse
          cookies, please note that some parts of our Services may be
          inaccessible or not function properly.
        </Typography>
        <Typography>
          For more information about our use of cookies and how to manage them,
          please see our{' '}
          <Link href="/cookies" className="text-primary hover:underline">
            Cookie Policy
          </Link>
          .
        </Typography>

        <Typography variant="h2" className="mt-10">
          6. Your Choices and Rights
        </Typography>
        <Typography>
          Depending on your location, you may have certain rights regarding your
          personal information, including:
        </Typography>
        <Typography variant="ul">
          <li>
            The right to access and receive a copy of your personal information
          </li>
          <li>The right to correct or update your personal information</li>
          <li>The right to request deletion of your personal information</li>
          <li>
            The right to restrict or object to processing of your personal
            information
          </li>
          <li>The right to data portability</li>
          <li>The right to withdraw consent</li>
        </Typography>
        <Typography>
          To exercise these rights, please contact us using the information
          provided in the &quot;Contact Information&quot; section below. Please
          note that some of these rights may be subject to limitations and
          exceptions under applicable law.
        </Typography>

        <Typography variant="h3" className="mt-8">
          6.1 Marketing Communications
        </Typography>
        <Typography>
          You can opt out of receiving marketing communications from us by
          clicking the &quot;unsubscribe&quot; link in our emails, updating your
          communication preferences in your account settings, or contacting us
          directly.
        </Typography>

        <Typography variant="h2" className="mt-10">
          7. Data Security
        </Typography>
        <Typography>
          We implement appropriate technical and organizational measures to
          protect the security of your personal information. However, please be
          aware that no method of transmission over the Internet or method of
          electronic storage is 100% secure. While we strive to use commercially
          acceptable means to protect your personal information, we cannot
          guarantee its absolute security.
        </Typography>

        <Typography variant="h2" className="mt-10">
          8. Data Retention
        </Typography>
        <Typography>
          We will retain your personal information only for as long as necessary
          to fulfill the purposes for which it was collected, including for the
          purposes of satisfying any legal, accounting, or reporting
          requirements. To determine the appropriate retention period, we
          consider the amount, nature, and sensitivity of the personal
          information, the potential risk of harm from unauthorized use or
          disclosure, and applicable legal requirements.
        </Typography>

        <Typography variant="h2" className="mt-10">
          9. Children&apos;s Privacy
        </Typography>
        <Typography>
          Our Services are not intended for children under 16 years of age. We
          do not knowingly collect personal information from children under 16.
          If you are a parent or guardian and you believe your child has
          provided us with personal information, please contact us. If we become
          aware that we have collected personal information from children
          without verification of parental consent, we will take steps to remove
          that information from our servers.
        </Typography>

        <Typography variant="h2" className="mt-10">
          10. International Data Transfers
        </Typography>
        <Typography>
          Your information may be transferred to, and maintained on, computers
          located outside of your state, province, country, or other
          governmental jurisdiction where the data protection laws may differ
          from those in your jurisdiction. If you are located outside of Japan
          and choose to provide information to us, please note that we transfer
          the information to Japan and process it there.
        </Typography>
        <Typography>
          When we transfer personal information from the European Economic Area
          (EEA), United Kingdom, or Switzerland to countries that have not been
          deemed to provide an adequate level of protection, we use specific
          contractual clauses approved by the European Commission or other
          appropriate safeguards to protect your information.
        </Typography>

        <Typography variant="h2" className="mt-10">
          11. Changes to This Privacy Policy
        </Typography>
        <Typography>
          We may update our Privacy Policy from time to time. We will notify you
          of any changes by posting the new Privacy Policy on this page and
          updating the &quot;Last updated&quot; date at the top of this Privacy
          Policy. You are advised to review this Privacy Policy periodically for
          any changes. Changes to this Privacy Policy are effective when they
          are posted on this page.
        </Typography>

        <Typography variant="h2" className="mt-10">
          12. Contact Information
        </Typography>
        <Typography>
          If you have any questions or concerns about this Privacy Policy or our
          privacy practices, please contact us at:
        </Typography>
        <Typography as="address">
          Yuki Inc.
          <br />
          123 Fashion Street
          <br />
          Tokyo, Japan
          <br />
          Email: privacy@yuki.com
          <br />
          Phone: +1 (234) 567-8900
        </Typography>
      </article>

      {/* Print Button */}
      <div className="mt-12 mb-8">
        <PrintButton />
      </div>

      <hr className="my-8" />

      {/* Related Links */}
      <div className="mb-12">
        <Typography variant="h6" as="h2">
          Related Policies
        </Typography>
        <div className="mt-4 flex flex-col gap-3 sm:flex-row">
          <Link href="/terms" className="text-primary text-sm hover:underline">
            Terms of Service
          </Link>
          <Link
            href="/cookies"
            className="text-primary text-sm hover:underline"
          >
            Cookie Policy
          </Link>
          <Link
            href="/returns"
            className="text-primary text-sm hover:underline"
          >
            Returns & Exchanges
          </Link>
        </div>
      </div>
    </main>
  )
}
