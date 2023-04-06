<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "../store/user";
import { updateGlobalConfig } from "../utils";
import { getUserDetails } from "../utils/user";

const isLoading = ref(true);
const error = ref("");

const { setUser } = useUserStore();

const router = useRouter();

onMounted(init);

async function init() {
  try {
    isLoading.value = true;

    const params = new URLSearchParams(window.location.search);

    const access_token = params.get("access_token");

    console.log(access_token);

    if (!access_token) throw new Error("Access token is null or undefined");
    
    const userData = await getUserDetails(access_token);
    const user = { access_token, ...userData };
    
    console.log("User", user);
    setUser(user);

    await updateGlobalConfig("user", user);

    router.push("/settings");

    // isLoading.value = false;
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
