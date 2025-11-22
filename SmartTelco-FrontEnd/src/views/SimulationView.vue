<template>
  <div class="min-h-screen w-full overflow-x-hidden bg-gray-900/5 pb-10">
    
    <div class="container mx-auto px-4 md:px-0">
      
      <h2 class="text-2xl md:text-3xl font-bold text-gray-100 text-center py-6 break-words">
        INPUT DATA REKOMENDASI
      </h2>

      <div class="w-full max-w-3xl mx-auto bg-white shadow-2xl shadow-black/20 p-5 md:p-8 rounded-2xl flex flex-col gap-6 relative z-10">

        <div class="w-full">
          <label class="block mb-2 font-medium text-gray-700 text-sm md:text-base">Jenis Paket:</label>
          <select v-model="form.jenisPaket" class="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white text-gray-900">
            <option value="Prepaid">Prepaid (Prabayar)</option>
            <option value="Postpaid">Postpaid (Pascabayar)</option>
          </select>
        </div>

        <div class="w-full min-w-0">
          <label class="block mb-2 font-medium text-gray-700 text-sm md:text-base">Merek Perangkat:</label>
          <div class="w-full overflow-hidden"> 
            <div class="flex overflow-x-auto pb-4 gap-3 scrollbar-hide snap-x">
              <div 
                v-for="brand in brandList" 
                :key="brand"
                @click="form.merek = brand"
                :class="[
                  'flex-shrink-0 px-4 py-2 rounded-lg border cursor-pointer transition-all duration-200 text-sm font-medium select-none',
                  form.merek === brand 
                    ? 'border-blue-600 bg-gradient-to-br from-red-900 to-gray-700 text-white shadow-md' 
                    : 'border-gray-300 bg-white text-gray-600 hover:bg-gray-50'
                ]"
              >
                {{ brand }}
              </div>
            </div>
          </div>
          <p class="text-xs text-gray-500 mt-1">Terpilih: <span class="font-bold text-red-600">{{ form.merek }}</span></p>
        </div>

        <div class="w-full">
          <label class="block mb-2 font-medium text-gray-700 text-sm md:text-base">Penggunaan Data (GB)</label>
          <div class="flex flex-col md:flex-row gap-3 md:items-center">
            <input 
              type="range" min="1" max="50" 
              v-model.number="form.dataUsage" 
              class="w-full h-2 bg-gray-200 rounded-lg cursor-pointer accent-red-800"
            />
            <input 
              type="number" min="1" max="50"
              v-model.number="form.dataUsage"
              class="w-full md:w-24 p-2 border border-gray-300 rounded-lg text-center font-bold text-blue-600 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
        </div>

        <div class="w-full">
          <label class="block mb-2 font-medium text-gray-700 text-sm md:text-base">Pengeluaran Bulanan (RP Ribu)</label>
          <div class="flex flex-col md:flex-row gap-3 md:items-center">
            <input 
              type="range" min="10" max="5000" 
              v-model.number="form.pengeluaran" 
              class="w-full h-2 bg-gray-200 rounded-lg cursor-pointer accent-red-800"
            />
            <div class="relative w-full md:w-36 shrink-0">
              <input 
                type="number" min="10" max="1000"
                v-model.number="form.pengeluaran"
                class="w-full p-2 pl-10 border border-gray-300 rounded-lg font-bold text-blue-600 focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <span class="absolute left-3 top-2.5 text-gray-500 text-sm font-bold">Rp</span>
              <span class="absolute right-3 top-2.5 text-gray-500 text-sm">rb</span>
            </div>
          </div>
        </div>

        <div class="w-full">
          <label class="block mb-2 font-medium text-gray-700 text-sm md:text-base">% Streaming Video</label>
          <div class="flex flex-col md:flex-row gap-3 md:items-center">
            <input 
              type="range" min="0" max="100" 
              v-model.number="form.videoUsage" 
              class="w-full h-2 bg-gray-200 rounded-lg cursor-pointer accent-red-800"
            />
            <div class="relative w-full md:w-24 shrink-0">
              <input 
                type="number" min="0" max="100"
                v-model.number="form.videoUsage"
                class="w-full p-2 border border-gray-300 rounded-lg text-center font-bold text-blue-600 focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <span class="absolute right-8 md:right-6 top-2.5 text-gray-500 text-sm">%</span>
            </div>
          </div>
        </div>

        <div class="w-full">
          <label class="block mb-2 font-medium text-gray-700 text-sm md:text-base">Durasi Panggilan (Menit)</label>
          <div class="flex flex-col md:flex-row gap-3 md:items-center">
            <input 
              type="range" min="0" max="300" step="0.5"
              v-model.number="form.durasiPanggilan" 
              class="w-full h-2 bg-gray-200 rounded-lg cursor-pointer accent-red-800"
            />
            <input 
              type="number" min="0" max="300"
              v-model.number="form.durasiPanggilan"
              class="w-full md:w-24 p-2 border border-gray-300 rounded-lg text-center font-bold text-blue-600 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
        </div>

        <div class="w-full">
          <label class="block mb-2 font-medium text-gray-700 text-sm md:text-base">Frekuensi SMS (Bulan)</label>
          <div class="flex flex-col md:flex-row gap-3 md:items-center">
            <input 
              type="range" min="0" max="200" 
              v-model.number="form.sms" 
              class="w-full h-2 bg-gray-200 rounded-lg cursor-pointer accent-red-800"
            />
            <input 
              type="number" min="0" max="200"
              v-model.number="form.sms"
              class="w-full md:w-24 p-2 border border-gray-300 rounded-lg text-center font-bold text-blue-600 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
        </div>

        <div class="w-full">
          <label class="block mb-2 font-medium text-gray-700 text-sm md:text-base">Frekuensi Top-up (Bulan)</label>
          <div class="flex flex-col md:flex-row gap-3 md:items-center">
            <input 
              type="range" min="0" max="20" 
              v-model.number="form.topup" 
              class="w-full h-2 bg-gray-200 rounded-lg cursor-pointer accent-red-800"
            />
            <input 
              type="number" min="0" max="20"
              v-model.number="form.topup"
              class="w-full md:w-24 p-2 border border-gray-300 rounded-lg text-center font-bold text-blue-600 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
        </div>

        <div class="w-full">
          <label class="block mb-2 font-medium text-gray-700 text-sm md:text-base">Travel Score</label>
          <div class="flex flex-col md:flex-row gap-3 md:items-center">
            <input 
              type="range" min="0" max="1" step="0.01" 
              v-model.number="form.travel" 
              class="w-full h-2 bg-gray-200 rounded-lg cursor-pointer accent-red-800"
            />
            <input 
              type="number" min="0" max="1" step="0.01"
              v-model.number="form.travel"
              class="w-full md:w-24 p-2 border border-gray-300 rounded-lg text-center font-bold text-blue-600 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <p class="text-xs text-gray-400 mt-1">0.0 (Jarang) - 1.0 (Sering)</p>
        </div>

        <div class="w-full">
          <label class="block mb-2 font-medium text-gray-700 text-sm md:text-base">Jumlah Keluhan (CS):</label>
          <input 
            type="number" min="0"
            class="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition" 
            v-model.number="form.keluhan" 
          />
        </div>

        <button 
          @click="getRekomendasi"
          :disabled="isLoading"
          class="w-full bg-gradient-to-r from-blue-700 to-blue-900 hover:from-blue-500 hover:to-blue-800 text-white font-bold py-3 md:py-4 rounded-xl shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 mt-4 disabled:opacity-50 disabled:cursor-not-allowed text-sm md:text-lg">
          <span v-if="isLoading">Memproses...</span>
          <span v-else>DAPATKAN REKOMENDASI</span>
        </button>
        
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
// Pastikan import ini sesuai dengan struktur folder Anda
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
/* Hide scrollbar for Chrome, Safari and Opera */
.scrollbar-hide::-webkit-scrollbar {
    display: none;
}
/* Hide scrollbar for IE, Edge and Firefox */
.scrollbar-hide {
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
}
</style>