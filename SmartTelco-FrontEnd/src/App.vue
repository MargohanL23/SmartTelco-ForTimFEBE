<template>
  <div class="min-h-screen bg-gradient-to-br from-red-900 to-purple-900 py-10 px-4">
    <Header />
    
    <main class="pt-20 px-4 max-w-10xl mx-auto">
      <RouterView />
    </main>

    
  </div>
  <Footer />
</template>

<script setup>
import { RouterView } from 'vue-router'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
</script>

