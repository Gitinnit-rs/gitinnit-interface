import { defineStore } from 'pinia'

export const useStore = defineStore("gitinnit-store", {
    state: () => ({
        compact: true
    }),
    actions: {
        toggleCompact() {
            this.compact = !this.compact
        }
    }
})

