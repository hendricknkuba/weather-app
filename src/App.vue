<script setup>
  import { RouterLink, RouterView } from 'vue-router'
  import SiteNavigation from "./components/SiteNavigation.vue"
</script>

<template>
  <div class="flex flex-col min-h-screen font-Roboto bg-weatherPrimary">
    <SiteNavigation/>
    <RouterView />
  </div>
</template>
 
<style scoped>
</style>
