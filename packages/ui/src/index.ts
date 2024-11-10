import localFont from 'next/font/local'
import { cx } from 'class-variance-authority'
import { twMerge } from 'tailwind-merge'

const cn = (...inputs: Parameters<typeof cx>) => twMerge(cx(inputs))

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
})

const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
})

export { cn, geistSans, geistMono }
export * as icons from 'lucide-react'
export * from 'next-themes'
