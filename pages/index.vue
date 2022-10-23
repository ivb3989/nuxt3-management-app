<template>
  <div class="flex flex-col justify-center">
    <form
      class="border p-8 mx-4 mt-12 min-w-min max-w-md mx-auto"
      @submit.prevent="() => (isSignUp ? signUp() : login())"
    >
      <h1 class="text-xl font-bold">
        <span v-if="isSignUp">Hello!</span>
        <span v-else>Welcome back!</span>
      </h1>
      <div class="flex justify-between items-center mt-12">
        <label>Email Address</label>
        <input
          v-model="email"
          type="email"
          class="text-gray-400 p-2 ml-4 border w-60"
          placeholder="email address"
        />
      </div>
      <div class="flex justify-between items-center mt-12">
        <label>Password</label>
        <input
          v-model="password"
          type="password"
          class="text-gray-400 p-2 ml-4 border w-60"
          placeholder="password"
        />
      </div>
      <input
        type="submit"
        :value="isSignUp ? 'Sign up' : 'Log in'"
        class="mt-20 px-4 py-2 rounded bg-blue-500 hover:bg-blue-400 text-white font-semibold text-center block w-full focus:outline-none focus:ring focus:ring-offset-2 focus:ring-blue-500 focus:ring-opacity-80 cursor-pointer"
      />
    </form>
    <input
      :value="
        isSignUp ? 'Have an account? Log in instead' : 'Create a new account'
      "
      class="mt-4 block text-sm text-center font-medium text-blue-600 focus:outline-none hover:underline"
      @click="isSignUp = !isSignUp"
    />
  </div>
</template>

<script setup>
  definePageMeta({
    middleware: ['auth'],
  })
  const email = ref('')
  const password = ref('')
  const isSignUp = ref(true)
  const client = useSupabaseClient()
  const signUp = async () => {
    const { error } = await client.auth.signUp({
      email: email.value,
      password: password.value,
    })
    console.log(error)
  }
  const login = async () => {
    const { error } = await client.auth.signInWithPassword({
      email: email.value,
      password: password.value,
    })
    console.log(error)
  }

  const user = useSupabaseUser()
  onMounted(() => {
    watchEffect(() => {
      if (user.value) {
        navigateTo('/account')
      }
    })
  })
</script>
