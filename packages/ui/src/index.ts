import type { ClassValue } from 'clsx'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs))

export * from 'geist/font/mono'
export * from 'geist/font/sans'
export * from 'next-themes'
