<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup

import { invoke } from "@tauri-apps/api";
import { onMounted } from "vue";
import { fetchConfigData, globalAppPath, globalConfigPath } from "./utils";

onMounted(async () => {
  const result = await invoke("create_dir_if_not_exists", {
    folderpath: await globalAppPath(),
  });

  if (result === true) {
    await new Promise((resolve, _) => setTimeout(resolve, 1000));

    const baseConfig = {
      projects: [],
    };

    // If dir is newly created
    const _globalConfig = await globalConfigPath();
    invoke("write_file", {
      path: _globalConfig,
      contents: JSON.stringify(baseConfig),
    });
  }

  fetchConfigData();
});
</script>

<template>
  <!-- Titlebar -->
  <div class="titlebar" data-tauri-drag-region></div>
  <router-view />
</template>

<style scoped>
.titlebar {
  user-select: none;
  background-color: transparent;
  width: 100%;
  height: 25px;
  position: fixed;
  left: 0;
  z-index: 100;
}
</style>
