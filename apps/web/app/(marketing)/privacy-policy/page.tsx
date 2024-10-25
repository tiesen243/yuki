import { Typography } from '@yuki/ui/typography'

import { seo } from '@/lib/seo'

export default function PrivacyPolicy() {
  return (
    <article className="container mx-auto py-8">
      <div className="mb-6 text-center">
        <Typography level="h1">Privacy Policy</Typography>
        <Typography className="text-muted-foreground">
          Last updated: {new Date().toLocaleDateString()}
        </Typography>
      </div>

      <div className="space-y-4">
        <Typography level="h2">1. Introduction</Typography>
        <Typography>
          At Yuki.tiesen.id.vn, we respect your privacy and are committed to protecting your
          personal data. This privacy policy will inform you about how we look after your personal
          data when you visit our website and tell you about your privacy rights and how the law
          protects you.
        </Typography>

        <Typography level="h2">2. The Data We Collect About You</Typography>
        <Typography>
          We may collect, use, store and transfer different kinds of personal data about you which
          we have grouped together as follows:
        </Typography>
        <Typography level="ul">
          <li>Identity Data: first name, last name, username or similar identifier</li>
          <li>
            Contact Data: billing address, delivery address, email address and telephone numbers
          </li>
          <li>Financial Data: payment card details</li>
          <li>
            Transaction Data: details about payments to and from you and other details of products
            you have purchased from us
          </li>
          <li>
            Technical Data: internet protocol (IP) address, your login data, browser type and
            version, time zone setting and location, browser plug-in types and versions, operating
            system and platform, and other technology on the devices you use to access this website
          </li>
          <li>
            Profile Data: your username and password, purchases or orders made by you, your
            interests, preferences, feedback and survey responses
          </li>
          <li>Usage Data: information about how you use our website, products and services</li>
        </Typography>

        <Typography level="h2">3. How We Use Your Personal Data</Typography>
        <Typography>
          We will only use your personal data when the law allows us to. Most commonly, we will use
          your personal data in the following circumstances:
        </Typography>
        <Typography level="ul">
          <li>
            Where we need to perform the contract we are about to enter into or have entered into
            with you.
          </li>
          <li>
            Where it is necessary for our legitimate interests (or those of a third party) and your
            interests and fundamental rights do not override those interests.
          </li>
          <li>Where we need to comply with a legal obligation.</li>
        </Typography>

        <Typography level="h2">4. Data Security</Typography>
        <Typography>
          We have put in place appropriate security measures to prevent your personal data from
          being accidentally lost, used or accessed in an unauthorized way, altered or disclosed. In
          addition, we limit access to your personal data to those employees, agents, contractors
          and other third parties who have a business need to know.
        </Typography>

        <Typography level="h2">5. Data Retention</Typography>
        <Typography>
          We will only retain your personal data for as long as reasonably necessary to fulfil the
          purposes we collected it for, including for the purposes of satisfying any legal,
          regulatory, tax, accounting or reporting requirements.
        </Typography>

        <Typography level="h2">6. Your Legal Rights</Typography>
        <Typography>
          Under certain circumstances, you have rights under data protection laws in relation to
          your personal data, including the right to:
        </Typography>
        <Typography level="ul">
          <li>Request access to your personal data</li>
          <li>Request correction of your personal data</li>
          <li>Request erasure of your personal data</li>
          <li>Object to processing of your personal data</li>
          <li>Request restriction of processing your personal data</li>
          <li>Request transfer of your personal data</li>
          <li>Right to withdraw consent</li>
        </Typography>

        <Typography level="h2">7. Third-party Links</Typography>
        <Typography>
          This website may include links to third-party websites, plug-ins and applications.
          Clicking on those links or enabling those connections may allow third parties to collect
          or share data about you. We do not control these third-party websites and are not
          responsible for their privacy statements.
        </Typography>

        <Typography level="h2">8. Cookies</Typography>
        <Typography>
          You can set your browser to refuse all or some browser cookies, or to alert you when
          websites set or access cookies. If you disable or refuse cookies, please note that some
          parts of this website may become inaccessible or not function properly.
        </Typography>

        <Typography level="h2">9. Changes to the Privacy Policy</Typography>
        <Typography>
          We may update our Privacy Policy from time to time. We will notify you of any changes by
          posting the new Privacy Policy on this page and updating the "Last updated" date at the
          top of this Privacy Policy.
        </Typography>

        <Typography level="h2">10. Contact Us</Typography>
        <Typography>
          If you have any questions about this Privacy Policy, please contact us at:
        </Typography>
        <Typography level="ul">
          <li>Email: support@yuki.tiesen.id.vn</li>
          <li>Postal Address: 69 Xi Street, SaiGon, Vietnam</li>
        </Typography>
      </div>
    </article>
  )
}

export const metadata = seo({
  title: 'Privacy Policy',
  description: 'Learn how we respect your privacy and protect your personal data.',
  url: '/privacy-policy',
})
