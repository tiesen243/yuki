'use server'

import type { ResponseCookie } from 'next/dist/compiled/@edge-runtime/cookies'
import { cookies } from 'next/headers'

import { getWebsiteUrl } from '@/lib/utils'

export const setCookie = async ({
  name,
  value,
  attributes,
}: {
  name: string
  value: string
  attributes: Omit<ResponseCookie, 'name' | 'value'>
}) => {
  cookies().set(name, value, {
    ...attributes,
    domain: new URL(getWebsiteUrl()).hostname,
  })
}
