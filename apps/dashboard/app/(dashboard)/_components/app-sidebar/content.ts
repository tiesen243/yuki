import type { LucideIcon } from '@yuki/ui/icons'
import {
  BoxIcon,
  HomeIcon,
  KeyRoundIcon,
  LayoutDashboardIcon,
  PlusIcon,
  ShoppingCartIcon,
  TicketSlashIcon,
  UserPenIcon,
  UsersIcon,
} from '@yuki/ui/icons'

import { getClientUrl } from '@/lib/utils'

export interface SidebarContent {
  navMain: {
    title: string
    items: {
      icon: LucideIcon
      title: string
      url: string
    }[]
  }[]
  navSettings: {
    title: string
    items: {
      icon: LucideIcon
      title: string
      url: string
    }[]
  }
}

export const sidebarContent = {
  navMain: [
    {
      title: 'User',
      items: [
        {
          icon: HomeIcon,
          title: 'Back to Store',
          url: getClientUrl(),
        },
        {
          icon: UserPenIcon,
          title: 'Profile',
          url: '/profile',
        },
        {
          icon: ShoppingCartIcon,
          title: 'Cart',
          url: '/cart',
        },
        {
          icon: TicketSlashIcon,
          title: 'Orders',
          url: '/orders',
        },
      ],
    },

    {
      title: 'Admin',
      items: [
        {
          icon: LayoutDashboardIcon,
          title: 'Categories',
          url: '/admin/categories',
        },
        {
          icon: PlusIcon,
          title: 'Create Category',
          url: '/admin/categories/create',
        },
        {
          icon: BoxIcon,
          title: 'Products',
          url: '/admin/products',
        },
        {
          icon: PlusIcon,
          title: 'Create Product',
          url: '/admin/products/create',
        },
        {
          icon: TicketSlashIcon,
          title: 'Orders',
          url: '/admin/orders',
        },
        {
          icon: UsersIcon,
          title: 'Users',
          url: '/admin/users',
        },
      ],
    },
  ],

  navSettings: {
    title: 'Settings',
    items: [
      {
        icon: KeyRoundIcon,
        title: 'Change Password',
        url: '/settings/change-password',
      },
    ],
  },
} satisfies SidebarContent
