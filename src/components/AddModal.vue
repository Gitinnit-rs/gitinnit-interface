<script setup lang="ts">
import { ref } from "vue";
import Modal from "./Modal.vue";
import LightButton from "./LightButton.vue";
import FilledButton from "./FilledButton.vue";
import { invoke } from "@tauri-apps/api";
import { useStore } from "../store";
import { storeToRefs } from "pinia";

const isOpen = ref(false);
const message = ref("");

const store = useStore();
const { project } = storeToRefs(store);

const commit = () => {
  if (!message.value) message.value = "New Checkpoint";
  if (!project.value?.path) return;

  invoke("commit", {
    message: message.value,
    path: project.value?.path,
  }).then(() => {
    // Get timeline with a small delay
    setTimeout(() => {
      store.getTimeline();
    }, 500);
  });

  message.value = "";
  isOpen.value = false;
};
</script>

<template>
  <LightButton @click="isOpen = true">+ Checkpoint</LightButton>

  <Modal v-model="isOpen">
    <h1 class="font-deca">Add Checkpoint</h1>

    <form @submit.prevent="">
      <input
        type="text"
        placeholder="Checkpoint Message"
        class="mt-2"
        v-model="message"
      />

      <FilledButton class="mt-5 float-right" @click="commit">Add</FilledButton>
    </form>
  </Modal>
</template>
