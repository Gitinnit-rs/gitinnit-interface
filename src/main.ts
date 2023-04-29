import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './router'
import 'virtual:windi.css'
import './assets/style.css'
import './assets/nprogress.css'
import 'vue-material-design-icons/styles.css';
import Toast, { PluginOptions, POSITION } from 'vue-toastification'
import "./assets/toastification.css";
import FloatingVue from 'floating-vue'
import 'floating-vue/dist/style.css'

const toastOptions: PluginOptions = {
    position: POSITION.BOTTOM_RIGHT,
    transition: "Vue-Toastification__fade"
}
const pinia = createPinia()
createApp(App).use(router).use(pinia).use(Toast, toastOptions).use(FloatingVue).mount('#app')
