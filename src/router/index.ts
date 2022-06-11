import { createRouter, createWebHistory } from 'vue-router'

import defaultLayout from '../layouts/default.vue'

const routes = [
    {
        path: '/',
        component: defaultLayout,
        children: [
            {
                path: '',
                name: 'home',
                component: () => import('../pages/Home.vue')
            }
        ]
    },
    {
        path: '/about',
        component: defaultLayout,
        children: [
            {
                path: '',
                name: 'about',
                component: () => import('../pages/About.vue')
            }
        ]
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
