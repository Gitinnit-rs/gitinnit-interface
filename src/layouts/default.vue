<script setup lang="ts">
import Sidebar from '../components/Sidebar.vue';
</script>

<template>
    <div class="grid grid-cols-4">
        <Sidebar class="col-span-1" />
        <router-view class="col-span-3"></router-view>
    </div>
</template>