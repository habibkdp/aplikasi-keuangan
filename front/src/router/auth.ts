import Login from "@/views/Auth/Signin.vue";
import Register from "@/views/Auth/Signup.vue";

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