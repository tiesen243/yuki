'use client'

import React, { useState } from 'react'

import { Button } from '@yuki/ui/button'
import { FormField } from '@yuki/ui/form-field'
import { Textarea } from '@yuki/ui/textarea'

export const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prevState) => ({ ...prevState, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    alert("Thank you for your message. We'll get back to you soon!")
    setFormData({ name: '', email: '', message: '' })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {fields.map((field, idx) => (
        <FormField key={idx} {...field} value={formData[field.name]} onChange={handleChange}>
          {field.asChild && <Textarea />}
        </FormField>
      ))}
      <Button>Send Message</Button>
    </form>
  )
}

const fields = [
  { name: 'name' as const, label: 'Name', required: true },
  { name: 'email' as const, label: 'Email', required: true },
  { name: 'message' as const, label: 'Message', required: true, asChild: true },
]
