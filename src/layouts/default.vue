<script setup lang="ts">
import { storeToRefs } from "pinia";
import Sidebar from "../components/Sidebar.vue";
import { useStore } from "../store";
const { compact } = storeToRefs(useStore());
</script>

<template>
  <div>
    <Sidebar />
    <transition name="fade" mode="out-in">
      <router-view
        :class="compact ? 'ml-[6rem]' : 'ml-[13rem]'"
      ></router-view>
    </transition>
  </div>
</template>
