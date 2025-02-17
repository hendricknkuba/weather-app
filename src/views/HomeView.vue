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
        <p v-if="searchError" class="text-red-700 font-bold ">Sorry, something went wrong, please try again.</p>
        <p v-if="!serverError && mapbox_results.length === 0">No result match your query, try a different term.</p>

        <template v-else>
            <li 
              v-for="searchResult in mapbox_results" 
              :key="searchResult.id" 
              class="py-2 cursor-pointer"
              @click="previewCity(searchResult)"
            >
            {{ searchResult.place_name }}
          </li>
        </template>
      </ul>
    </div>
  </main>
</template>

<script setup>
  import { ref } from "vue";
  import axios from "axios";
  import { useRouter } from "vue-router";

  const searchQuery = ref('');
  const queryTimeOut = ref(null);
  const api_key = import.meta.env.VITE_API_KEY;
  const mapbox_results = ref(null);
  const searchError = ref(null);
  const router = useRouter();

  const getSearchResults = () => {

    clearTimeout(queryTimeOut.value);
    queryTimeOut.value = setTimeout(async () => {

      if (searchQuery.value !== ''){

        try{
          const result = await axios.get(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchQuery.value}.json?access_token=${api_key}&types=place`
          );
          mapbox_results.value = result.data.features;
        } catch {
          searchError.value = true;
        }
        return;
      }
      mapbox_results.value = null;
    }, 300);

  }

  const previewCity = (searchResult) => {
    console.log(searchResult);
    const [city, state] = searchResult.place_name.split(",");
    router.push({
        name: 'cityView',
        params: {state: state.replaceAll(" ", ""), city: city},
        query: {
          lat: searchResult.geometry.coordinates[1],
          lng: searchResult.geometry.coordinates[0],
          preview: true,
        }
    })
  }
</script>
