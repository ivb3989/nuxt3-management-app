export function useAuthState() {
  const supabase = useSupabaseClient()

  supabase.auth.onAuthStateChange((event) => {
    switch (event) {
      case 'SIGNED_OUT':
        return navigateTo('/')
      case 'SIGNED_IN':
        return navigateTo('/account')
    }
  })
}
