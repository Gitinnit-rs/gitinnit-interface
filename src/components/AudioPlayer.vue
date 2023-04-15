<script lang="ts" setup>
import { useSound } from "@vueuse/sound";
import { storeToRefs } from "pinia";
import { useStore } from "../store";
import { computed, ref, watchEffect } from "vue";

// Icons
import PlayCircle from "vue-material-design-icons/PlayCircle.vue";
import PauseCircle from "vue-material-design-icons/PauseCircle.vue";
import StopCircle from "vue-material-design-icons/StopCircle.vue";
import ChevronDown from "vue-material-design-icons/ChevronDown.vue";
import DotsHorizontal from "vue-material-design-icons/DotsHorizontal.vue";
import VolumeHigh from "vue-material-design-icons/VolumeHigh.vue";
import VolumeMute from "vue-material-design-icons/VolumeMute.vue";

const store = useStore();
const { project } = storeToRefs(store);

const compact = ref(true);

const filePath = computed(() => {
  // Try to check if it is a music file or not
  return project.value?.musicFilePath || "";
});

const { play, pause, stop, isPlaying, duration, sound } = useSound(
  filePath.value
);

const toggleCompact = () => {
  compact.value = !compact.value;
};
</script>

<template>
  <div class="fixed bottom-3 left-[50%] text-white z-10">
    <transition name="pushup" mode="out-in">
      <div
        v-if="compact"
        class="px-4 bg-teal-500 rounded-full cursor-pointer"
        @click="toggleCompact"
      >
        <DotsHorizontal class="text-xl" />
      </div>
      <div
        class="p-3 bg-teal-500 w-50 relative right-[4.6rem] rounded-lg"
        v-else
      >
        <div class="flex items-center justify-between px-3">
          <div class="text-2xl">
            <!-- Find out how to get sound later -->
            <VolumeMute v-if="sound.volume === 0" />
            <VolumeHigh v-else />
          </div>

          <div class="text-4xl mb-1">
            <PlayCircle v-if="isPlaying" />
            <PauseCircle v-else />
          </div>

          <div class="text-2xl">
            <StopCircle />
          </div>
        </div>

        <!-- Progress Bar -->
        <div class="mt-2">
          <div class="bg-teal-600 h-2 rounded-lg"></div>
          <!-- <div class="bg-teal-600 h-2 rounded-lg"></div> -->
          <div class="flex justify-between text-xs font-medium mt-1 text-teal-100">
            <span>0:00</span>
            <span>2:30</span>
          </div>
        </div>
        <!-- End of Progress Bar -->
        <div
          class="relative -bottom-2 h-5 right-0 text-center cursor-pointer"
          @click="toggleCompact"
        >
          <ChevronDown />
        </div>
      </div>
    </transition>
  </div>
</template>
