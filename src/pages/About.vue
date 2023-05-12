<script setup lang="ts">
import Logo from "../assets/icon.png";
</script>
<template>
    <div class="grid place-items-center min-h-screen -mt-1">
        <div class="flex flex-col items-center justify-center space-y-6">
            <img :src="Logo" alt="Logo" class="w-30 h-30" />
            <h1 class="text-6xl font-montaga">Gitinnit</h1>
            <div class="text-center mt-5">
                <p>Made by</p>
                <ul class="text-gray-500">
                    <ul>
                        Neelansh Mathur
                    </ul>
                    <ul>
                        Vedant Mahadik
                    </ul>
                    <ul>
                        Parth Shah
                    </ul>
                    <ul>
                        Burhanuddin Rangwala
                    </ul>
                </ul>
            </div>
        </div>
    </div>
</template>
