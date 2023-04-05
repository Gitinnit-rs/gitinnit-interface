<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useStore } from "../store";
import Modal from "./Modal.vue";
import FilledButton from "./FilledButton.vue";
import { useUserStore } from "../store/user";
import DeleteIcon from "vue-material-design-icons/Delete.vue";

const store = useStore();
const { user } = storeToRefs(useUserStore());

const { collabModalOpen, collaborators } = storeToRefs(store);
</script>

<template>
  <Modal v-model="collabModalOpen">
    <h1 class="font-deca">Collaborators ({{ collaborators.length + 1 }})</h1>

    <form @submit.prevent="" class="flex items-center space-x-2">
      <input type="text" placeholder="Username" class="mt-2" required />

      <FilledButton class="mt-2" @click="() => {}">Invite</FilledButton>
    </form>

    <div>
      <div
        class="mt-3 p-3 flex flex-col space-y-3 image-line-list overflow-y-scroll"
        style="max-height: 250px"
      >
        <div class="flex items-center">
          <img :src="user.avatar_url" v-tooltip="user.login" />
          <div class="ml-2 transform scale-90">
            <h3>{{ user.login }}</h3>
            <p class="text-sm text-gray-500">You</p>
          </div>
        </div>
        <div
          v-for="collaborator in collaborators"
          :key="collaborator.id"
          class="flex justify-between"
        >
          <div class="flex items-center">
            <img
              :src="collaborator.avatar_url"
              v-tooltip="collaborator.login"
            />
            <div class="ml-2 transform scale-90">
              <h3>{{ collaborator.login }}</h3>
              <p class="text-sm text-gray-500">{{ collaborator.type }}</p>
            </div>
          </div>

          <div class="grid place-items-center">
            <component
              :is="DeleteIcon"
              class="text-red-500 text-2xl mb-1.5 cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  </Modal>
</template>
