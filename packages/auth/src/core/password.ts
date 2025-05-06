import { sha3_512 } from '@oslojs/crypto/sha3'
import { encodeHexLowerCase } from '@oslojs/encoding'

import { env } from '@yuki/env'

export class Password {
  private readonly pepper = env.AUTH_SECRET

  public hash(password: string): string {
    return this._hash(password)
  }

  public verify(password: string, hash: string): boolean {
    const hashedPassword = this._hash(password)
    return hashedPassword === hash
  }

  private _hash(password: string): string {
    const salted = `${password}${this.pepper}`
    return (
      encodeHexLowerCase(sha3_512(new TextEncoder().encode(salted))) +
      this.pepper
    )
  }
}
