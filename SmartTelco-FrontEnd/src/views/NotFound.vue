<template>
  <div class="text-center py-20">
    <h1 class="text-4xl font-bold">404</h1>
    <p class="mt-2">Halaman tidak ditemukan</p>

    <button
      @click="goHome"
      class="mt-6 bg-blue-600 text-white px-4 py-2 rounded"
    >
      Kembali ke Dashboard
    </button>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
const router = useRouter();

function goHome() {
  router.push("/");
}
</script>
