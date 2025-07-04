import { headers } from 'next/headers'
import Link from 'next/link'

import { auth } from '@yuki/auth'
import { Avatar, AvatarFallback, AvatarImage } from '@yuki/ui/avatar'
import { Button } from '@yuki/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@yuki/ui/card'
import { Typography } from '@yuki/ui/typography'

export default async function ProfilePage() {
  const { user } = await auth({ headers: await headers() })
  if (!user) return null

  return (
    <section className="container grid gap-6">
      <h2 className="sr-only">User Profile Information section</h2>

      <Card>
        <CardContent className="flex items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={user.image} alt={user.name} />
            <AvatarFallback className="text-lg">{user.name}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <Typography variant="h5" component="h2" className="mb-0">
                {user.name}
              </Typography>
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

      <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <h3 className="sr-only">Profile Actions section</h3>

        {a.map((item) => (
          <Card key={item.link} className="transition-shadow hover:shadow-md">
            <CardHeader>
              <CardTitle>{item.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <Typography className="text-muted-foreground text-sm lg:text-base">
                {item.description}
              </Typography>
              <Button variant="outline" size="sm" className="w-full" asChild>
                <Link href={item.link}>{item.linkText}</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </section>

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
    </section>
  )
}

const a = [
  {
    title: 'Orders',
    description: 'View and track your orders placed on Yuki',
    link: '/profile/orders',
    linkText: 'View Orders',
  },
  {
    title: 'Addresses',
    description: 'Manage shipping addresses for your orders',
    link: '/profile/addresses',
    linkText: 'Manage Addresses',
  },
  {
    title: 'Shopping Cart',
    description: 'Review items in your cart before checkout',
    link: '/profile/cart',
    linkText: 'View Cart',
  },
  {
    title: 'Security',
    description: 'Update your password or delete your account',
    link: '/profile/security',
    linkText: 'Security Settings',
  },
]
