<script setup lang="ts">
// @ts-ignore
import Vue3TagsInput from "vue3-tags-input";
import { reactive } from "vue";
import FilledButton from "../components/FilledButton.vue";
import { invoke } from "@tauri-apps/api";
import { globalAppPath } from "../utils";

const data = reactive({
  name: "",
  genre: "",
  author: "",
  path: "",
  tags: "",
});

async function submit() {
  console.log("Path passed: ", data.path);
  //   invoke("set_path", {
  //     path: data.path,
  //   }).then(() => invoke("init"));

  //   const path = "/Users/neelansh/Documents/programming/test";

  console.log("Global config path:", await globalAppPath());
}
</script>

<template>
  <div class="p-5 pt-12">
    <h1 class="text-5xl font-lobster">Create a new project</h1>

    <form @submit.prevent="submit" class="mt-5" ref="create_form">
      <div class="grid grid-cols-3 gap-10">
        <div>
          <label for="name">Name</label> <br />
          <input type="text" name="name" v-model="data.name" /> <br />
        </div>
        <div>
          <label for="genre">Genre</label> <br />
          <input type="text" name="genre" /> <br />
        </div>
      </div>
      <div class="grid grid-cols-3 gap-10 my-3">
        <div>
          <label for="author">Author</label> <br />
          <input type="text" name="author" /> <br />
        </div>
        <div>
          <label for="path">Path</label> <br />
          <input type="text" name="path" v-model="data.path" /> <br />
        </div>
      </div>

      <label for="tags" class="mt-5">Tags</label> <br />
      <vue3-tags-input
        :tags="data.tags"
        placeholder="Enter tags"
        @on-tags-changed=""
      />

      <FilledButton class="mt-6">Create project</FilledButton>
    </form>
  </div>
</template>

<style>
.v3ti .v3ti-tag {
  background: rgb(191, 219, 254);
  color: rgb(34, 34, 34);
  font-size: 14px;
}

.v3ti .v3ti-tag .v3ti-remove-tag {
  color: #000000;
  transition: color 0.3s;
}

.v3ti .v3ti-tag .v3ti-remove-tag:hover {
  color: #ffffff;
}
</style>