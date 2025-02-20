'use client'

import { useState, useTransition } from 'react'

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

import type { Schema } from './config'

export const ContactForm: React.FC<{
  send: (formData: Schema) => Promise<{
    errors?: { [K in keyof Schema]?: string[] }
    error?: string
  }>
}> = ({ send }) => {
  const [errors, setErrors] = useState<{
    [K in keyof Schema]?: string[] | undefined
  }>({})
  const [isPending, transition] = useTransition()

  const handleSubmit = (data: Schema) => {
    transition(async () => {
      const { errors, error } = await send(data)
      if (errors) setErrors(errors)
      else if (error) toast.error(error)
      else {
        setErrors({})
        toast.success('Email sent!')
      }
    })
  }

  return (
    <Form<typeof handleSubmit>
      onSubmit={handleSubmit}
      isPending={isPending}
      errors={errors}
    >
      <div className="grid grid-cols-2 gap-4">
        <FormField
          name="firstName"
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
