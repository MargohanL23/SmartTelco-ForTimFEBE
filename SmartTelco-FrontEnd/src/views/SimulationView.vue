<template>
  <div class="space-y-6 pb-10">

    <h2 class="text-3xl font-bold text-gray-100 text-center">INPUT DATA REKOMENDASI</h2>

    <div class="bg-white shadow-2xl shadow-white/10 p-8 rounded-2xl grid gap-6 ring-1 ring-black/5 max-w-4xl mx-auto relative z-10">

      <div>
        <label class="block mb-2 font-medium text-gray-700">Jenis Paket:</label>
        <select v-model="form.jenisPaket" class="border border-gray-300 p-2.5 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition">
          <option value="Prepaid">Prepaid (Prabayar)</option>
          <option value="Postpaid">Postpaid (Pascabayar)</option>
        </select>
      </div>

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
                ? 'border-blue-600 bg-gradient-to-br from-red-900 to-gray-700 text-white shadow-md transform scale-105' 
                : 'border-gray-300 bg-white text-gray-600 hover:bg-gray-50 hover:border-blue-400'
            ]"
          >
            {{ brand }}
          </div>
        </div>
        <p class="text-xs text-gray-500 mt-1">Terpilih: <span class="font-bold text-red-600">{{ form.merek }}</span></p>
      </div>

      <div>
        <label class="block mb-1 font-medium text-gray-700">Penggunaan Data (GB)</label>
        <div class="flex items-center gap-4">
          <input 
            type="range" min="1" max="50" 
            v-model.number="form.dataUsage" 
            class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-red-800"
          />
          <input 
            type="number" min="1" max="50"
            v-model.number="form.dataUsage"
            class="w-28 p-2 border rounded-lg text-center font-bold text-blue-600 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>
      </div>

      <div>
        <label class="block mb-1 font-medium text-gray-700">Pengeluaran Bulanan (RP Ribu)</label>
        <div class="flex items-center gap-4">
          <input 
            type="range" min="10" max="5000" 
            v-model.number="form.pengeluaran" 
            class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-red-800"
          />
          <div class="relative">
            
            <input 
              type="number" min="10" max="1000"
              v-model.number="form.pengeluaran"
              class="w-28 p-2 pl-8 border rounded-lg font-bold text-blue-600 focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <span class="absolute right-8 top-2.5 text-gray-500 text-sm">rb</span>
          </div>
        </div>
      </div>

      <div>
        <label class="block mb-1 font-medium text-gray-700">% Streaming Video</label>
        <div class="flex items-center gap-4">
          <input 
            type="range" min="0" max="100" 
            v-model.number="form.videoUsage" 
            class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-red-800"
          />
          <div class="relative">
            <input 
              type="number" min="0" max="100"
              v-model.number="form.videoUsage"
              class="w-28 p-2 border rounded-lg text-center font-bold text-blue-600 focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <span class="absolute right-9 top-3 text-gray-500 text-sm">%</span>
          </div>
        </div>
      </div>

      <div>
        <label class="block mb-1 font-medium text-gray-700">Durasi Panggilan (Menit)</label>
        <div class="flex items-center gap-4">
          <input 
            type="range" min="0" max="300" step="0.5"
            v-model.number="form.durasiPanggilan" 
            class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-red-800"
          />
          <input 
            type="number" min="0" max="300"
            v-model.number="form.durasiPanggilan"
            class="w-28 p-2 border rounded-lg text-center font-bold text-blue-600 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>
      </div>

      <div>
        <label class="block mb-1 font-medium text-gray-700">Frekuensi SMS (Bulan)</label>
        <div class="flex items-center gap-4">
          <input 
            type="range" min="0" max="200" 
            v-model.number="form.sms" 
            class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-red-800"
          />
          <input 
            type="number" min="0" max="200"
            v-model.number="form.sms"
            class="w-28 p-2 border rounded-lg text-center font-bold text-blue-600 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>
      </div>

      <div>
        <label class="block mb-1 font-medium text-gray-700">Frekuensi Top-up (Bulan)</label>
        <div class="flex items-center gap-4">
          <input 
            type="range" min="0" max="20" 
            v-model.number="form.topup" 
            class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-red-800"
          />
          <input 
            type="number" min="0" max="20"
            v-model.number="form.topup"
            class="w-28 p-2 border rounded-lg text-center font-bold text-blue-600 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>
      </div>

      <div>
        <label class="block mb-1 font-medium text-gray-700">Travel Score (0.0 - 1.0)</label>
        <div class="flex items-center gap-4">
          <input 
            type="range" min="0" max="1" step="0.01" 
            v-model.number="form.travel" 
            class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-red-800"
          />
          <input 
            type="number" min="0" max="1" step="0.01"
            v-model.number="form.travel"
            class="w-28 p-2 border rounded-lg text-center font-bold text-blue-600 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>
        <p class="text-xs text-gray-400 mt-1">0.0 (Jarang Travel) - 1.0 (Sering Travel)</p>
      </div>

      <div>
        <label class="block mb-2 font-medium text-gray-700">Jumlah Keluhan (Customer Service):</label>
        <input 
          type="number" 
          min="0"
          class="border border-gray-300 p-2.5 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition" 
          v-model.number="form.keluhan" 
        />
      </div>

      <button 
        @click="getRekomendasi"
        :disabled="isLoading"
        class="w-full bg-gradient-to-r from-blue-700 to-blue-900 hover:from-blue-500 hover:to-blue-800 text-white font-bold py-3 rounded-lg shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 mt-4 disabled:opacity-50 disabled:cursor-not-allowed">
        <span v-if="isLoading">Memproses...</span>
        <span v-else>DAPATKAN REKOMENDASI TERBAIK</span>
      </button>
      
    </div>

  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { apiPost } from "../utils/api"; 

const router = useRouter();
const isLoading = ref(false);

const brandList = [
  "Apple", "Samsung", "Xiaomi", "Oppo", 
  "Vivo", "Realme", "Huawei", "Infinix", "Asus"
];

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

async function getRekomendasi() {
  isLoading.value = true;

  try {
    const payload = {
      plan_type: form.jenisPaket,
      device_brand: form.merek,
      avg_data_usage_gb: Number(form.dataUsage),
      pct_video_usage: Number(form.videoUsage),
      avg_call_duration: Number(form.durasiPanggilan),
      sms_freq: Number(form.sms),
      monthly_spend: Number(form.pengeluaran),
      topup_freq: Number(form.topup),
      travel_score: Number(form.travel),
      complaint_count: Number(form.keluhan)
    };

    console.log("Mengirim data ke backend...", payload);

    const response = await apiPost("/api/recommend", payload);

    if (response.error) {
      alert("Gagal: " + response.error);
      return;
    }

    localStorage.setItem("predictionResult", JSON.stringify(response));
    localStorage.setItem("inputData", JSON.stringify(payload));

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