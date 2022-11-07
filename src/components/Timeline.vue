<template>
  <div class="border rounded-xl">
    <!-- Individual Commit -->
    <div
      class="flex justify-between items-center p-5"
      :class="n != 10 ? 'border-b' : ''"
      v-for="n in 10"
      :key="n"
    >
      <div>
        <h3 class="font-semibold">First Checkpoint</h3>
        <p class="text-gray-400 text-xs">Did some drums and added a bassline to the mix</p>
      </div>
      <div>
        <p class="uppercase tracking-widest text-gray-400 text-xs">
          3 Days Ago
        </p>
      </div>
    </div>
  </div>
</template>
