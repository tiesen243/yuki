import { createMetadata } from '@/lib/metadata'

export default function AboutPage() {
  return (
    <main className="container py-4">
      <p>About</p>
    </main>
  )
}

export const metadata = createMetadata({
  title: 'About us',
  description: 'Learn more about Yuki.',
  openGraph: {
    images: `/api/og?title=${encodeURIComponent('About us')}&description=${encodeURIComponent('Learn more about Yuki.')}`,
    url: '/about',
  },
})
