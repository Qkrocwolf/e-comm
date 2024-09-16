import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../Pages/HomePage.vue';
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
    },
    {
      path: '/profile',
      component: () => import('../Pages/ProfilePage.vue'),
    },
  ],
});

export default router;
