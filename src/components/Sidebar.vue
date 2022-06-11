<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()

const routes = [
    {
        to: '/',
        name: 'home',
        label: 'Home',
    },
    {
        to: '/about',
        name: 'about',
        label: 'About',
    }
]
</script>

<template>
    <nav class="p-5 max-w-[15rem] min-h-screen bg-gray-200 flex flex-col justify-between">
        <div class="space-y-10">
            <div>
                <h1 class="font-lobster text-3xl text-center mt-3">Gitinnit</h1>
            </div>

            <div>
                <ul class="flex flex-col">
                    <router-link v-for="{ to, name, label } in routes" :key="label" :to="to" class="py-2">
                        <li class="list-item" :class="[name === route.name ? 'list-item-active' : null]">
                            {{ label }}
                        </li>
                    </router-link>
                </ul>
            </div>
        </div>

        <div class="text-gray-500 text-xs text-center">
            &COPY; 2022 Gitinnit Pvt. Ltd.
        </div>
    </nav>
</template>

<style scoped>
.list-item {
    @apply px-4 py-2 cursor-pointer rounded-lg transition hover: (bg-gray-100);
}

.list-item-active {
    @apply bg-primary-300 hover: (bg-primary-400);
}
</style>
