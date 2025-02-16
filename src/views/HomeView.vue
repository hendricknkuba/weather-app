<template>
  <main class="container text-white">
    <div class="pt-4 mb-8 relative">
      <input 
          type="text" 
          placeholder="Search for a city or state" 
          class="py-2 px-1 w-full bg-transparent border-b focus:border-weatherSecondary focus:outline-none focus:shadow-[0px_1px_0_0_#004E7]"
          v-model="searchQuery"
          @input="getSearchResults"
      >
      <ul class="absolute bg-weatherSecondary text-white w-full shadow-md py-2 px-1 top-[66px]"
          v-if="mapbox_results"
      >
        <li 
          v-for="searchResult in mapbox_results" 
          :key="searchResult.id" 
          class="py-2 cursor-pointer"
        >
          {{ searchResult.place_name }}
        </li>
      </ul>
    </div>
  </main>
</template>

<script setup>
  import { ref } from "vue";
  import axios from "axios";

  const searchQuery = ref('');
  const queryTimeOut = ref(null);
  const api_key = import.meta.env.VITE_API_KEY;
  const mapbox_results = ref(null);

  const getSearchResults = () => {

    clearTimeout(queryTimeOut.value);
    queryTimeOut.value = setTimeout(async () => {

      if (searchQuery.value !== ''){
        const result = await axios.get(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchQuery.value}.json?access_token=${api_key}&types=place`
        );
        mapbox_results.value = result.data.features;
        console.log(mapbox_results.value);
        return;
      }
      mapbox_results.value = null;
    }, 300);

  }
</script>
