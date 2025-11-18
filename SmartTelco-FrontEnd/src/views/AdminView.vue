<template>
  <div class="space-y-6 pb-10">

    <!-- Judul -->
    <h2 class="text-2xl font-bold">Admin Dashboard</h2>

    <!-- Ringkasan -->
    <div class="grid grid-cols-2 gap-4 bg-white p-4 rounded shadow">
      <div>
        <h3 class="font-semibold">Total Pengguna:</h3>
        <p>{{ totalUsers }}</p>
      </div>

      <div>
        <h3 class="font-semibold">Total Rekomendasi Dibuat:</h3>
        <p>{{ totalRekomendasi }}</p>
      </div>
    </div>

    <!-- List User -->
    <div class="bg-white p-4 rounded shadow">
      <h3 class="font-semibold mb-3">Daftar Pengguna</h3>

      <table class="w-full border">
        <thead>
          <tr class="border-b">
            <th class="p-2">ID</th>
            <th class="p-2">Nama</th>
            <th class="p-2">Email</th>
            <th class="p-2">Aksi</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="user in users" :key="user.id" class="border-b">
            <td class="p-2">{{ user.id }}</td>
            <td class="p-2">{{ user.name }}</td>
            <td class="p-2">{{ user.email }}</td>
            <td class="p-2">
              <button 
                class="px-3 py-1 bg-blue-600 text-white rounded"
                @click="lihatDetail(user.id)">
                Detail
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const users = ref([]);
const totalUsers = ref(0);
const totalRekomendasi = ref(0);

onMounted(() => {
  // sementara simpan dummy data dulu (karena backend nanti)
  users.value = [
    { id: 1, name: "User Satu", email: "user1@mail.com" },
    { id: 2, name: "User Dua", email: "user2@mail.com" }
  ];

  totalUsers.value = users.value.length;
  totalRekomendasi.value = 15; // dummy dulu
});

function lihatDetail(id) {
  console.log("Lihat detail user:", id);
  alert("Menuju halaman detail (belum dibuat)!");
}
</script>
