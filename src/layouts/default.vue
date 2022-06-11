<script setup lang="ts">
import Sidebar from "../components/Sidebar.vue";
const compact = true;
</script>

<template>
  <Sidebar :compact="compact" />
  <div class="grid grid-cols-12">
    <!-- Empty space div to emulate if sidebar wasn't fixed -->
    <div :class="compact ? 'col-span-1' : 'col-span-2'"></div>
    <router-view :class="compact ? 'col-span-11' : 'col-span-10'"></router-view>
  </div>
</template>
