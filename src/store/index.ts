import { invoke } from "@tauri-apps/api";
import { defineStore } from "pinia";
import { Commit, Project } from "../types";

export const useStore = defineStore("gitinnit-store", {
    state: () => ({
        compact: true,
        projects: [] as Project[],
        project: undefined as Project | undefined,

        timeline: [] as Commit[],
        mainTimeline: [] as Commit[],

        collaborators: [] as any[],

        scrollLock: false,
        user: undefined as any,

        collabModalOpen: false,
    }),
    actions: {
        toggleCompact() {
            this.compact = !this.compact;
        },
        async getTimeline(branch?: string) {
            if (!this.project) return;

            const finalBranch =
                branch === "(HEAD" ? this.project.defaultBranch : branch;

            // Fetch git logs
            this.timeline = JSON.parse(
                await invoke("log", {
                    hash: finalBranch,
                    path: this.project.path,
                })
            );

            // Fetch main branchs' timeline
            this.mainTimeline = JSON.parse(
                await invoke("log", {
                    hash: this.project.defaultBranch || "main",
                    path: this.project.path,
                })
            );
        },
        openCollabModal() {
            this.collabModalOpen = true;
        },
        closeCollabModal() {
            this.collabModalOpen = false;
        },
    },
});
