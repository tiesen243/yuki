import Link from 'next/link'

import { ChevronRightIcon } from '@yuki/ui/icons'

import { PrintButton } from '../_print-button'

export default function PrivacyPolicyPage() {
  return (
    <main className="flex-1">
      <div className="container mx-auto max-w-4xl px-4 py-8">
        {/* Breadcrumb */}
        <nav className="text-muted-foreground mb-6 flex items-center text-sm">
          <Link
            href="/home"
            className="hover:text-foreground transition-colors"
          >
            Home
          </Link>
          <ChevronRightIcon className="mx-2 h-4 w-4" />
          <span className="text-foreground font-medium">Privacy Policy</span>
        </nav>

        {/* Header */}
        <div className="mb-10">
          <h1 className="mb-3 text-3xl font-bold tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-muted-foreground">Last updated: May 7, 2024</p>
        </div>

        {/* Introduction */}
        <div className="prose prose-gray max-w-none">
          <p>
            At Yuki, we take your privacy seriously. This Privacy Policy
            explains how we collect, use, disclose, and safeguard your
            information when you visit our website, use our mobile application,
            or make purchases from us (collectively, the &quot;Services&quot;).
          </p>
          <p>
            Please read this Privacy Policy carefully. By accessing or using our
            Services, you acknowledge that you have read, understood, and agree
            to be bound by all the terms of this Privacy Policy. If you do not
            agree with our policies and practices, please do not use our
            Services.
          </p>

          <h2 className="mt-8 mb-4 text-xl font-semibold">
            1. Information We Collect
          </h2>
          <p>
            We may collect several types of information from and about users of
            our Services, including:
          </p>

          <h3 className="mt-6 mb-3 text-lg font-medium">
            1.1 Personal Information
          </h3>
          <p>
            Personal information is data that can be used to identify you
            individually, such as your:
          </p>
          <ul className="mb-4 list-disc space-y-2 pl-6">
            <li>Name</li>
            <li>Email address</li>
            <li>Postal address</li>
            <li>Phone number</li>
            <li>Date of birth</li>
            <li>Payment information</li>
            <li>Account login credentials</li>
          </ul>

          <h3 className="mt-6 mb-3 text-lg font-medium">
            1.2 Non-Personal Information
          </h3>
          <p>
            We may also collect non-personal information about you, including:
          </p>
          <ul className="mb-4 list-disc space-y-2 pl-6">
            <li>Browser type and version</li>
            <li>Operating system</li>
            <li>Device information</li>
            <li>IP address</li>
            <li>Browsing patterns and shopping behavior</li>
            <li>Referring website addresses</li>
          </ul>

          <h2 className="mt-8 mb-4 text-xl font-semibold">
            2. How We Collect Information
          </h2>
          <p>We collect information from you in various ways, including:</p>
          <ul className="mb-4 list-disc space-y-2 pl-6">
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
          </ul>

          <h2 className="mt-8 mb-4 text-xl font-semibold">
            3. How We Use Your Information
          </h2>
          <p>
            We may use the information we collect about you for various
            purposes, including to:
          </p>
          <ul className="mb-4 list-disc space-y-2 pl-6">
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
          </ul>

          <h2 className="mt-8 mb-4 text-xl font-semibold">
            4. Information Sharing and Disclosure
          </h2>
          <p>
            We may share your information with the following categories of third
            parties:
          </p>
          <ul className="mb-4 list-disc space-y-2 pl-6">
            <li>
              <strong>Service Providers:</strong> We may share your information
              with third-party vendors, service providers, contractors, or
              agents who perform services for us or on our behalf, such as
              payment processing, order fulfillment, shipping, customer service,
              and marketing assistance.
            </li>
            <li>
              <strong>Business Partners:</strong> We may share your information
              with our business partners to offer you certain products,
              services, or promotions.
            </li>
            <li>
              <strong>Affiliates:</strong> We may share your information with
              our affiliates and subsidiaries for business purposes.
            </li>
            <li>
              <strong>Legal Requirements:</strong> We may disclose your
              information to comply with applicable laws and regulations, to
              respond to a subpoena, search warrant, or other lawful request for
              information we receive, or to otherwise protect our rights.
            </li>
            <li>
              <strong>Business Transfers:</strong> If we are involved in a
              merger, acquisition, or sale of all or a portion of our assets,
              your information may be transferred as part of that transaction.
            </li>
          </ul>
          <p>
            We do not sell your personal information to third parties for their
            direct marketing purposes without your explicit consent.
          </p>

          <h2 className="mt-8 mb-4 text-xl font-semibold">
            5. Cookies and Tracking Technologies
          </h2>
          <p>
            We use cookies, web beacons, and similar tracking technologies to
            collect information about your browsing activities and to analyze
            website traffic. These technologies help us improve our Services and
            your experience, save your preferences, and provide you with
            relevant advertising.
          </p>
          <p>
            You can set your browser to refuse all or some browser cookies, or
            to alert you when cookies are being sent. If you disable or refuse
            cookies, please note that some parts of our Services may be
            inaccessible or not function properly.
          </p>
          <p>
            For more information about our use of cookies and how to manage
            them, please see our{' '}
            <Link href="/cookies" className="text-primary hover:underline">
              Cookie Policy
            </Link>
            .
          </p>

          <h2 className="mt-8 mb-4 text-xl font-semibold">
            6. Your Choices and Rights
          </h2>
          <p>
            Depending on your location, you may have certain rights regarding
            your personal information, including:
          </p>
          <ul className="mb-4 list-disc space-y-2 pl-6">
            <li>
              The right to access and receive a copy of your personal
              information
            </li>
            <li>The right to correct or update your personal information</li>
            <li>The right to request deletion of your personal information</li>
            <li>
              The right to restrict or object to processing of your personal
              information
            </li>
            <li>The right to data portability</li>
            <li>The right to withdraw consent</li>
          </ul>
          <p>
            To exercise these rights, please contact us using the information
            provided in the &quot;Contact Information&quot; section below.
            Please note that some of these rights may be subject to limitations
            and exceptions under applicable law.
          </p>

          <h3 className="mt-6 mb-3 text-lg font-medium">
            6.1 Marketing Communications
          </h3>
          <p>
            You can opt out of receiving marketing communications from us by
            clicking the &quot;unsubscribe&quot; link in our emails, updating
            your communication preferences in your account settings, or
            contacting us directly.
          </p>

          <h2 className="mt-8 mb-4 text-xl font-semibold">7. Data Security</h2>
          <p>
            We implement appropriate technical and organizational measures to
            protect the security of your personal information. However, please
            be aware that no method of transmission over the Internet or method
            of electronic storage is 100% secure. While we strive to use
            commercially acceptable means to protect your personal information,
            we cannot guarantee its absolute security.
          </p>

          <h2 className="mt-8 mb-4 text-xl font-semibold">8. Data Retention</h2>
          <p>
            We will retain your personal information only for as long as
            necessary to fulfill the purposes for which it was collected,
            including for the purposes of satisfying any legal, accounting, or
            reporting requirements. To determine the appropriate retention
            period, we consider the amount, nature, and sensitivity of the
            personal information, the potential risk of harm from unauthorized
            use or disclosure, and applicable legal requirements.
          </p>

          <h2 className="mt-8 mb-4 text-xl font-semibold">
            9. Children&apos;s Privacy
          </h2>
          <p>
            Our Services are not intended for children under 16 years of age. We
            do not knowingly collect personal information from children under
            16. If you are a parent or guardian and you believe your child has
            provided us with personal information, please contact us. If we
            become aware that we have collected personal information from
            children without verification of parental consent, we will take
            steps to remove that information from our servers.
          </p>

          <h2 className="mt-8 mb-4 text-xl font-semibold">
            10. International Data Transfers
          </h2>
          <p>
            Your information may be transferred to, and maintained on, computers
            located outside of your state, province, country, or other
            governmental jurisdiction where the data protection laws may differ
            from those in your jurisdiction. If you are located outside of Japan
            and choose to provide information to us, please note that we
            transfer the information to Japan and process it there.
          </p>
          <p>
            When we transfer personal information from the European Economic
            Area (EEA), United Kingdom, or Switzerland to countries that have
            not been deemed to provide an adequate level of protection, we use
            specific contractual clauses approved by the European Commission or
            other appropriate safeguards to protect your information.
          </p>

          <h2 className="mt-8 mb-4 text-xl font-semibold">
            11. Changes to This Privacy Policy
          </h2>
          <p>
            We may update our Privacy Policy from time to time. We will notify
            you of any changes by posting the new Privacy Policy on this page
            and updating the &quot;Last updated&quot; date at the top of this
            Privacy Policy. You are advised to review this Privacy Policy
            periodically for any changes. Changes to this Privacy Policy are
            effective when they are posted on this page.
          </p>

          <h2 className="mt-8 mb-4 text-xl font-semibold">
            12. Contact Information
          </h2>
          <p>
            If you have any questions or concerns about this Privacy Policy or
            our privacy practices, please contact us at:
          </p>
          <address className="mt-2 not-italic">
            Yuki Inc.
            <br />
            123 Fashion Street
            <br />
            Tokyo, Japan
            <br />
            Email: privacy@yuki.com
            <br />
            Phone: +1 (234) 567-8900
          </address>
        </div>

        {/* Print Button */}
        <div className="mt-12 mb-8">
          <PrintButton />
        </div>

        <hr className="my-8" />

        {/* Related Links */}
        <div className="mb-12">
          <h3 className="mb-4 text-lg font-medium">Related Policies</h3>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Link
              href="/terms"
              className="text-primary text-sm hover:underline"
            >
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
      </div>
    </main>
  )
}
