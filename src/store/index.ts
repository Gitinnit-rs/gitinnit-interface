import { defineStore } from 'pinia'
import { Project } from '../types'

export const useStore = defineStore("gitinnit-store", {
    state: () => ({
        compact: true,
        projects: [] as Project[]
    }),
    actions: {
        toggleCompact() {
            this.compact = !this.compact
        },
    }
})

