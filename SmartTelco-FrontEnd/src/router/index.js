import { createRouter, createWebHistory } from 'vue-router';

import LoginView from '../views/LoginView.vue';
import RegistrationView from '../views/RegistrationView.vue';
import HomeView from '../views/HomeView.vue';
import AdminView from '../views/AdminView.vue';
import NotFound from '../views/NotFound.vue';

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: LoginView },
  { path: '/register', component: RegistrationView },
  { path: '/home', component: HomeView },
  { path: '/admin', component: AdminView },
  { path: '/:pathMatch(.*)*', name: 'notfound', component: NotFound }
];

export default createRouter({
  history: createWebHistory(),
  routes
});
