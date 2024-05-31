export interface IUser {
  id: string
  email: string
  role: string
}

export interface IRegister {
  email: string
  password: string
}

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string>('')
  const refreshToken = ref<string>('')
  const user = ref<IUser | null>(null)
  const isLogged = ref<boolean>(false)

  const onRegister = async ({ email, password }: IRegister) => {
    const { baseUrl, apiKey } = useAppConfig()

    const { data, error } = await useFetch<any>('auth/v1/signup', {
      baseURL: baseUrl,
      method: 'post',
      headers: {
        apiKey
      },
      body: {
        email,
        password
      }
    })

    if (error.value) {
      console.error(error.value)
      return
    }

    token.value = data.value?.access_token ?? ''
    refreshToken.value = data.value?.refresh_token ?? ''
    user.value = {
      id: data.value?.user?.id ?? '',
      email: data.value?.user?.email ?? '',
      role: data.value?.user?.role ?? ''
    }
    isLogged.value = true

    useCookie('token', { path: '/' }).value = token.value
    useCookie('refreshToken', { path: '/' }).value = refreshToken.value
    useCookie('user', { path: '/' }).value = JSON.stringify(user.value)
  }

  const onLogin = async ({ email, password }: IRegister) => {
    const { baseUrl, apiKey } = useAppConfig()

    const { data, error } = await useFetch<any>('auth/v1/token?grant_type=password', {
      baseURL: baseUrl,
      method: 'post',
      headers: {
        apiKey
      },
      body: {
        email,
        password
      }
    })

    if (error.value) {
      console.error(error.value)
      return
    }

    token.value = data.value?.access_token ?? ''
    refreshToken.value = data.value?.refresh_token ?? ''
    user.value = {
      id: data.value?.user?.id ?? '',
      email: data.value?.user?.email ?? '',
      role: data.value?.user?.role ?? ''
    }
    isLogged.value = true

    useCookie('token', { path: '/' }).value = token.value
    useCookie('refreshToken', { path: '/' }).value = refreshToken.value
    useCookie('user', { path: '/' }).value = JSON.stringify(user.value)
  }

  const getInfoUser = async () => {
    const { baseUrl, apiKey } = useAppConfig()
    const { getToken, getRefreshToken } = useAuth()
    const userToken = getToken()
    const userRefreshToken = getRefreshToken()

    const { data, error } = await useFetch<any>('auth/v1/user', {
      baseURL: baseUrl,
      method: 'get',
      headers: {
        apiKey,
        Authorization: `Bearer ${userToken}`
      }
    })

    if (error.value) {
      console.error(error.value)
      return
    }

    token.value = userToken
    refreshToken.value = userRefreshToken
    user.value = {
      id: data.value?.id ?? '',
      email: data.value?.email ?? '',
      role: data.value?.role ?? ''
    }
    isLogged.value = true
  }

  return {
    token,
    refreshToken,
    user,
    isLogged,
  
    onRegister,
    onLogin,
    getInfoUser
  }
})