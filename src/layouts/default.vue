<script setup lang="ts">
import { storeToRefs } from "pinia";
import Sidebar from "../components/Sidebar.vue";
import { useStore } from "../store";
import { vScrollLock } from "@vueuse/components";
import { useOnline } from "@vueuse/core";
import { watch } from "vue";
import { useToast } from "vue-toastification";
import AudioPlayer from "../components/AudioPlayer.vue";

const { compact, scrollLock } = storeToRefs(useStore());

const isOnline = useOnline();
const toast = useToast();

watch(isOnline, (val) => {
  if (val) toast.success("Back Online", { timeout: 3000 });
  else toast.warning("You are Offline now", { timeout: 3000 });
});
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

      <transition name="fade" mode="out-in">
        <AudioPlayer />
      </transition>
      
      <transition name="fade" mode="out-in">
        <div
          v-if="!isOnline"
          class="fixed bottom-3 right-3 px-3 py-1 border border-yellow-100 text-xs flex items-center space-x-1 justify-end bg-yellow-50 rounded-full"
        >
          <div class="relative right-2 bottom-1 px-1">
            <div class="absolute w-2 h-2 rounded-full bg-yellow-500"></div>
            <div
              class="absolute w-2 h-2 rounded-full bg-yellow-500 animate-ping"
            ></div>
          </div>
          <span class="text-yellow-700"> Offline</span>
        </div>
      </transition>
    </router-view>
  </div>
</template>
