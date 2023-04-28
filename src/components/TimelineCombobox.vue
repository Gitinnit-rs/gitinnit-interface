<script setup lang="ts">
import {
    Combobox,
    ComboboxButton,
    ComboboxInput,
    ComboboxLabel,
    ComboboxOption,
    ComboboxOptions,
} from "@headlessui/vue";
import { ref } from "vue";

import CheckBold from "vue-material-design-icons/CheckBold.vue";

const timelines = ["main", "dev", "alright-then"];
const selectedTimeline = ref(timelines[0]);

function onChange(e: any) {
    // event.target.value
}
</script>

<template>
    <Combobox v-model="selectedTimeline">
        <ComboboxInput @change="onChange">
            <ComboboxOptions>
                <ComboboxOption
                    v-for="timeline in timelines"
                    :key="timeline"
                    :value="timeline"
                    as="template"
                    v-slot="{ active, selected }"
                >
                    <li
                        :class="{
                            'bg-blue-500 text-white': active,
                            'bg-white text-black': !active,
                        }"
                    >
                        <CheckBold v-show="selected" />
                        {{ timeline }}
                    </li>
                </ComboboxOption>
            </ComboboxOptions>
        </ComboboxInput>
    </Combobox>
</template>
