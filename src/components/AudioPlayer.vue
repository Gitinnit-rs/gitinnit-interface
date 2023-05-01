<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { useStore } from "../store";
import { Ref, onMounted, ref, watchEffect } from "vue";

// Icons
import PlayCircle from "vue-material-design-icons/PlayCircle.vue";
import PauseCircle from "vue-material-design-icons/PauseCircle.vue";
import StopCircle from "vue-material-design-icons/StopCircle.vue";
import ChevronDown from "vue-material-design-icons/ChevronDown.vue";
import DotsHorizontal from "vue-material-design-icons/DotsHorizontal.vue";
import VolumeHigh from "vue-material-design-icons/VolumeHigh.vue";
import VolumeMute from "vue-material-design-icons/VolumeMute.vue";

// Tauri
import { invoke } from "@tauri-apps/api";
import { convertFileSrc } from "@tauri-apps/api/tauri";
import { join } from "@tauri-apps/api/path";

import { globalAppPath, secondsToString } from "../utils";
import { useToast } from "vue-toastification";

const store = useStore();
const { project } = storeToRefs(store);

const toast = useToast();

const compact = ref(true);
const isPlaying = ref(false);
const isMuted = ref(false);

// Audio Player
const audioPlayer: Ref<HTMLAudioElement | null> = ref(null);
const src = ref("");

// Audio Player TimingStates
const currentTime = ref("00:00");
const totalTime = ref("00:00");
const interval = ref(setInterval(() => {}));
const percentage = ref(0);

onMounted(() => {
    // Attach event listeners
    attachListeners();
});

const loadMusic = async () => {
    if (!audioPlayer.value || !project.value?.musicFilePath) return;

    try {
        const filename = project.value.musicFilePath;
        const fileExtension =
            filename.substring(
                filename.lastIndexOf(".") + 1,
                filename.length
            ) || filename;

        const outputFilePath = await join(
            await globalAppPath(),
            "output." + fileExtension
        );
        const outputFileResourcePath = convertFileSrc(outputFilePath);
        src.value = outputFileResourcePath;

        // TODO: Validate the file extension too although its done at file selector level too

        // Copy over project's music file path to appdata's output.mp3
        await invoke("copyFile", {
            from: project.value.musicFilePath,
            to: outputFilePath,
        });

        await new Promise((res, _) => setTimeout(res, 100));

        audioPlayer.value.volume = 1;
        audioPlayer.value.currentTime = 0;
        audioPlayer.value.load();
        audioPlayer.value.pause();

        totalTime.value = audioPlayer.value.duration.toString();

        isPlaying.value = false;
    } catch (e) {
        console.error("Error while loading music", e);
        toast.error("Error loading audio");
    }
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

const toggleMute = () => {
    if (!audioPlayer.value) return;

    isMuted.value = !isMuted.value;

    audioPlayer.value.volume = isMuted.value ? 0 : 1;
};

const stop = () => {
    if (!audioPlayer.value) return;

    pause();

    audioPlayer.value.currentTime = 0;

    updateTime();
};

watchEffect(async () => {
    if (!project.value?.musicFilePath) return;

    loadMusic();
});

// Listen to audio playing events
const updateTime = () => {
    currentTime.value = secondsToString(audioPlayer.value?.currentTime || 0);

    updatePercentage();
};

const updatePercentage = () => {
    if (!audioPlayer.value) return;

    percentage.value =
        (audioPlayer.value?.currentTime / audioPlayer.value?.duration) * 100;
};

const attachListeners = () => {
    if (!audioPlayer.value) return;

    audioPlayer.value.oncanplay = function () {
        totalTime.value = secondsToString(audioPlayer.value?.duration || 0);
    };

    audioPlayer.value.onplaying = function () {
        updateTime();

        // Currently only setting if needed to clear later, but fine running in background
        interval.value = setInterval(updateTime, 100);
    };
};

const seek = (e: MouseEvent) => {
    if (!audioPlayer.value) return;

    const x = e.offsetX;
    const width = (e.target as HTMLDivElement).clientWidth;
    percentage.value = (x / width) * 100;

    audioPlayer.value.currentTime = (audioPlayer.value.duration * x) / width;

    updateTime();
};
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
                    <div class="text-2xl cursor-pointer" @click="toggleMute">
                        <!-- Find out how to get sound later -->
                        <VolumeMute v-if="isMuted" />
                        <VolumeHigh v-else />
                    </div>

                    <div
                        class="text-4xl mb-1 cursor-pointer"
                        @click="togglePlay"
                    >
                        <PauseCircle v-if="isPlaying" />
                        <PlayCircle v-else />
                    </div>

                    <div class="text-2xl cursor-pointer" @click="stop">
                        <StopCircle />
                    </div>
                </div>

                <!-- Progress Bar -->
                <div class="mt-2">
                    <div class="relative">
                        <div
                            class="bg-primary-600 h-2 rounded-lg cursor-pointer"
                            @click="seek"
                        ></div>
                        <div
                            class="bg-primary-200 h-2 rounded-lg absolute top-0 left-0 pointer-events-none"
                            :style="{
                                width: percentage.toString() + '%',
                                userSelect: 'none',
                            }"
                        ></div>
                    </div>
                    <div
                        class="flex justify-between text-xs font-medium mt-1 text-primary-100"
                    >
                        <span>{{ currentTime }}</span>
                        <span>{{ totalTime }}</span>
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

        <audio ref="audioPlayer" :src="src" @ended="isPlaying = false" />
    </div>
</template>
