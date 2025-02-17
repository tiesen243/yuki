'use client'

import { useState, useTransition } from 'react'
import { z } from 'zod'

import { sendEmail } from '@yuki/email'
import { Button } from '@yuki/ui/components/button'
import { toast } from '@yuki/ui/components/sonner'
import { Textarea } from '@yuki/ui/components/textarea'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@yuki/ui/form'

const schema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  senderEmail: z.string().email('Invalid email address'),
  subject: z.string().min(1, 'Subject is required'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

export const ContactForm: React.FC = () => {
  const [error, setError] = useState<{
    [K in keyof z.infer<typeof schema>]?: string[] | undefined
  }>({})
  const [isPending, transition] = useTransition()

  const handleSubmit = (data: z.infer<typeof schema>) => {
    transition(async () => {
      const parsed = schema.safeParse(data)

      if (!parsed.success) {
        setError(parsed.error.flatten().fieldErrors)
        return
      }

      const { error } = await sendEmail({ type: 'Contact', data })

      if (error) {
        toast.error(error)
        return
      }

      toast.success('Email sent!')
      setError({})
    })
  }

  return (
    <Form<typeof handleSubmit> onSubmit={handleSubmit} isPending={isPending}>
      <div className="grid grid-cols-2 gap-4">
        <FormField
          name="firstName"
          error={error.firstName?.at(0)}
          render={() => (
            <FormItem>
              <FormLabel>First name</FormLabel>
              <FormControl placeholder="Enter your first name" />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="lastName"
          error={error.lastName?.at(0)}
          render={() => (
            <FormItem>
              <FormLabel>Last name</FormLabel>
              <FormControl placeholder="Enter your last name" />
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        name="senderEmail"
        error={error.senderEmail?.at(0)}
        render={() => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl placeholder="Enter your email" />
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        name="subject"
        error={error.subject?.at(0)}
        render={() => (
          <FormItem>
            <FormLabel>Subject</FormLabel>
            <FormControl placeholder="How can we help you?" />
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        name="message"
        error={error.message?.at(0)}
        render={() => (
          <FormItem>
            <FormLabel>Message</FormLabel>
            <FormControl asChild>
              <Textarea
                placeholder="Tell us more about your inquiry..."
                className="min-h-[150px] resize-none"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <Button className="w-full" disabled={isPending}>
        Send Message
      </Button>
    </Form>
  )
}
