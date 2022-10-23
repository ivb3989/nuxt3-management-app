<script setup>
  const user = useSupabaseUser()
  const client = useSupabaseClient()
</script>

<template>
  <header class="flex items-center justify-around w-full py-8">
    <NuxtLink
      :to="user ? '/account' : '/'"
      class="text-xl font-bold text-blue-500"
    >
      Profile
    </NuxtLink>
    <button
      v-if="user"
      class="px-4 py-2 rounded bg-blue-500 hover:bg-blue-400 text-white font-semibold text-center focus:outline-none focus:ring focus:ring-offset-2 focus:ring-blue-500 focus:ring-opacity-80 cursor-pointer"
      @click="client.auth.signOut()"
    >
      Log out
    </button>
  </header>
</template>
