import Image from 'next/image'

import {
  Grid2x2Icon,
  Grid2x2PlusIcon,
  LayoutDashboardIcon,
  PackagePlusIcon,
  PackageSearchIcon,
  PanelTopIcon,
  ShieldIcon,
  ShoppingBagIcon,
  ShoppingCartIcon,
  UserIcon,
  UsersIcon,
} from '@yuki/ui/icons'
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader } from '@yuki/ui/sidebar'

import type { SidebarItem } from '@/app/(dashboard)/_components/app-sidebar/sidebar-contents'
import { Footer } from '@/app/(dashboard)/_components/app-sidebar/footer'
import { SidebarContents } from '@/app/(dashboard)/_components/app-sidebar/sidebar-contents'
import { SidebarSettings } from '@/app/(dashboard)/_components/app-sidebar/sidebar-settings'
import { getWebsiteUrl } from '@/lib/utils'

export const AppSidebar: React.FC = () => (
  <Sidebar>
    <SidebarHeader className="flex-row items-center gap-4 px-4">
      <Image
        src={`${getWebsiteUrl()}/assets/logo.svg`}
        alt="Yuki"
        width={32}
        height={32}
        className="dark:invert"
      />
      <span className="text-xl font-bold">Yuki</span>
    </SidebarHeader>

    <SidebarContent className="list-none">
      <SidebarContents label="Admin" items={adminItems} />
      <SidebarContents label="User" items={userItems} />
      <SidebarSettings />
    </SidebarContent>

    <SidebarFooter>
      <Footer />
    </SidebarFooter>
  </Sidebar>
)

const adminItems: SidebarItem[] = [
  { title: 'Dashboard', url: '/', icon: LayoutDashboardIcon },
  {
    title: 'Products',
    url: '/products',
    icon: PackageSearchIcon,
    child: [
      { title: 'All Products', url: '/products', icon: PackageSearchIcon },
      { title: 'Add Product', url: '/products/add', icon: PackagePlusIcon },
    ],
  },
  {
    title: 'Categories',
    url: '/categories',
    icon: Grid2x2Icon,
    child: [
      { title: 'All Categories', url: '/categories', icon: Grid2x2Icon },
      { title: 'Add Category', url: '/categories/add', icon: Grid2x2PlusIcon },
    ],
  },
  { title: 'Orders', url: '/orders', icon: ShoppingBagIcon },
  { title: 'Customers', url: '/customers', icon: UsersIcon },
]

const userItems: SidebarItem[] = [
  { title: 'Browse Products', url: getWebsiteUrl(), icon: PanelTopIcon },
  { title: 'Profile', url: '/account', icon: UserIcon },
  { title: 'Orders', url: '/account/orders', icon: ShoppingCartIcon },
  { title: 'Security', url: '/account/security', icon: ShieldIcon },
]
