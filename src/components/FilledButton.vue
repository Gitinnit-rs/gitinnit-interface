<script setup lang="ts">
import { useOnline } from "@vueuse/core";

defineProps<{
  disabled?: boolean;
  disabledText?: string;
  requiresOnline?: boolean;
}>();

const isOnline = useOnline();
</script>

<template>
  <button
    :disabled="disabled || (requiresOnline && !isOnline)"
    class="px-5 py-2 text-white text-xs rounded-full font-medium transition"
    :class="[
      disabled || (requiresOnline && !isOnline)
        ? 'bg-gray-400 cursor-not-allowed'
        : 'bg-primary-400 hover:bg-primary-500/80',
    ]"
    :title="
      disabled && isOnline
        ? disabledText
        : requiresOnline
        ? 'Disabled. Check your internet connection'
        : undefined
    "
  >
    <slot />
  </button>
</template>
