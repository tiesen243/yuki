import { redirect } from 'next/navigation'
import { SearchIcon } from 'lucide-react'

import { cn } from '@yuki/ui'
import { Button } from '@yuki/ui/button'
import { Input } from '@yuki/ui/input'

export const Search: React.FC<{ className?: string }> = ({ className }) => {
  const action = async (formData: FormData) => {
    'use server'
    const q = formData.get('q')
    if (!q) return
    redirect(`/p?q=${String(q)}`)
  }

  return (
    <form className={cn('flex gap-1', className)} action={action}>
      <Input name="q" placeholder="Search..." />
      <Button variant="outline" size="icon" className="aspect-square md:hidden">
        <SearchIcon size={16} />
      </Button>
    </form>
  )
}
