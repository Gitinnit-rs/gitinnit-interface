<script setup lang="ts">
import { reactive, ref } from "vue";
import Modal from "./Modal.vue";
import FilledButton from "./FilledButton.vue";
import { invoke } from "@tauri-apps/api";
import CloseIcon from "vue-material-design-icons/Close.vue";
import { open } from "@tauri-apps/api/dialog";
import { useToast } from "vue-toastification";
import TonalButton from "./TonalButton.vue";
import { storeToRefs } from "pinia";
import { useStore } from "../store";
import { updateGlobalConfig, updateProjectConfig } from "../utils";

import { exists } from "@tauri-apps/api/fs";
import { useNProgress } from "@vueuse/integrations";

const toast = useToast();

const { projects } = storeToRefs(useStore());

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
        console.error("Error while selecting folder", e);
        toast.error("Unable to select folder");
    }
}

async function clone() {
    try {
        toast.info("Download started");
        await invoke("clone_repository", {
            path: data.path,
            remoteUrl: data.remoteURL,
        });

        console.log("Cloned Repository");

        const clonedFolderName = data.remoteURL.slice(
            data.remoteURL.lastIndexOf("/") + 1
        );

        // Add project's project.json to globalConfig with new generated ID and new local path
        const projectConfigPath =
            data.path + "/" + clonedFolderName + "/project.json";

        if (!(await exists(projectConfigPath))) {
            console.error("project.json not found in the repo folder");
            toast.error("Invalid or Un-updated Project");
            // np.done();

            return;
        }

        const projectConfig = JSON.parse(
            await invoke("read_file", {
                path: projectConfigPath,
            })
        );

        // Set New Values for Current User
        projectConfig.id = Math.round(Math.random() * 1e7);
        projectConfig.path = data.path + "/" + clonedFolderName;

        const newProjects = projects.value;
        newProjects.push(projectConfig);

        console.log("NEW PROJECT CONFIG", newProjects);

        // Update globalConfig.json
        await updateGlobalConfig("projects", newProjects);

        // Update local project.json (Important, must be after global config)
        await updateProjectConfig(projectConfig.id, "path", projectConfig.path);

        toast.success("Downloaded and Added project");
    } catch (e) {
        console.error("Error while downloading project", e);
        toast.error("Unable to download project");
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
                <div class="mt-1 text-gray-500 text-xs">
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

        <form @submit.prevent="clone" class="mt-2">
            <input
                type="url"
                placeholder="Link"
                class="mt-2"
                v-model="data.remoteURL"
            />

            <div class="mt-3">
                <p class="text-sm text-gray-700 font-semibold">
                    Location to download to
                </p>
                <p
                    v-if="data.path"
                    class="mt-1 text-xs bg-gray-100 px-2 py-1 rounded-full"
                >
                    {{ data.path }}
                </p>
                <TonalButton
                    @click="openFileSelect"
                    type="button"
                    class="mt-2 w-32"
                >
                    Select Folder
                </TonalButton>
            </div>

            <FilledButton
                :disabled="!data.path || !data.remoteURL"
                :disabled-text="'Fill all the fields'"
                class="mt-3 float-right"
                >Download</FilledButton
            >
        </form>
    </Modal>
</template>
