<script setup lang="ts">
import Timeline from "../../components/Timeline.vue";
import { storeToRefs } from "pinia";
import { useStore } from "../../store";
import { useRoute, RouterLink } from "vue-router";
import AddModal from "../../components/AddModal.vue";
import { onBeforeMount } from "vue";
import OutlineButton from "../../components/OutlineButton.vue";
import { invoke } from "@tauri-apps/api";
import Collaborators from "../../components/Collaborators.vue";
import CollabModal from "../../components/CollabModal.vue";
import FilledButton from "../../components/FilledButton.vue";
import CloudUploadOutline from "vue-material-design-icons/CloudUploadOutline.vue";
import { useToast } from "vue-toastification";
import { getCollaborators } from "../../utils/collaborators";
import { updateProjectConfig } from "../../utils";
import { open } from "@tauri-apps/api/dialog";
import LightButton from "../../components/LightButton.vue";
import { useNProgress } from "@vueuse/integrations/useNProgress";
import { fetchConfigData } from "../../utils";

const store = useStore();
const route = useRoute();

const { project, projects } = storeToRefs(store);

const toast = useToast();

const np = useNProgress();

onBeforeMount(() => {
  if (route.params.id && +route.params.id !== -1) {
    store.$patch({
      project: projects.value.find((item) => item.id === +route.params.id),
    });
  } else if (
    +route.params.id === -1 &&
    !project.value &&
    projects.value.length > 0
  ) {
    store.$patch({
      project: projects.value[projects.value.length - 1],
    });
  }

  getCollaborators();
});

const simulate = () => {
  invoke("write_file", {
    path: project.value?.path + "/" + Math.round(Math.random() * 1e3) + ".txt",
    contents: "hello there " + Math.round(Math.random() * 1e3),
  });
};

const push = async () => {
  try {
    np.start();

    const currentbranch = await invoke("get_current_branch", {
      path: project.value?.path,
    });

    // In the future, errors will be strings passed from Rust then handling it here. Currently not detectable easily
    console.log("passing to push", {
      path: project.value?.path,
      branch: currentbranch,
    });
    await invoke("push", {
      path: project.value?.path,
      branch: currentbranch,
    });

    np.done(true);

    toast.info("Saved to Cloud");
  } catch (e) {
    np.done(true);

    console.error("Error while pushing:", e);
    toast.error("Error, couldn't save to cloud");
  }
};

const selectMusicFile = async () => {
  if (!project.value) return;

  try {
    const result = await open({
      title: "Select Music File",
      directory: false,
      multiple: false,
    });

    if (result) {
      np.start();
      await updateProjectConfig(project.value.id, "musicFilePath", result);
    }

    np.done();
  } catch (e) {
    np.done();
    toast.error("Error while selecting file");
    console.error("Error while selecting and updating music file", e);
  }
};
</script>

<template>
  <div>
    <div v-if="!project" class="p-10 grid place-items-center min-h-screen">
      <div>
        <h1 class="font-semibold">Project not found</h1>
        <p>
          Go ahead and
          <router-link to="/create" class="text-primary-700 hover:underline"
            >start your own new musical journey!</router-link
          >
        </p>
      </div>
    </div>
    <div v-else>
      <section class="p-10 bg-primary-100">
        <div class="flex justify-between items-end">
          <div>
            <p class="uppercase tracking-widest text-gray-500 text-xs">
              {{ project?.genre }}
            </p>
            <h1 class="font-montaga text-4xl">{{ project?.name }}</h1>
            <h3 class="text-gray-500">{{ project?.author }}</h3>
            <!-- Tags -->
            <div class="space-x-1 mt-1 flex-wrap flex">
              <span v-for="tag in project?.tags" :key="tag" class="tag mt-1">{{
                tag
              }}</span>
            </div>
          </div>
          <!-- src="https://upload.wikimedia.org/wikipedia/en/4/46/Martin_Garrix_-_Summer_Days.png" -->
          <img
            :src="project?.image"
            alt="Project Image"
            class="w-64 h-64 rounded-lg"
          />
        </div>
      </section>

      <section class="p-10 pt-8">
        <!-- <div class="uppercase tracking-widest text-gray-500 text-xs flex justify-end items-center space-x-2">
        <div class="w-2.5 h-2.5 mb-0.5 bg-green-500 rounded-full"></div>
        <span>Last Updated 3 days ago</span>
      </div> -->

        <div class="flex justify-between mb-10">
          <div></div>
          <div class="space-x-2">
            <OutlineButton @click="simulate"
              >Simulate file change</OutlineButton
            >
            <AddModal />
            <FilledButton @click="push" :requires-online="true"
              ><CloudUploadOutline class="mr-1" />
              <span>Save to Cloud</span></FilledButton
            >
          </div>
        </div>

        <div class="xl:(flex space-x-5)">
          <div
            class="border p-5 rounded-xl space-y-2 w-full xl:(h-[6.55rem] mt-7 pt-7)"
          >
            <div class="text-sm flex items-center justify-between">
              <span class="thin-text">Local Path</span>
              <span class="text-sm text-gray-600">{{ project?.path }}</span>
            </div>
            <div class="text-sm flex items-center justify-between">
              <span class="thin-text">Remote Path</span>
              <span class="text-sm text-gray-600">
                {{ project.remoteURL || "Unknown" }}
              </span>
            </div>
            <div class="text-sm flex items-center justify-between">
              <span class="thin-text">Music File</span>
              <div class="space-x-2">
                <span class="text-sm text-gray-600">
                  {{ project.musicFilePath || "Not Set" }}
                </span>

                <LightButton class="px-3 py-1.5" @click="selectMusicFile"
                  >Select</LightButton
                >
              </div>
            </div>
          </div>

          <Collaborators class="mt-7 w-full" />
        </div>

        <div class="mt-7">
          <h2 class="thin-text">Timeline</h2>
          <Timeline class="mt-3" />
        </div>
      </section>
    </div>

    <CollabModal />
  </div>
</template>
