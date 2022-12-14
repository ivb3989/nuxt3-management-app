export default defineNuxtRouteMiddleware((to) => {
  const user = useSupabaseUser()

  if (!user.value && to.path === '/account') {
    navigateTo('/')
  } else if (user.value && to.path === '/') {
    navigateTo('account')
  }
})
