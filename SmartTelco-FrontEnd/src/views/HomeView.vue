<template>
  <div class="space-y-6 pb-10">

    <h2 class="text-xl font-bold text-gray-800">Input Data Manual:</h2>

    <div class="bg-white shadow-lg p-6 rounded-xl grid gap-6 border border-gray-100">

      <!-- Jenis Paket -->
      <div>
        <label class="block mb-2 font-medium text-gray-700">Jenis Paket:</label>
        <select v-model="form.jenisPaket" class="border border-gray-300 p-2.5 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition">
          <option value="Prepaid">Prepaid (Prabayar)</option>
          <option value="Postpaid">Postpaid (Pascabayar)</option>
        </select>
      </div>

      <!-- Merek Perangkat (Carousel) -->
      <div>
        <label class="block mb-2 font-medium text-gray-700">Merek Perangkat:</label>
        
        <div class="flex overflow-x-auto pb-2 gap-3 scrollbar-hide snap-x">
          <div 
            v-for="brand in brandList" 
            :key="brand"
            @click="form.merek = brand"
            :class="[
              'flex-shrink-0 px-5 py-2.5 rounded-lg border cursor-pointer transition-all duration-200 snap-start text-sm font-medium',
              form.merek === brand 
                ? 'border-blue-600 bg-blue-600 text-white shadow-md transform scale-105' 
                : 'border-gray-300 bg-white text-gray-600 hover:bg-gray-50 hover:border-blue-400'
            ]"
          >
            {{ brand }}
          </div>
        </div>
        <p class="text-xs text-gray-500 mt-1">Terpilih: <span class="font-bold text-blue-600">{{ form.merek }}</span></p>
      </div>

      <!-- Penggunaan Data -->
      <div>
        <div class="flex justify-between mb-1">
          <label class="font-medium text-gray-700">Penggunaan Data</label>
          <span class="text-blue-600 font-bold">{{ form.dataUsage }} GB</span>
        </div>
        <input 
          type="range" min="1" max="50" 
          v-model="form.dataUsage" 
          class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
        />
      </div>

      <!-- Pengeluaran -->
      <div>
        <div class="flex justify-between mb-1">
          <label class="font-medium text-gray-700">Pengeluaran Bulanan</label>
          <span class="text-blue-600 font-bold">Rp {{ form.pengeluaran }}.000</span>
        </div>
        <input 
          type="range" min="10" max="1000" 
          v-model="form.pengeluaran" 
          class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
        />
      </div>

      <!-- Video Usage -->
      <div>
        <div class="flex justify-between mb-1">
          <label class="font-medium text-gray-700">% Streaming Video</label>
          <span class="text-blue-600 font-bold">{{ form.videoUsage }}%</span>
        </div>
        <input 
          type="range" min="0" max="100" 
          v-model="form.videoUsage" 
          class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
        />
      </div>

      <!-- Durasi Panggilan -->
      <div>
        <div class="flex justify-between mb-1">
          <label class="font-medium text-gray-700">Durasi Panggilan</label>
          <span class="text-blue-600 font-bold">{{ form.durasiPanggilan }} Menit</span>
        </div>
        <input 
          type="range" min="0" max="300" 
          v-model="form.durasiPanggilan" 
          class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
        />
      </div>

      <!-- SMS -->
      <div>
        <div class="flex justify-between mb-1">
          <label class="font-medium text-gray-700">Frekuensi SMS (Bulan)</label>
          <span class="text-blue-600 font-bold">{{ form.sms }}</span>
        </div>
        <input 
          type="range" min="0" max="200" 
          v-model="form.sms" 
          class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
        />
      </div>

      <!-- Top Up -->
      <div>
        <div class="flex justify-between mb-1">
          <label class="font-medium text-gray-700">Frekuensi Top-up (Bulan)</label>
          <span class="text-blue-600 font-bold">{{ form.topup }} kali</span>
        </div>
        <input 
          type="range" min="0" max="20" 
          v-model="form.topup" 
          class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
        />
      </div>

      <!-- Travel Score -->
      <div>
        <div class="flex justify-between mb-1">
          <label class="font-medium text-gray-700">Travel Score (Mobilitas)</label>
          <span class="text-blue-600 font-bold">{{ form.travel }}</span>
        </div>
        <input 
          type="range" min="0" max="1" step="0.1" 
          v-model="form.travel" 
          class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
        />
        <p class="text-xs text-gray-400 mt-1">0.0 (Jarang Travel) - 1.0 (Sering Travel)</p>
      </div>

      <!-- Keluhan -->
      <div>
        <label class="block mb-2 font-medium text-gray-700">Jumlah Keluhan (Customer Service):</label>
        <input 
          type="number" 
          min="0"
          class="border border-gray-300 p-2.5 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition" 
          v-model="form.keluhan" 
        />
      </div>

      <!-- Tombol Submit -->
      <button 
        @click="getRekomendasi"
        :disabled="isLoading"
        class="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-3 rounded-lg shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 mt-4 disabled:opacity-50 disabled:cursor-not-allowed">
        <span v-if="isLoading">Memproses...</span>
        <span v-else>DAPATKAN REKOMENDASI TERBAIK</span>
      </button>
      
    </div>

  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router"; // Import Router
