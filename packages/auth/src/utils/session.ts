import type { User } from '@prisma/client'
import { sha256 } from '@oslojs/crypto/sha2'
import {
  encodeBase32LowerCaseNoPadding,
  encodeHexLowerCase,
} from '@oslojs/encoding'

import { db } from '@yuki/db'

export class Session {
  private readonly db: typeof db
  private readonly EXPIRATION_TIME

  constructor() {
    this.EXPIRATION_TIME = 1000 * 60 * 60 * 24 * 30 // 30 days

    this.db = db
  }

  private generateSessionToken(): string {
    const bytes = new Uint8Array(20)
    crypto.getRandomValues(bytes)
    const token = encodeBase32LowerCaseNoPadding(bytes)
    return token
  }

  public async createSession(
    userId: User['id'],
  ): Promise<{ sessionToken: string; expires: Date }> {
    const token = this.generateSessionToken()

    const session = await this.db.session.create({
      data: {
        sessionToken: encodeHexLowerCase(
          sha256(new TextEncoder().encode(token)),
        ),
        expires: new Date(Date.now() + this.EXPIRATION_TIME),
        userId,
      },
    })

    return { sessionToken: token, expires: session.expires }
  }

  public async validateSessionToken(token: string): Promise<SessionResult> {
    const sessionToken = encodeHexLowerCase(
      sha256(new TextEncoder().encode(token)),
    )

    const result = await this.db.session.findUnique({
      where: { sessionToken },
      include: { user: true },
    })

    if (!result) return { expires: new Date() }

    const { user, ...session } = result

    if (Date.now() > session.expires.getTime()) {
      await this.db.session.delete({ where: { sessionToken } })
      return { expires: new Date() }
    }

    if (Date.now() >= session.expires.getTime() - this.EXPIRATION_TIME / 2) {
      session.expires = new Date(Date.now() + this.EXPIRATION_TIME)
      await this.db.session.update({
        where: { sessionToken },
        data: { expires: session.expires },
      })
    }

    return { user, expires: session.expires }
  }

  public async invalidateSessionToken(token: string): Promise<void> {
    const sessionToken = encodeHexLowerCase(
      sha256(new TextEncoder().encode(token)),
    )
    await this.db.session.delete({ where: { sessionToken } })
  }

  public async invalidateAllSessionTokens(userId: User['id']): Promise<void> {
    await this.db.session.deleteMany({ where: { userId } })
  }
}

export interface SessionResult {
  user?: User
  expires: Date
}
