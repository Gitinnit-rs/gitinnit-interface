<script setup lang="ts">
import Timeline from "../../components/Timeline.vue";
import Pill from "../../components/Pill.vue";
import { storeToRefs } from "pinia";
import { useStore } from "../../store";
import { useRoute, RouterLink } from "vue-router";
import AddModal from "../../components/AddModal.vue";
import { onBeforeMount, onMounted } from "vue";
import OutlineButton from "../../components/OutlineButton.vue";
import { invoke } from "@tauri-apps/api";

const store = useStore();
const route = useRoute();

const { project, projects } = storeToRefs(store);

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
      project: projects.value[0],
    });
  }
});

onMounted(() => {
  // Fetch git logs
  store.getTimeline();
});

const simulate = () => {
  invoke("write_file", {
    path: project.value?.path + "/" + Math.round(Math.random() * 1e3) + ".txt",
    contents: "hello there " + Math.round(Math.random() * 1e3),
  });
};
</script>

<template>
  <div>
    <div v-if="!project" class="p-10 grid place-items-center min-h-screen">
      <div>
        <h1 class="font-semibold">No project found</h1>
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

        <div class="flex justify-between">
          <div></div>
          <div>
            <OutlineButton class="mr-2" @click="simulate"
              >Simulate file change</OutlineButton
            >
            <AddModal />
          </div>
        </div>

        <div class="space-y-3">
          <p class="text-sm"><Pill>Local Path</Pill> {{ project?.path }}</p>
          <p class="text-sm">
            <Pill>Remote Path</Pill>
            https://github.com/neelansh15/test-git-innit-11
          </p>
        </div>

        <div class="mt-5">
          <h2 class="font-semibold">Timeline</h2>
          <Timeline class="mt-3" />
        </div>
      </section>
    </div>
  </div>
</template>
