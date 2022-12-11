import { invoke } from "@tauri-apps/api";
import { defineStore } from "pinia";
import { Commit, Project } from "../types";

export const useStore = defineStore("gitinnit-store", {
  state: () => ({
    compact: true,
    projects: [] as Project[],
    project: undefined as Project | undefined,
    timeline: [] as Commit[],
    scrollLock: false,
  }),
  actions: {
    toggleCompact() {
      this.compact = !this.compact;
    },
    async getTimeline() {
      if (!this.project) return;

      // Fetch git logs
      this.timeline = JSON.parse(
        await invoke("log", {
          path: this.project.path,
        })
      );
    },
  },
});
