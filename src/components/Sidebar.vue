<script setup lang="ts">
import { useRoute } from "vue-router";

import HomeIcon from "vue-material-design-icons/Home.vue";
import InfoIcon from "vue-material-design-icons/Information.vue";

const props = defineProps<{
  compact: boolean;
}>();

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
      <div v-if="!props.compact">
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
              class="nav-list-item"
              :class="[
                name === route.name ? 'nav-list-item-active' : null,
                props.compact === true ? 'p-2 grid place-items-center' : 'px-4 py-3 flex items-center space-x-2',
              ]"
            >
              <div class="">
                <component :is="icon" class="text-lg" />
              </div>
              <div v-if="props.compact === false">
                {{ label }}
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </div>

    <div class="text-gray-500 text-xs text-center">
      <span v-if="props.compact === false">
        &COPY; 2022 Gitinnit Pvt. Ltd.</span
      >
      <span>&COPY; 2022</span>
    </div>
  </nav>
</template>

<style scoped>
.nav-list-item {
  @apply font-semibold cursor-pointer rounded-full text-sm transition hover: (bg-primary-200) focus:(bg-primary-900);
}

.nav-list-item-active {
  @apply bg-primary-200;
}
</style>
