import { defineStore } from "pinia";
import { Project } from "../types";

export const useStore = defineStore("gitinnit-store", {
  state: () => ({
    compact: true,
    projects: [] as Project[],
    project: undefined as Project | undefined,
    scrollLock: false,
  }),
  actions: {
    toggleCompact() {
      this.compact = !this.compact;
    },
  },
});
