<template>
  <header class="fixed top-0 left-0 w-full bg-white shadow-md z-50">
    <nav class="max-w-6xl mx-auto flex items-center justify-between py-4 px-4">
      <h1 class="text-xl font-bold">SmartTelco</h1>

      <div class="flex gap-4">
        <RouterLink to="/" class="hover:text-blue-600">Home</RouterLink>
        <RouterLink to="/login" class="hover:text-blue-600">Login</RouterLink>
        <RouterLink to="/register" class="hover:text-blue-600">Register</RouterLink>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { RouterLink } from "vue-router";
</script>
