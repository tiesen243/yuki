import {
  Body,
  Column,
  Container,
  Font,
  Head,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Tailwind,
  Text,
} from '@react-email/components'

export const getAppUrl = () => {
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL)
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`.replace('dashboard.', '')

  return 'http://localhost:3000'
}

export const Layout: React.FC<{
  children: React.ReactNode
  preview: string
}> = ({ children, preview }) => (
  <Tailwind
    config={{
      theme: {
        extend: {
          fontFamily: {
            sans: [
              'Geist',
              'fantasy',
              'ui-sans-serif',
              'system-ui',
              'sans-serif',
              '"Apple Color Emoji"',
              '"Segoe UI Emoji"',
              '"Segoe UI Symbol"',
              '"Noto Color Emoji"',
            ],
          },
          colors: { background: '#fafafa', foreground: '#0a0a0a', muted: '#525252' },
        },
      },
    }}
  >
    <Html>
      <Head>
        <Font
          fontFamily="Geist"
          fallbackFontFamily="fantasy"
          webFont={{
            url: 'https://fonts.googleapis.com/css2?family=Geist:wght@100..900&display=swap',
            format: 'woff',
          }}
        />
      </Head>
      <Preview>{preview}</Preview>
      <Body className="bg-background font-sans text-foreground antialiased">
        <Container className="mx-auto py-10">
          <Row className="mx-auto w-1/3">
            <Column>
              <Img width="69" height="69" alt="Yuki" src={`${getAppUrl()}/assets/logo.svg`} />
            </Column>

            <Column>
              <Text className="text-4xl font-bold">Yuki</Text>
            </Column>
          </Row>
          <Section>{children}</Section>
          <Text className="leading-6">
            Best,
            <br />
            The Yuki
          </Text>
          <Hr />
          <Section className="py-5">
            <Row className="mx-auto w-1/2">
              <Column>
                <Link href={`${getAppUrl()}`}>Web Version</Link>
              </Column>
              <Column>
                <Link href={`${getAppUrl()}/privacy-policy`}>Privacy Policy</Link>
              </Column>
            </Row>

            <Row>
              <Text className="m-0 py-4 text-center text-xs text-muted">
                Please contact us if you have any questions. (If you reply to this email, we won't
                be able to see it.)
              </Text>
            </Row>
            <Row>
              <Text className="m-0 text-center text-sm text-muted">
                © {new Date().getFullYear()} Yuki, Inc. All Rights Reserved.
              </Text>
            </Row>
            <Row>
              <Text className="m-0 text-center text-sm text-muted">
                Yuki, INC. 1234 Street Rd. Suite 1234 City, ST 12345
              </Text>
            </Row>
          </Section>
        </Container>
      </Body>
    </Html>
  </Tailwind>
)
