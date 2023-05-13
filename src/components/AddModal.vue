<script setup lang="ts">
import { ref } from "vue";
import Modal from "./Modal.vue";
import LightButton from "./LightButton.vue";
import FilledButton from "./FilledButton.vue";
import { invoke } from "@tauri-apps/api";
import { useStore } from "../store";
import { storeToRefs } from "pinia";
import CloseIcon from "vue-material-design-icons/Close.vue";

const isOpen = ref(false);
const message = ref("");

const store = useStore();
const { project } = storeToRefs(store);

const commit = () => {
  if (!project.value?.path) return;
  if (!message.value) message.value = "New Checkpoint";

  invoke("commit", {
    message: message.value,
    path: project.value?.path,
  }).then(() => {
    // Get timeline with a delay
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
    <div class="flex items-center justify-between">
      <div>
        <h1 class="font-deca">Add Checkpoint</h1>
        <p class="text-gray-500 text-xs">
          Make sure changes have been made since last checkpoint
        </p>
      </div>
      <span
        @click="isOpen = false"
        class="mb-2 cursor-pointer text-gray-800"
      >
        <CloseIcon />
      </span>
    </div>

    <form @submit.prevent="" class="mt-2">
      <input
        type="text"
        placeholder="Checkpoint Message"
        class="mt-2"
        v-model="message"
      />

      <FilledButton class="mt-3 float-right" @click="commit">Add</FilledButton>
    </form>
  </Modal>
</template>
