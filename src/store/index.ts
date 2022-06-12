import { defineStore } from 'pinia'

export const useStore = defineStore("gitinnit-store", {
    state: () => ({
        compact: true
    }),
    actions: {
        toggleCompact() {
            console.log("toggleCompact")
            this.compact = !this.compact
        }
    }
})

