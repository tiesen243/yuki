import { Resend } from 'resend'

import { templates } from './emails'
import { env } from './env'

const resend = new Resend(env.RESEND_KEY)

export const sendEmail = async ({
  type,
  params,
}: {
  type: keyof typeof templates
  params: {
    email: string
    name: string
    [key: string]: string | Date | null
  }
}) => {
  try {
    const { subject, Component } = templates[type]

    const { data, error } = await resend.emails.send({
      from: 'Yuki <no-reply@tiesen.id.vn>',
      to: [params.email],
      subject,
      react: Component(params),
    })

    if (error) return { error: error.message }
    return { message: data?.id }
  } catch (e) {
    if (e instanceof Error) return { error: e.message }
    return { error: 'Unknown error' }
  }
}
