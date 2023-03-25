<script setup lang="ts">
import { storeToRefs } from "pinia";
import { onMounted, ref } from "vue";
import { useUserStore } from "../store/user";
import { parseJwt } from "../utils";
import { getUserDetails } from "../utils/github";

const isLoading = ref(true);
const error = ref("");

const { setUser } = useUserStore();

onMounted(init);

async function init() {
  try {
    isLoading.value = true;

    const params = new URLSearchParams(window.location.hash.replace("#", "?"));
    console.log("PARAM", window.location.hash.slice(918));

    // const access_token = params.get("access_token");
    const access_token = params.get("provider_token");
    const refresh_token = params.get("refresh_token");

    console.log(access_token);
    console.log(refresh_token);

    if (!access_token) throw new Error("Access token is null or undefined");

    const data = parseJwt(access_token);
    setUser(data);

    console.log("Before getUserDetails")

    // const user = await getUserDetails(access_token);

    // console.log("User", user);

    isLoading.value = false;
  } catch (e) {
    console.error("An error occured while processing authentication.", e);
    error.value = e as any;
  }
}
</script>

<template>
  <div class="grid place-items-center min-h-screen">
    <div v-if="!error && !isLoading">
      <h1 class="text-xl font-semibold">You have logged in!</h1>
    </div>
    <div v-else-if="!error && isLoading">
      <p>Fetching user details...</p>
    </div>
    <div v-else>
      <h1>An error occured</h1>
      <p class="text-sm text-red-600">{{ error }}</p>
    </div>
  </div>
</template>
