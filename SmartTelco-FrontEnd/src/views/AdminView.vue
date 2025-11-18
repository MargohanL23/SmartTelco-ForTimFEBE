<template>
  <div class="space-y-6 pb-10">
    <h2 class="text-2xl font-bold text-gray-800">Admin Dashboard</h2>

    <div class="grid grid-cols-2 gap-4">
      <div class="bg-white p-6 rounded-xl shadow border border-blue-100">
        <h3 class="text-gray-500 font-semibold">Status Backend</h3>
        <p class="text-lg font-bold text-green-600">Terhubung</p>
      </div>
      <div class="bg-white p-6 rounded-xl shadow border border-blue-100">
        <h3 class="text-gray-500 font-semibold">Mode Data</h3>
        <p class="text-lg font-bold text-blue-600">Read-Only (CSV)</p>
      </div>
    </div>

    <div class="bg-white p-6 rounded-xl shadow border border-gray-100">
      <h3 class="font-bold text-lg mb-4">Daftar Pengguna (Simulasi)</h3>
      
      <table class="w-full text-left border-collapse">
        <thead>
          <tr class="bg-gray-100 text-sm uppercase text-gray-600">
            <th class="p-3 rounded-l">ID Customer</th>
            <th class="p-3">Email</th>
            <th class="p-3 rounded-r text-center">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id" class="border-b hover:bg-gray-50">
            <td class="p-3 font-medium">{{ user.id }}</td>
            <td class="p-3 text-gray-600">{{ user.email }}</td>
            <td class="p-3 text-center">
              <button 
                @click="lihatDetail(user.id, user.email)"
                class="bg-blue-600 hover:bg-blue-700 text-white py-1 px-4 rounded text-sm transition shadow-sm">
                Lihat Detail
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <p class="text-xs text-gray-400 mt-3 italic">
        *List ini adalah data simulasi frontend. Tombol "Lihat Detail" akan mengambil data asli dari CSV Backend.
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

// --- DATA DUMMY (PENTING) ---
// Pastikan ID di sini benar-benar ada di file 'data_telco.csv' backend Anda.
const users = ref([
  { id: "C10001", email: "customer1@telco.com" }, 
  { id: "C10002", email: "customer2@telco.com" },
  { id: "C10003", email: "customer3@telco.com" },
  { id: "C10004", email: "customer4@telco.com" },
  { id: "C10005", email: "customer5@telco.com" }
]);

function lihatDetail(id, email) {
  // Mengarahkan ke halaman detail dengan membawa parameter ID dan Query Email
  router.push({ 
    path: `/admin/user/${id}`, 
    query: { email: email } 
  });
}
</script>