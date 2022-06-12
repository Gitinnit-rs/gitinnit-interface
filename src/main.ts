import { createApp } from 'vue'
import App from './App.vue'

import { createPinia } from 'pinia'

import router from './router'

import 'virtual:windi.css'
import './assets/style.css'
import 'vue-material-design-icons/styles.css';

createApp(App).use(router).use(createPinia()).mount('#app')
