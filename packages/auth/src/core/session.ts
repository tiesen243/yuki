import { sha256 } from '@oslojs/crypto/sha2'
import {
  encodeBase32LowerCaseNoPadding,
  encodeHexLowerCase,
} from '@oslojs/encoding'

import type { users } from '@yuki/db/schema'
import { db as database, eq } from '@yuki/db'
import { sessions } from '@yuki/db/schema'

export class Session {
  private readonly TOKEN_BYTES = 20
  private readonly SESSION_EXPIRATION = 1000 * 60 * 60 * 24 * 30 // 30 days
  private readonly SESSION_REFRESH_THRESHOLD = this.SESSION_EXPIRATION / 2 // 15 days

  constructor(private readonly db = database) {}

  public async create(
    userId: string,
  ): Promise<{ sessionToken: string; expires: Date }> {
    const token = this.generateToken()
    const sessionToken = this.hashToken(token)
    const expires = new Date(Date.now() + this.SESSION_EXPIRATION)

    const [session] = await this.db
      .insert(sessions)
      .values({ sessionToken, expires, userId })
      .returning()

    if (!session) throw new Error('Failed to create session')
    return { sessionToken: token, expires: session.expires }
  }

  public async validateToken(token: string): Promise<SessionResult> {
    const sessionToken = this.hashToken(token)

    const result = await this.db.query.sessions.findFirst({
      where: eq(sessions.sessionToken, sessionToken),
      with: { user: true },
    })

    if (!result) return { expires: new Date() }

    const { user, ...session } = result
    const now = Date.now()

    if (now > session.expires.getTime()) {
      await this.delete(sessionToken)
      return { expires: new Date() }
    }

    if (now >= session.expires.getTime() - this.SESSION_REFRESH_THRESHOLD) {
      const newExpires = new Date(Date.now() + this.SESSION_EXPIRATION)
      await this.db
        .update(sessions)
        .set({ expires: newExpires })
        .where(eq(sessions.sessionToken, sessionToken))
      session.expires = newExpires
    }

    return { user, expires: session.expires }
  }

  public async invalidateToken(token: string): Promise<void> {
    await this.delete(this.hashToken(token))
  }

  public async invalidateAllTokens(userId: string): Promise<void> {
    await this.db.delete(sessions).where(eq(sessions.userId, userId))
  }

  private generateToken(): string {
    const bytes = new Uint8Array(this.TOKEN_BYTES)
    crypto.getRandomValues(bytes)
    const token = encodeBase32LowerCaseNoPadding(bytes)
    return token
  }

  private hashToken(token: string): string {
    return encodeHexLowerCase(sha256(new TextEncoder().encode(token)))
  }

  private async delete(sessionToken: string): Promise<void> {
    await this.db
      .delete(sessions)
      .where(eq(sessions.sessionToken, sessionToken))
  }
}

export interface SessionResult {
  user?: typeof users.$inferSelect
  expires: Date
}
