<template>
  <div class="space-y-6 pb-10">
    <h2 class="text-2xl font-bold">Detail Pengguna</h2>

    <div class="bg-white p-4 rounded shadow">
      <p><strong>ID:</strong> {{ user.id }}</p>
      <p><strong>Nama:</strong> {{ user.name }}</p>
      <p><strong>Email:</strong> {{ user.email }}</p>
      <p><strong>No HP:</strong> {{ user.phone ?? '-' }}</p>
    </div>

    <button @click="back" class="bg-gray-600 text-white p-3 rounded">
      Kembali
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const user = ref({});

onMounted(() => {
  // Dummy fetch dulu
  const all = [
    { id: 1, name: "User Satu", email: "user1@mail.com" },
    { id: 2, name: "User Dua", email: "user2@mail.com" }
  ];

  user.value = all.find(u => u.id == route.params.id) || {};
});

function back() {
  router.push("/admin");
}
</script>
