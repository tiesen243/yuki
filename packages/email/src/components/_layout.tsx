import * as email from '@react-email/components'

import type { EmailProps } from '../config'
import { font, replyTo as rt, tailwindConfig } from '../config'

const logo = 'https://tiesen.id.vn/android-chrome-192x192.png'
const logoText = 'https://tiesen.id.vn/assets/tiesen.png'

export const EmailLayout: React.FC<EmailProps> = ({ preview, subject, replyTo = rt, children }) => (
  <email.Html lang="en">
    <email.Head>
      <email.Font {...font} />
      <email.Preview>{preview}</email.Preview>
    </email.Head>

    <email.Tailwind config={tailwindConfig}>
      <email.Body className="bg-background font-sans text-foreground antialiased">
        <email.Container className="mx-auto px-4">
          <email.Img src={logo} alt="logo" className="mx-auto my-8 h-16 w-16 object-cover" />

          <email.Section
            className="rounded-lg px-8 py-4 shadow-lg"
            style={{ border: '1px solid hsl(0, 0%, 89.8%)' }}
          >
            <email.Heading className="text-2xl">{subject}</email.Heading>

            {children}

            <email.Text>
              Best Regards, <br />
              Yuki
            </email.Text>
          </email.Section>

          <email.Section>
            <email.Text>
              Website: <email.Link href="https://tiesen.id.vn">tiesen.id.vn</email.Link>
              <br />
              Email: <email.Link href={`mailto:${replyTo}`}>{replyTo}</email.Link>
              <br />
              Address: Saigon, Vietnam
            </email.Text>

            <email.Img src={logoText} alt="Tiesen" className="my-4 h-auto w-52" />
          </email.Section>
        </email.Container>
      </email.Body>
    </email.Tailwind>
  </email.Html>
)
