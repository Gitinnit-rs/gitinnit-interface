<script setup lang="ts">
import Sidebar from "../components/Sidebar.vue";
const compact = true;
</script>

<template>
  <div class="grid grid-cols-12">
    <Sidebar
      :class="compact ? 'col-span-1' : 'col-span-3'"
      :compact="compact"
    />
    <router-view class="col-span-9"></router-view>
  </div>
</template>
