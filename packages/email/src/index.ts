'use server'

import { Resend } from 'resend'

import { templates } from './emails'
import { env } from './env'

const resend = new Resend(env.RESEND_KEY)

type Templates = typeof templates
type EmailData = {
  [K in keyof Templates]: React.ComponentProps<Templates[K]['Component']>
}

export const sendEmail = async <T extends keyof Templates>({
  type,
  data,
}: {
  type: T
  data: EmailData[T] & { email?: string }
}) => {
  try {
    const { subject, Component } = templates[type]

    const { data: res, error } = await resend.emails.send({
      from: 'Yuki <no-reply@tiesen.id.vn>',
      to: [data.email ?? 'ttien56906@gmail.com'],
      subject,
      react: Component(data),
    })

    if (error) return { error: error.message }
    return { message: res?.id }
  } catch (e) {
    if (e instanceof Error) return { error: e.message }
    return { error: 'Unknown error' }
  }
}
