import * as React from 'react'
import Image from 'next/image'
import Link from 'next/link'

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from '@yuki/ui/sidebar'

import { env } from '@/env'

const data = {
  navMain: [
    {
      title: 'Dashboard',
      url: '/',
      items: [
        {
          title: 'Overview',
          url: '/',
        },
        {
          title: 'Analytics',
          url: '/analytics',
        },
      ],
    },
    {
      title: 'Products',
      url: '/products',
      items: [
        {
          title: 'All Products',
          url: '/products',
        },
        {
          title: 'Add Product',
          url: '/products/new',
        },
        {
          title: 'Categories',
          url: '/products/categories',
        },
        {
          title: 'Inventory',
          url: '/products/inventory',
        },
      ],
    },
    {
      title: 'Orders',
      url: '/orders',
      items: [
        {
          title: 'All Orders',
          url: '/orders',
        },
        {
          title: 'Pending',
          url: '/orders/pending',
        },
        {
          title: 'Shipped',
          url: '/orders/shipped',
        },
        {
          title: 'Returns',
          url: '/orders/returns',
        },
      ],
    },
    {
      title: 'Customers',
      url: '/customers',
      items: [
        {
          title: 'All Customers',
          url: '/customers',
        },
        {
          title: 'Reviews',
          url: '/customers/reviews',
        },
      ],
    },
    {
      title: 'Settings',
      url: '/settings',
      items: [
        {
          title: 'Store Profile',
          url: '/settings/profile',
        },
        {
          title: 'Payment Methods',
          url: '/settings/payments',
        },
        {
          title: 'Shipping',
          url: '/settings/shipping',
        },
        {
          title: 'Users',
          url: '/settings/users',
        },
      ],
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg">
              <div className="bg-primary flex aspect-square size-8 items-center justify-center rounded-lg">
                <Image
                  src={`${env.WEB_URL}/assets/logo.svg`}
                  alt="logo"
                  width={16}
                  height={16}
                  className="size-4 invert dark:invert-0"
                />
              </div>
              <span className="font-semibold">Dashboard</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {data.navMain.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <a href={item.url} className="font-medium">
                    {item.title}
                  </a>
                </SidebarMenuButton>
                {item.items.length ? (
                  <SidebarMenuSub>
                    {item.items.map((item) => (
                      <SidebarMenuSubItem key={item.title}>
                        <SidebarMenuSubButton asChild>
                          <Link href={item.url}>{item.title}</Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                ) : null}
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
