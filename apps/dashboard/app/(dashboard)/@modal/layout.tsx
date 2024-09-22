'use client'

import { useRouter } from 'next/navigation'

import { Card } from '@yuki/ui/card'

const ModalLayout: React.FC<{ children: Readonly<React.ReactNode> }> = ({ children }) => {
  const router = useRouter()
  return (
    <div className="fixed inset-0 z-50 grid h-dvh w-svw place-items-center">
      <div
        onClick={() => router.back()}
        className="fixed inset-0 z-40 h-dvh w-svw bg-background/70 backdrop-blur-xl backdrop-saturate-150"
      />
      <Card className="z-50 w-svw max-w-5xl">{children}</Card>
    </div>
  )
}

export default ModalLayout
