<script setup lang="ts">
import { storeToRefs } from "pinia";
import Github from "vue-material-design-icons/Github.vue";
import SoundCloud from "vue-material-design-icons/SoundCloud.vue";
import { useUserStore } from "../store/user";
import { loginWithSupabase } from "../utils/auth";
import FilledButton from '../components/FilledButton.vue'

const userStore = useUserStore();
const { user } = storeToRefs(userStore);
</script>

<template>
  <section class="p-10">
    <div class="mt-3">
      <div v-if="user" class="flex items-center space-x-2">
        <img
          src="https://upload.wikimedia.org/wikipedia/en/4/46/Martin_Garrix_-_Summer_Days.png"
          width="60"
          class="rounded-full"
          alt="Profile Image"
        />
        <div>
          <h1 class="font-semibold">Neelansh Mathur</h1>
          <p class="text-gray-400 text-xs">Alkibiadez</p>
        </div>
      </div>
      <div v-else>
        <FilledButton @click="loginWithSupabase">Log in</FilledButton>
      </div>
    </div>

    <div class="mt-10 border p-5 rounded-xl">
      <h1 class="font-semibold">Connected Accounts</h1>
      <div class="flex items-center space-x-1 mt-2">
        <div class="">
          <component :is="Github" class="text-xl"></component>
        </div>
        <div class="flex space-x-2 items-center">
          <p class="text-sm">neelansh15</p>
          <button class="text-xs px-2 py-1 bg-green-100 rounded-full">
            Connected
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
            Connect
          </button>
        </div>
      </div>
    </div>

    <div class="mt-5 border p-5 rounded-xl">
      <h1 class="font-semibold">Version Control</h1>
      <form
        @submit="(e) => e.preventDefault()"
        class="mt-3 flex items-center space-x-3"
      >
        <div>
          <label for="git_name">Name</label> <br />
          <input
            type="text"
            name="git_name"
            id="git_name"
            class="mt-1"
            placeholder="Name"
          />
        </div>
        <div>
          <label for="git_email" class="mt-3">Email</label> <br />
          <input
            type="text"
            name="git_email"
            id="git_email"
            class="mt-1"
            placeholder="Email"
          />
        </div>
      </form>
    </div>
  </section>
</template>
