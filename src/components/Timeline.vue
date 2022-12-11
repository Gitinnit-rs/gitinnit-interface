<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useStore } from "../store";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

const store = useStore();
const { timeline } = storeToRefs(store);
</script>

<template>
  <div class="border rounded-xl">
    <!-- Individual Commit -->
    <div
      v-for="(log, i) in timeline"
      class="flex justify-between items-center p-5"
      :class="i != timeline.length - 1 ? 'border-b' : ''"
      :key="i"
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
  </div>
</template>
