import { sha256 } from '@oslojs/crypto/sha2'
import { encodeBase32LowerCaseNoPadding, encodeHexLowerCase } from '@oslojs/encoding'

import type { User } from '@yuki/db'
import { db } from '@yuki/db'

interface Session {
  user?: User
  expires: Date
}

const EXPIRES_IN = 1000 * 60 * 60 * 24 * 30

const generateSessionToken = (): string => {
  const bytes = new Uint8Array(20)
  crypto.getRandomValues(bytes)
  const token = encodeBase32LowerCaseNoPadding(bytes)
  return token
}

const createSession = async (
  userId: string,
): Promise<{ token: string; expiresAt: Date }> => {
  const token = generateSessionToken()
  const session = {
    sessionToken: encodeHexLowerCase(sha256(new TextEncoder().encode(token))),
    expiresAt: new Date(Date.now() + EXPIRES_IN),
    user: { connect: { id: userId } },
  }

  await db.session.create({ data: session })
  return { token, expiresAt: session.expiresAt }
}

const validateSessionToken = async (token: string): Promise<Session> => {
  const sessionToken = encodeHexLowerCase(sha256(new TextEncoder().encode(token)))
  const result = await db.session.findUnique({
    where: { sessionToken },
    include: { user: true },
  })
  if (!result) return { expires: new Date(Date.now()) }

  const { user, ...session } = result
  if (Date.now() >= session.expiresAt.getTime()) {
    await db.session.delete({ where: { sessionToken } })
    return { expires: new Date(Date.now()) }
  }

  if (Date.now() >= session.expiresAt.getTime() - EXPIRES_IN / 2) {
    session.expiresAt = new Date(Date.now() + EXPIRES_IN)
    await db.session.update({
      where: { sessionToken },
      data: { expiresAt: session.expiresAt },
    })
  }

  return { user, expires: session.createdAt }
}

const invalidateSessionToken = async (token: string): Promise<void> => {
  const sessionToken = encodeHexLowerCase(
    sha256(new TextEncoder().encode(token.slice('Bearer '.length))),
  )
  await db.session.delete({ where: { sessionToken } })
}

export type { Session }
export {
  generateSessionToken,
  createSession,
  validateSessionToken,
  invalidateSessionToken,
}
