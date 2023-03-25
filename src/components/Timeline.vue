<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useStore } from "../store";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useToast } from "vue-toastification";
import { vOnClickOutside } from "@vueuse/components";
import { onMounted, ref } from "vue";
import FilledButton from "./FilledButton.vue";
import { invoke } from "@tauri-apps/api";
import Pill from "./Pill.vue";

dayjs.extend(relativeTime);

const store = useStore();
const { timeline, mainTimeline, project } = storeToRefs(store);

const toast = useToast();

const activeCommit = ref(0);
const logOpen = ref([] as boolean[]);

onMounted(async () => {
  await store.getTimeline();
  fetchActiveCommit();
});

const fetchActiveCommit = () => {
  // Fetch Active commit on Load
  if (mainTimeline.value.length > timeline.value.length) {
    const activeCommitData = mainTimeline.value.find(
      (item) => item.hash === timeline.value[0].hash
    );

    if (activeCommitData)
      activeCommit.value = mainTimeline.value.indexOf(activeCommitData);
  }
};

const checkout = (i: number) => {
  if (!project.value?.path) {
    toast.error("Error while switching checkpoints");
    return;
  }
  let hash;

  if (i === 0) hash = project.value.defaultBranch || "main";
  // Whatever timeline the user is on. Fetch this later
  else hash = mainTimeline.value[i].hash.trim();

  console.log("Checking out with hash", hash);

  invoke("checkout", {
    checkoutPath: hash,
    path: project.value.path,
  });

  activeCommit.value = i;

  store.getTimeline();
};
</script>

<template>
  <div class="border rounded-xl">
    <!-- Individual Commit -->
    <template v-if="mainTimeline.length > 0">
      <div
        v-for="(log, i) in mainTimeline"
        class="cursor-pointer hover:bg-gray-50 transition"
        :class="[
          i != mainTimeline.length - 1 ? 'border-b' : 'rounded-b-xl',
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
          <div class="flex items-center space-x-5">
            <Pill v-if="activeCommit === i" class="py-1">Current</Pill>
            <p class="uppercase tracking-widest text-gray-400 text-xs">
              {{ dayjs(log.date).fromNow() }}
            </p>
          </div>
        </div>

        <Transition name="slight_fade" mode="in-out">
          <div v-if="logOpen[i]" class="p-1 pb-2">
            <FilledButton
              class="ml-4 px-3 py-1.5 mb-1.5 text-xs"
              @click="checkout(i)"
              :disabled="activeCommit === i"
              disabled-text="Already at this checkpoint"
              >Go here</FilledButton
            >
          </div>
        </Transition>
      </div>
    </template>
    <p class="p-5" v-else>No checkpoints yet</p>
  </div>
</template>
