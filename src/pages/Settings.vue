<script setup lang="ts">
import { storeToRefs } from "pinia";
import Github from "vue-material-design-icons/Github.vue";
import SoundCloud from "vue-material-design-icons/SoundCloud.vue";
import { useUserStore } from "../store/user";
import { login } from "../utils/auth";
import FilledButton from "../components/FilledButton.vue";
import { useOnline } from "@vueuse/core";
import { invoke } from "@tauri-apps/api";
import { onMounted, ref } from "vue";
import { useToast } from "vue-toastification";
import { updateGlobalConfig } from "../utils";

const userStore = useUserStore();
const { user } = storeToRefs(userStore);

const isOnline = useOnline();

const toast = useToast();

const name = ref("");
const email = ref("");

onMounted(fetchNameAndEmail);

async function fetchNameAndEmail() {
  name.value = await invoke("get_user_name");
  email.value = await invoke("get_user_email");
}

function setNameAndEmail(e: Event): any {
  e.preventDefault();

  invoke("set_user_name", {
    name: name.value.trim(),
  });

  invoke("set_user_email", {
    email: email.value.trim(),
  });

  toast.success("Updated");
}

function disconnect() {
  if (user) {
    userStore.setUser(null);
    updateGlobalConfig("user", undefined);
  }
}
</script>

<template>
  <section class="p-10">
    <div class="mt-3">
      <div v-if="user" class="flex items-center space-x-2">
        <!-- src="https://upload.wikimedia.org/wikipedia/en/4/46/Martin_Garrix_-_Summer_Days.png" -->
        <img
          :src="user.avatar_url"
          width="60"
          class="rounded-full"
          alt="Profile Image"
        />
        <div>
          <h1 class="font-semibold">{{ user.name }}</h1>
          <p class="text-gray-400 text-xs ml-[0.5px]">
            {{ user.login }}
          </p>
        </div>
      </div>
      <div v-else>
        <FilledButton :requires-online="true" @click="login"
          >Log in</FilledButton
        >
      </div>
    </div>

    <div class="mt-10 border p-5 rounded-xl">
      <h1 class="font-semibold">Connected Accounts</h1>
      <div class="flex items-center space-x-1 mt-2">
        <div class="">
          <component :is="Github" class="text-xl"></component>
        </div>
        <div class="flex space-x-2 items-center">
          <p v-if="user" class="text-sm">{{ user.login }}</p>
          <p v-else class="text-sm">Github</p>
          <button
            v-if="user"
            class="text-xs px-2 py-1 hover:bg-red-100 rounded-full"
            :class="isOnline ? 'bg-green-100' : 'bg-yellow-100'"
            onmouseover="this.innerText = 'Disconnect'"
            @mouseout="
              (val) => {
                // @ts-ignore
                val.target.innerText = isOnline
                  ? 'Connected'
                  : 'Connected, Offline';
              }
            "
            @click="disconnect"
          >
            {{ isOnline ? "Connected" : "Connected, Offline" }}
          </button>
          <button v-else class="text-xs px-2 py-1 bg-red-100 rounded-full">
            Not Connected
          </button>
        </div>
      </div>

      <div class="flex items-center space-x-1 mt-2 text-gray-400">
        <div class="">
          <component :is="SoundCloud" class="text-xl"></component>
        </div>
        <div class="flex space-x-2 items-center">
          <p class="text-sm">SoundCloud</p>
          <button
            class="text-xs px-3 py-1 bg-primary-100 text-black rounded-full"
          >
            Coming Soon
          </button>
        </div>
      </div>
    </div>

    <div class="mt-5 border p-5 rounded-xl">
      <h1 class="font-semibold">Version Control</h1>
      <form
        @submit="setNameAndEmail"
        class="mt-3 flex items-center space-x-3"
        enctype="multipart/form-data"
      >
        <div>
          <label for="git_name">Name</label> <br />
          <input
            type="text"
            name="git_name"
            id="git_name"
            class="mt-1"
            placeholder="Name"
            v-model="name"
            required
          />
        </div>
        <div>
          <label for="git_email" class="mt-3">Email</label> <br />
          <input
            type="email"
            name="git_email"
            id="git_email"
            class="mt-1"
            placeholder="Email"
            v-model="email"
            required
          />
        </div>

        <FilledButton class="mt-6">Set</FilledButton>
      </form>
    </div>
  </section>
</template>
