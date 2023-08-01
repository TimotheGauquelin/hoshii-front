import { createRouter, createWebHistory } from "vue-router";
import state from '../store/state.js';

import HomeView from '../views/HomeView.vue';
import ProfilView from '../views/ProfilView.vue';
import LogView from '../views/LogView.vue';
import FriendsView from '../views/FriendsView.vue';
import AddFriendsView from '../views/AddFriendsView.vue';

const routes = [
    { path: '/home', component: HomeView },
    { path: '/guest', name: "guest", component: LogView },
    { path: "/user/:id", name: "user", component: ProfilView},
    { path: "/friends", name: "friends", component: FriendsView},
    { path: "/friends/add-friends", name: "add-friends", component: AddFriendsView},
]

export const router = createRouter({
    history: createWebHistory(),
    linkActiveClass: 'active',
    routes: routes
});

router.beforeEach(async (to) => {
    const publicPages = ['/guest'];
    const authRequired = !publicPages.includes(to.path);
    const profil = state.profil

    if (authRequired && !profil.accessToken && !profil.isActive) {
        return '/guest';
    }
});

export default router