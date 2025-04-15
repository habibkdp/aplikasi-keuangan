import { createRouter, createWebHistory } from 'vue-router'
import authRoutes from './auth'
import dashboardRoutes from './dashboard'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    ...authRoutes,
    ...dashboardRoutes
  ],
})


router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
      const token = localStorage.getItem('token');
      if (token) {
          // User is authenticated, proceed to the route
          next();
      } else {
          // User is not authenticated, redirect to login
          next('/login');
      }
  } else {
      // Non-protected route, allow access
      next();
  }
});

export default router
