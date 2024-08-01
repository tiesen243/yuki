import { ImageResponse } from 'next/og'
import type { NextRequest } from 'next/server'

import { getBaseUrl, siteConfig } from '@/lib/site'

interface Props {
  params: {
    title?: string
    desc?: string
  }
}

export const runtime = 'edge'

export const GET = async (_: NextRequest, { params }: Props): Promise<ImageResponse> => {
  const title = params.title ?? siteConfig.meta.applicationName
  const description = params.desc ?? siteConfig.meta.description

  const style = {
    width: '33.333%',
    marginRight: '2rem',
    filter: 'invert(1)',
    WebkitFilter: 'invert(1)',
  }

  return new ImageResponse(
    (
      <div tw="relative w-full h-full px-28 flex items-center justify-center bg-black text-white">
        {/*  eslint-disable-next-line @next/next/no-img-element */}
        <img alt="Tiesen" src={`${getBaseUrl()}/logo.svg`} style={style} />

        <div tw="w-2/3 flex flex-col">
          <h2 tw="text-6xl capitalize">{title}</h2>
          <p tw="text-2xl">{description}</p>
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  )
}