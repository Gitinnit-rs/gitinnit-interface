<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useStore } from "../store";
import { useUserStore } from "../store/user";

const { openCollabModal } = useStore();

const { user } = storeToRefs(useUserStore());
</script>
<template>
  <div
    class="cursor-pointer border p-5 rounded-xl hover:bg-gray-50 transition"
    @click="user && openCollabModal()"
  >
    <h2 class="thin-text">Collaborators</h2>

    <!-- Image Line -->
    <div v-if="user" class="mt-3 flex items-center -space-x-2 image-line">
      <img :src="user.avatar_url" v-tooltip="user.login" />
      <img
        src="https://xsgames.co/randomusers/avatar.php?g=male"
        v-tooltip="'Gigachad'"
      />
      <img
        src="https://xsgames.co/randomusers/avatar.php?g=male"
        v-tooltip="'Gigachad'"
      />
      <img
        src="https://xsgames.co/randomusers/avatar.php?g=male"
        v-tooltip="'Gigachad'"
      />
    </div>

    <p class="text-sm" v-else>Log in to manage collaborators</p>
  </div>
</template>
