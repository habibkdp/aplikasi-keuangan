import DashboardIndex from "@/views/Dashboard/Index.vue";

 export default [
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: DashboardIndex,
        meta: {
            requiresAuth: true
        }
    }
]