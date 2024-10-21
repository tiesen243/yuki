import { ourFileRouter } from '@yuki/uploader'
import { createRouteHandler } from '@yuki/uploader/uploadthing'

import { env } from '@/env'

const { GET, POST } = createRouteHandler({
  router: ourFileRouter,
  config: { isDev: env.NODE_ENV === 'development' },
})

export { GET, POST }
