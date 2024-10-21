import type { NextPage } from 'next'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@yuki/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@yuki/ui/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@yuki/ui/tabs'

import { seo } from '@/lib/seo'
import { data, htm } from './_data'

const Page: NextPage = () => (
  <main className="container py-6">
    <Card>
      <CardHeader>
        <CardTitle className="text-center text-3xl font-bold">Size Guide</CardTitle>
      </CardHeader>

      <CardContent>
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>{htm.title}</CardTitle>
            <CardDescription>{htm.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc space-y-2 pl-5">
              {htm.list.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Tabs defaultValue="clothing">
          <TabsList className="grid w-full grid-cols-3">
            {data.list.map((item) => (
              <TabsTrigger key={item.value} value={item.value}>
                <item.icon className="mr-2 h-4 w-4" />
                {item.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {data.content.map((item) => (
            <TabsContent key={item.value} value={item.value}>
              <Card>
                <CardHeader>
                  <CardTitle>{item.title}</CardTitle>
                  <CardDescription>{item.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        {item.headers.map((header, idx) => (
                          <TableHead key={idx}>{header}</TableHead>
                        ))}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {item.body.map((row, idx) => (
                        <TableRow key={idx}>
                          {row.map((cell, idx) => (
                            <TableCell key={idx}>{cell}</TableCell>
                          ))}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>

      <CardFooter>
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Need Help?</CardTitle>
            <CardDescription>We're here to assist you with any sizing questions.</CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              If you're unsure about which size to choose or have any questions about our sizing,
              please don't hesitate to contact our customer support team. We're here to help ensure
              you get the perfect fit.
            </p>
            <p className="mt-2">
              Email:{' '}
              <a href="mailto:yuki@tiesen.id.vn" className="text-blue-600 hover:underline">
                yuki@tiesen.id.vn
              </a>
            </p>
            <p>
              Phone:{' '}
              <a href="tel:+1234567890" className="text-blue-600 hover:underline">
                +1 (234) 567-890
              </a>
            </p>
          </CardContent>
        </Card>
      </CardFooter>
    </Card>
  </main>
)

export default Page

export const metadata = seo({
  title: 'Size Guide',
  description: 'Find the perfect fit with our size guide.',
  images: [
    '/api/og?title=Size%20Guide&description=Find%20the%20perfect%20fit%20with%20our%20size%20guide.',
  ],
  url: '/home/size-guide',
})
