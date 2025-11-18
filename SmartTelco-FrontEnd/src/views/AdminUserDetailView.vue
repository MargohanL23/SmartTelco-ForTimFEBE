<template>
  <div class="space-y-6 pb-10">
    
    <div class="flex items-center justify-between">
      <h2 class="text-2xl font-bold text-gray-800">Detail Pengguna</h2>
      <button @click="$router.back()" class="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition">
        &larr; Kembali
      </button>
    </div>

    <div v-if="isLoading" class="text-center py-12">
      <div class="inline-block w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-3"></div>
      <p class="text-gray-500">Mengambil data dari Backend...</p>
    </div>

    <div v-else-if="profileData" class="grid grid-cols-1 md:grid-cols-3 gap-6">
      
      <div class="bg-white p-6 rounded-xl shadow h-fit border border-blue-100">
        <h3 class="font-bold text-lg mb-4 text-blue-800 border-b pb-2">Info Akun</h3>
        <div class="space-y-3">
          <div>
            <label class="text-xs text-gray-500 uppercase block">Customer ID</label>
            <span class="font-bold text-xl text-gray-800">{{ customerId }}</span>
          </div>
          <div>
            <label class="text-xs text-gray-500 uppercase block">Email</label>
            <span class="font-medium text-gray-700">{{ emailDisplay }}</span>
          </div>
          <div class="pt-2">
             <span class="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">Active</span>
          </div>
        </div>
      </div>

      <div class="bg-white p-6 rounded-xl shadow md:col-span-2 border border-blue-100">
        <h3 class="font-bold text-lg mb-4 text-blue-800 border-b pb-2">Data Profil Telco</h3>
        
        <div class="grid grid-cols-2 gap-y-4 gap-x-6">
          <div class="p-3 bg-gray-50 rounded border border-gray-200">
            <label class="text-xs text-gray-500 block">Jenis Paket</label>
            <p class="font-semibold text-gray-800">{{ profileData.plan_type || '-' }}</p>
          </div>
          <div class="p-3 bg-gray-50 rounded border border-gray-200">
            <label class="text-xs text-gray-500 block">Rata-rata Data</label>
            <p class="font-semibold text-blue-600">{{ profileData.avg_data_usage_gb }} GB</p>
          </div>
          <div class="p-3 bg-gray-50 rounded border border-gray-200">
            <label class="text-xs text-gray-500 block">Pengeluaran Bulanan</label>
            <p class="font-semibold text-green-600">Rp {{ formatRupiah(profileData.monthly_spend) }}</p>
          </div>
          <div class="p-3 bg-gray-50 rounded border border-gray-200">
            <label class="text-xs text-gray-500 block">Merek Perangkat</label>
            <p class="font-semibold text-gray-800">{{ profileData.device_brand }}</p>
          </div>
          <div class="p-3 bg-gray-50 rounded border border-gray-200">
            <label class="text-xs text-gray-500 block">Video Streaming</label>
            <p class="font-semibold text-gray-800">{{ (profileData.pct_video_usage * 100).toFixed(0) }}%</p>
          </div>
          <div class="p-3 bg-gray-50 rounded border border-gray-200">
            <label class="text-xs text-gray-500 block">Travel Score</label>
            <p class="font-semibold text-gray-800">{{ profileData.travel_score }}</p>
          </div>
           <div class="p-3 bg-gray-50 rounded border border-gray-200">
            <label class="text-xs text-gray-500 block">Keluhan</label>
            <p class="font-semibold text-red-600">{{ profileData.complaint_count }}x</p>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="bg-red-50 border border-red-200 p-8 rounded-xl text-center">
      <h3 class="text-lg font-bold text-red-800 mb-1">Data Profil Tidak Ditemukan</h3>
      <p class="text-red-600 text-sm max-w-md mx-auto">
        ID <strong>{{ customerId }}</strong> tidak ditemukan di dalam file <code>data_telco.csv</code> backend.
      </p>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { apiGet } from "../utils/api"; 

const route = useRoute();
const customerId = route.params.id; 
const emailDisplay = route.query.email || "-"; 

const profileData = ref(null);
const isLoading = ref(true);

onMounted(async () => {
  try {
    console.log(`Meminta data profil ke Backend untuk ID: ${customerId}`);
    
    // PANGGIL ENDPOINT YANG SUDAH ADA DI APP.PY
    const response = await apiGet(`/api/profile/${customerId}`);
    
    if (response.status === "success") {
      profileData.value = response.profile;
    } else {
      profileData.value = null;
    }
  } catch (error) {
    console.error("Gagal koneksi ke backend:", error);
    profileData.value = null;
  } finally {
    isLoading.value = false;
  }
});

function formatRupiah(value) {
  if (!value) return "0";
  return (value * 1000).toLocaleString('id-ID');
}
</script>