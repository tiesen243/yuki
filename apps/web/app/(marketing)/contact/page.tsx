import { createMetadata } from '@/lib/metadata'

export default function ContactPage() {
  return (
    <main className="container py-4">
      <p>Contact</p>
    </main>
  )
}

export const metadata = createMetadata({
  title: 'Contact us',
  description: 'Get in touch with us.',
  openGraph: {
    images: `/api/og?title=${encodeURIComponent('Contact us')}&description=${encodeURIComponent('Get in touch with us.')}`,
    url: '/contact',
  },
})
