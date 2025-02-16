import {
  Body,
  Column,
  Container,
  Font,
  Head,
  Heading,
  Html,
  Img,
  Preview,
  Row,
  Section,
  Tailwind,
  Text,
} from '@react-email/components'

export function EmailLayout({
  preview,
  title,
  name,
  children,
}: Readonly<{
  preview: string
  title: React.ReactNode
  name: string
  children: React.ReactNode
}>) {
  const greeting = getHello()

  return (
    <Html lang="en">
      <Head>
        <Font
          fontFamily="Geist"
          fallbackFontFamily="sans-serif"
          webFont={{
            url: 'https://fonts.gstatic.com/s/geist/v1/gyByhwUxId8gMEwcGFU.woff2',
            format: 'woff2',
          }}
          fontWeight={400}
          fontStyle="normal"
        />
        <Font
          fontFamily="Geist"
          fallbackFontFamily="sans-serif"
          webFont={{
            url: 'https://fonts.gstatic.com/s/geist/v1/gyByhwUxId8gMEwcGFU.woff2',
            format: 'woff2',
          }}
          fontWeight={700}
          fontStyle="bold"
        />
      </Head>
      <Tailwind>
        <Body className="bg-[#ffffff] text-[#0a0a0a]">
          <Preview>
            {greeting}! {preview}
          </Preview>
          <Container className="my-3 max-w-[465px] rounded-md border border-solid border-[#e5e5e5] p-5">
            <Section className="mt-8">
              <Img
                src="https://tiesen.id.vn/assets/tiesen.png"
                className="mx-auto h-16 w-auto"
              />
            </Section>
            <Heading className="mx-0 my-6 p-0 text-center text-2xl font-normal">
              {title}
            </Heading>

            <Text>
              {greeting} {name},
            </Text>

            {children}

            <Row className="mt-5 border-t border-solid border-[#e5e5e5] pt-5">
              <Column>
                <Text className="text-center text-xs text-[#737373]">
                  © {new Date().getFullYear()} Yuki. All rights reserved.
                </Text>
                <Text className="text-center text-xs text-[#737373]">
                  Yuki Inc., 69 Skibidi, Sigma, Gyatt
                </Text>
              </Column>
            </Row>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}

const getHello = (): string => {
  const hour = new Date().getHours()

  if (hour >= 5 && hour < 12)
    return 'Ohayo' // Good morning - 5 AM to 11:59 AM
  else if (hour >= 12 && hour < 17)
    return 'Konnichiwa' // Good afternoon - 12 PM to 4:59 PM
  else return 'Konbanwa' // Good evening - 5 PM to 8:59 PM
}
