import { Resend } from 'resend'

import { templates } from './emails'
import { env } from './env'

const resend = new Resend(env.RESEND_KEY)

export const sendEmail = async ({
  type,
  data,
}: {
  type: keyof typeof templates
  data: {
    email: string
    name: string
    [key: string]: string | Date | null
  }
}) => {
  try {
    const { subject, Component } = templates[type]

    const { data: aa, error } = await resend.emails.send({
      from: 'Yuki <no-reply@tiesen.id.vn>',
      to: [data.email],
      subject,
      // @ts-expect-error - data is dynamic
      react: Component(data),
    })

    if (error) return { error: error.message }
    return { message: aa?.id }
  } catch (e) {
    if (e instanceof Error) return { error: e.message }
    return { error: 'Unknown error' }
  }
}
