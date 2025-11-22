<template>
  <div class="space-y-16 pb-10">

      <!-- HERO SECTION (Updated + Image Aside Right) -->
  <div
    class="bg-white-500 rounded-3xl shadow-2xl shadow-black/40 relative overflow-hidden max-w-10xl mx-auto">

    <!-- overlay glossy -->
    <div class="absolute top-0 left-0 w-full h-full bg-white/5 pointer-events-none"></div>

    <!-- wrapper 2 kolom -->
    <div class="relative z-10 flex flex-col md:flex-row items-center md:items-start">

      <!-- Kolom kiri: teks -->
      <div class="relative z-10 w-full md:w-1/2 p-10 md:py-12 md:pr-10 md:pl-35 flex flex-col justify-center items-start">
  
  <h1 class="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-6 tracking-wide">
    Sistem Rekomendasi Paket Telco Cerdas
  </h1>

  <p class="text-blue-100 mb-10 leading-relaxed text-base md:text-lg text-justify">
    Didukung oleh <strong>Machine Learning (XGBoost)</strong> sistem ini melakukan personalisasi 
    penawaran paket dengan akurasi tinggi. Kami menganalisis secara multidimensi pola perilaku 
    pelanggan—mulai dari frekuensi top-up, rata-rata penggunaan data (GB), durasi panggilan (Menit), 
    hingga skor keluhan (Complaint Count)—untuk memprediksi penawaran yang paling optimal. 
    Hasilnya: peningkatan konversi penjualan dan loyalitas pelanggan karena setiap rekomendasi terasa sangat relevan.
  </p>

  <RouterLink
    to="/simulation"
    class="inline-block bg-[#FFC107] hover:bg-yellow-400 text-[#842A3B] font-extrabold py-4 px-8 rounded-xl shadow-lg transform hover:scale-105 transition duration-200 cursor-pointer">
    MULAI SIMULASI & DAPATKAN REKOMENDASI
  </RouterLink>

</div>

            <!-- Kolom kanan: gambar -->
      <div class="mt-10 md:mt-0 md:pl-0 md:ml-auto flex justify-end p-5">
  
          <div class="relative w-full max-w-md h-90 md:h-116 bg-white-500 rounded-3xl shadow-2xl overflow-hidden">
            
            <img
              src="/images/SmartTelco_ilustration.jpg"
              alt="Hero Illustration"
              class="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
            />  
        </div>
      </div>
    </div>
  </div>

    <!-- NILAI BISNIS -->
    <div>
      <h2 class="text-center text-2xl font-bold mb-8 text-white drop-shadow-md">
        Nilai Bisnis & Inovasi
      </h2>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-8xl min-h-[350px] relative z-10 text-justify">
        <div
          class="bg-white text-gray-800 p-8 rounded-xl shadow-xl hover:shadow-2xl transition duration-300 transform hover:-translate-y-1">
          <div class="text-6xl mb-4 items-center text-center">🎯</div>
          <h3 class="text-[#003366] font-bold text-2xl mb-4 items-center text-center">Presisi Tinggi</h3>
          <p class="text-sm text-gray-600 leading-relaxed">
            Menggunakan algoritma Machine Learning mutakhir yang dilatih dengan dataset masif perilaku historis pelanggan. 
            Sistem menganalisis variabel kompleks seperti pola penggunaan data, riwayat transaksi, dan durasi panggilan secara real-time untuk menghasilkan prediksi 
            <strong>Target Offer</strong> dengan tingkat akurasi tertinggi, memastikan setiap rekomendasi benar-benar relevan dengan kebutuhan spesifik pelanggan saat ini.

            <strong>Target Offer</strong> paling optimal.
          </p>
        </div>

        <div
          class="bg-white text-gray-800 p-8 rounded-xl shadow-xl hover:shadow-2xl transition duration-300 transform hover:-translate-y-1">
          <div class="text-6xl mb-4 items-center text-center">💰</div>
          <h3 class="text-[#003366] font-bold text-2xl mb-4 items-center text-center">Peningkatan Revenue</h3>
          <p class="text-sm text-gray-600 leading-relaxed">
            Mentransformasi strategi penjualan dari <em>"Mass Marketing"</em> menjadi pendekatan presisi yang berdampak langsung pada <em>Bottom Line</em>. 
            Dengan mengidentifikasi peluang <em>Up-selling</em> dan <em>Cross-selling</em> yang paling relevan bagi setiap individu, sistem ini secara efektif meningkatkan
             <strong>Average Revenue Per User (ARPU)</strong> sekaligus menekan biaya pemasaran yang terbuang (<em>Marketing Waste</em>), memastikan setiap promosi menghasilkan ROI
              (<em>Return on Investment</em>) yang maksimal.
          </p>
        </div>

        <div
          class="bg-white text-gray-800 p-8 rounded-xl shadow-xl hover:shadow-2xl transition duration-300 transform hover:-translate-y-1">
          <div class="text-6xl mb-4 items-center text-center">📊</div>
          <h3 class="text-[#003366] font-bold text-2xl mb-4 items-center text-center">Segmentasi Dinamis</h3>
          <p class="text-sm text-gray-600 leading-relaxed">
            Meninggalkan metode segmentasi statis tradisional demi pengelompokan otomatis berbasis AI yang granular. Sistem mampu mendeteksi 
            perubahan perilaku pelanggan secara instan dan mengkategorikan mereka ke dalam mikro-segmen spesifik seperti <em>'High-Bandwidth 
              Streamers'</em>, <em>'Roaming Travelers'</em>, atau <em>'Price-Sensitive Users'</em>, memungkinkan eksekusi kampanye pemasaran yang adaptif dan kontekstual.
          </p>
        </div>
      </div>
    </div>

    <!-- CTA TERAKHIR -->
    <div
      class="bg-white-500 rounded-2xl p-10 text-center shadow-2xl shadow-black/40 max-w-6xl mx-auto relative z-10">
      <h3 class="text-xl md:text-2xl font-bold mb-6 text-white">
        Siap Menguji Kecerdasan Model Kami?
      </h3>

      <RouterLink
        to="/simulation"
        class="inline-block bg-white text-[#003366] hover:bg-gray-100 font-bold py-3 px-10 rounded shadow transition transform hover:scale-105 cursor-pointer">
        UJI MODEL SEKARANG
      </RouterLink>
    </div>

  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router';
</script>
