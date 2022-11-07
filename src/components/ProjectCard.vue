<script setup lang="ts">
import { useRouter } from "vue-router";

const props = defineProps<{
  project: { title: string; authors: string; image: string; genre: string };
}>();

const router = useRouter();
</script>

<template>
  <div class="p-3" @click="router.push('/project/1')">
    <img
      :src="props.project.image"
      :alt="props.project.title"
      class="w-40 h-40 rounded-lg"
    />
    <div class="py-3">
      <p class="text-xss uppercase text-primary-500 font-light">
        {{ project.genre }}
      </p>
      <h1 class="text-sm font-semibold">{{ props.project.title }}</h1>
      <h3 class="text-xs text-gray-500">{{ props.project.authors }}</h3>
    </div>
  </div>
</template>
