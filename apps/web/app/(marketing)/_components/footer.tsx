import Link from 'next/link'

export const Footer: React.FC = () => (
  <footer className="flex w-full shrink-0 flex-col items-center gap-2 border-t px-4 py-6 sm:flex-row md:px-6">
    <p className="text-xs text-muted-foreground">© 2024 Yuki. All rights reserved.</p>
    <nav className="flex gap-4 sm:ml-auto sm:gap-6">
      <Link className="text-xs underline-offset-4 hover:underline" href="/terms-of-service">
        Terms of Service
      </Link>
      <Link className="text-xs underline-offset-4 hover:underline" href="/privacy-policy">
        Privacy Policy
      </Link>
    </nav>
  </footer>
)
