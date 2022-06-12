<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useStore } from "../../store";

const tags = ["in progress", "needs mastering", "house mix"];

const { compact } = storeToRefs(useStore());
</script>

<template>
  <div>
    <div class="p-10 bg-primary-100">
      <div class="flex justify-between items-end">
        <div>
          <p class="uppercase tracking-widest text-gray-500 text-xs">
            Electro House
          </p>
          <h1 class="font-montaga text-4xl">Summer Days</h1>
          <h3 class="text-gray-500">Martin Garrix</h3>
          <!-- Tags -->
          <div class="space-x-1 mt-2">
            <span v-for="tag in tags" :key="tag" class="tag">{{ tag }}</span>
          </div>
        </div>
        <img
          src="https://upload.wikimedia.org/wikipedia/en/4/46/Martin_Garrix_-_Summer_Days.png"
          alt="Project Image"
          class="w-64 h-64 rounded-lg"
        />
      </div>
    </div>
  </div>
</template>
