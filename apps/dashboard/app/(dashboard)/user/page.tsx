import { auth } from '@yuki/auth'
import { Avatar, AvatarFallback, AvatarImage } from '@yuki/ui/avatar'
import { Badge } from '@yuki/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@yuki/ui/card'

export default async () => {
  const session = await auth()
  if (!session) return null
  const { user } = session

  return (
    <div className="container mx-auto py-10">
      <Card className="mx-auto max-w-2xl">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">User Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center space-y-6">
            <Avatar className="h-32 w-32">
              <AvatarImage src={user.avatar ?? ''} alt={user.name} />
              <AvatarFallback>
                {user.name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-2 text-center">
              <h2 className="text-2xl font-semibold">{user.name}</h2>
              {user.username && <p className="text-muted-foreground">@{user.username}</p>}
              <Badge variant="secondary">{user.role}</Badge>
            </div>
            <div className="w-full space-y-4">
              <ProfileItem label="Email" value={user.email} />
              <ProfileItem
                label="Created At"
                value={new Intl.DateTimeFormat('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: 'numeric',
                  minute: 'numeric',
                  timeZone: 'UTC',
                }).format(user.createdAt)}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

const ProfileItem = ({ label, value }: { label: string; value: string }) => (
  <div className="flex flex-col sm:flex-row sm:justify-between">
    <span className="text-muted-foreground">{label}:</span>
    <span className="font-medium">{value}</span>
  </div>
)
