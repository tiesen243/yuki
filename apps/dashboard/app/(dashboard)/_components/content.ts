import {
  BoxIcon,
  Grid2x2Icon,
  LifeBuoyIcon,
  PanelTopIcon,
  SendIcon,
  UserIcon,
  UsersIcon,
} from '@yuki/ui/icons'

import { getWebsiteUrl } from '@/lib/utils'

export const content = {
  user: [
    {
      title: 'Website',
      icon: PanelTopIcon,
      isExternal: true,
      url: getWebsiteUrl(),
    },
    {
      title: 'Information',
      url: '#',
      icon: UserIcon,
      isActive: true,
      items: [
        {
          title: 'Profile',
          url: '/user',
        },
        {
          title: 'Change password',
          url: '/user/change-password',
        },
        {
          title: 'Settings',
          url: '/user/settings',
        },
      ],
    },
  ],
  admin: [
    {
      title: 'Category',
      url: '#',
      icon: Grid2x2Icon,
      isActive: true,
      items: [
        {
          title: 'List category',
          url: '/admin/category',
        },
        {
          title: 'New category',
          url: '/admin/category/new',
        },
      ],
    },
    {
      title: 'Product',
      url: '#',
      icon: BoxIcon,
      isActive: true,
      items: [
        {
          title: 'List product',
          url: '/admin/product',
        },
        {
          title: 'New product',
          url: '/admin/product/new',
        },
      ],
    },
    {
      title: 'Users',
      url: '/admin/users',
      icon: UsersIcon,
    },
  ],

  navSecondary: [
    {
      title: 'Support',
      url: 'https://youtu.be/dQw4w9WgXcQ',
      isExternal: true,
      icon: LifeBuoyIcon,
    },
    {
      title: 'Feedback',
      url: 'https://youtu.be/dQw4w9WgXcQ',
      isExternal: true,
      icon: SendIcon,
    },
  ],
}
