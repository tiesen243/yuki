import Link from 'next/link'

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@yuki/ui/collapsible'
import { ChevronRightIcon } from '@yuki/ui/icons'
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@yuki/ui/sidebar'

export const SidebarContents: React.FC<{ label: string; items: SidebarItem[] }> = ({
  label,
  items,
}) => (
  <SidebarGroup>
    <SidebarGroupLabel>{label}</SidebarGroupLabel>
    <SidebarGroupContent>
      <SidebarMenu>
        {items.map((item) => {
          if (item.child)
            return (
              <Collapsible key={item.title} className="group/collapsible" asChild>
                <SidebarGroup className="p-0">
                  <CollapsibleTrigger asChild>
                    <SidebarGroupLabel className="gap-2 text-sm text-foreground">
                      <item.icon /> <span>{item.title}</span>
                      <ChevronRightIcon className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarGroupLabel>
                  </CollapsibleTrigger>

                  <CollapsibleContent asChild>
                    <SidebarGroupContent className="pl-8">
                      <SidebarMenu>
                        {item.child.map((child) => (
                          <SidebarItem key={child.title} item={child} />
                        ))}
                      </SidebarMenu>
                    </SidebarGroupContent>
                  </CollapsibleContent>
                </SidebarGroup>
              </Collapsible>
            )

          return <SidebarItem key={item.title} item={item} />
        })}
      </SidebarMenu>
    </SidebarGroupContent>
  </SidebarGroup>
)

const SidebarItem: React.FC<{ item: SidebarItem }> = ({ item }) => (
  <SidebarMenuItem>
    <SidebarMenuButton asChild>
      <Link href={item.url}>
        <item.icon /> <span>{item.title}</span>
      </Link>
    </SidebarMenuButton>
  </SidebarMenuItem>
)

export interface SidebarItem {
  title: string
  url: string
  icon: React.FC<React.SVGProps<SVGSVGElement>>
  child?: SidebarItem[]
}
