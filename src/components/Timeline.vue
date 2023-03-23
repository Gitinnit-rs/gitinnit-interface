<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useStore } from "../store";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useToast } from "vue-toastification";
import { vOnClickOutside } from "@vueuse/components";
import { ref } from "vue";
import FilledButton from "./FilledButton.vue";
import { invoke } from "@tauri-apps/api";

dayjs.extend(relativeTime);

const store = useStore();
const { timeline, project } = storeToRefs(store);

const toast = useToast();

const logOpen = ref([] as boolean[]);

const checkout = (i: number) => {
  if (!project.value?.path) {
    toast.error("Error while switching checkpoints");
    return;
  }

  const hash = timeline.value[i].hash.trim();

  invoke("checkout", {
    checkout_path: hash,
    path: project.value.path,
  });
};
</script>

<template>
  <div class="border rounded-xl">
    <!-- Individual Commit -->
    <template v-if="timeline.length > 0">
      <div
        v-for="(log, i) in timeline"
        class="cursor-pointer hover:bg-gray-50 transition"
        :class="[
          i != timeline.length - 1 ? 'border-b' : 'rounded-b-xl',
          i === 0 && 'rounded-t-xl',
        ]"
        :key="i"
        v-on-click-outside="
          () => {
            logOpen[i] = false;
          }
        "
      >
        <div
          class="flex justify-between items-center p-5"
          @click="logOpen[i] = !logOpen[i]"
        >
          <div>
            <h3 class="font-semibold">{{ log.message }}</h3>
            <p class="text-gray-400 text-xs pt-0.5">
              {{ log.author.split(" <")[0] }}
            </p>
          </div>
          <div>
            <p class="uppercase tracking-widest text-gray-400 text-xs">
              {{ dayjs(log.date).fromNow() }}
            </p>
          </div>
        </div>

        <Transition name="slight_fade" mode="in-out">
          <div v-if="logOpen[i]" class="p-1 pb-2">
            <FilledButton class="ml-4 px-3 py-1.5 text-xs" @click="checkout(i)"
              >Go here</FilledButton
            >
          </div>
        </Transition>
      </div>
    </template>
    <p class="p-5" v-else>No checkpoints yet</p>
  </div>
</template>
