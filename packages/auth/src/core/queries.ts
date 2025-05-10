'use server'

import { sha256 } from '@oslojs/crypto/sha2'
import {
  encodeBase32LowerCaseNoPadding,
  encodeHexLowerCase,
} from '@oslojs/encoding'

import { db, eq } from '@yuki/db'
import { accounts, sessions, users } from '@yuki/db/schema'

import type { SessionResult } from '../types'
import {
  SESSION_COOKIE_NAME,
  SESSION_EXPIRATION,
  SESSION_REFRESH_THRESHOLD,
  TOKEN_BYTES,
} from '../config'
import { deleteCookie, getCookie } from './cookies'
import { verify } from './password'

/**
 * Creates a new session for a user
 *
 * Generates a cryptographically secure random token, hashes it for database
 * storage, and creates a session record associated with the user. Only the
 * hash is stored in the database while the original token is returned to be
 * set as a cookie or passed to the client.
 *
 * @param userId - The unique identifier of the user
 * @returns Object containing the unhashed session token and expiration date
 * @throws Error if session creation fails
 */
async function createSession(
  userId: string,
): Promise<{ sessionToken: string; expires: Date }> {
  const bytes = new Uint8Array(TOKEN_BYTES)
  crypto.getRandomValues(bytes)
  const token = encodeBase32LowerCaseNoPadding(bytes)

  const sessionToken = hashSHA256(token)
  const expires = new Date(Date.now() + SESSION_EXPIRATION)

  // Store the hashed token in the database
  const [session] = await db
    .insert(sessions)
    .values({ sessionToken, expires, userId })
    .returning()

  if (!session) throw new Error('Failed to create session')

  // Return the unhashed token to the client along with expiration
  return { sessionToken: token, expires: session.expires }
}

/**
 * Validates a session token and refreshes it if needed
 *
 * Follows the session validation pattern recommended by Lucia Auth:
 * 1. Hash the provided token
 * 2. Look up the session by hashed token
 * 3. Check if session has expired and delete if necessary
 * 4. Refresh the session if it's beyond the refresh threshold
 *
 * @param token - The unhashed session token to validate
 * @returns Session result containing user data if valid, or just expiration if invalid
 */
async function validateToken(token: string): Promise<SessionResult> {
  const sessionToken = hashSHA256(token)

  // Lookup the session and associated user in the database
  const [result] = await db
    .select({
      sessionToken: sessions.sessionToken,
      expires: sessions.expires,
      user: users,
    })
    .from(sessions)
    .where(eq(sessions.sessionToken, sessionToken))
    .innerJoin(users, eq(users.id, sessions.userId))

  // Return early if session not found
  if (!result) return { expires: new Date() }

  const { user, ...session } = result
  const now = Date.now()

  // Check if session has expired
  if (now > session.expires.getTime()) {
    await db.delete(sessions).where(eq(sessions.sessionToken, sessionToken))
    return { expires: new Date() }
  }

  // Refresh session if it's beyond the refresh threshold
  if (now >= session.expires.getTime() - SESSION_REFRESH_THRESHOLD) {
    const newExpires = new Date(Date.now() + SESSION_EXPIRATION)
    await db
      .update(sessions)
      .set({ expires: newExpires })
      .where(eq(sessions.sessionToken, sessionToken))
    session.expires = newExpires
  }

  return { user, expires: session.expires }
}

/**
 * Invalidates a specific session token
 *
 * @param token - The unhashed session token to invalidate
 */
async function invalidateToken(token: string): Promise<void> {
  await db.delete(sessions).where(eq(sessions.sessionToken, hashSHA256(token)))
}

/**
 * Invalidates all sessions for a specific user
 *
 * @param userId - The unique identifier of the user
 */
async function invalidateAllTokens(userId: string): Promise<void> {
  await db.delete(sessions).where(eq(sessions.userId, userId))
}

/**
 * Signs in a user with email and password
 *
 * @param input - Object containing email and password credentials
 * @returns Object containing the session token and expiration date
 * @throws Error if credentials are invalid or authentication fails
 *
 * @example
 * // Sign in a user
 * try {
 *   const session = await signIn({ email: 'user@example.com', password: 'password123' });
 * } catch (error) {
 *   // Handle authentication failure
 * }
 */
async function signIn(input: {
  email: string
  password: string
}): Promise<{ sessionToken: string; expires: Date }> {
  const [user] = await db
    .select({ id: users.id, password: users.password })
    .from(users)
    .where(eq(users.email, input.email))

  if (!user?.password || !verify(input.password, user.password))
    throw new Error('Invalid email or password')

  return createSession(user.id)
}

/**
 * Signs out the current user by invalidating their session
 *
 * @param request - Optional Request object to extract the session token from
 * @returns Promise that resolves when the session is invalidated
 *
 * @example
 * // Sign out the current user
 * await signOut();
 *
 * @example
 * // Sign out with a specific request context
 * await signOut(request);
 */
async function signOut(request?: Request): Promise<void> {
  const token =
    (await getCookie(SESSION_COOKIE_NAME, request)) ??
    request?.headers.get('Authorization')?.replace('Bearer ', '') ??
    ''

  const promises: Promise<unknown>[] = []
  if (token) promises.push(invalidateToken(token))
  if (!request) promises.push(deleteCookie(SESSION_COOKIE_NAME))
  await Promise.all(promises)
}

/**
 * Creates a new user or links accounts for existing users
 *
 * @description
 * This function has three possible outcomes:
 * 1. Return existing user if the provider account is already linked
 * 2. Link new provider to existing user with matching email
 * 3. Create new user and link provider account
 *
 * @param data - User data including provider details, name, email, and image
 * @returns The created or existing user object
 * @throws Error if user creation fails
 *
 * @example
 * // Create user from OAuth data
 * const user = await createUser({
 *   provider: 'google',
 *   providerAccountId: '123456',
 *   name: 'John Doe',
 *   email: 'john@example.com',
 *   image: 'https://example.com/avatar.png'
 * });
 */
async function createUser(data: {
  provider: string
  providerAccountId: string
  name: string
  email: string
  image: string
}): Promise<typeof users.$inferSelect> {
  const { provider, providerAccountId, email } = data

  const existingAccount = await db.query.accounts.findFirst({
    where: (accounts, { and, eq }) =>
      and(
        eq(accounts.provider, provider),
        eq(accounts.providerAccountId, providerAccountId),
      ),
    with: { user: true },
  })
  if (existingAccount?.user) return existingAccount.user

  return await db.transaction(async (tx) => {
    const existingUser = await tx.query.users.findFirst({
      where: (user, { eq }) => eq(user.email, email),
    })

    if (existingUser) {
      await tx.insert(accounts).values({
        provider,
        providerAccountId,
        userId: existingUser.id,
      })
      return existingUser
    }

    const [newUser] = await tx.insert(users).values(data).returning()
    if (!newUser) throw new Error('Failed to create user')

    await tx.insert(accounts).values({
      provider,
      providerAccountId,
      userId: newUser.id,
    })

    return newUser
  })
}

/**
 * Creates a secure hash of a session token
 *
 * Uses SHA-256 to hash the token before storing in the database.
 * This ensures that even if the database is compromised, the original
 * tokens cannot be recovered and used to hijack sessions.
 *
 * @param str - The string to hash
 * @returns Hex-encoded string representation of the SHA-256 hash
 */
function hashSHA256(str: string): string {
  return encodeHexLowerCase(sha256(new TextEncoder().encode(str)))
}

export {
  signIn,
  signOut,
  hashSHA256,
  createUser,
  createSession,
  validateToken,
  invalidateToken,
  invalidateAllTokens,
}
