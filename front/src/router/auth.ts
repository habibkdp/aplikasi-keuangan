import Login from "@/components/Login.vue";
import Register from "@/components/Register.vue";

 export default [
    {
        path: '/login',
        name: 'Login',
        component: Login,
        props: true
    },
    {
        path: '/register',
        name: 'Register',
        component: Register
    },
]