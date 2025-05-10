import { Alert, AlertDescription, AlertTitle } from '@yuki/ui/alert'
import { Button } from '@yuki/ui/button'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@yuki/ui/card'
import { XIcon } from '@yuki/ui/icons'
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@yuki/ui/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@yuki/ui/tabs'
import { Typography } from '@yuki/ui/typography'

export default function HomePage() {
  return (
    <main className="container flex flex-1 flex-col gap-4 py-4">
      {(['default', 'success', 'info', 'warning', 'destructive'] as const).map(
        (color) => (
          <Alert key={color} variant={color}>
            <AlertTitle>Alert Title</AlertTitle>
            <AlertDescription>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </AlertDescription>
          </Alert>
        ),
      )}

      <div className="flex gap-4">
        {(
          [
            'default',
            'secondary',
            'success',
            'info',
            'warning',
            'destructive',
            'outline',
            'ghost',
          ] as const
        ).map((variant) => (
          <Button key={variant} variant={variant}>
            {variant}
          </Button>
        ))}
      </div>

      <article>
        {(
          [
            'default',
            'success',
            'info',
            'warning',
            'destructive',
            'muted',
          ] as const
        ).map((color) => (
          <Typography key={color} variant="h2" color={color}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </Typography>
        ))}
      </article>

      <div className="grid grid-cols-2 gap-4">
        {(['default', 'underline', 'bordered', 'light'] as const).map(
          (variant) => (
            <Tabs key={variant} defaultValue="tab1">
              <TabsList variant={variant}>
                <TabsTrigger value="tab1" variant={variant}>
                  Tab 1
                </TabsTrigger>
                <TabsTrigger value="tab2" variant={variant}>
                  Tab 2
                </TabsTrigger>
              </TabsList>

              <TabsContent value="tab1">
                Tab 1: Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Quisquam, voluptatibus. Quisquam, voluptatibus. Quisquam,
                voluptatibus. Quisquam, voluptatibus.
              </TabsContent>

              <TabsContent value="tab2">
                Tab 2: Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Quisquam, voluptatibus. Quisquam, voluptatibus. Quisquam,
                voluptatibus. Quisquam, voluptatibus.
              </TabsContent>
            </Tabs>
          ),
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {Array.from({ length: 3 }, (_, i) => (
          <Card key={i}>
            <CardHeader>
              <CardTitle>
                <Typography variant="h6" as="h3">
                  Card Title
                </Typography>
              </CardTitle>
              <CardDescription>
                <Typography color="muted">
                  Card description goes here.
                </Typography>
              </CardDescription>
              <CardAction>
                <XIcon />
              </CardAction>
            </CardHeader>

            <CardContent>
              <Typography>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Quisquam, voluptatibus. Quisquam, voluptatibus. Quisquam,
                voluptatibus. Quisquam, voluptatibus.
              </Typography>
            </CardContent>

            <CardFooter className="justify-end gap-4">
              <Button>Action</Button>
              <Button variant="outline">Cancel</Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <Table className="w-[600px]">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">ID</TableHead>
            <TableHead className="w-[200px]">Name</TableHead>
            <TableHead className="w-[100px]">Age</TableHead>
            <TableHead className="w-[250px] text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {Array.from({ length: 10 }, (_, i) => (
            <TableRow key={i}>
              <TableCell>{i + 1}</TableCell>
              <TableCell>John Doe</TableCell>
              <TableCell>{20 + i}</TableCell>
              <TableCell className="grid grid-cols-2 gap-4">
                <Button variant="outline">Edit</Button>
                <Button variant="destructive">Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>

        <TableFooter>
          <TableRow>
            <TableCell colSpan={4}>
              <div className="flex items-center justify-between">
                <Typography>Showing 1-10 of 100</Typography>
              </div>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </main>
  )
}
