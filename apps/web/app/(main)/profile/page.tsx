import Link from 'next/link'

import { auth } from '@yuki/auth'
import { Avatar, AvatarFallback, AvatarImage } from '@yuki/ui/avatar'
import { Badge } from '@yuki/ui/badge'
import { Button } from '@yuki/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@yuki/ui/card'
import { Typography } from '@yuki/ui/typography'

export default async function ProfilePage() {
  const { user } = await auth()
  if (!user)
    return (
      <div className="container grid h-full place-items-center">
        You are not logged in.
      </div>
    )

  return (
    <section className="container mx-auto py-8">
      <div className="grid gap-6">
        {/* Profile Header */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={user.image} alt={user.name} />
                <AvatarFallback className="text-lg">{user.name}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <Typography variant="h3" as="h1">
                    {user.name}
                  </Typography>
                  <Badge
                    variant={user.role === 'admin' ? 'default' : 'secondary'}
                  >
                    {user.role}
                  </Badge>
                </div>
                <Typography color="muted" className="text-sm">
                  {user.email}
                </Typography>
                <Typography color="muted" className="text-xs">
                  Member since {user.createdAt.toLocaleDateString()}
                </Typography>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="transition-shadow hover:shadow-md">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <Typography color="muted" className="mb-3 text-sm">
                View and track your orders
              </Typography>
              <Button asChild variant="outline" size="sm" className="w-full">
                <Link href="/profile/orders">View Orders</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="transition-shadow hover:shadow-md">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Addresses</CardTitle>
            </CardHeader>
            <CardContent>
              <Typography color="muted" className="mb-3 text-sm">
                Manage shipping addresses
              </Typography>
              <Button asChild variant="outline" size="sm" className="w-full">
                <Link href="/profile/addresses">Manage Addresses</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="transition-shadow hover:shadow-md">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Shopping Cart</CardTitle>
            </CardHeader>
            <CardContent>
              <Typography color="muted" className="mb-3 text-sm">
                Review items in your cart
              </Typography>
              <Button asChild variant="outline" size="sm" className="w-full">
                <Link href="/profile/cart">View Cart</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="transition-shadow hover:shadow-md">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Security</CardTitle>
            </CardHeader>
            <CardContent>
              <Typography color="muted" className="mb-3 text-sm">
                Update security settings
              </Typography>
              <Button asChild variant="outline" size="sm" className="w-full">
                <Link href="/profile/security">Security Settings</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Account Overview */}
        <Card>
          <CardHeader>
            <CardTitle>Account Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Typography variant="h4" className="mb-2 text-sm font-medium">
                  Account Information
                </Typography>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Name:</span>
                    <span>{user.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Email:</span>
                    <span>{user.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Role:</span>
                    <span className="capitalize">{user.role}</span>
                  </div>
                </div>
              </div>
              <div>
                <Typography variant="h4" className="mb-2 text-sm font-medium">
                  Account Activity
                </Typography>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Joined:</span>
                    <span>{user.createdAt.toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Last Updated:</span>
                    <span>{user.updatedAt.toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
