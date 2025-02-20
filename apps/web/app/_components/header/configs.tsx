import {
  AccessibilityIcon,
  CookieIcon,
  FileTextIcon,
  HeartIcon,
  InfoIcon,
  MailIcon,
  PackageIcon,
  ScaleIcon,
  ShieldIcon,
  ShoppingCartIcon,
  UserIcon,
} from '@yuki/ui/icons'

export const navLinks = [
  {
    Icon: UserIcon,
    title: 'My Profile',
    href: '/account/profile',
    shortcut: '⇧⌘P',
  },
  {
    Icon: ShoppingCartIcon,
    title: 'My Cart',
    href: '/account/cart',
    shortcut: '⇧⌘C',
  },
  {
    Icon: PackageIcon,
    title: 'My Orders',
    href: '/account/orders',
    shortcut: '⇧⌘O',
  },
  { Icon: HeartIcon, title: 'Wishlist', href: '#', shortcut: '⇧⌘W' },
]

export const legalNavLinks = [
  { Icon: InfoIcon, title: 'About', href: '/about' },
  { Icon: ShieldIcon, title: 'Privacy Policy', href: '/privacy' },
  { Icon: FileTextIcon, title: 'Terms & Conditions', href: '/terms' },
  {
    Icon: CookieIcon,
    title: 'Cookie Policy',
    href: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  },
  {
    Icon: AccessibilityIcon,
    title: 'Accessibility',
    href: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  },
  {
    Icon: ScaleIcon,
    title: 'Legal Notice',
    href: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  },
  { Icon: MailIcon, title: 'Contact Us', href: '/contact' },
]
