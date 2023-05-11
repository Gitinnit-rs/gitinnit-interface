<script setup lang="ts">
import { computed, ref, watch } from "vue";
// import { onClickOutside } from "@vueuse/core";
import { useStore } from "../store";

const store = useStore();

const props = defineProps<{
  modelValue: boolean;
}>();

const emit = defineEmits(["update:modelValue"]);

const isOpen = computed({
  get: () => props.modelValue,
  set: (value: boolean) => emit("update:modelValue", value),
});

const modal = ref(null);

// onClickOutside(modal, () => (isOpen.value = false));

watch(isOpen, (value) =>
  store.$patch({
    scrollLock: value,
  })
);
</script>
<template>
  <Transition name="fade">
    <div class="modal-container" v-if="isOpen">
      <div class="modal" ref="modal">
        <slot />
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.modal-container {
  @apply h-screen w-screen bg-dark-100/40 z-30 fixed top-0 left-0 grid place-items-center;
}

.modal {
  @apply z-40 bg-white p-5 absolute w-[40%] rounded-lg;
}
</style>
