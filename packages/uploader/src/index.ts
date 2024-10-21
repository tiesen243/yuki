import type { FileRouter } from 'uploadthing/next'
import { createUploadthing } from 'uploadthing/next'
import { UploadThingError, UTApi } from 'uploadthing/server'

import { auth } from '@yuki/auth'

import { uploaderEnv } from '../env'

const f = createUploadthing()

const middleware = async () => {
  const session = await auth()

  // eslint-disable-next-line @typescript-eslint/only-throw-error
  if (!session) throw new UploadThingError('Unauthorized')
  return { userId: session.user.id }
}

export const ourFileRouter = {
  avatarUploader: f({ image: { maxFileSize: '4MB' } })
    .middleware(middleware)
    .onUploadComplete(async ({ metadata, file }) => {
      console.log('Upload complete for userId:', metadata.userId)
      console.log('file url', file.url)
      return { uploadedBy: metadata.userId }
    }),
  categoryUploader: f({ image: { maxFileSize: '4MB' } })
    .middleware(middleware)
    .onUploadComplete(async ({ metadata, file }) => {
      console.log('Upload complete for userId:', metadata.userId)
      console.log('file url', file.url)
      return { uploadedBy: metadata.userId }
    }),
  prodcutUploader: f({ image: { maxFileSize: '4MB' } })
    .middleware(middleware)
    .onUploadComplete(async ({ metadata, file }) => {
      console.log('Upload complete for userId:', metadata.userId)
      console.log('file url', file.url)
      return { uploadedBy: metadata.userId }
    }),
} satisfies FileRouter

export type OurFileRouter = typeof ourFileRouter

export const utapi = new UTApi({ token: uploaderEnv.UPLOADTHING_TOKEN })
