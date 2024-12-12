import {
  Body,
  Column,
  Container,
  Font,
  Head,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Tailwind,
  Text,
} from '@react-email/components'

export const EmailLayout: React.FC<{
  preview: string
  children: React.ReactNode
}> = (props) => (
  <Tailwind>
    <Html lang="en">
      <Head>
        <Font
          fontFamily="Geist"
          fallbackFontFamily="Verdana"
          webFont={{
            url: 'https://fonts.gstatic.com/s/geist/v1/gyByhwUxId8gMEwcGFU.woff2',
            format: 'woff2',
          }}
          fontWeight={400}
          fontStyle="normal"
        />{' '}
      </Head>
      <Preview>{props.preview}</Preview>

      <Body className="bg-white">
        <Container className="container mx-auto my-8 max-w-[580px] rounded-lg bg-[#f5f5f5] text-[#171717] shadow-lg">
          <Img
            width={100}
            src="https://tiesen.id.vn/android-chrome-512x512.png"
            className="m-8 mx-auto"
          />
          <Section className="flex w-full">
            <Row>
              <Column style={sectionBorder} />
              <Column style={sectionCenter} />
              <Column style={sectionBorder} />
            </Row>
          </Section>
          <Section className="px-5 pb-4 pt-2">
            {props.children}

            <Text>
              Still have questions? Please contact{' '}
              <Link href="https://youtu.be/dQw4w9WgXcQ" className="underline">
                Yuki Support
              </Link>
            </Text>
            <Text>
              Thanks,
              <br />
              Yuki Support Team
            </Text>
          </Section>
        </Container>

        <Section className="mx-auto max-w-[580px]">
          <Row>
            <Text style={{ textAlign: 'center', color: '#706a7b' }}>
              © {new Date().getFullYear()} Yuki, All Rights Reserved <br />
              350 Skibidi Street, 69th Floor, Gyatt, Ohio, 94104 - USA
            </Text>
          </Row>
        </Section>
      </Body>
    </Html>
  </Tailwind>
)

const sectionBorder = {
  borderBottom: '1px solid rgb(238,238,238)',
  width: '200px',
}

const sectionCenter = {
  borderBottom: '1px solid rgb(77,130,33)',
  width: '180px',
}
