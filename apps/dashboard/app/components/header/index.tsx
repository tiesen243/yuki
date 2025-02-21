import { Link, NavLink } from 'react-router'

import { cn } from '@yuki/ui/utils'

import { env } from '@/env'

export const Header: React.FC = () => (
  <header className="bg-background/70 sticky inset-0 z-50 flex h-20 items-center border-b shadow-md backdrop-blur-xl backdrop-saturate-150">
    <div className="container flex items-center justify-between gap-4">
      <Link to="/" className="flex items-center gap-2">
        <img
          src={`${env.VITE_WEB_URL}/assets/logo.svg`}
          alt="Logo"
          className="size-9 dark:invert"
        />
        <span className="sr-only text-2xl font-bold md:not-sr-only">
          Dashboard
        </span>
      </Link>

      <nav className="ml-6 flex items-center space-x-6">
        {navItems.map((item) => (
          <NavLink
            key={item.href}
            to={item.href}
            className={({ isActive }) =>
              cn(
                'hover:text-primary flex items-center space-x-2 text-sm font-medium transition-colors',
                isActive ? 'text-foreground' : 'text-muted-foreground',
              )
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </div>
  </header>
)

const navItems = [
  {
    label: 'Products',
    href: '/products',
  },
  {
    label: 'Categories',
    href: '/categories',
  },
  {
    label: 'Orders',
    href: '/orders',
  },
  {
    label: 'Customers',
    href: '/customers',
  },
]
