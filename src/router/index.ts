import { createRouter, createWebHistory } from "vue-router";
import state from '../store/state.js';

import HomeView from '../views/HomeView.vue';
import ProfilView from '../views/ProfilView.vue';
import LogView from '../views/LogView.vue';

const routes = [
    { path: '/home', component: HomeView },
    { path: '/guest', name: "guest", component: LogView },
    { path: "/user/:id", name: "profil", component: ProfilView},
]

export const router = createRouter({
    history: createWebHistory(),
    linkActiveClass: 'active',
    routes: routes
});

router.beforeEach(async (to) => {
    const publicPages = ['/guest'];
    const authRequired = !publicPages.includes(to.path);
    const auth = state.profil.accessToken

    if (authRequired && !auth) {
        return '/guest';
    }
});

export default router