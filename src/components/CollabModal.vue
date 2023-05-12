<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useStore } from "../store";
import Modal from "./Modal.vue";
import FilledButton from "./FilledButton.vue";
import { useUserStore } from "../store/user";
import DeleteIcon from "vue-material-design-icons/Delete.vue";
import CloseIcon from "vue-material-design-icons/Close.vue";
import {
    getCollaborators,
    addCollaborator,
    removeCollaborator,
} from "../utils/collaborators";
import { ref } from "vue";
import { useToast } from "vue-toastification";

const store = useStore();
const { user } = storeToRefs(useUserStore());

const { collabModalOpen, collaborators } = storeToRefs(store);

const toast = useToast();

const username = ref("");

async function invite() {
    try {
        const result = await addCollaborator(username.value);
        if (!result) toast.warning("Already a collaborator");
        else {
            toast.success("Invitation sent!");
            username.value = "";
        }
    } catch (e) {
        console.error("Error while adding collaborator", e);
        toast.error("Error while adding collaborator");
    }
}

async function removeCollab(usernameToRemove: any) {
    console.log("Remove collaborators called");
    try {
        await removeCollaborator(usernameToRemove);

        setTimeout(() => getCollaborators(), 1000);

        toast("Removed as collaborator");
    } catch (e) {
        console.error("Error while removing collaborator", e);
        toast.error("Error while removing collaborator");
    }
}
</script>

<template>
    <Modal v-model="collabModalOpen">
        <section>
            <div class="flex items-center justify-between">
                <h1 class="font-deca">
                    Collaborators ({{ collaborators.length + 1 }})
                </h1>
                <span
                    @click="() => store.$patch({ collabModalOpen: false })"
                    class="mb-2 cursor-pointer text-gray-800"
                >
                    <CloseIcon />
                </span>
            </div>

            <form @submit.prevent="invite" class="flex items-center space-x-2">
                <input
                    type="text"
                    placeholder="Username"
                    class="mt-2"
                    v-model="username"
                    required
                />

                <FilledButton class="mt-2">Invite</FilledButton>
            </form>

            <div>
                <div
                    class="mt-3 p-3 flex flex-col space-y-3 image-line-list overflow-y-scroll"
                    style="max-height: 250px"
                >
                    <div
                        v-for="(collaborator, i) in collaborators"
                        :key="collaborator.id"
                        class="flex justify-between"
                    >
                        <div class="flex items-center">
                            <img
                                :src="collaborator.avatar_url"
                                v-tooltip="collaborator.login"
                            />
                            <div class="ml-2 transform scale-90">
                                <h3>{{ collaborator.login }}</h3>
                                <p class="text-sm text-gray-500">
                                    {{ collaborator.type }}
                                </p>
                            </div>
                        </div>

                        <div
                            v-if="collaborator.login !== user.login"
                            class="grid place-items-center"
                            @click="removeCollab(collaborator.login)"
                        >
                            <component
                                :is="DeleteIcon"
                                class="text-red-500 text-2xl mb-1.5 cursor-pointer"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </Modal>
</template>
