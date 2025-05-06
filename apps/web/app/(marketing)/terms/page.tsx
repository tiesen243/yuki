import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

import { PrintButton } from '../_print-button'

export default function TermsOfServicePage() {
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
          <ChevronRight className="mx-2 h-4 w-4" />
          <span className="text-foreground font-medium">Terms of Service</span>
        </nav>

        {/* Header */}
        <div className="mb-10">
          <h1 className="mb-3 text-3xl font-bold tracking-tight">
            Terms of Service
          </h1>
          <p className="text-muted-foreground">Last updated: May 7, 2024</p>
        </div>

        {/* Introduction */}
        <div className="prose prose-gray max-w-none">
          <p>
            Welcome to Yuki. These Terms of Service (&quot;Terms&quot;) govern
            your access to and use of the Yuki website, mobile application, and
            services (collectively, the &quot;Services&quot;). Please read these
            Terms carefully before using our Services.
          </p>

          <h2 className="mt-8 mb-4 text-xl font-semibold">
            1. Acceptance of Terms
          </h2>
          <p>
            By accessing or using our Services, you agree to be bound by these
            Terms and our Privacy Policy. If you do not agree to these Terms,
            you may not access or use the Services.
          </p>

          <h2 className="mt-8 mb-4 text-xl font-semibold">2. User Accounts</h2>
          <p>
            To access certain features of our Services, you may be required to
            create an account. You are responsible for maintaining the
            confidentiality of your account credentials and for all activities
            that occur under your account. You agree to provide accurate and
            complete information when creating your account and to update your
            information to keep it accurate and complete.
          </p>
          <p>
            We reserve the right to suspend or terminate your account at our
            discretion, without notice, for conduct that we believe violates
            these Terms or is harmful to other users of the Services, us, or
            third parties, or for any other reason.
          </p>

          <h2 className="mt-8 mb-4 text-xl font-semibold">
            3. Products and Pricing
          </h2>
          <p>
            All product descriptions, information, and prices are subject to
            change at any time without notice. We strive to provide accurate
            product information, but we do not warrant that product
            descriptions, photographs, pricing, or other content available on
            our Services is accurate, complete, reliable, current, or
            error-free.
          </p>
          <p>
            We reserve the right to limit the quantity of items purchased and to
            discontinue any product at any time.
          </p>

          <h2 className="mt-8 mb-4 text-xl font-semibold">
            4. Orders and Payments
          </h2>
          <p>
            When you place an order through our Services, you are making an
            offer to purchase the products you have selected. We reserve the
            right to accept or decline your order for any reason, including but
            not limited to product availability, errors in product or pricing
            information, or problems identified by our fraud detection systems.
          </p>
          <p>
            By providing a payment method, you represent and warrant that you
            are authorized to use the designated payment method and that you
            authorize us to charge your payment method for the total amount of
            your order (including any applicable taxes and shipping charges).
          </p>

          <h2 className="mt-8 mb-4 text-xl font-semibold">
            5. Shipping and Delivery
          </h2>
          <p>
            We will make reasonable efforts to ship products within the
            estimated timeframes provided at checkout. However, shipping times
            are estimates only and are not guaranteed. We are not responsible
            for delays that are beyond our control.
          </p>
          <p>
            Risk of loss and title for items purchased from our Services pass to
            you upon delivery of the items to the carrier.
          </p>

          <h2 className="mt-8 mb-4 text-xl font-semibold">
            6. Returns and Refunds
          </h2>
          <p>
            Our return and refund policies are outlined in our Returns &
            Exchanges page. By making a purchase through our Services, you agree
            to be bound by these policies.
          </p>

          <h2 className="mt-8 mb-4 text-xl font-semibold">
            7. Intellectual Property
          </h2>
          <p>
            All content included on our Services, such as text, graphics, logos,
            images, audio clips, digital downloads, data compilations, and
            software, is the property of Yuki or its content suppliers and is
            protected by international copyright, trademark, and other
            intellectual property laws.
          </p>
          <p>
            Our trademarks and trade dress may not be used in connection with
            any product or service that is not ours, in any manner that is
            likely to cause confusion among customers, or in any manner that
            disparages or discredits us.
          </p>

          <h2 className="mt-8 mb-4 text-xl font-semibold">8. User Content</h2>
          <p>
            You may be able to submit content to our Services, such as product
            reviews, comments, or photos (&quot;User Content&quot;). By
            submitting User Content, you grant us a non-exclusive, royalty-free,
            perpetual, irrevocable, and fully sublicensable right to use,
            reproduce, modify, adapt, publish, translate, create derivative
            works from, distribute, and display such User Content throughout the
            world in any media.
          </p>
          <p>
            You represent and warrant that you own or otherwise control all of
            the rights to the User Content that you post, that the User Content
            is accurate, and that use of the User Content does not violate these
            Terms and will not cause injury to any person or entity.
          </p>

          <h2 className="mt-8 mb-4 text-xl font-semibold">
            9. Prohibited Activities
          </h2>
          <p>
            You agree not to engage in any of the following prohibited
            activities:
          </p>
          <ul className="mb-4 list-disc space-y-2 pl-6">
            <li>Violating any applicable laws or regulations</li>
            <li>Infringing the intellectual property rights of others</li>
            <li>Submitting false or misleading information</li>
            <li>Engaging in unauthorized framing or linking to our Services</li>
            <li>
              Interfering with or disrupting the Services or servers or networks
              connected to the Services
            </li>
            <li>
              Attempting to gain unauthorized access to any portion of the
              Services
            </li>
            <li>
              Using the Services for any commercial purpose without our prior
              written consent
            </li>
            <li>
              Engaging in any activity that would constitute a criminal offense
              or give rise to civil liability
            </li>
          </ul>

          <h2 className="mt-8 mb-4 text-xl font-semibold">
            10. Limitation of Liability
          </h2>
          <p>
            To the fullest extent permitted by applicable law, in no event will
            Yuki, its affiliates, or their licensors, service providers,
            employees, agents, officers, or directors be liable for damages of
            any kind, under any legal theory, arising out of or in connection
            with your use, or inability to use, the Services, including any
            direct, indirect, special, incidental, consequential, or punitive
            damages.
          </p>

          <h2 className="mt-8 mb-4 text-xl font-semibold">
            11. Indemnification
          </h2>
          <p>
            You agree to indemnify, defend, and hold harmless Yuki, its
            affiliates, and their respective officers, directors, employees,
            agents, licensors, and suppliers from and against any claims,
            liabilities, damages, judgments, awards, losses, costs, expenses, or
            fees (including reasonable attorneys&apos; fees) arising out of or
            relating to your violation of these Terms or your use of the
            Services.
          </p>

          <h2 className="mt-8 mb-4 text-xl font-semibold">12. Governing Law</h2>
          <p>
            These Terms and any dispute or claim arising out of or in connection
            with them or their subject matter or formation shall be governed by
            and construed in accordance with the laws of [Jurisdiction], without
            giving effect to any choice or conflict of law provision or rule.
          </p>

          <h2 className="mt-8 mb-4 text-xl font-semibold">
            13. Changes to Terms
          </h2>
          <p>
            We reserve the right to modify these Terms at any time. If we make
            changes to these Terms, we will post the revised Terms on our
            Services with an updated effective date. Your continued use of the
            Services following the posting of revised Terms means that you
            accept and agree to the changes.
          </p>

          <h2 className="mt-8 mb-4 text-xl font-semibold">
            14. Contact Information
          </h2>
          <p>
            If you have any questions about these Terms, please contact us at:
          </p>
          <address className="mt-2 not-italic">
            Yuki Inc.
            <br />
            123 Fashion Street
            <br />
            Tokyo, Japan
            <br />
            Email: legal@yuki.com
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
              href="/privacy"
              className="text-primary text-sm hover:underline"
            >
              Privacy Policy
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
