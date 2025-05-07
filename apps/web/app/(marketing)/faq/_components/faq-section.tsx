'use client'

import { useState } from 'react'
import { ChevronDownIcon } from 'lucide-react'

import { Typography } from '@yuki/ui/typography'
import { cn } from '@yuki/ui/utils'

interface FaqItem {
  question: string
  answer: string
}

interface FaqSectionProps {
  id: string
  title: string
  questions: FaqItem[]
}

export function FaqSection({ id, title, questions }: FaqSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id={id} className="scroll-mt-24">
      <Typography variant="h3" className="mb-6">
        {title}
      </Typography>
      <div className="space-y-4">
        {questions.map((item, index) => (
          <div key={index} className="rounded-lg border">
            <button
              onClick={() => {
                toggleQuestion(index)
              }}
              className="flex w-full items-center justify-between p-4 text-left"
              aria-expanded={openIndex === index}
              aria-controls={`faq-answer-${id}-${index}`}
            >
              <Typography variant="h6" className="font-medium">
                {item.question}
              </Typography>
              <ChevronDownIcon
                className={cn(
                  'text-muted-foreground h-5 w-5 transition-transform',
                  openIndex === index ? 'rotate-180' : '',
                )}
              />
            </button>
            <div
              id={`faq-answer-${id}-${index}`}
              className={cn(
                'overflow-hidden transition-all duration-200 ease-in-out',
                openIndex === index ? 'max-h-96' : 'max-h-0',
              )}
            >
              <div className="border-t p-4">
                <Typography variant="p" color="muted">
                  {item.answer}
                </Typography>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
