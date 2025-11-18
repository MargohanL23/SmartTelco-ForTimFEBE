import { createRouter, createWebHistory } from 'vue-router';

// --- Import Views ---
import LoginView from '../views/LoginView.vue';
import RegistrationView from '../views/RegistrationView.vue';
import HomeView from '../views/HomeView.vue';
import HasilView from '../views/HasilView.vue'; // Pastikan file ini ada (sebelumnya ResultView.vue)

// Admin Views (Pastikan file ini ada jika belum dibuat, atau komentari dulu)
import AdminView from '../views/AdminView.vue';
import NotFound from '../views/NotFound.vue';

const routes = [
  { path: '/', redirect: '/login' },

  // Auth
  { path: '/login', component: LoginView },
  { path: '/register', component: RegistrationView },

  // User Area
  { path: '/home', component: HomeView },
  { path: '/hasil', component: HasilView }, // Halaman hasil rekomendasi

  // Admin Area
  { path: '/admin', component: AdminView },

  // Not Found (Tangkap semua route yang tidak dikenal)
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
  // Ambil user dari localStorage
  const userString = localStorage.getItem('user');
  const user = userString ? JSON.parse(userString) : null;

  // Daftar halaman yang perlu login
  const protectedUserRoutes = ['/home', '/hasil'];
  
  // Cek apakah user mau ke halaman admin
  const isAdminRoute = to.path.startsWith('/admin');
  
  // Cek apakah user mau ke halaman user biasa
  const isUserRoute = protectedUserRoutes.includes(to.path);

  // 1. Jika belum login, tapi mencoba masuk ke halaman terlindungi
  if (!user && (isUserRoute || isAdminRoute)) {
    return next('/login');
  }

  // 2. Jika sudah login sebagai 'User' biasa, tapi mencoba masuk Admin
  if (user && user.role !== 'Admin' && isAdminRoute) {
    // Tendang balik ke home
    return next('/home');
  }

  // 3. (Opsional) Jika sudah login, jangan biarkan akses halaman login/register lagi
  if (user && (to.path === '/login' || to.path === '/register')) {
    if (user.role === 'Admin') return next('/admin');
    return next('/home');
  }

  // Lanjut ke halaman tujuan
  next();
});

export default router;