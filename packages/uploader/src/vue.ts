import './styles.css'

import { generateUploadButton, generateUploadDropzone } from '@uploadthing/vue'

import type { OurFileRouter } from '.'

export const UploadButton = generateUploadButton<OurFileRouter>()
export const UploadDropzone = generateUploadDropzone<OurFileRouter>()
