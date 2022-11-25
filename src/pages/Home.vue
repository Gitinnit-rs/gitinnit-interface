<script setup lang="ts">
import { storeToRefs } from "pinia";
import { ref } from "vue";
import FilledButton from "../components/FilledButton.vue";
import OutlineButton from "../components/OutlineButton.vue";
import ProjectCard from "../components/ProjectCard.vue";
import { useStore } from "../store";
import { Project } from "../types";
import { randomImage } from "../utils";

const store = useStore();

const communityProjects = [
  {
    name: "Summer Days",
    author: "Martin Garrix",
    image: randomImage(),
    genre: "Electro House",
  },
  {
    name: "In the name of the king",
    author: "King Krusher",
    image: randomImage(),
    genre: "Hip-Hop",
  },
  {
    name: "SkateLess",
    author: "Steve Aoki",
    image: randomImage(),
    genre: "Electronic",
  },
  {
    name: "Fireball",
    author: "Pitbull",
    image: randomImage(),
    genre: "Electronic",
  },
];

const { projects } = storeToRefs(store);
</script>

<template>
  <div>
    <div class="p-5 mx-5">
      <div class="pt-5">
        <h3 class="tracking-widest text-gray-500 text-xs">v0.1.0</h3>
        <h1 class="text-6xl font-semibold font-lobster">Gitinnit</h1>
        <h2 class="text-primary-400 font-deca mt-1">
          Version Control for Musicians
        </h2>
        <div class="mt-4 space-x-2">
          <FilledButton>Register</FilledButton>
          <OutlineButton>Log in</OutlineButton>
        </div>
      </div>
    </div>

    <div class="p-5 mx-5">
      <h1 class="uppercase tracking-widest text-xs text-gray-500">
        Your Projects
      </h1>
      <p v-if="projects.length === 0" class="mt-3 mb-5 text-sm text-gray-700">
        No projects yet. Create a new one!
      </p>
      <div class="-ml-3 grid grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        <ProjectCard
          :project="project"
          v-for="project in projects as Project[]"
          :key="project.name + project.author"
        />
      </div>

      <h1 class="uppercase tracking-widest text-xs text-gray-500">
        Community Projects
      </h1>
      <div class="-ml-3">
        <div class="grid grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          <ProjectCard
            :project="project"
            v-for="project in communityProjects.concat(communityProjects)"
            :key="project.title + project.authors"
          />
        </div>
      </div>
    </div>
  </div>
</template>
