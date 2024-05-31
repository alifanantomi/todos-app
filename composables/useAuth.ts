export interface IUser {
  id: string
  email: string
  role: string
}

export default function() {
  const setToken = (token: string) => {
    useCookie('token', { path: '/' }).value = token
  }

  const getToken = (): string => useCookie('token').value ?? ''

  const setRefreshToken = (token: string) => {
    useCookie('refreshToken', { path: '/' }).value = token
  }

  const getRefreshToken = (): string => useCookie('refreshToken').value ?? ''

  const onLogout = () => {
    useCookie('token').value = null
    useCookie('refreshToken').value = null
    useCookie('user').value = null
  }

  const getUser = ():IUser | null => {
    const user = useCookie('user').value
    if (typeof user == 'string') {
      return JSON.parse(user)
    }

    return user || null
  }

  return {
    setToken,
    getToken,
    setRefreshToken,
    getRefreshToken,
    onLogout,
    getUser
  }
}