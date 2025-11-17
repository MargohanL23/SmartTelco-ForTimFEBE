// SmartTelco-FrontEnd/assets/js/history.js

document.addEventListener('DOMContentLoaded', loadHistory);

function loadHistory() {
    const tableBody = document.querySelector('#history-table tbody');
    const noHistoryMessage = document.getElementById('no-history-message');
    const customerId = localStorage.getItem('currentUserId');
    
    const allHistory = JSON.parse(localStorage.getItem('predictionHistory') || '[]');
    const userHistory = allHistory.filter(record => record.id === customerId);
    
    tableBody.innerHTML = '';

    if (userHistory.length === 0) {
        noHistoryMessage.style.display = 'block';
        document.querySelector('#history-table').style.display = 'none';
        document.getElementById('history-header').textContent = `Belum ada riwayat prediksi untuk ID ${customerId}.`;
        return;
    }

    noHistoryMessage.style.display = 'none';
    document.querySelector('#history-table').style.display = 'table';
    document.getElementById('history-header').textContent = `Menampilkan ${userHistory.length} riwayat prediksi untuk ID ${customerId}.`;

    userHistory.forEach(record => {
        const row = tableBody.insertRow();
        
        row.insertCell().textContent = record.date;
        row.insertCell().textContent = record.id;
        row.insertCell().textContent = record.recommendation;
        row.insertCell().textContent = record.confidence;
        
        // Kolom 5: Lihat Hasil (Link untuk memuat hasil lama)
        const profileCell = row.insertCell();
        const viewLink = document.createElement('a');
        
        viewLink.href = '#';
        viewLink.textContent = 'Lihat Hasil'; // Ganti teks
        viewLink.className = 'btn-link';
        
        // FUNGSI BARU: Simpan hasil historis ke LocalStorage saat tombol diklik
        viewLink.onclick = () => {
            // 1. Simpan data input dan hasil lama ke key yang sama dengan hasil prediksi baru
            localStorage.setItem('recommendationResult', JSON.stringify({
                status: 'success',
                recommended_offer: record.recommendation,
                confidence: record.confidence,
                alternatives: record.alternatives || [] // Pastikan alternatif ada
            }));
            localStorage.setItem('customerInput', JSON.stringify(record.input));
            
            // 2. Tandai bahwa ini berasal dari riwayat (Opsional, tapi bagus)
            localStorage.setItem('isHistoryView', 'true');
            
            // 3. Redirect ke halaman hasil
            window.location.href = 'result.html';
        };
        
        profileCell.appendChild(viewLink);
    });
}