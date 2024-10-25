import { Typography } from '@yuki/ui/typography'

import { seo } from '@/lib/seo'

const Page: React.FC = () => (
  <article className="container py-8">
    <div className="mb-6 text-center">
      <Typography level="h1">Terms of Service</Typography>
      <Typography className="text-muted-foreground">
        Last updated: {new Date().toLocaleDateString()}
      </Typography>
    </div>

    <div className="space-y-4">
      <Typography level="h2">1. Acceptance of Terms</Typography>
      <Typography>
        By accessing or using yuki.tiesen.id.vn (the "Site"), you agree to comply with and be bound
        by these Terms of Service. If you do not agree to these terms, please do not use our Site.
      </Typography>

      <Typography level="h2">2. Use of the Site</Typography>
      <Typography>
        You agree to use the Site only for lawful purposes and in a way that does not infringe the
        rights of, restrict or inhibit anyone else's use and enjoyment of the Site.
      </Typography>

      <Typography level="h2">3. Account Registration</Typography>
      <Typography>
        To access certain features of the Site, you may be required to register for an account. You
        agree to provide accurate, current, and complete information during the registration process
        and to update such information to keep it accurate, current, and complete.
      </Typography>

      <Typography level="h2">4. Privacy Policy</Typography>
      <Typography>
        Your use of the Site is also governed by our Privacy Policy, which can be found [link to
        privacy policy].
      </Typography>

      <Typography level="h2">5. Product Information and Pricing</Typography>
      <Typography>
        We strive to provide accurate product and pricing information, but errors may occur. We
        reserve the right to correct any errors and to change or update information at any time
        without prior notice.
      </Typography>

      <Typography level="h2">6. Ordering and Payment</Typography>
      <Typography>
        By placing an order, you are making an offer to purchase. We reserve the right to refuse or
        cancel any order for any reason at any time. Payment must be received prior to the
        acceptance of an order.
      </Typography>

      <Typography level="h2">7. Shipping and Delivery</Typography>
      <Typography>
        Shipping and delivery terms are as specified at the time of purchase. We are not responsible
        for delays outside our control.
      </Typography>

      <Typography level="h2">8. Returns and Refunds</Typography>
      <Typography>
        Our return and refund policy is [brief description of policy]. For full details, please
        refer to our Returns and Refunds page.
      </Typography>

      <Typography level="h2">9. Intellectual Property</Typography>
      <Typography>
        The content on this Site, including without limitation, the text, software, scripts,
        graphics, photos, sounds, music, videos, interactive features and the like and the
        trademarks, service marks and logos contained therein, are owned by or licensed to us.
      </Typography>

      <Typography level="h2">10. Limitation of Liability</Typography>
      <Typography>
        To the fullest extent permitted by applicable law, we will not be liable for any indirect,
        incidental, punitive, or consequential damages arising from your use of the Site.
      </Typography>

      <Typography level="h2">11. Governing Law</Typography>
      <Typography>
        These Terms of Service and any separate agreements whereby we provide you Services shall be
        governed by and construed in accordance with the laws of [Your Country/State].
      </Typography>

      <Typography level="h2">12. Changes to Terms</Typography>
      <Typography>
        We reserve the right to modify these terms at any time. Please review these terms
        periodically for changes.
      </Typography>

      <Typography level="h2">13. Contact Information</Typography>
      <Typography>
        If you have any questions about these Terms, please contact us at [your contact email].
      </Typography>
    </div>
  </article>
)

export default Page

export const metadata = seo({
  title: 'Terms of Service',
  description:
    'Read our Terms of Service to learn more about the rules and guidelines of our Site.',
  url: '/terms-of-service',
})
