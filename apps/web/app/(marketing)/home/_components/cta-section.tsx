import Link from 'next/link'

import { Button } from '@yuki/ui/button'
import { ArrowRightIcon, PlayIcon } from '@yuki/ui/icons'

export function CtaSection() {
  return (
    <section className="py-20 md:py-32">
      <div className="container px-4 md:px-6">
        <div className="bg-primary/5 mx-auto max-w-3xl rounded-lg p-8 text-center md:p-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Ready to transform your shopping experience?
          </h2>
          <p className="text-muted-foreground mx-auto mt-4 max-w-[700px] md:text-xl/relaxed">
            Join thousands of shoppers who have already discovered a better way
            to shop online with Yuki.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-2 min-[400px]:flex-row">
            <Button size="lg" asChild>
              <Link href="/" className="flex items-center gap-1 px-8">
                <PlayIcon className="h-4 w-4" />
                <span>Explore the App</span>
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="#demo" className="flex items-center gap-1 px-8">
                <span>Watch Demo</span>
                <ArrowRightIcon className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
