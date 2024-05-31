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

  return {
    setToken,
    getToken,
    setRefreshToken,
    getRefreshToken,
    onLogout
  }
}