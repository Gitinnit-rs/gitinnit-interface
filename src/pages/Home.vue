<script setup lang="ts">
import FilledButton from "../components/FilledButton.vue";
import OutlineButton from "../components/OutlineButton.vue";
</script>

<template>
  <div class="mt-3">
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
  </div>
</template>
