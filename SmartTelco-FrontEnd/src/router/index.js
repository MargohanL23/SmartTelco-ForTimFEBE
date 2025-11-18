import { createRouter, createWebHistory } from 'vue-router';

// Views
import LoginView from '../views/LoginView.vue';
import RegistrationView from '../views/RegistrationView.vue';
import DashboardView from '../views/DashboardView.vue';
import HomeView from '../views/HomeView.vue';
import HasilView from '../views/HasilView.vue';

import AdminView from '../views/AdminView.vue';
import AdminUserDetailView from '../views/AdminUserDetailView.vue';

import NotFound from '../views/NotFound.vue';

const routes = [
  { path: '/', redirect: '/login' },

  // Auth
  { path: '/login', component: LoginView },
  { path: '/register', component: RegistrationView },

  // User area
  { path: '/dashboard', component: DashboardView },
  { path: '/home', component: HomeView },
  { path: '/hasil', component: HasilView },

  // Admin area
  { path: '/admin', component: AdminView },
  { path: '/admin/user/:id', component: AdminUserDetailView, props: true },

  // Not found
  { path: '/404', component: NotFound },
  { path: '/:pathMatch(.*)*', name: 'notfound', component: NotFound }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

/* ───────────────────────────────────────────────
   ROUTER GUARD DASAR
   - Melindungi halaman private
   - Membedakan user/admin
──────────────────────────────────────────────── */
router.beforeEach((to, from, next) => {
  const user = JSON.parse(localStorage.getItem('user'));

  const protectedUserRoutes = ['/dashboard', '/home', '/hasil'];
  const protectedAdminRoutes = ['/admin'];

  // Jika belum login
  if (!user && (protectedUserRoutes.includes(to.path) || to.path.startsWith('/admin'))) {
    return next('/login');
  }

  // Jika user biasa mencoba akses admin
  if (user && user.role === 'user' && to.path.startsWith('/admin')) {
    return next('/dashboard');
  }

  next();
});

export default router;
