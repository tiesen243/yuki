import { z } from 'zod'

export const unlinkAccountSchema = z.object({ provider: z.string() })
export type UnlinkAccountInput = z.infer<typeof unlinkAccountSchema>
