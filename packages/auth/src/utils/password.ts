import { sha3_256 } from '@oslojs/crypto/sha3'
import { encodeBase32LowerCase } from '@oslojs/encoding'

import { env } from '../env'

export class Password {
  public hash(password: string): string {
    const saltedPassword = `${password}${env.AUTH_SECRET}`
    return encodeBase32LowerCase(
      sha3_256(new TextEncoder().encode(saltedPassword)),
    )
  }

  public verify(password: string, hash: string): boolean {
    const saltedPassword = `${password}${env.AUTH_SECRET}`

    const hashPassword = encodeBase32LowerCase(
      sha3_256(new TextEncoder().encode(saltedPassword)),
    )
    return hashPassword === hash
  }
}
