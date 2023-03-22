import { defineStore } from 'pinia'

interface IUserStore {
    user: any
}

export const useUserStore = defineStore('user', {
    state: (): IUserStore => ({
        user: null
    }),
    actions: {
        setUser(user: any) {
            this.user = user
        }
    }
})
