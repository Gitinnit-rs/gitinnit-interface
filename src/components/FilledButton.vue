<script setup lang="ts">
defineProps<{
  disabled?: boolean;
  disabledText?: string;
}>();
</script>

<template>
  <button
    :disabled="disabled"
    class="px-5 py-2 text-white text-xs rounded-full font-medium transition"
    :class="[
      disabled
        ? 'bg-gray-400 cursor-not-allowed'
        : 'bg-primary-400 hover:bg-primary-500/80',
    ]"
    :title="disabled ? disabledText : undefined"
  >
    <slot />
  </button>
</template>
