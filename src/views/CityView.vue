<template>
      <div>
          <Suspense timeout="0">
            <AsyncCityView/>
            <template #fallback>
              <p>Loading...</p>
            </template>
          </Suspense>
      </div>
</template>

<script setup>
  import AsyncCityView from '@/components/AsyncCityView.vue';
</script>
