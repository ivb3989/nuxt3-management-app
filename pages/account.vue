<template>
  <form
    class="border p-8 mx-4 mt-12 min-w-min max-w-md mx-auto"
    @submit.prevent="updateProfile"
  >
    <h1 class="text-xl font-bold">Hello {{ user?.email }}</h1>
    <div class="flex justify-between items-center mt-20">
      <label>Username</label>
      <input
        v-model="username"
        type="text"
        class="text-gray-400 p-2 ml-4 border w-60"
        placeholder="username"
      />
    </div>
    <button
      type="submit"
      class="mt-12 px-4 py-2 rounded bg-blue-500 hover:bg-blue-400 text-white font-semibold text-center block w-full focus:outline-none focus:ring focus:ring-offset-2 focus:ring-blue-500 focus:ring-opacity-80 cursor-pointer"
    >
      Update
    </button>
  </form>
</template>

<script setup>
  definePageMeta({
    middleware: 'unauthorized',
  })
  const supabase = useSupabaseClient()

  const user = useSupabaseUser();
  const { data } = await supabase
    .from('profiles')
    .select(`username`)
    .eq('id', user.value.id)
    .single()

  const username = ref(data?.username)

  const updateProfile = async () => {
    try {
      const updates = {
        id: user.value.id,
        username: username.value,
      }
      const { error } = await supabase.from('profiles').upsert(updates, {
        returning: 'minimal',
      })
      if (error) throw error
    } catch (error) {
      alert(error.message)
    }
  }

  /* onMounted(() => {
    watchEffect(() => {
      if (!user.value) {
        navigateTo('/')
      }
    })
  }) */

  supabase.auth.onAuthStateChange((event, session) => {
    if (event === 'SIGNED_OUT') navigateTo('/')
  })
</script>
