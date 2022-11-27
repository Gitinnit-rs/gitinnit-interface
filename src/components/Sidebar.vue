<script setup lang="ts">
import { useRoute } from "vue-router";

import HomeIcon from "vue-material-design-icons/Home.vue";
import InfoIcon from "vue-material-design-icons/Information.vue";
import FolderMusic from "vue-material-design-icons/FolderMusic.vue";
import ChevronDoubleLeft from "vue-material-design-icons/ChevronDoubleLeft.vue";
import Compass from "vue-material-design-icons/Compass.vue";
import Cog from "vue-material-design-icons/Cog.vue";
import Plus from "vue-material-design-icons/PlusCircle.vue";

import { storeToRefs } from "pinia";
import { useStore } from "../store";

const { compact } = storeToRefs(useStore());
const { toggleCompact } = useStore();
const toggle = () => toggleCompact();

const route = useRoute();

const routes = [
  {
    to: "/",
    name: "home",
    label: "Home",
    icon: HomeIcon,
  },
  {
    to: "/create",
    name: "create",
    label: "Create",
    icon: Plus,
  },
  {
    to: "/explore",
    name: "explore",
    label: "Explore",
    icon: Compass,
  },
  {
    to: "/project/-1",
    name: "project",
    label: "Project",
    icon: FolderMusic,
  },

  {
    to: "/about",
    name: "about",
    label: "About",
    icon: InfoIcon,
  },
  {
    to: "/settings",
    name: "settings",
    label: "Settings",
    icon: Cog,
  },
];
</script>

<template>
  <nav
    class="px-5 py-10 h-screen fixed left-0 top-0 z-10 bg-primary-100 flex flex-col justify-between"
    :class="[compact ? 'max-w-[6rem]' : 'max-w-[10rem]']"
  >
    <div class="space-y-10">
      <div v-if="!compact">
        <h1 class="font-lobster text-3xl text-center mt-3">Gitinnit</h1>
      </div>

      <div>
        <div class="flex flex-col">
          <router-link
            v-for="{ to, name, label, icon } in routes"
            :key="label"
            :to="to"
            :title="label"
            class="py-1 flex flex-col items-center"
          >
            <div
              class="nav-list-item"
              :class="[
                name === route.name ? 'nav-list-item-active' : null,
                compact === true
                  ? 'py-2 px-5 grid place-items-center'
                  : 'px-6 py-3 flex items-center space-x-2',
              ]"
            >
              <div class="">
                <component :is="icon" class="text-lg" />
              </div>
              <div v-if="compact === false">
                {{ label }}
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </div>

    <div class="text-gray-500 text-xs text-center">
      <div @click="toggle" class="cursor-pointer">
        <ChevronDoubleLeft
          class="text-lg"
          :class="compact ? 'transform rotate-180' : ''"
        />
      </div>
      <br /><br />
      <span v-if="compact === false"> &COPY; 2022 Gitinnit Pvt. Ltd.</span>
      <span v-else>&COPY; 2022</span>
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
