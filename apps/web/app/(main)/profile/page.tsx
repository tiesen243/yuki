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
          <CardContent className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={user.image} alt={user.name} />
              <AvatarFallback className="text-lg">{user.name}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <Typography variant="h4" component="h2" className="mb-0">
                  {user.name}
                </Typography>
                <Badge
                  variant={user.role === 'admin' ? 'default' : 'secondary'}
                >
                  {user.role}
                </Badge>
              </div>
              <Typography className="text-muted-foreground text-sm">
                {user.email}
              </Typography>
              <Typography className="text-muted-foreground text-xs">
                Member since {user.createdAt.toLocaleDateString()}
              </Typography>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="transition-shadow hover:shadow-md">
            <CardHeader>
              <CardTitle>Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <Typography className="text-muted-foreground text-sm lg:text-base">
                View and track your orders
              </Typography>
              <Button asChild variant="outline" size="sm" className="w-full">
                <Link href="/profile/orders">View Orders</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="transition-shadow hover:shadow-md">
            <CardHeader>
              <CardTitle>Addresses</CardTitle>
            </CardHeader>
            <CardContent>
              <Typography className="text-muted-foreground text-sm lg:text-base">
                Manage shipping addresses
              </Typography>
              <Button asChild variant="outline" size="sm" className="w-full">
                <Link href="/profile/addresses">Manage Addresses</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="transition-shadow hover:shadow-md">
            <CardHeader>
              <CardTitle className="text-base">Shopping Cart</CardTitle>
            </CardHeader>
            <CardContent>
              <Typography className="text-muted-foreground text-sm lg:text-base">
                Review items in your cart before checkout
              </Typography>
              <Button asChild variant="outline" size="sm" className="w-full">
                <Link href="/profile/cart">View Cart</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="transition-shadow hover:shadow-md">
            <CardHeader>
              <CardTitle>Security</CardTitle>
            </CardHeader>
            <CardContent>
              <Typography className="text-muted-foreground text-sm lg:text-base">
                Update your password or delete your account
              </Typography>
              <Button asChild variant="outline" size="sm" className="w-full">
                <Link href="/profile/security">Security Settings</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Account Overview */}
        <Card className="gap-4">
          <CardHeader>
            <CardTitle>
              <Typography variant="h5" component="h2">
                Account Overview
              </Typography>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Typography variant="h6" component="h3">
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
                <Typography variant="h6" component="h3">
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
