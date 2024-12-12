'use server'

import { Resend } from 'resend'

import { emailEnv } from '@yuki/email/env'

import * as templates from './emails'

export const sendEmail = async ({
  emails,
  kind,
  data,
}: {
  emails: string[]
  kind: keyof typeof templates
  data: Record<string, string>
}) => {
  const { subject, react } = templates[kind](data)

  const resend = new Resend(emailEnv.RESEND_KEY)

  const { data: res, error } = await resend.emails.send({
    from: 'Yuki <no-reply@tiesen.id.vn>',
    to: emails,
    subject,
    react: react(),
  })

  if (error) throw new Error(error.message)
  return res
}
