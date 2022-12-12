<script setup lang="ts">
import { storeToRefs } from "pinia";
import Sidebar from "../components/Sidebar.vue";
import { useStore } from "../store";
import { vScrollLock } from "@vueuse/components";

const { compact, scrollLock } = storeToRefs(useStore());
</script>

<template>
  <div>
    <Sidebar />
    <router-view
      v-slot="{ Component }"
      :class="compact ? 'ml-[6rem]' : 'ml-[10rem]'"
    >
      <transition name="fade" mode="out-in">
        <component :is="Component" v-scroll-lock="scrollLock" />
      </transition>
    </router-view>
  </div>
</template>
