import { createRouter, createWebHistory } from "vue-router";
import { computed } from 'vue';
import store from '../store'
import HomeView from '../views/HomeView.vue';
import ProfilView from '../views/ProfilView.vue';
import LogView from '../views/LogView.vue';

const profilIsLog = computed(() => store.state.profil.isLog)

const profilIsLogRoutes = [
    {
        path: "/",
        name: "home",
        component: HomeView
    },
    {
        path: "/profil/:id",
        name: "profil",
        component: ProfilView
    },
];
const profilIsNotLogRoute = [
    {
        path: "/log",
        name: "log",
        component: LogView
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes: profilIsLog ? profilIsLogRoutes : profilIsNotLogRoute
})

export default router