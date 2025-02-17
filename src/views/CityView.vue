<template>
  <div>
    <Suspense>
      <AsyncCityView/>
      <template>
        <p>Loading...</p>
      </template>
    </Suspense>
  </div>
</template>

<script setup>
  import AsyncCityView from '@/components/AsyncCityView.vue';
</script>
