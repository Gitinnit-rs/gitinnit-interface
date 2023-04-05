<script setup lang="ts">
// @ts-ignore
import Vue3TagsInput from "vue3-tags-input";
import { reactive, ref } from "vue";
import FilledButton from "../components/FilledButton.vue";
import { invoke } from "@tauri-apps/api";
import { fetchConfigData, globalConfigPath, randomImage } from "../utils";
import { useRouter } from "vue-router";
import { open } from "@tauri-apps/api/dialog";
import Pill from "../components/Pill.vue";
import { Project } from "../types";
import { useToast } from "vue-toastification";
import { createRepository } from "../utils/github";

const router = useRouter();
const toast = useToast();

const data = reactive({
  id: Math.round(Math.random() * 1e6),
  name: "Git Test 1",
  genre: "EDM",
  author: "Alkibiadez",
  path: "",
  tags: ["EDM"] as string[],
  image: randomImage(),
  defaultBranch: "main",

  remoteURL: "",
  musicFilePath: "",
} as Project);

function onTagsChanged(value: any) {
  data.tags = value;
}

async function openFileSelect() {
  const result = await open({
    title: "Select folder",
    directory: true,
    multiple: false,
  });
  data.path = result as string;
}

async function submit() {
  if (!data.path) {
    toast.error("Select a folder");
    return;
  }

  try {
    // Attempt to create a repository online
    const remoteUrl = await createRepository(data);
    data.remoteURL = remoteUrl;

    // Save data to globalConfig
    const _globalConfig = await globalConfigPath();

    const globalConfigJSON: string = await invoke("read_file", {
      path: _globalConfig,
    });

    const globalData = JSON.parse(globalConfigJSON);
    globalData.projects.push(data);

    // Update the globalConfig with the new project
    invoke("write_file", {
      path: _globalConfig,
      contents: JSON.stringify(globalData),
    }).then(() => {
      setTimeout(fetchConfigData, 1000);

      // Put data in project.json in local repository
      invoke("write_file", {
        path: data.path + "/project.json",
        contents: JSON.stringify(data),
      }).then(() => {
        // Initialize repository in project folder
        invoke("init", {
          path: data.path,
        }).then(() => {
          router.push("/");
          toast.success("Project created");
        });
      });
    });
  } catch (e) {
    console.error("Error while creating new project", e);
    toast.error("Error while creating new project");
  }
}
</script>

<template>
  <div class="p-10 pt-12">
    <h1 class="text-5xl font-lobster">Create a new project</h1>

    <form @submit.prevent="submit" class="mt-5">
      <div class="grid grid-cols-3 gap-10">
        <div>
          <label for="name">Music Name</label> <br />
          <input type="text" name="name" v-model="data.name" required /> <br />
        </div>
        <div>
          <label for="genre">Genre</label> <br />
          <input type="text" name="genre" v-model="data.genre" required />
          <br />
        </div>
      </div>
      <div class="grid grid-cols-3 gap-10 my-3">
        <div>
          <label for="author">Author</label> <br />
          <input type="text" name="author" v-model="data.author" required />
          <br />
        </div>
        <div>
          <label for="path">Path</label> <br />
          <div class="flex justify-between items-center space-x-2">
            <div>
              <FilledButton @click="openFileSelect" type="button" class="w-32">
                Select Folder
              </FilledButton>
            </div>
            <Pill v-if="data.path">
              {{ data.path }}
            </Pill>
          </div>
          <br />
        </div>
      </div>

      <label for="tags" class="mt-5">Tags</label> <br />
      <vue3-tags-input
        :tags="data.tags"
        placeholder="Enter tags"
        @on-tags-changed="onTagsChanged"
      />
      <FilledButton class="mt-6" requires-online>Create project</FilledButton>
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
