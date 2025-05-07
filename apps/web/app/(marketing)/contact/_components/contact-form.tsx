'use client'

import type React from 'react'
import { useState } from 'react'
import { z } from 'zod'

import { Button } from '@yuki/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useForm,
} from '@yuki/ui/form'
import { CheckCircle2Icon } from '@yuki/ui/icons'
import { Input } from '@yuki/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@yuki/ui/select'
import { toast } from '@yuki/ui/sonner'
import { Textarea } from '@yuki/ui/textarea'
import { Typography } from '@yuki/ui/typography'

export function ContactForm() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const form = useForm({
    schema: z.object({
      name: z.string().min(1, 'Name is required'),
      email: z.email('Invalid email address'),
      subject: z.string().optional(),
      message: z.string().min(1, 'Message is required'),
    }),
    defaultValues: { name: '', email: '', subject: '', message: '' },
    submitFn: (values) => {
      toast.success('Message sent successfully!', {
        description: <pre>{JSON.stringify(values, null, 2)}</pre>,
      })
      setIsSubmitted(true)
    },
  })

  if (isSubmitted) {
    return (
      <div className="border-success bg-success/20 rounded-lg border p-6 text-center">
        <div className="mb-4 flex justify-center">
          <CheckCircle2Icon className="h-12 w-12 text-green-500" />
        </div>
        <Typography variant="h4" className="mb-2">
          Thank you!
        </Typography>
        <Typography variant="p">
          Your message has been sent successfully. We&apos;ll get back to you as
          soon as possible.
        </Typography>
        <Button
          className="mt-4"
          variant="outline"
          onClick={() => {
            setIsSubmitted(false)
            form.reset()
          }}
        >
          Send another message
        </Button>
      </div>
    )
  }

  return (
    <Form form={form} className="gap-6">
      <FormField
        name="name"
        render={(field) => (
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl {...field}>
              <Input placeholder="Yukikaze" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        name="email"
        render={(field) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl {...field}>
              <Input placeholder="yuki@example.com" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        name="subject"
        render={(field) => (
          <FormItem>
            <FormLabel>Subject</FormLabel>
            <FormControl>
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a subject" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="general">General Inquiry</SelectItem>
                  <SelectItem value="support">Customer Support</SelectItem>
                  <SelectItem value="feedback">Feedback</SelectItem>
                  <SelectItem value="partnership">Partnership</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        name="message"
        render={(field) => (
          <FormItem>
            <FormLabel>Message</FormLabel>
            <FormControl {...field}>
              <Textarea placeholder="Your message here..." />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <Button type="submit" className="w-full" disabled={form.isPending}>
        {form.isPending ? 'Sending...' : 'Send Message'}
      </Button>

      <Typography variant="p" color="muted" className="text-center text-sm">
        By submitting this form, you agree to our{' '}
        <a href="/privacy" className="text-primary hover:underline">
          Privacy Policy
        </a>{' '}
        and{' '}
        <a href="/terms" className="text-primary hover:underline">
          Terms of Service
        </a>
        .
      </Typography>
    </Form>
  )
}
