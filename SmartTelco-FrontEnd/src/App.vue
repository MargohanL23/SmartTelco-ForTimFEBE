<template>
  <div class="min-h-screen bg-gray-50">
    <Header />
    
    <main class="pt-20 px-4 max-w-6xl mx-auto">
      <RouterView />
    </main>

    <Footer />
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
</script>
