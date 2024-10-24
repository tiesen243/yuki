'use server'

import { cookies } from 'next/headers'

import { getWebsiteUrl } from '@/lib/utils'

export const setCookie = async (cookie: {
  name: string
  value: string
  attributes: Record<string, string>
}) => {
  cookies().set(cookie.name, cookie.value, {
    ...cookie.attributes,
    domain: new URL(getWebsiteUrl()).hostname,
  })
}
