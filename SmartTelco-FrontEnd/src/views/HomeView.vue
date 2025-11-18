<template>
  <div class="space-y-6 pb-10">

    <!-- Judul -->
    <h2 class="text-xl font-bold">2. Atau Input Data Manual:</h2>

    <!-- Form Container -->
    <div class="bg-white shadow p-5 rounded-md grid gap-4">

      <!-- Jenis Paket -->
      <div>
        <label>Jenis Paket:</label>
        <select v-model="form.jenisPaket" class="border p-2 rounded w-full">
          <option value="Prepaid">Prepaid</option>
          <option value="Postpaid">Postpaid</option>
        </select>
      </div>

      <!-- Brand HP -->
      <div>
        <label>Merek Perangkat:</label>
        <select v-model="form.merek" class="border p-2 rounded w-full">
          <option>Apple</option>
          <option>Samsung</option>
          <option>Xiaomi</option>
          <option>Oppo</option>
          <option>Vivo</option>
        </select>
      </div>

      <!-- Penggunaan Data -->
      <div>
        <label>Penggunaan Data (GB): {{ form.dataUsage }} GB</label>
        <input type="range" min="1" max="50" v-model="form.dataUsage" />
      </div>

      <!-- Pengeluaran Bulanan -->
      <div>
        <label>Pengeluaran Bulanan (Rp 000): Rp {{ form.pengeluaran }}.000</label>
        <input type="range" min="10" max="1000" v-model="form.pengeluaran" />
      </div>

      <!-- Penggunaan Video -->
      <div>
        <label>% Penggunaan Video: {{ form.videoUsage }}%</label>
        <input type="range" min="0" max="100" v-model="form.videoUsage" />
      </div>

      <!-- Durasi Panggilan -->
      <div>
        <label>Durasi Panggilan (Mins): {{ form.durasiPanggilan }} Menit</label>
        <input type="range" min="0" max="300" v-model="form.durasiPanggilan" />
      </div>

      <!-- SMS Frekuensi -->
      <div>
        <label>Frekuensi SMS (per Bulan): {{ form.sms }}</label>
        <input type="range" min="0" max="200" v-model="form.sms" />
      </div>

      <!-- Frekuensi Top Up -->
      <div>
        <label>Frekuensi Top-up (per Bulan): {{ form.topup }}</label>
        <input type="range" min="0" max="20" v-model="form.topup" />
      </div>

      <!-- Travel Score -->
      <div>
        <label>Travel Score (0.0 - 1.0): {{ form.travel }}</label>
        <input type="range" min="0" max="1" step="0.1" v-model="form.travel" />
      </div>

      <!-- Jumlah Keluhan -->
      <div>
        <label>Jumlah Keluhan:</label>
        <input type="number" class="border p-2 rounded w-full" v-model="form.keluhan" />
      </div>

      <!-- Submit -->
      <button 
        @click="getRekomendasi"
        class="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded">
        DAPATKAN REKOMENDASI TERBAIK
      </button>
    </div>

  </div>
</template>

<script setup>
import { reactive } from "vue";

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

// Kirim data manual ke backend / local JSON
function getRekomendasi() {
  console.log("Data form:", JSON.stringify(form, null, 2));

  // jika backend tersedia:
  // fetch('/api/rekomendasi', { method: 'POST', body: JSON.stringify(form) })

  alert("Data berhasil dikirim ke backend (simulasi)!");
}
</script>
