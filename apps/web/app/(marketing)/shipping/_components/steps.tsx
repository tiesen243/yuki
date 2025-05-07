import type * as React from 'react'

import { cn } from '@yuki/ui/utils'

interface StepsProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export function Steps({ className, children, ...props }: StepsProps) {
  return (
    <div className={cn('space-y-8', className)} {...props}>
      {children}
    </div>
  )
}

interface StepProps {
  title: string
  description?: string
  active?: boolean
  completed?: boolean
}

export function Step({ title, description, active, completed }: StepProps) {
  return (
    <div className="flex items-start">
      <div className="mr-4 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border">
        <div
          className={cn(
            'h-6 w-6 rounded-full',
            active && 'bg-primary/20',
            completed && 'bg-primary text-primary-foreground',
          )}
        >
          {completed && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-check"
            >
              <path d="M20 6 9 17l-5-5" />
            </svg>
          )}
        </div>
      </div>
      <div className="flex-1">
        <h4
          className={cn(
            'text-base font-medium',
            active && 'text-primary',
            !active && !completed && 'text-muted-foreground',
          )}
        >
          {title}
        </h4>
        {description && (
          <p className="text-muted-foreground mt-1 text-sm">{description}</p>
        )}
      </div>
    </div>
  )
}
