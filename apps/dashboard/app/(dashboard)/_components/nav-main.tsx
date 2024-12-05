import Link from 'next/link'

import type { LucideIcon } from '@yuki/ui/icons'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@yuki/ui/collapsible'
import { ChevronRight } from '@yuki/ui/icons'
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@yuki/ui/sidebar'

export const NavMain: React.FC<{
  title: string
  items: {
    title: string
    url: string
    isExternal?: boolean
    icon?: LucideIcon
    isActive?: boolean
    items?: {
      title: string
      url: string
      isExternal?: boolean
    }[]
  }[]
}> = ({ title, items }) => (
  <SidebarGroup>
    <SidebarGroupLabel>{title}</SidebarGroupLabel>
    <SidebarMenu>
      {items.map((item) => {
        if (!item.items)
          return (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton tooltip={item.title} asChild>
                <Link
                  href={item.url}
                  {...(item.isExternal && { target: '_blank', rel: 'noopener noreferrer' })}
                >
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )

        return (
          <Collapsible
            key={item.title}
            asChild
            defaultOpen={item.isActive}
            className="group/collapsible"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton tooltip={item.title}>
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                  <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {item.items.map((subItem) => (
                    <SidebarMenuSubItem key={subItem.title}>
                      <SidebarMenuSubButton asChild>
                        <Link
                          href={subItem.url}
                          {...(item.isExternal && { target: '_blank', rel: 'noopener noreferrer' })}
                        >
                          {subItem.title}
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        )
      })}
    </SidebarMenu>
  </SidebarGroup>
)
