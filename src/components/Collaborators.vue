<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useStore } from "../store";
import { useUserStore } from "../store/user";
import { getCollaborators } from "../utils/github";
import { onMounted } from "vue";

const store = useStore();
const { openCollabModal } = store;
const { project, collaborators } = storeToRefs(store);

const { user } = storeToRefs(useUserStore());

onMounted(() => {
  getCollaborators();
});
</script>
<template>
  <div
    class="cursor-pointer border p-5 rounded-xl hover:bg-gray-50 transition"
    @click="user && openCollabModal()"
  >
    <h2 class="thin-text">Collaborators</h2>

    <!-- Image Line -->
    <div
      v-if="user && collaborators"
      class="mt-3 flex items-center -space-x-2 image-line"
    >
      <img :key="user.id" :src="user.avatar_url" v-tooltip="user.login" />
      <img
        v-for="collaborator in collaborators"
        :key="collaborator.id"
        :src="collaborator.avatar_url"
        v-tooltip="collaborator.login"
      />
    </div>
    <p class="text-sm" v-else-if="!user">Log in to manage collaborators</p>
    <div v-else class="mt-1 text-sm">No collaborators found</div>
  </div>
</template>
