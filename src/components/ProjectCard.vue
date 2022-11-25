<script setup lang="ts">
import { useRouter } from "vue-router";
import { Project } from "../types";

const props = defineProps<{
  project: Project;
}>();

const router = useRouter();
</script>

<template>
  <div class="p-3" @click="router.push('/project/1')">
    <img
      :src="props.project.image"
      :alt="props.project.name"
      class="w-40 h-40 rounded-lg"
    />
    <div class="py-3">
      <p class="text-xss uppercase text-primary-500 font-light">
        {{ project.genre }}
      </p>
      <h1 class="text-sm font-semibold">{{ props.project.name }}</h1>
      <h3 class="text-xs text-gray-500">{{ props.project.author }}</h3>
    </div>
  </div>
</template>
