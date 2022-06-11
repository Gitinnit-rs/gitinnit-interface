<script setup lang="ts">
import Sidebar from '../components/Sidebar.vue';
</script>

<template>
    <div class="grid grid-cols-12">
        <Sidebar class="col-span-3" />
        <router-view class="col-span-9"></router-view>
    </div>
</template>