import { apiPost } from "../utils/api"; // Import fungsi API

const router = useRouter();
const isLoading = ref(false);

// Daftar Merek untuk Carousel
const brandList = [
  "Apple", "Samsung", "Xiaomi", "Oppo", 
  "Vivo", "Realme", "Huawei", "Infinix", "Asus"
];

// Form model
const form = reactive({
  jenisPaket: "Prepaid",
  merek: "Apple",
  dataUsage: 5,
  pengeluaran: 100,
  videoUsage: 50,
  durasiPanggilan: 10,
  sms: 10,
  topup: 5,
  travel: 0.5,
  keluhan: 0
});

// FUNGSI UTAMA: Kirim data ke Backend
async function getRekomendasi() {
  isLoading.value = true;

  try {
    // 1. Siapkan Payload (Konversi angka agar backend tidak bingung)
    const payload = {
      // -- Data Kategorikal --
      plan_type: form.jenisPaket,        // Python minta 'plan_type'
      device_brand: form.merek,          // Python minta 'device_brand'
      
      // -- Data Numerik (sesuai FEATURE_COLS) --
      avg_data_usage_gb: Number(form.dataUsage),     // Python minta 'avg_data_usage_gb'
      pct_video_usage: Number(form.videoUsage),      // Python minta 'pct_video_usage'
      avg_call_duration: Number(form.durasiPanggilan), // Python minta 'avg_call_duration'
      sms_freq: Number(form.sms),                    // Python minta 'sms_freq'
      monthly_spend: Number(form.pengeluaran),       // Python minta 'monthly_spend'
      topup_freq: Number(form.topup),                // Python minta 'topup_freq'
      travel_score: Number(form.travel),             // Python minta 'travel_score'
      complaint_count: Number(form.keluhan)          // Python minta 'complaint_count'
    };

    console.log("Mengirim data ke backend...", payload);

    // 2. Panggil API Backend
    const response = await apiPost("/api/recommend", payload);

    if (response.error) {
      alert("Gagal: " + response.error);
      return;
    }

    // 3. Simpan Hasil ke LocalStorage (untuk dibaca di halaman HasilView)
    localStorage.setItem("predictionResult", JSON.stringify(response));

    // [TAMBAHAN PENTING] Simpan juga INPUT DATA-nya agar bisa dibaca HasilView
    localStorage.setItem("inputData", JSON.stringify(payload));

    // 4. Pindah ke halaman Hasil
    router.push("/hasil");

  } catch (error) {
    console.error("Error koneksi:", error);
    alert("Gagal terhubung ke server. Pastikan backend app.py berjalan.");
  } finally {
    isLoading.value = false;
  }
}
</script>

<style scoped>
.scrollbar-hide::-webkit-scrollbar {
    display: none;
}
.scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
}
</style>