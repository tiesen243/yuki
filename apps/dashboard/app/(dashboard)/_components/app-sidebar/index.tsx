import Image from 'next/image'
import Link from 'next/link'
import * as icons from 'lucide-react'

import type { Session, User } from '@yuki/db'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarItem,
  SidebarLabel,
} from '@yuki/ui/sidebar'

import { NavMain } from '@/app/(dashboard)/_components/app-sidebar/nav-main'
import { NavSecondary } from '@/app/(dashboard)/_components/app-sidebar/nav-secondary'
import { NavUser } from '@/app/(dashboard)/_components/app-sidebar/nav-user'
import { getClientUrl } from '@/lib/utils'

export const AppSidebar: React.FC<{ session: Session & { user: User } }> = ({ session }) => (
  <Sidebar>
    <Link href="/" passHref>
      <SidebarHeader className="flex items-center gap-4">
        <Image
          src="/assets/logo.svg"
          alt="Yuki"
          width={24}
          height={24}
          className="object-cover dark:invert"
        />
        <span className="text-lg font-bold">Dashboard</span>
      </SidebarHeader>
    </Link>

    <SidebarContent>
      {session.user.role === 'ADMIN' && (
        <SidebarItem>
          <SidebarLabel>Admin</SidebarLabel>
          <NavMain items={data.adminNav} />
        </SidebarItem>
      )}
      <SidebarItem>
        <SidebarLabel>User</SidebarLabel>
        <NavMain items={data.userNav} />
      </SidebarItem>
      <SidebarItem className="mt-auto">
        <SidebarLabel>Help</SidebarLabel>
        <NavSecondary items={data.navSecondary} />
      </SidebarItem>
    </SidebarContent>

    <SidebarFooter>
      <NavUser user={session.user} />
    </SidebarFooter>
  </Sidebar>
)

const data = {
  adminNav: [
    {
      title: 'Products',
      url: '/products',
      icon: icons.Package,
      items: [
        { title: 'All Products', url: '/products', icon: icons.List },
        { title: 'Create Product', url: '/products/create', icon: icons.Plus },
      ],
    },
    {
      title: 'Categories',
      url: '/categories',
      icon: icons.Grid,
      items: [
        { title: 'All Categories', url: '/categories', icon: icons.List },
        { title: 'Create Category', url: '/categories/create', icon: icons.Plus },
      ],
    },
    { title: 'Orders', url: '/orders', icon: icons.ShoppingBag },
    { title: 'Users', url: '/users', icon: icons.Users },
  ],

  userNav: [
    { title: 'Back to Site', url: getClientUrl(), icon: icons.Home },
    { title: 'Account', url: '/account', icon: icons.User },
    { title: 'Your Cart', url: '/account/cart', icon: icons.ShoppingCart },
    { title: 'Settings', url: '/account/settings', icon: icons.Settings },
  ],

  navSecondary: [
    {
      title: 'Support',
      url: 'https://youtu.be/dQw4w9WgXcQ',
      icon: icons.LifeBuoy,
      isExternal: true,
    },
    {
      title: 'Feedback',
      url: 'https://youtu.be/UIp6_0kct_U',
      icon: icons.Send,
      isExternal: true,
    },
  ],
}
