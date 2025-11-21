<template>
  <div class="space-y-16 pb-10">

    <div class="bg-gradient-to-br from-yellow-600 to-white-500 rounded-3xl p-10 text-center shadow-2xl shadow-black/40 relative overflow-hidden max-w-6xl mx-auto relative z-10">
      <div class="absolute top-0 left-0 w-full h-full bg-white/5 pointer-events-none"></div>

      <div class="relative z-10">
        <h1 class="text-3xl md:text-4xl font-bold text-white mb-4 tracking-wide">
          Sistem Rekomendasi Paket Telco Cerdas 🚀
        </h1>
        <p class="text-blue-100 max-w-3xl mx-auto mb-8 leading-relaxed text-sm md:text-base">
          Didukung oleh <strong>Machine Learning (XGBoost)</strong> untuk personalisasi penawaran paket yang akurat
          berdasarkan pola perilaku pelanggan.
        </p>
        
        <RouterLink 
          to="/simulation"
          class="inline-block bg-[#FFC107] hover:bg-yellow-400 text-[#003366] font-extrabold py-3 px-8 rounded shadow-lg transform hover:scale-105 transition duration-200 cursor-pointer text-decoration-none">
          MULAI SIMULASI & DAPATKAN REKOMENDASI
        </RouterLink>

      </div>
    </div>

    <div>
      <h2 class="text-center text-2xl font-bold mb-8 text-blue-200 drop-shadow-md">
        Nilai Bisnis & Inovasi
      </h2>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto relative z-10">
        <div class="bg-white text-gray-800 p-8 rounded-xl shadow-xl hover:shadow-2xl transition duration-300 transform hover:-translate-y-1">
          <div class="text-4xl mb-4">🎯</div>
          <h3 class="text-[#003366] font-bold text-lg mb-3">Presisi Tinggi</h3>
          <p class="text-sm text-gray-600 leading-relaxed">
            Model dilatih dengan data perilaku historis (penggunaan data, biaya, panggilan) untuk memprediksi penawaran <strong>Target Offer</strong> paling optimal.
          </p>
        </div>

        <div class="bg-white text-gray-800 p-8 rounded-xl shadow-xl hover:shadow-2xl transition duration-300 transform hover:-translate-y-1">
          <div class="text-4xl mb-4">💰</div>
          <h3 class="text-[#003366] font-bold text-lg mb-3">Peningkatan Revenue</h3>
          <p class="text-sm text-gray-600 leading-relaxed">
            Dengan rekomendasi yang sangat relevan, tingkat konversi pembelian (acceptance rate) paket dapat meningkat signifikan.
          </p>
        </div>

        <div class="bg-white text-gray-800 p-8 rounded-xl shadow-xl hover:shadow-2xl transition duration-300 transform hover:-translate-y-1">
          <div class="text-4xl mb-4">📊</div>
          <h3 class="text-[#003366] font-bold text-lg mb-3">Segmentasi Dinamis</h3>
          <p class="text-sm text-gray-600 leading-relaxed">
            Mampu mengidentifikasi segmen pelanggan seperti 'Heavy Video Users', 'Frequent Travelers', dan 'Budget Communicators' secara otomatis.
          </p>
        </div>
      </div>
    </div>

    <div class="bg-gradient-to-br from-yellow-600 to-white-500 rounded-2xl p-10 text-center shadow-xl max-w-6xl mx-auto relative z-10">
      <h3 class="text-xl md:text-2xl font-bold mb-6 text-white">
        Siap Menguji Kecerdasan Model Kami?
      </h3>
      
      <RouterLink 
        to="/simulation"
        class="inline-block bg-white text-[#003366] hover:bg-gray-100 font-bold py-3 px-10 rounded shadow transition transform hover:scale-105 cursor-pointer text-decoration-none">
        UJI MODEL SEKARANG
      </RouterLink>

    </div>

  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router';
// Script scrollToInput dihapus karena sudah tidak diperlukan
</script>