<script setup lang="ts">
// @ts-ignore
import Vue3TagsInput from "vue3-tags-input";
import { ref } from "vue";
import FilledButton from "../components/FilledButton.vue";

const tags = ref([]);
</script>

<template>
  <div class="p-5 pt-12">
    <h1 class="text-5xl font-lobster">Create a new project</h1>

    <form @submit.prevent="" class="mt-5">
      <div class="grid grid-cols-3 gap-10">
        <div>
          <label for="name">Name</label> <br />
          <input type="text" name="name" /> <br />
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
          <input type="text" name="path" /> <br />
        </div>
      </div>

      <label for="tags" class="mt-5">Tags</label> <br />
      <vue3-tags-input
        :tags="tags"
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
