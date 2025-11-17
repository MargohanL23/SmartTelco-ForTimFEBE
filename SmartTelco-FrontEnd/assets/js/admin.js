// SmartTelco-FrontEnd/assets/js/admin.js

document.addEventListener('DOMContentLoaded', loadModelStatus);

const API_URL = 'http://127.0.0.1:5000/api'; 

async function loadModelStatus() {
    // Hanya Admin yang seharusnya bisa mengakses ini (sudah dicek di nav.js, tapi sebaiknya dicek juga di backend)
    const currentUserRole = localStorage.getItem('currentUserRole');
    if (currentUserRole !== 'Admin') {
        // Redirect jika bukan admin (keamanan sederhana)
        window.location.href = 'index.html';
        return;
    }
    
    try {
        const response = await fetch(`${API_URL}/model_status`);
        const result = await response.json();

        if (response.ok && result.status === 'success') {
            // 1. Update Metrics
            const metrics = result.metrics;
            document.querySelector('.performance-metrics .success-bg .metric-value').textContent = metrics.accuracy_score;
            document.querySelector('.performance-metrics .primary-bg .metric-value').textContent = metrics.macro_f1_score;
            document.querySelector('.performance-metrics .warning-bg .metric-value').textContent = metrics.log_loss;
            document.querySelector('.performance-metrics .info-bg .metric-value').textContent = metrics.latency;
            document.querySelector('.last-update').innerHTML = `Model Aktif: **${metrics.model_name}** (Dilatih ${metrics.last_trained})`;
            
            // 2. Update Feature Importance Chart
            const importanceContainer = document.getElementById('feature-importance-chart');
            importanceContainer.innerHTML = '';
            
            // Definisikan kelas warna untuk chart
            const colors = ['primary-bg', 'success-bg', 'danger-bg', 'warning-bg', 'info-bg']; 
            
            result.feature_importance.forEach((feature, index) => {
                const barItem = document.createElement('div');
                barItem.className = 'bar-item';
                barItem.innerHTML = `
                    <span class="label">${feature.label}</span>
                    <div class="bar ${colors[index % colors.length]}" style="width: ${feature.score}%;"></div>
                    <span class="percent">${feature.score}</span>
                `;
                importanceContainer.appendChild(barItem);
            });
            
        } else {
            console.error('Gagal memuat status model:', result.error);
            alert('Gagal memuat status model dari Backend.');
        }

    } catch (error) {
        console.error('Error saat koneksi ke API status:', error);
        alert('Tidak dapat terhubung ke server Backend untuk memuat status model.');
    }
}