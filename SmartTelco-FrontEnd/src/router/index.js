import { createRouter, createWebHistory } from 'vue-router';

// --- User Views ---
import LoginView from '../views/LoginView.vue';
import RegistrationView from '../views/RegistrationView.vue';
import HomeView from '../views/HomeView.vue';
import HasilView from '../views/HasilView.vue';
// TAMBAHAN: Import halaman SimulationView
import SimulationView from '../views/SimulationView.vue';
import AboutUsView from '../views/AboutUsView.vue';

// Admin Views
import AdminView from '../views/AdminView.vue';
import AdminUserDetailView from '../views/AdminUserDetailView.vue';
import NotFound from '../views/NotFound.vue';

const routes = [
  { path: '/', redirect: '/login' },

  // Auth
  { path: '/login', component: LoginView },
  { path: '/register', component: RegistrationView },

  // User Area
  { path: '/home', component: HomeView },
  { path: '/hasil', component: HasilView },
  // TAMBAHAN: Route untuk halaman simulasi
  { path: '/simulation', component: SimulationView },

  // Admin Area
  { path: '/admin', component: AdminView },
  { path: '/admin/user/:id', component: AdminUserDetailView },
  { path: '/about', component: AboutUsView },

  // Not Found
  { path: '/:pathMatch(.*)*', name: 'notfound', component: NotFound }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

/* ───────────────────────────────────────────────
   ROUTER GUARD (Proteksi Halaman)
──────────────────────────────────────────────── */
router.beforeEach((to, from, next) => {
  const userString = localStorage.getItem('user');
  const user = userString ? JSON.parse(userString) : null;

  // TAMBAHAN: Masukkan '/simulation' ke dalam protected routes
  const protectedUserRoutes = ['/home', '/hasil', '/simulation'];
  
  const isAdminRoute = to.path.startsWith('/admin');
  const isUserRoute = protectedUserRoutes.includes(to.path);

  // 1. Belum login
  if (!user && (isUserRoute || isAdminRoute)) {
    return next('/login');
  }

  // 2. User biasa mencoba masuk Admin
  if (user && user.role !== 'Admin' && isAdminRoute) {
    return next('/home');
  }

  // 3. Sudah login, cegah akses login/register
  if (user && (to.path === '/login' || to.path === '/register')) {
    if (user.role === 'Admin') return next('/admin');
    return next('/home');
  }

  next();
});

export default router;