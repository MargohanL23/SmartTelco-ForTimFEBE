<template>
    <header class="fixed top-0 left-0 w-full bg-[#FFECC8] shadow-md z-50">
      <nav class="max-w-8xl mx-auto flex items-center justify-between py-4 px-4">
  
        <!-- Logo -->
        <h1 class="text-2xl font-bold text-[#842A3B] tracking-wide">
          SmartTelco
        </h1>
  
        <!-- Nav Links -->
        <div class="flex items-center gap-6 text-[#842A3B] font-medium">
  
          <!-- Selalu tampil -->
          <RouterLink
            to="/home"
            class="hover:text-white hover:bg-[#842A3B] px-3 py-1 rounded transition"
          >
            Home
          </RouterLink>

          <RouterLink
            to="/simulation"
            class="hover:text-white hover:bg-[#842A3B] px-3 py-1 rounded transition"
          >
            Simulation
          </RouterLink>
  
          <!-- Jika BELUM login -->
          <template v-if="!isLoggedIn">
            <RouterLink
              to="/login"
              class="hover:text-white hover:bg-[#842A3B] px-3 py-1 rounded transition"
            >
              Login
            </RouterLink>
  
            <RouterLink
              to="/register"
              class="hover:text-white hover:bg-[#842A3B] px-3 py-1 rounded transition"
            >
              Register
            </RouterLink>
          </template>
  
          <!-- Jika SUDAH login -->
          <template v-else>
            <button
              @click="logoutUser"
              class="hover:text-white hover:bg-[#842A3B] px-3 py-1 rounded transition"
            >
              Logout
            </button>
          </template>
  
        </div>
      </nav>
    </header>
  </template>
  
  <script setup>
  import { RouterLink, useRouter } from "vue-router";
  import { ref, onMounted } from "vue";
  import { getUser, clearUser } from "../utils/storage";
  
  const router = useRouter();
  
  // reactive login state
  const isLoggedIn = ref(false);
  
  onMounted(() => {
    isLoggedIn.value = !!getUser();
  });
  
  // Logout Function
  function logoutUser() {
    clearUser();
    isLoggedIn.value = false;
    router.push("/login");
  }
  </script>
  