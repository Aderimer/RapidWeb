import { createApp } from 'vue'
import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura'
import App from './App.vue'
import { createMemoryHistory, createRouter } from 'vue-router'
import { createPinia } from 'pinia';
import { useAuthStore } from './stores/auth';

import HomeView from './HomeView.vue';
import AboutView from './AboutView.vue';
import MerchView from './MerchView.vue';
import LoginView from './LoginView.vue';
import AdminView from './AdminView.vue';
import SignupView from './SignupView.vue';


// PrimeVue preset
const RapidPreset = {
    semantic: {
        colorScheme: {
            light: {
                0: 'cyan-900',
                100: 'cyan-800',
                200: 'cyan-700',
                300: 'slate-950',
                400: 'stone-50',
            },
            dark: {
                0: 'cyan-900',
                100: 'cyan-800',
                200: 'cyan-700',
                300: 'gray-50',
                400: 'neutral-700',
            }
        }
    }
}

const routes = [
    { path: '/', component: HomeView },
    { path: '/about', component: AboutView },
    { path: '/merch', component: MerchView },
    { path: '/login', component: LoginView },
    { path: '/admin', component: AdminView, meta: { requiresAuth: true, requiredRole: 'Admin' } },
    { path: '/signup', component: SignupView },
]

export const router = createRouter({
    history: createMemoryHistory(),
    routes,
})

router.beforeEach((to, from, next) => {
   const { token, role } = localStorage.getItem('token') ? {
        token: localStorage.getItem('token'),
        role: localStorage.getItem('role')
    } : { token: null, role: null };

    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!token) {
            next('/login');
        } else if (to.matched.some(record => record.meta.requiredRole && record.meta.requiredRole !== role)) {
            next('/'); // Redirect to home if user doesn't have the required role
        } else {
            next();
        }
    } else {
        next();
    }
});

const app = createApp(App)
app.use(createPinia())
app.use(PrimeVue, { theme: {
    preset: RapidPreset,
    options: {
        prefix: 'pv',
        darkModeSelector: '.dark-mode',
        cssLayer: false,
    }
}
 
 });
app.use(router);
app.mount('#app')