import { hash, verify } from '@node-rs/argon2'

export const hashPassword = async (password: string): Promise<string> =>
  await hash(password, {
    memoryCost: 19456,
    timeCost: 2,
    outputLen: 32,
    parallelism: 1,
  })

export const verifyHashedPassword = async (
  hash: string,
  password: string,
): Promise<boolean> => await verify(hash, password)
