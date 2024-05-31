export default defineNuxtRouteMiddleware(async (to, from) => {
  const authStore = useAuthStore()
  const { getInfoUser } = authStore
  const { user, isLogged } = storeToRefs(authStore)

  if (!user.value) {
    await getInfoUser()
  }

  if (to.path != '/auth/login' && to.path != '/auth/register' && !isLogged.value) {
    return navigateTo('/auth/login')
  }
  
  if ((to.path == '/auth/login' || to.path == '/auth/register') && isLogged.value) {
    return navigateTo('/')
  }
})