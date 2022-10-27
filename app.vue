<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
  import { useAuthState } from '@/composables/useAuthState'
  useAuthState()
</script>
