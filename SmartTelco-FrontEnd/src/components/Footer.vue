<template>
  <footer class="mt-0 py-10 bg-[#FFECC8] text-[#842A3B]">

    <!-- Top Navigation Links -->
    <div class="flex justify-center space-x-8 text-sm font-semibold mb-6">
      <RouterLink
        to="/home"
        class="hover:opacity-80"
      >
        Home
      </RouterLink>

      <RouterLink
        to="/simulation"
        class="hover:opacity-80"
      >
        Simulation
      </RouterLink>

      <RouterLink
        to="/about"
        class="hover:opacity-80"
      >
        About Us
      </RouterLink>
    </div>

    <!-- Social Icons Row -->
    <div class="flex justify-center space-x-6 mb-6 text-xl">

      <a href="#" class="hover:opacity-70 transition">
        <i class="bx bxl-facebook-circle"></i>
      </a>

      <a href="#" class="hover:opacity-70 transition">
        <i class="bx bxl-instagram"></i>
      </a>

      <a href="#" class="hover:opacity-70 transition">
        <i class="bx bxl-twitter"></i>
      </a>

      <a href="#" class="hover:opacity-70 transition">
        <i class="bx bxl-github"></i>
      </a>

      <a href="#" class="hover:opacity-70 transition">
        <i class="bx bxl-youtube"></i>
      </a>

    </div>

    <!-- Copyright -->
    <p class="text-center text-sm font-bold">
      SmartTelco © {{ new Date().getFullYear() }} — All Rights Reserved
    </p>

  </footer>
</template>

<script setup>
</script>
