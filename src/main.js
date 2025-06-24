import './assets/main.css'
import '@mdi/font/css/materialdesignicons.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

const pinia = createPinia()

document.body.classList.add(localStorage.getItem('theme'));

createApp(App).use(pinia).mount('#app')
