import { useCookies } from '@vueuse/integrations/useCookies'

export const useToken = () => {
  const cookies = useCookies(['auth_token'])

  const token: string | undefined = cookies.get('auth_token')

  const setToken = (token: string, expiresAt: Date) => {
    cookies.set('auth_token', token, {
      httpOnly: true,
      path: '/',
      secure: !import.meta.env.DEV,
      sameSite: 'lax',
      expires: expiresAt,
    })
  }

  return {
    token,
    setToken,
  }
}
