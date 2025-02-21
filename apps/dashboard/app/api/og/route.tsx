import type { NextRequest } from 'next/server'
import { ImageResponse } from 'next/og'

import { createMetadata } from '@/lib/metadata'

export function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)

  const metadata = createMetadata({})
  const title = searchParams.get('title') ?? 'Welcome to Yuki'
  const description =
    searchParams.get('description') ?? metadata.description ?? ''
  const image = searchParams.get('image') ?? ''

  return new ImageResponse(
    (
      <div
        style={{
          fontFamily: 'Geist',
          backgroundColor: '#0c0c0c',
          backgroundImage: `linear-gradient(to top right, hsl(221,89%,72%), transparent)`,
        }}
        tw="flex w-full h-full p-12 text-white items-center"
      >
        <div tw={`flex flex-col ${image ? 'w-2/3' : 'w-full'}`}>
          <div tw="flex flex-row items-center mb-3 text-white">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`https://tiesen.id.vn/assets/logo.svg`}
              tw="w-20 h-20 mr-4"
              style={{ filter: 'invert(1)' }}
            />

            <p style={{ fontSize: '56px', fontWeight: 600 }}>
              {metadata.applicationName}
            </p>
          </div>

          <p
            style={{
              fontWeight: 800,
              fontSize: '48px',
            }}
          >
            {title}
          </p>
          <p style={{ fontSize: '32px', color: 'rgba(240,240,240,0.8)' }}>
            {description.length > 200
              ? `${description.slice(0, 201)}...`
              : description}
          </p>
        </div>

        {image && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={image}
            tw="w-1/3 rounded-lg"
            style={{ objectFit: 'cover', aspectRatio: '1/1' }}
          />
        )}
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  )
}
