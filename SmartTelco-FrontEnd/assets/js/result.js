// SmartTelco-FrontEnd/assets/js/result.js

// --- FUNGSI RIWAYAT (DIREVISI untuk menyimpan Alternatif) ---
function saveHistory(result, customerId, inputData) {
    let history = JSON.parse(localStorage.getItem('predictionHistory') || '[]');
    
    // Pastikan kita menyimpan data alternatif dari hasil prediksi
    const newRecord = {
        date: new Date().toLocaleString(),
        id: customerId,
        recommendation: result.recommended_offer,
        confidence: result.confidence,
        alternatives: result.alternatives, // SIMPAN ALTERNATIF DI RIWAYAT
        input: inputData 
    };
    
    history.unshift(newRecord);
    
    if (history.length > 50) {
        history.pop();
    }
    
    localStorage.setItem('predictionHistory', JSON.stringify(history));
}


document.addEventListener('DOMContentLoaded', () => {
    const resultJson = localStorage.getItem('recommendationResult');
    const inputJson = localStorage.getItem('customerInput');
    const customerId = localStorage.getItem('currentUserId');
    const isHistoryView = localStorage.getItem('isHistoryView'); // Cek apakah ini dari riwayat
    
    if (!resultJson || !inputJson) {
        alert("Silakan lakukan simulasi terlebih dahulu.");
        window.location.href = 'data_input.html';
        return;
    }

    const result = JSON.parse(resultJson);
    const inputData = JSON.parse(inputJson);

    // --- PANGGIL FUNGSI RIWAYAT HANYA JIKA BUKAN DARI VIEW RIWAYAT ---
    if (result && customerId && isHistoryView !== 'true') {
        saveHistory(result, customerId, inputData); 
    }
    // ------------------------------------------------------------------

    // 2. Tampilkan Rekomendasi Utama
    const offerNameElement = document.getElementById('offer-name');
    const confidenceElement = document.getElementById('confidence-score');
    const reasonElement = document.getElementById('offer-reason');
    
    offerNameElement.textContent = result.recommended_offer;
    confidenceElement.textContent = result.confidence;

    const reason = generateReason(result.recommended_offer, inputData);
    reasonElement.innerHTML = reason;

    displaySummaryFacts(inputData);
    
    // 3. Tampilkan Rekomendasi Alternatif
    displayAlternatives(result.alternatives || []); // Pastikan selalu array
    
    // Hapus data dari Local Storage
    // HANYA HAPUS JIKA INI ADALAH PREDIKSI BARU, agar riwayat bisa diakses kembali
    if (isHistoryView !== 'true') {
        localStorage.removeItem('recommendationResult');
        localStorage.removeItem('customerInput');
    }
    // Hapus flag riwayat agar navigasi selanjutnya dianggap prediksi baru
    localStorage.removeItem('isHistoryView'); 
});


// --- FUNGSI PENDUKUNG LAINNYA TETAP SAMA ---

function generateReason(offer, data) {
    // ... (Fungsi ini tetap sama, Anda sudah membuatnya dengan baik)
    let reason = "Analisis mendalam terhadap profil Anda menunjukkan bahwa paket ini adalah yang paling optimal. ";
    const spend = (data.monthly_spend / 1000).toLocaleString('id-ID');
    
    switch (offer) {
        case 'Data Booster':
            reason += `Anda adalah pengguna data yang sangat aktif (Rata-rata **${data.avg_data_usage_gb} GB**). Paket ini dirancang untuk memastikan Anda tidak kehabisan kuota data di tengah bulan.`;
            break;
        case 'Streaming Partner Pack':
            reason += `Dengan persentase penggunaan video mencapai **${(data.pct_video_usage * 100).toFixed(0)}%**, paket ini memberikan kuota khusus untuk layanan streaming favorit Anda, menghemat kuota utama.`;
            break;
        case 'Voice Bundle':
            reason += `Rata-rata durasi panggilan Anda adalah **${data.avg_call_duration} menit**. Paket ini menawarkan menit telepon murah/gratis yang akan menghemat biaya bulanan Anda.`;
            break;
        case 'Roaming Pass':
            reason += `Skor perjalanan Anda (**${data.travel_score.toFixed(2)}**) mengindikasikan Anda sering bepergian. Roaming Pass akan menjamin konektivitas Anda di luar negeri dengan tarif hemat.`;
            break;
        case 'Retention Offer':
            reason += `Mengingat riwayat Anda memiliki **${data.complaint_count} keluhan** atau pengeluaran rendah (Rp ${spend}.000), ini adalah penawaran spesial untuk menjaga kepuasan dan loyalitas Anda.`;
            break;
        case 'Top-up Promo':
            reason += `Sebagai pelanggan **${data.plan_type}** dengan frekuensi top-up **${data.topup_freq}x** per bulan, promo ini memberikan nilai tambah setiap kali Anda mengisi ulang.`;
            break;
        case 'General Offer':
            reason += `Pola penggunaan Anda seimbang di semua kategori. Ini adalah paket serbaguna yang menawarkan nilai terbaik untuk penggunaan harian Anda.`;
            break;
        default:
            reason += "Rekomendasi ini sangat cocok dengan pola penggunaan Anda secara keseluruhan.";
    }
    return reason;
}

function displaySummaryFacts(data) {
    // ... (Fungsi ini tetap sama)
    const factsContainer = document.getElementById('summary-facts');
    factsContainer.innerHTML = '';
    const facts = [
        { label: 'Jenis Paket', value: data.plan_type, icon: '📞' },
        { label: 'Data Bulanan', value: `${data.avg_data_usage_gb.toFixed(1)} GB`, icon: '🌐' },
        { label: 'Video Share', value: `${(data.pct_video_usage * 100).toFixed(0)}%`, icon: '🎬' },
        { label: 'Pengeluaran', value: `Rp ${(data.monthly_spend / 1000).toFixed(0)}K`, icon: '💸' },
        { label: 'Travel Score', value: data.travel_score.toFixed(2), icon: '✈️' },
        { label: 'Keluhan', value: `${data.complaint_count}x`, icon: '⚠️' }
    ];

    facts.forEach(fact => {
        const item = document.createElement('div');
        item.className = 'fact-item';
        item.innerHTML = `<strong>${fact.icon} ${fact.label}:</strong> <span>${fact.value}</span>`;
        factsContainer.appendChild(item);
    });
}

function displayAlternatives(alternatives) {
    // ... (Fungsi ini tetap sama)
    const alternativesContainer = document.getElementById('alternatives-list');
    alternativesContainer.innerHTML = ''; 

    if (alternatives.length === 0) {
        alternativesContainer.innerHTML = '<p class="text-muted">Model tidak menemukan rekomendasi alternatif yang kuat (probabilitas > 5%).</p>';
        return;
    }

    alternatives.forEach(alt => {
        const item = document.createElement('div');
        item.className = 'alternative-card';
        item.innerHTML = `
            <h4>${alt.split(' (')[0]}</h4>
            <span class="alt-prob">${alt.split(' (')[1]}</span>
            <p>Opsi bagus berdasarkan perilaku serupa.</p>
        `;
        alternativesContainer.appendChild(item);
    });
}