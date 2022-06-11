<script setup lang="ts">
import { useRoute } from "vue-router";

import HomeIcon from "vue-material-design-icons/Home.vue";
import InfoIcon from "vue-material-design-icons/Information.vue";

const route = useRoute();

const routes = [
  {
    to: "/",
    name: "home",
    label: "Home",
    icon: HomeIcon,
  },
  {
    to: "/about",
    name: "about",
    label: "About",
    icon: InfoIcon,
  },
];
</script>

<template>
  <nav
    class="p-5 max-w-[15rem] min-h-screen bg-primary-100 flex flex-col justify-between"
  >
    <div class="space-y-10">
      <div>
        <h1 class="font-lobster text-3xl text-center mt-3">Gitinnit</h1>
      </div>

      <div>
        <div class="flex flex-col">
          <router-link
            v-for="{ to, name, label, icon } in routes"
            :key="label"
            :to="to"
            class="py-1"
          >
            <div
              class="nav-list-item flex items-center space-x-2"
              :class="[
                name === route.name
                  ? 'nav-list-item-active'
                  : null,
              ]"
            >
              <div class="">
                <component :is="icon" class="text-lg" />
              </div>
              <div>
                {{ label }}
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </div>

    <div class="text-gray-500 text-xs text-center">
      &COPY; 2022 Gitinnit Pvt. Ltd.
    </div>
  </nav>
</template>

<style scoped>
.nav-list-item {
  @apply px-4 py-3 font-semibold cursor-pointer rounded-full text-sm transition hover: (bg-primary-200);
}

.nav-list-item-active {
  @apply bg-primary-200;
}
</style>
