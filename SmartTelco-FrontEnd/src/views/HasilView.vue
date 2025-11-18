<template>
  <div class="min-h-screen bg-gray-50 font-sans pb-10">

    

    <main class="max-w-3xl mx-auto px-4 py-10 space-y-8" v-if="resultData">
      
      <div class="text-center space-y-2">
        <h2 class="text-3xl font-extrabold text-gray-900">✨ Rekomendasi Terbaik Untuk Anda</h2>
        <p class="text-gray-500">AI kami telah menganalisis profil penggunaan Anda.</p>
      </div>

      <div class="bg-white rounded-2xl shadow-xl overflow-hidden border border-blue-100 relative transform hover:scale-[1.01] transition duration-300">
        
        <div class="bg-gradient-to-r from-blue-700 to-indigo-800 p-8 text-center relative overflow-hidden">
          <div class="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>

          <span class="inline-block bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-full mb-4 shadow-sm">
            ⭐ REKOMENDASI EKSKLUSIF
          </span>
          
          <h1 class="text-3xl md:text-4xl font-bold text-white mb-2 tracking-wide">
            {{ resultData.offerName }}
          </h1>
          
          <p class="text-blue-100 text-sm bg-white/10 inline-block px-4 py-1 rounded-lg backdrop-blur-sm">
            Tingkat Kepercayaan Model: <strong class="text-white">{{ resultData.confidence }}</strong>
          </p>
        </div>

        <div class="p-6 md:p-8">
          <h3 class="text-lg font-bold text-gray-800 mb-2">Mengapa Penawaran Ini?</h3>
          <p class="text-gray-600 leading-relaxed mb-6" v-html="resultData.reason"></p>

          <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div v-for="(fact, index) in resultData.facts" :key="index" class="flex flex-col items-center p-3 bg-blue-50 rounded-lg border border-blue-100 text-center">
              <span class="text-2xl mb-1">{{ fact.icon }}</span>
              <span class="text-xs font-bold text-gray-500 uppercase">{{ fact.label }}</span>
              <span class="text-sm font-semibold text-blue-800">{{ fact.value }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-xl shadow-md p-6 border border-gray-100">
        <h3 class="text-lg font-bold text-gray-800 mb-4 flex items-center">
          <svg class="w-5 h-5 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"></path></svg>
          Opsi Alternatif
        </h3>
        
        <div class="space-y-3">
          <div v-if="resultData.alternatives && resultData.alternatives.length > 0">
            <div 
              v-for="(alt, index) in resultData.alternatives" 
              :key="index"
              class="flex justify-between items-center p-3 hover:bg-gray-50 rounded-lg border border-transparent hover:border-gray-200 transition"
            >
              <div>
                <span class="font-medium text-gray-700 block">{{ alt.name }}</span>
                <span class="text-xs text-gray-400">Opsi bagus berdasarkan perilaku serupa.</span>
              </div>
              <span class="text-sm font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded border border-blue-100">{{ alt.prob }}</span>
            </div>
          </div>
          <p v-else class="text-gray-500 italic text-sm text-center">Model tidak menemukan rekomendasi alternatif yang kuat (probabilitas > 5%).</p>
        </div>
      </div>

      <div class="bg-gray-900 rounded-xl p-8 text-center shadow-lg">
        <h3 class="text-white font-bold text-lg mb-2">Ingin mencoba simulasi lain?</h3>
        <p class="text-gray-400 text-sm mb-6">Data riwayat ini telah tersimpan. Coba ubah parameter input untuk melihat perubahan rekomendasi.</p>
        
        <router-link 
          to="/home" 
          class="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition transform hover:-translate-y-1 shadow-lg hover:shadow-blue-500/50"
        >
          Simulasikan Profil Baru
        </router-link>
      </div>

    </main>

    <div v-else class="min-h-screen flex flex-col items-center justify-center">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
      <p class="text-gray-500">Memuat hasil prediksi...</p>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const resultData = ref(null);

// --- FUNGSI LOGIKA UTAMA ---

onMounted(() => {
  // 1. Ambil Data dari LocalStorage
  // Perhatikan: Di HomeView.vue sebelumnya kita simpan hasil prediksi ke 'predictionResult'
  // Dan input form kita (jika belum disimpan) sebaiknya juga disimpan di HomeView agar bisa diakses di sini.
  // Namun, karena di HomeView Anda mengirim 'payload', kita asumsikan 'payload' itu adalah inputData.
  
  const resultJson = localStorage.getItem('predictionResult');
  // Anda mungkin perlu menyimpan payload input di HomeView ke localStorage juga, misal 'inputData'
  // Untuk sekarang kita coba ambil dari resultJson jika backend mengembalikannya, atau ambil dummy jika tidak ada.
  
  if (!resultJson) {
    alert("Data tidak ditemukan. Silakan input data terlebih dahulu.");
    router.push('/home');
    return;
  }

  try {
    const apiResponse = JSON.parse(resultJson);
    
    // Karena di HomeView kita mengirim payload input, tapi tidak menyimpannya terpisah.
    // Idealnya backend mengembalikan data input juga, atau kita simpan input di HomeView.
    // Asumsi: Anda akan menambahkan localStorage.setItem('inputData', JSON.stringify(payload)) di HomeView.
    const inputDataJson = localStorage.getItem('inputData'); 
    const inputData = inputDataJson ? JSON.parse(inputDataJson) : {}; // Fallback object kosong jika null

    // --- 2. LOGIKA RIWAYAT (SAVE HISTORY) ---
    // Kita cek apakah ini "History View" atau bukan. 
    // Jika user datang dari klik "Dapatkan Rekomendasi", ini BUKAN history view.
    // Jika user datang dari halaman Admin/Dashboard riwayat, itu history view.
    
    const isHistoryView = localStorage.getItem('isHistoryView');
    const currentUser = JSON.parse(localStorage.getItem('user'));
    const customerId = currentUser ? currentUser.customer_id : 'GUEST';

    if (isHistoryView !== 'true') {
      saveHistory(apiResponse, customerId, inputData);
    }

    // --- 3. SIAPKAN DATA UNTUK TAMPILAN ---
    resultData.value = {
      offerName: apiResponse.recommended_offer,
      confidence: apiResponse.confidence, // Backend biasanya kirim string "90.50%"
      reason: generateReason(apiResponse.recommended_offer, inputData),
      facts: getSummaryFacts(inputData),
      alternatives: formatAlternatives(apiResponse.alternatives)
    };

    // --- 4. BERSIHKAN FLAG ---
    // Agar navigasi selanjutnya dianggap fresh
    localStorage.removeItem('isHistoryView');
    
    // Opsional: Hapus data input agar tidak menumpuk (tapi result jangan dihapus dulu agar user bisa refresh)
    // localStorage.removeItem('inputData');

  } catch (e) {
    console.error("Error parsing data:", e);
    alert("Terjadi kesalahan memproses data hasil.");
    router.push('/home');
  }
});

// --- FUNGSI HELPER (Diadaptasi dari JS Murni Anda) ---

function saveHistory(result, customerId, inputData) {
  let history = JSON.parse(localStorage.getItem('predictionHistory') || '[]');
  
  const newRecord = {
    date: new Date().toLocaleString('id-ID'),
    id: customerId,
    recommendation: result.recommended_offer,
    confidence: result.confidence,
    alternatives: result.alternatives,
    input: inputData 
  };
  
  history.unshift(newRecord); // Tambah di awal array
  
  if (history.length > 50) {
    history.pop(); // Hapus yang terlama jika > 50
  }
  
  localStorage.setItem('predictionHistory', JSON.stringify(history));
}

function generateReason(offer, data) {
  // Pastikan data ada, jika kosong beri default
  if (!data || Object.keys(data).length === 0) return "Rekomendasi ini didasarkan pada pola penggunaan Anda.";

  let reason = "Analisis mendalam terhadap profil Anda menunjukkan bahwa paket ini adalah yang paling optimal. ";
  const spend = data.monthly_spend ? (data.monthly_spend).toLocaleString('id-ID') : '0';
  
  switch (offer) {
    case 'Data Booster':
      reason += `Anda adalah pengguna data yang sangat aktif (Rata-rata <strong>${data.avg_data_usage_gb} GB</strong>). Paket ini dirancang untuk memastikan Anda tidak kehabisan kuota.`;
      break;
    case 'Streaming Partner Pack':
      // Hitung persen jika data dalam desimal (0.5) atau integer (50)
      const videoPct = data.pct_video_usage > 1 ? data.pct_video_usage : (data.pct_video_usage * 100);
      reason += `Dengan persentase penggunaan video mencapai <strong>${videoPct}%</strong>, paket ini memberikan kuota khusus streaming favorit Anda.`;
      break;
    case 'Voice Bundle':
      reason += `Rata-rata durasi panggilan Anda adalah <strong>${data.avg_call_duration} menit</strong>. Paket ini menawarkan tarif telepon hemat.`;
      break;
    case 'Roaming Pass':
      reason += `Skor perjalanan Anda (<strong>${Number(data.travel_score).toFixed(2)}</strong>) mengindikasikan mobilitas tinggi. Roaming Pass menjamin konektivitas di luar negeri.`;
      break;
    case 'Retention Offer':
      reason += `Mengingat riwayat keluhan (<strong>${data.complaint_count}x</strong>) atau pengeluaran saat ini (Rp ${spend}.000), ini adalah penawaran spesial untuk Anda.`;
      break;
    case 'Top-up Promo':
      reason += `Dengan frekuensi top-up <strong>${data.topup_freq}x</strong> per bulan, promo ini memberikan nilai tambah setiap kali isi ulang.`;
      break;
    case 'General Offer':
      reason += `Pola penggunaan Anda seimbang. Ini adalah paket serbaguna dengan nilai terbaik untuk harian.`;
      break;
    default:
      reason += "Rekomendasi ini sangat cocok dengan pola penggunaan Anda secara keseluruhan.";
  }
  return reason;
}

function getSummaryFacts(data) {
  if (!data || Object.keys(data).length === 0) return [];

  // Hitung persen video
  const videoVal = data.pct_video_usage > 1 ? data.pct_video_usage : (data.pct_video_usage * 100);

  return [
    { label: 'Jenis Paket', value: data.plan_type || '-', icon: '📞' },
    { label: 'Data Bulanan', value: `${data.avg_data_usage_gb || 0} GB`, icon: '🌐' },
    { label: 'Video Share', value: `${videoVal}%`, icon: '🎬' },
    { label: 'Pengeluaran', value: `Rp ${data.monthly_spend || 0}K`, icon: '💸' },
    { label: 'Travel Score', value: Number(data.travel_score || 0).toFixed(1), icon: '✈️' },
    { label: 'Keluhan', value: `${data.complaint_count || 0}x`, icon: '⚠️' }
  ];
}

function formatAlternatives(altArray) {
  if (!altArray || altArray.length === 0) return [];
  
  return altArray.map(item => {
    // Format backend string: "Nama Paket (XX.X%)"
    // Kita pisah agar bisa di-styling berbeda
    const match = item.match(/^(.*)\s\((.*)\)$/);
    if (match) {
      return { name: match[1], prob: match[2] };
    }
    return { name: item, prob: "" };
  });
}
</script>