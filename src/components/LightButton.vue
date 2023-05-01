<script setup lang="ts">
import FilledButton from "./FilledButton.vue";
</script>
<template>
    <FilledButton
        class="text-white bg-primary-200 hover:bg-primary-300/90 font-medium"
    >
        <slot
    /></FilledButton>
</template>
