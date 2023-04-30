<script setup lang="ts">
import {
    Combobox,
    ComboboxButton,
    ComboboxInput,
    ComboboxLabel,
    ComboboxOption,
    ComboboxOptions,
} from "@headlessui/vue";
import { invoke } from "@tauri-apps/api";
import { Ref, onMounted, ref, watchEffect } from "vue";

import CheckBoldIcon from "vue-material-design-icons/CheckBold.vue";
import ChevronUpDownIcon from "vue-material-design-icons/UnfoldMoreHorizontal.vue";
import { useStore } from "../store";
import { storeToRefs } from "pinia";
import { Timeline } from "../types";
import { useToast } from "vue-toastification";
import { slugify } from "../utils";

const timelines: Ref<Timeline[]> = ref([]);
const selectedTimeline = ref("Unknown");

const query = ref("");

const store = useStore();
const { project } = storeToRefs(store);

const toast = useToast();

onMounted(() => {
    fetchTimelines();
});

async function fetchTimelines() {
    const branches = JSON.parse(
        await invoke("get_local_branches", {
            path: project.value?.path,
        })
    );

    console.log({ branches });

    timelines.value = branches;

    const currentBranch = timelines.value.find((item) => item.current === true);
    console.log({ currentBranch });

    selectedTimeline.value = currentBranch?.name || "Unknown";
}

async function createTimeline() {
    if (!query.value) return;

    try {
        await invoke("checkout", {
            path: project.value?.path,
            checkoutPath: query.value,
            createNewBranch: true,
        });

        setTimeout(fetchTimelines, 500);

        toast.success("Created branch " + query.value + "!");
    } catch (e) {
        console.error("Error while creating a new branch", e);
        toast.error("Error while creating branch");
    }
}

watchEffect(async () => {
    if (
        !timelines.value
            .map((item) => item.name)
            .includes(selectedTimeline.value)
    )
        return;
    try {
        const result = await invoke("checkout", {
            path: project.value?.path,
            checkoutPath: selectedTimeline.value,
            createNewBranch: false,
        });

        if (result === "")
            toast.success("Switched to timeline " + selectedTimeline.value);
    } catch (e) {
        toast.error("Error while switching timeline");
        console.error(e);
    }
});
</script>

<template>
    <Combobox v-model="selectedTimeline">
        <div class="relative mt-1">
            <div
                class="relative cursor-default overflow-hidden rounded-lg bg-white text-left border focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm"
            >
                <!-- :displayValue="(timeline: any) => timeline.name" -->
                <ComboboxInput
                    class="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
                    @change="query = slugify($event.target.value)"
                />
                <ComboboxButton
                    class="absolute inset-y-0 right-0 flex items-center pr-2"
                >
                    <ChevronUpDownIcon
                        class="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                    />
                </ComboboxButton>
            </div>
            <TransitionRoot
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                @after-leave="query = ''"
            >
                <ComboboxOptions
                    class="absolute mt-1 max-h-60 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                >
                    <div
                        v-if="timelines.length === 0 && query !== ''"
                        class="relative cursor-default select-none py-2 px-4 text-gray-700"
                    >
                        Nothing found.
                    </div>

                    <ComboboxOption
                        v-for="timeline in timelines"
                        as="template"
                        :key="timeline.name"
                        :value="timeline.name"
                        v-slot="{ selected, active }"
                    >
                        <li
                            class="relative cursor-pointer select-none py-2 pl-10 pr-4"
                            :class="{
                                'bg-primary-500 text-white rounded-lg': active,
                                'text-gray-900': !active,
                            }"
                        >
                            <span
                                class="block truncate"
                                :class="{
                                    'font-medium': selected,
                                    'font-normal': !selected,
                                }"
                            >
                                {{ timeline.name }}
                            </span>
                            <span
                                v-if="selected"
                                class="absolute inset-y-0 left-0 flex items-center pl-3"
                                :class="{
                                    'text-white': active,
                                    'text-primary-500': !active,
                                }"
                            >
                                <CheckBoldIcon
                                    class="h-5 w-5"
                                    aria-hidden="true"
                                />
                            </span>
                        </li>
                    </ComboboxOption>

                    <button
                        v-if="
                            query &&
                            !timelines.map((item) => item.name).includes(query)
                        "
                        class="py-2 pl-10 pr-4 bg-gray-50 hover:bg-gray-200 rounded-lg"
                        @click="createTimeline"
                    >
                        + Create
                        <span class="text-primary-500">{{ query }}</span>
                    </button>
                </ComboboxOptions>
            </TransitionRoot>
        </div>
    </Combobox>
</template>
