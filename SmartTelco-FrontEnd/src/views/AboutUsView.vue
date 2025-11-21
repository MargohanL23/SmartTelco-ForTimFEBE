<template>
  <div class="absolute top-0 left-0 w-full min-h-screen font-sans bg-white">

    <div class="relative h-[500px] flex items-center justify-center overflow-hidden">
      <div class="absolute inset-0 z-0">
        <img 
      src="/images/foto atmin.jpg" 
      alt="About Us Hero" 
      class="w-full h-full object-cover brightness-50"
    />
      </div>
      
      <div class="relative z-10 text-center">
        <h1 class="text-5xl md:text-6xl font-extrabold text-white tracking-widest uppercase drop-shadow-lg">
          About Us
        </h1>
        <div class="w-24 h-1 bg-[#FFC107] mx-auto mt-4 rounded-full"></div>
      </div>

      <div class="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-20">
        <svg class="relative block w-[calc(100%+1.3px)] h-[50px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" class="fill-white"></path>
            <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" class="fill-white"></path>
            <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" class="fill-white"></path>
        </svg>
      </div>
    </div>

    <div class="relative py-20 px-4 max-w-7xl mx-auto overflow-hidden">
      <span class="absolute top-10 right-0 text-[150px] font-bold text-gray-100 -z-10 opacity-50 select-none pointer-events-none hidden lg:block">
        ABOUT
      </span>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        <div class="relative group cursor-pointer">
          <div class="overflow-hidden rounded-lg shadow-2xl transform transition duration-500 hover:scale-[1.01]">
            <img 
              src="https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=2070&auto=format&fit=crop" 
              alt="What We Do" 
              class="w-full h-[400px] object-cover"
            />
            <div class="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition duration-300 flex items-center justify-center">
              <div class="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-[#842A3B] ml-1" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div class="space-y-6">
          <h4 class="text-[#FFC107] font-bold tracking-wider uppercase text-sm">Our Mission</h4>
          <h2 class="text-4xl font-bold text-[#842A3B] leading-tight">
            WHAT WE DO
          </h2>
          
          <p class="text-gray-600 leading-relaxed">
            Kami menggabungkan keahlian telekomunikasi dengan kecerdasan buatan (AI) untuk memberikan solusi yang personal. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          
          <p class="text-gray-600 leading-relaxed">
            Dengan model XGBoost yang canggih, kami menganalisis pola perilaku pelanggan untuk merekomendasikan paket yang paling efisien, menghemat biaya, dan meningkatkan kepuasan pelanggan secara keseluruhan.
          </p>

          <div class="pt-4">
            <p class="text-3xl text-[#842A3B]" style="font-family: 'Brush Script MT', cursive;">
              Smart Telco Team
            </p>
          </div>
        </div>

      </div>
    </div>

    <div class="py-20 bg-gray-50 px-4">
      <div class="max-w-7xl mx-auto text-center">
        
        <h2 class="text-3xl font-bold text-[#842A3B] mb-3">OUR TEAM</h2>
        <p class="text-gray-500 max-w-2xl mx-auto mb-12">
          Bertemu dengan para ahli di balik layar yang berdedikasi untuk merevolusi pengalaman telekomunikasi Anda.
        </p>

        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          
          <div v-for="(member, index) in teamMembers" :key="index" class="group">
            <div class="relative overflow-hidden rounded-lg shadow-md mb-4 h-64 w-full bg-gray-200">
              <img 
                :src="member.image" 
                :alt="member.name" 
                class="w-full h-full object-cover transform group-hover:scale-110 transition duration-500"
              />
              <div class="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-[#842A3B]/90 to-transparent translate-y-full group-hover:translate-y-0 transition duration-300 flex justify-center gap-4">
                <a href="#" class="text-white hover:text-[#FFC107]"><i class="fab fa-linkedin"></i> LINK</a>
                <a href="#" class="text-white hover:text-[#FFC107]"><i class="fab fa-instagram"></i> IG</a>
              </div>
            </div>
            
            <h3 class="text-lg font-bold text-gray-800 group-hover:text-[#842A3B] transition">{{ member.name }}</h3>
            <p class="text-sm text-[#FFC107] font-semibold uppercase tracking-wide">{{ member.role }}</p>
          </div>

        </div>

      </div>
    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue';

// Data Anggota Tim (5 Orang)
// Menggunakan gambar placeholder (Unsplash/UI Faces)
const teamMembers = ref([
  {
    name: "Margohan L. Siringo Ringo ",
    role: "Back-End Developer",
    image: "/images/Foto gohan.jpg"
  },
  {
    name: "Muhammad Izhar Fadillah",
    role: "Front-End Developer",
    image: "/images/Foto izhar.jpg"
  },
  {
    name: "M. Varrel Nuwi Zulyanno",
    role: "Front-End Developer",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop"
  },
  {
    name: "Hoerunisa",
    role: "Machine Learning Engineer",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop"
  },
  {
    name: " Moch. Faisal Syahwaludin",
    role: "Machine Learning Engineer",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1887&auto=format&fit=crop"
  }
]);
</script>

<style scoped>
/* Custom Font simulasi tanda tangan */
@import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&display=swap');
</style>