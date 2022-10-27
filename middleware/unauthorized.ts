export default defineNuxtRouteMiddleware((to) => {
  const supabase = useSupabaseClient()
  const session = supabase.auth.session()

  if (!session?.access_token) {
    return navigateTo('/account')
  }
})
