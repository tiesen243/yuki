import { Card, CardContent, CardHeader, CardTitle } from '@yuki/ui/card'

interface TechCardProps {
  title: string
  href: string
  description: string
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
}

export const TechCard: React.FC<TechCardProps> = ({ href, title, description, Icon }) => (
  <Card isPressable asChild>
    <a href={href} target="_blank" rel="noopener noreferrer">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Icon className="h-6 w-6" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
    </a>
  </Card>
)
