<template>
  <header class="fixed top-0 left-0 w-full bg-[#FFECC8] shadow-md z-50">
    <nav class="max-w-8xl mx-auto flex items-center justify-between py-4 px-4">

      <!-- Logo -->
      <RouterLink to="/home" class="flex items-center gap-2">
        <img 
          src="/images/logo_smarttelcoo.png"
          alt="SmartTelco Logo"
          class="h-10 w-auto object-contain"
        />
      </RouterLink>

      <!-- Desktop Nav -->
      <div class="hidden md:flex items-center gap-6 text-[#842A3B] font-medium">
        <RouterLink to="/home" class="hover:bg-[#842A3B] hover:text-white px-3 py-1 rounded transition">Home</RouterLink>
        <RouterLink to="/simulation" class="hover:bg-[#842A3B] hover:text-white px-3 py-1 rounded transition">Simulation</RouterLink>
        <RouterLink to="/about" class="hover:bg-[#842A3B] hover:text-white px-3 py-1 rounded transition">About Us</RouterLink>

        <template v-if="!isLoggedIn">
          <RouterLink to="/login" class="hover:bg-[#842A3B] hover:text-white px-3 py-1 rounded transition">Login</RouterLink>
          <RouterLink to="/register" class="hover:bg-[#842A3B] hover:text-white px-3 py-1 rounded transition">Register</RouterLink>
        </template>

        <template v-else>
          <button @click="logoutUser" class="hover:bg-[#842A3B] hover:text-white px-3 py-1 rounded transition">Logout</button>
        </template>
      </div>

      <!-- Smooth Spring Burger Button -->
      <button 
        @click="toggleMenu"
        class="md:hidden relative w-10 h-10 flex items-center justify-center focus:outline-none"
      >
        <!-- Line 1 -->
        <span
          :class="[
            'burger-line',
            mobileOpen ? 'top-line-open' : 'top-line-close'
          ]"
        ></span>

        <!-- Line 2 -->
        <span
          :class="[
            'burger-line',
            mobileOpen ? 'mid-line-open' : 'mid-line-close'
          ]"
        ></span>

        <!-- Line 3 -->
        <span
          :class="[
            'burger-line',
            mobileOpen ? 'bot-line-open' : 'bot-line-close'
          ]"
        ></span>
      </button>

    </nav>

    <!-- Mobile Menu -->
    <div
      v-if="mobileOpen"
      class="md:hidden bg-[#FFECC8] shadow-inner animate-slideDown"
    >
      <div class="flex flex-col py-4 px-6 text-[#842A3B] font-medium space-y-4">

        <RouterLink to="/home" @click="closeMenu" class="hover:bg-[#842A3B] hover:text-white px-3 py-2 rounded transition">Home</RouterLink>
        <RouterLink to="/simulation" @click="closeMenu" class="hover:bg-[#842A3B] hover:text-white px-3 py-2 rounded transition">Simulation</RouterLink>
        <RouterLink to="/about" @click="closeMenu" class="hover:bg-[#842A3B] hover:text-white px-3 py-2 rounded transition">About Us</RouterLink>

        <template v-if="!isLoggedIn">
          <RouterLink to="/login" @click="closeMenu" class="hover:bg-[#842A3B] hover:text-white px-3 py-2 rounded transition">Login</RouterLink>
          <RouterLink to="/register" @click="closeMenu" class="hover:bg-[#842A3B] hover:text-white px-3 py-2 rounded transition">Register</RouterLink>
        </template>

        <template v-else>
          <button @click="logoutUser" class="hover:bg-[#842A3B] hover:text-white px-3 py-2 rounded transition">Logout</button>
        </template>
      </div>
    </div>
  </header>
</template>

<script setup>
import { RouterLink, useRouter } from "vue-router";
import { ref, onMounted } from "vue";
import { getUser, clearUser } from "../utils/storage";

const router = useRouter();
const isLoggedIn = ref(false);
const mobileOpen = ref(false);

onMounted(() => {
  isLoggedIn.value = !!getUser();
});

function toggleMenu() {
  mobileOpen.value = !mobileOpen.value;
}

function closeMenu() {
  mobileOpen.value = false;
}

function logoutUser() {
  clearUser();
  isLoggedIn.value = false;
  router.push("/login");
  closeMenu();
}
</script>

<style scoped>
/* SPRING PHYSICS ANIMATION */
/* Warna default line */
.burger-line {
  @apply absolute h-[3px] w-7 bg-[#842A3B] rounded-full;
  transition: transform 0.45s cubic-bezier(0.22, 1.61, 0.36, 1),
              opacity 0.3s ease,
              top 0.3s cubic-bezier(0.22, 1.61, 0.36, 1);
}

/* CLOSED STATE POSITIONS */
.top-line-close { top: 8px; }
.mid-line-close { top: 17px; }
.bot-line-close { top: 26px; }

/* OPEN STATE — WITH SPRING EFFECT */
.top-line-open {
  top: 17px;
  transform: rotate(45deg) scale(1.05);
}
.mid-line-open {
  opacity: 0;
  transform: scale(0.5);
}
.bot-line-open {
  top: 17px;
  transform: rotate(-45deg) scale(1.05);
}

/* SlideDown Animation for mobile menu */
@keyframes slideDown {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-slideDown {
  animation: slideDown 0.25s ease-out;
}
</style>
