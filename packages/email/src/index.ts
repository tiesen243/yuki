'use server'

import { Resend } from 'resend'

import { emailEnv } from '@yuki/email/env'

import * as templates from './templates'

const resend = new Resend(emailEnv.RESEND_KEY)

export interface EmailProps {
  data: Record<string, string>
}

export const sendEmail = async ({
  email,
  subject,
  type,
  ...rest
}: {
  email: string
  subject: string
  type: keyof typeof templates
} & EmailProps) => {
  const { data, error } = await resend.emails.send({
    from: 'Yuki <no-reply@tiesen.id.vn>',
    to: [email],
    subject,
    react: templates[type](rest),
  })

  if (error) return { success: false, data: null, error }
  return { success: true, data, error: null }
}
