import Link from 'next/link'

import { ChevronRightIcon } from '@yuki/ui/icons'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@yuki/ui/table'
import { Typography } from '@yuki/ui/typography'

import { createMetadata } from '@/lib/metadata'
import { getBaseUrl } from '@/lib/utils'
import { PrintButton } from '../_print-button'

export default function CookiePolicyPage() {
  return (
    <main className="container max-w-prose py-8">
      {/* Breadcrumb */}
      <nav className="text-muted-foreground mb-6 flex items-center text-sm">
        <Link href="/home" className="hover:text-foreground transition-colors">
          Home
        </Link>
        <ChevronRightIcon className="mx-2 h-4 w-4" />
        <span className="text-foreground font-medium">Cookie Policy</span>
      </nav>

      {/* Header */}
      <div className="mb-10">
        <Typography variant="h1">Cookie Policy</Typography>
        <Typography color="muted">Last updated: May 7, 2024</Typography>
      </div>

      {/* Introduction */}
      <article>
        <Typography>
          This Cookie Policy explains how Yuki Inc. (&quot;we&quot;,
          &quot;us&quot;, or &quot;our&quot;) uses cookies and similar
          technologies to recognize you when you visit our website and use our
          services (collectively, the &quot;Services&quot;). It explains what
          these technologies are and why we use them, as well as your rights to
          control our use of them.
        </Typography>

        <Typography variant="h2" className="mt-10">
          1. What Are Cookies
        </Typography>
        <Typography>
          Cookies are small data files that are placed on your computer or
          mobile device when you visit a website. Cookies are widely used by
          website owners to make their websites work, or to work more
          efficiently, as well as to provide reporting information.
        </Typography>
        <Typography>
          Cookies set by the website owner (in this case, Yuki Inc.) are called
          &quot;first-party cookies&quot;. Cookies set by parties other than the
          website owner are called &quot;third-party cookies&quot;. Third-party
          cookies enable third-party features or functionality to be provided on
          or through the website (e.g., advertising, interactive content, and
          analytics). The parties that set these third-party cookies can
          recognize your computer both when it visits the website in question
          and also when it visits certain other websites.
        </Typography>

        <Typography variant="h2" className="mt-10">
          2. Why Do We Use Cookies
        </Typography>
        <Typography>
          We use first-party and third-party cookies for several reasons. Some
          cookies are required for technical reasons in order for our Services
          to operate, and we refer to these as &quot;essential&quot; or
          &quot;strictly necessary&quot; cookies. Other cookies also enable us
          to track and target the interests of our users to enhance the
          experience on our Services. Third parties serve cookies through our
          Services for advertising, analytics, and other purposes.
        </Typography>

        <Typography variant="h2" className="mt-10">
          3. Types of Cookies We Use
        </Typography>
        <Typography>
          The specific types of first and third-party cookies served through our
          Services include:
        </Typography>

        <Typography variant="h3" className="mt-8">
          3.1 Essential/Necessary Cookies
        </Typography>
        <Typography>
          These cookies are strictly necessary to provide you with services
          available through our Services and to use some of its features, such
          as access to secure areas. Because these cookies are strictly
          necessary to deliver the Services, you cannot refuse them without
          impacting how our Services function.
        </Typography>

        <Table className="mt-6">
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Provider</TableHead>
              <TableHead>Purpose</TableHead>
              <TableHead>Expiry</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>auth_token</TableCell>
              <TableCell>{getBaseUrl()}</TableCell>
              <TableCell>
                Authenticates you when you log in to your account
              </TableCell>
              <TableCell>30 days</TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <Typography variant="h3" className="mt-8">
          3.2 Performance/Analytics Cookies
        </Typography>
        <Typography>
          These cookies allow us to count visits and traffic sources so we can
          measure and improve the performance of our Services. They help us to
          know which pages are the most and least popular and see how visitors
          move around the site. All information these cookies collect is
          aggregated and therefore anonymous.
        </Typography>

        <Table className="mt-6">
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Provider</TableHead>
              <TableHead>Purpose</TableHead>
              <TableHead>Expiry</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>_ga</TableCell>
              <TableCell>Google Analytics</TableCell>
              <TableCell>
                Registers a unique ID used to generate statistical data
              </TableCell>
              <TableCell>2 years</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>_gid</TableCell>
              <TableCell>Google Analytics</TableCell>
              <TableCell>
                Registers a unique ID used to generate statistical data
              </TableCell>
              <TableCell>24 hours</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>_gat</TableCell>
              <TableCell>Google Analytics</TableCell>
              <TableCell>Used to throttle request rate</TableCell>
              <TableCell>1 minute</TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <Typography variant="h3" className="mt-8">
          3.3 Functionality Cookies
        </Typography>
        <Typography>
          These cookies enable the website to provide enhanced functionality and
          personalization. They may be set by us or by third-party providers
          whose services we have added to our pages. If you do not allow these
          cookies, then some or all of these services may not function properly.
        </Typography>

        <Table className="mt-6">
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Provider</TableHead>
              <TableHead>Purpose</TableHead>
              <TableHead>Expiry</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>language</TableCell>
              <TableCell>yuki.com</TableCell>
              <TableCell>Remembers your preferred language</TableCell>
              <TableCell>1 year</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>recently_viewed</TableCell>
              <TableCell>yuki.com</TableCell>
              <TableCell>
                Tracks recently viewed products for recommendations
              </TableCell>
              <TableCell>30 days</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>user_preferences</TableCell>
              <TableCell>yuki.com</TableCell>
              <TableCell>
                Stores user preferences like theme, layout, etc.
              </TableCell>
              <TableCell>1 year</TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <Typography variant="h3" className="mt-8">
          3.4 Targeting/Advertising Cookies
        </Typography>
        <Typography>
          These cookies are used to make advertising messages more relevant to
          you. They perform functions like preventing the same ad from
          continuously reappearing, ensuring that ads are properly displayed,
          and in some cases selecting advertisements that are based on your
          interests.
        </Typography>

        <Table className="mt-6">
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Provider</TableHead>
              <TableHead>Purpose</TableHead>
              <TableHead>Expiry</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>_fbp</TableCell>
              <TableCell>Facebook</TableCell>
              <TableCell>Used by Facebook to deliver advertisements</TableCell>
              <TableCell>3 months</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>IDE</TableCell>
              <TableCell>Google DoubleClick</TableCell>
              <TableCell>Used for targeted advertising</TableCell>
              <TableCell>1 year</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>ads/ga-audiences</TableCell>
              <TableCell>Google</TableCell>
              <TableCell>Used by Google AdWords for remarketing</TableCell>
              <TableCell>Session</TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <Typography variant="h2" className="mt-10">
          4. How to Manage Cookies
        </Typography>
        <Typography>
          You can set your browser to refuse all or some browser cookies, or to
          alert you when websites set or access cookies. If you disable or
          refuse cookies, please note that some parts of our Services may become
          inaccessible or not function properly.
        </Typography>

        <Typography variant="h3" className="mt-8">
          4.1 Browser Controls
        </Typography>
        <Typography>
          Most web browsers allow you to manage your cookie preferences. You can
          set your browser to refuse cookies or delete certain cookies.
          Generally, you can also manage similar technologies in the same way
          that you manage cookies – using your browser&apos;s preferences.
        </Typography>
        <Typography>
          The following links show how to adjust the cookie settings on commonly
          used browsers:
        </Typography>
        <Typography variant="ul">
          <li>
            <a
              href="https://support.google.com/chrome/answer/95647"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Google Chrome
            </a>
          </li>
          <li>
            <a
              href="https://support.mozilla.org/en-US/kb/enhanced-tracking-protection-firefox-desktop"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Mozilla Firefox
            </a>
          </li>
          <li>
            <a
              href="https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Safari
            </a>
          </li>
          <li>
            <a
              href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Microsoft Edge
            </a>
          </li>
        </Typography>

        <Typography variant="h3" className="mt-8">
          4.2 Cookie Preference Tool
        </Typography>
        <Typography>
          In addition to browser controls, we provide a Cookie Preference Center
          that allows you to manage your cookie preferences on our website. You
          can access our Cookie Preference Center by clicking on the
          &quot;Cookie Settings&quot; link in the footer of our website.
        </Typography>

        <Typography variant="h3" className="mt-8">
          4.3 Opt-Out of Specific Third-Party Cookies
        </Typography>
        <Typography>
          For cookies that are used for advertising purposes, you can also opt
          out of many advertising networks by visiting:
        </Typography>
        <Typography variant="ul">
          <li>
            <a
              href="https://optout.aboutads.info/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Digital Advertising Alliance (US)
            </a>
          </li>
          <li>
            <a
              href="https://youradchoices.ca/en/tools"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Digital Advertising Alliance of Canada
            </a>
          </li>
          <li>
            <a
              href="https://www.youronlinechoices.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              European Interactive Digital Advertising Alliance
            </a>
          </li>
        </Typography>

        <Typography variant="h2" className="mt-10">
          5. Do Not Track
        </Typography>
        <Typography>
          Some browsers have a &quot;Do Not Track&quot; feature that lets you
          tell websites that you do not want to have your online activities
          tracked. These features are not yet uniform, so we are currently not
          set up to respond to such signals. However, you can use the range of
          other tools we provide to control data collection and use, including
          the ability to opt out of receiving personalized advertisements as
          described above.
        </Typography>

        <Typography variant="h2" className="mt-10">
          6. Changes to This Cookie Policy
        </Typography>
        <Typography>
          We may update this Cookie Policy from time to time in order to
          reflect, for example, changes to the cookies we use or for other
          operational, legal, or regulatory reasons. Please therefore revisit
          this Cookie Policy regularly to stay informed about our use of cookies
          and related technologies.
        </Typography>
        <Typography>
          The date at the top of this Cookie Policy indicates when it was last
          updated. Changes to this Cookie Policy are effective when they are
          posted on this page.
        </Typography>

        <Typography variant="h2" className="mt-10">
          7. Contact Information
        </Typography>
        <Typography>
          If you have any questions about our use of cookies or this Cookie
          Policy, please contact us at:
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
        <div className="mt-4 flex flex-col gap-4 sm:flex-row">
          <Link href="/terms" className="text-primary text-sm hover:underline">
            Terms of Service
          </Link>
          <Link
            href="/privacy"
            className="text-primary text-sm hover:underline"
          >
            Privacy Policy
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

export const metadata = createMetadata({
  title: 'Cookie Policy',
  description:
    'Learn about our cookie policy, how we use cookies, and your rights regarding them.',
  openGraph: { url: '/cookies' },
})
