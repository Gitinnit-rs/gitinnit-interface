import { createApp } from 'vue'
import App from './App.vue'

import { createPinia } from 'pinia'

import router from './router'

import 'virtual:windi.css'
import './assets/style.css'
import 'vue-material-design-icons/styles.css';

import Toast, { PluginOptions, POSITION } from 'vue-toastification'
import "./assets/toastification.css";

const toastOptions: PluginOptions = {
    position: POSITION.BOTTOM_RIGHT,
    transition: "Vue-Toastification__fade"
}

createApp(App).use(router).use(createPinia()).use(Toast, toastOptions).mount('#app')
