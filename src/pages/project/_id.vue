<script setup lang="ts">
import Timeline from "../../components/Timeline.vue";
import Pill from "../../components/Pill.vue";
const tags = ["in progress", "needs mastering", "house mix"];
</script>

<template>
  <div>
    <section class="p-10 bg-primary-100">
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
    </section>

    <section class="p-10">
      <!-- <div class="uppercase tracking-widest text-gray-500 text-xs flex justify-end items-center space-x-2">
        <div class="w-2.5 h-2.5 mb-0.5 bg-green-500 rounded-full"></div>
        <span>Last Updated 3 days ago</span>
      </div> -->

      <div class="space-y-3">
        <p class="text-sm"><Pill>Local Path</Pill> ~/Users/neelansh/gitinnit/project-1</p>
        <p class="text-sm">
          <Pill>Remote Path</Pill>
          https://github.com/neelansh15/test-git-innit-11
        </p>
      </div>

      <div class="mt-5">
        <h2 class="font-semibold">Timeline</h2>
        <Timeline class="mt-3" />
      </div>
    </section>
  </div>
</template>
