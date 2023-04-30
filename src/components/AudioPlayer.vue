<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { useStore } from "../store";
import { Ref, ref, watchEffect } from "vue";

// Icons
import PlayCircle from "vue-material-design-icons/PlayCircle.vue";
import PauseCircle from "vue-material-design-icons/PauseCircle.vue";
import StopCircle from "vue-material-design-icons/StopCircle.vue";
import ChevronDown from "vue-material-design-icons/ChevronDown.vue";
import DotsHorizontal from "vue-material-design-icons/DotsHorizontal.vue";
import VolumeHigh from "vue-material-design-icons/VolumeHigh.vue";
import VolumeMute from "vue-material-design-icons/VolumeMute.vue";
import { useToast } from "vue-toastification";
import { globalAppPath } from "../utils";
import { invoke } from "@tauri-apps/api";

const store = useStore();
const { project } = storeToRefs(store);

const toast = useToast();

const compact = ref(true);
const isPlaying = ref(false);

// Audio Player
const audioPlayer: Ref<HTMLAudioElement | null> = ref(null);
const src = ref("");

const loadMusic = async () => {
    if (!audioPlayer.value || !project.value?.musicFilePath) return;

    const filename = project.value.musicFilePath;
    const fileExtension =
        filename.substring(filename.lastIndexOf(".") + 1, filename.length) ||
        filename;

    const outputFilePath = (await globalAppPath()) + "output" + fileExtension;
    src.value = outputFilePath;

    // TODO: Validate the file extension too although its done at file selector level too

    // Copy over project's music file path to appdata's output.mp3
    await invoke("copyFile", {
        from: project.value?.musicFilePath,
        to: outputFilePath,
    });

    audioPlayer.value.load();
};

const play = () => {
    audioPlayer.value?.play();
    isPlaying.value = true;
};

const pause = () => {
    audioPlayer.value?.pause();
    isPlaying.value = false;
};

const toggleCompact = () => {
    compact.value = !compact.value;
};

const togglePlay = () => {
    if (isPlaying.value) pause();
    else play();
};

watchEffect(async () => {
    if (!project.value?.musicFilePath) return;

    loadMusic();
});
</script>

<template>
    <div class="fixed bottom-3 left-[50%] text-white z-10 select-none">
        <transition name="pushup" mode="out-in">
            <div
                v-if="compact"
                class="px-4 bg-primary-500 rounded-full cursor-pointer"
                @click="toggleCompact"
            >
                <DotsHorizontal class="text-xl" />
            </div>
            <div
                class="p-3 bg-primary-500 w-50 relative right-[4.6rem] rounded-lg"
                v-else
            >
                <div class="flex items-center justify-between px-3">
                    <div class="text-2xl">
                        <!-- Find out how to get sound later -->
                        <VolumeMute v-if="false" />
                        <VolumeHigh v-else />
                    </div>

                    <div
                        class="text-4xl mb-1 cursor-pointer"
                        @click="togglePlay"
                    >
                        <PauseCircle v-if="isPlaying" />
                        <PlayCircle v-else />
                    </div>

                    <div class="text-2xl">
                        <StopCircle />
                    </div>
                </div>

                <!-- Progress Bar -->
                <div class="mt-2">
                    <div class="bg-primary-600 h-2 rounded-lg"></div>
                    <!-- <div class="bg-primary-600 h-2 rounded-lg"></div> -->
                    <div
                        class="flex justify-between text-xs font-medium mt-1 text-primary-100"
                    >
                        <span>0:00</span>
                        <span>2:30</span>
                    </div>
                </div>
                <!-- End of Progress Bar -->
                <div
                    class="relative -bottom-2 h-5 right-0 text-center cursor-pointer"
                    @click="toggleCompact"
                >
                    <ChevronDown />
                </div>
            </div>
        </transition>

        <audio ref="audioPlayer" :src="src" />
    </div>
</template>
