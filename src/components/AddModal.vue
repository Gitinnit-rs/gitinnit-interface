<script setup lang="ts">
import { ref } from "vue";
import Modal from "./Modal.vue";
import LightButton from "./LightButton.vue";

const isOpen = ref(false);
</script>

<template>
  <LightButton @click="isOpen = true">+ Add</LightButton>

  <Modal v-model="isOpen">
    Add
  </Modal>
</template>
