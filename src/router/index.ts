import { createRouter, createWebHistory } from 'vue-router'

import defaultLayout from '../layouts/default.vue'

const routes = [
    {
        path: '/',
        component: defaultLayout,
        children: [
            {
                path: '',
                component: () => import('../pages/Home.vue')
            }
        ]
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
