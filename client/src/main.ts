import { createApp } from 'vue';
import App from './App.vue';
import { createPinia } from 'pinia';
import router from './router';
import { useAuthStore } from './stores/auth.store';
const app = createApp(App);

const pinia = createPinia();

app.use(router);
app.use(pinia);

const authStore = useAuthStore();
if (localStorage.getItem('token')) {
  router.beforeEach(async (to, from, next) => {
    await authStore.checkAuth();
    next();
  });
}
app.mount('#app');
