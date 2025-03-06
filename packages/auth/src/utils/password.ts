import { sha256 } from '@oslojs/crypto/sha2'
import { sha3_256 } from '@oslojs/crypto/sha3'
import { encodeBase32LowerCase, encodeHexLowerCase } from '@oslojs/encoding'

import { env } from '../env'

export class Password {
  public hash(password: string): string {
    const saltedPassword = `${password}${env.AUTH_SECRET}`
    return encodeBase32LowerCase(
      sha3_256(new TextEncoder().encode(saltedPassword)),
    )
  }

  public hashWithoutSalt(password: string): string {
    return encodeHexLowerCase(sha256(new TextEncoder().encode(password)))
  }

  public verify(password: string, hash: string): boolean {
    const saltedPassword = `${password}${env.AUTH_SECRET}`

    const hashPassword = encodeBase32LowerCase(
      sha3_256(new TextEncoder().encode(saltedPassword)),
    )
    return hashPassword === hash
  }
}
