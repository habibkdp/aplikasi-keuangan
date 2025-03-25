import HelloWorld from "@/components/HelloWorld.vue";
import Login from "@/components/Login.vue";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: HelloWorld
    },
]

const router = createRouter({
    history: createWebHistory(), 
    routes
})

export default router