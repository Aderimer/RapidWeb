import { createApp } from 'vue'
import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura'
import App from './App.vue'
import { createMemoryHistory, createRouter } from 'vue-router'

import HomeView from './HomeView.vue';
import AboutView from './AboutView.vue';
import MerchView from './MerchView.vue';
import UserView from './UserView.vue';

const routes = [
    { path: '/', component: HomeView },
    { path: '/about', component: AboutView },
    { path: '/merch', component: MerchView },
    { path: '/login', component: UserView },
]

export const router = createRouter({
    history: createMemoryHistory(),
    routes,
})


const app = createApp()
app.use(PrimeVue, {
    theme: {
        preset: Aura
    },
    ripple: true,
});


createApp(App).use(router).mount('#app')