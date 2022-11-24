<script setup lang="ts">
import FilledButton from "../components/FilledButton.vue";
import OutlineButton from "../components/OutlineButton.vue";
import ProjectCard from "../components/ProjectCard.vue";

const projects = [
  {
    title: "Summer Days",
    authors: "Martin Garrix",
    image: randomImage(),
    genre: "Electro House",
  },
  {
    title: "In the name of the king",
    authors: "King Krusher",
    image: randomImage(),
    genre: "Hip-Hop",
  },
  {
    title: "SkateLess",
    authors: "Steve Aoki",
    image: randomImage(),
    genre: "Electronic",
  },
  {
    title: "Fireball",
    authors: "Pitbull",
    image: randomImage(),
    genre: "Electronic",
  },
];

/**
 * Random image generator function
 */
function randomImage() {
  return `https://picsum.photos/id/${Math.floor(Math.random() * 100)}/400/400`;
}
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
      <h1 class="uppercase tracking-widest text-xs text-gray-500">Community Projects</h1>
      <div class="-ml-3">
        <div class="grid grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          <ProjectCard
            :project="project"
            v-for="project in projects.concat(projects)"
            :key="project.title + project.authors"
          />
        </div>
      </div>
    </div>
  </div>
</template>
