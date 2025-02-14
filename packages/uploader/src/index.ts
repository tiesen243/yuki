import type { FileRouter } from 'uploadthing/next'
import { NextSSRPlugin } from '@uploadthing/react/next-ssr-plugin'
import { createRouteHandler, createUploadthing } from 'uploadthing/next'
import { extractRouterConfig, UploadThingError } from 'uploadthing/server'

import { auth } from '@yuki/auth'

const f = createUploadthing()

const configs = f({
  image: {
    /**
     * For full list of options and defaults, see the File Route API reference
     * @see https://docs.uploadthing.com/file-routes#route-config
     */
    maxFileSize: '4MB',
    maxFileCount: 1,
  },
})
  // Set permissions and file types for this FileRoute
  .middleware(async ({ req }) => {
    // This code runs on your server before upload
    const { user } = await auth(req)

    // If you throw, the user will not be able to upload
    // eslint-disable-next-line @typescript-eslint/only-throw-error
    if (!user) throw new UploadThingError('Unauthorized')

    // Whatever is returned here is accessible in onUploadComplete as `metadata`
    return { userId: user.id }
  })
  .onUploadComplete(({ metadata, file }) => {
    // This code RUNS ON YOUR SERVER after upload
    console.log('Upload complete for userId:', metadata.userId)

    console.log('file url', file.ufsUrl)

    // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
    return { uploadedBy: metadata.userId }
  })

// FileRouter for your app, can contain multiple FileRoutes
const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  userImageUploader: configs,
  categoryImageUploader: configs,
  productImageUploader: configs,
} satisfies FileRouter

const handler = createRouteHandler({
  router: ourFileRouter,
})

export { extractRouterConfig, handler, NextSSRPlugin, ourFileRouter }
export type OurFileRouter = typeof ourFileRouter
