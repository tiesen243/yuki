import { auth, signOut } from '@yuki/auth'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@yuki/ui/alert-dialog'
import { Avatar, AvatarFallback, AvatarImage } from '@yuki/ui/avatar'
import { LogOutIcon } from '@yuki/ui/icons'
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@yuki/ui/sidebar'

export const NavUser: React.FC = async () => {
  const session = await auth()
  if (!session) return null

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <SidebarMenuButton size="lg">
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={session.user.avatar ?? ''} alt={session.user.name} />
                <AvatarFallback className="rounded-lg">
                  {session.user.name.slice(0, 2)}
                </AvatarFallback>
              </Avatar>

              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{session.user.name}</span>
                <span className="truncate text-xs">{session.user.email}</span>
              </div>

              <LogOutIcon className="ml-auto size-4" />
            </SidebarMenuButton>
          </AlertDialogTrigger>

          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure you want to log out?</AlertDialogTitle>
            </AlertDialogHeader>

            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <form action={signOut}>
                <AlertDialogAction type="submit">Log out</AlertDialogAction>
              </form>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
