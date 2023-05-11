<script setup lang="ts">
import { reactive, ref } from "vue";
import Modal from "./Modal.vue";
import LightButton from "./LightButton.vue";
import FilledButton from "./FilledButton.vue";
import { invoke } from "@tauri-apps/api";
import { useStore } from "../store";
import { storeToRefs } from "pinia";
import CloseIcon from "vue-material-design-icons/Close.vue";
import { open } from "@tauri-apps/api/dialog";
import { useToast } from "vue-toastification";
import TonalButton from "./TonalButton.vue";

const toast = useToast();

const isOpen = ref(false);
const data = reactive({
    remoteURL: "",
    path: "",
});

async function openFileSelect() {
    try {
        const result = await open({
            title: "Select folder",
            directory: true,
            multiple: false,
        });
        data.path = result as string;
    } catch (e) {
        console.error("Error while selecting fodler", e);
        toast.error("Unable to select folder");
    }
}
</script>

<template>
    <p
        class="mt-2 text-sm text-primary-500 hover:text-primary-600 cursor-pointer transition"
        @click="isOpen = true"
    >
        Or download an online project
    </p>

    <Modal v-model="isOpen">
        <div class="flex items-center justify-between">
            <div>
                <h1 class="font-deca">Download</h1>
                <div class="text-gray-500 text-xs">
                    <p>
                        Paste the link of your or your friends projects
                        <b>Remote Link</b>, found in the project's page.
                    </p>
                    <p class="mt-1 italic">
                        Example:
                        https://github.com/yourusername/your-project-name
                    </p>
                </div>
            </div>
            <span
                @click="isOpen = false"
                class="mb-2 cursor-pointer text-gray-800"
            >
                <CloseIcon />
            </span>
        </div>

        <form @submit.prevent="" class="mt-2">
            <input
                type="text"
                placeholder="Link"
                class="mt-2"
                v-model="data.remoteURL"
            />

            <div class="mt-3">
                <p class="text-sm text-gray-700 font-semibold">Location to download to</p>
                <p class="text-xs bg-gray-100 px-2 py-1 rounded-full">{{ data.path }}</p>
                <TonalButton
                    @click="openFileSelect"
                    type="button"
                    class="mt-1 w-32"
                >
                    Select Folder
                </TonalButton>
            </div>

            <FilledButton class="mt-3 float-right" @click=""
                >Download</FilledButton
            >
        </form>
    </Modal>
</template>
