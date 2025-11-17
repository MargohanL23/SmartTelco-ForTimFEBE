// SmartTelco-FrontEnd/assets/js/login.js

// URL Back-End (JANGAN LUPA GANTI INI NANTI SAAT DEPLOY KE RENDER)
const API_BASE_URL = 'http://127.0.0.1:5000'; 

// Elemen-elemen DOM
const messageElement = document.getElementById('login-message');
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const formTitle = document.getElementById('form-title');
const toggleBtn = document.getElementById('toggle-btn');

// =======================================================
// A. FUNGSI UTAMA (LOGIN / REGISTER)
// =======================================================

// Fungsi helper untuk menampilkan pesan status
const displayMessage = (text, type = 'info') => {
    messageElement.textContent = text;
    // Gunakan class CSS untuk styling yang lebih rapi (misalnya: status-text success, status-text error)
    messageElement.className = `status-text ${type}`; 
}


// Fungsi untuk menangani proses Login
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    displayMessage('Memproses Login...', 'info');
    
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    try {
        const response = await fetch(`${API_BASE_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.ok) {
            // Login Berhasil!
            localStorage.setItem('currentUserId', data.customer_id);
            localStorage.setItem('currentUserEmail', email);
            
            // Logika sederhana Role: Jika ID customer ID > C10000, beri Role 'User', 
            // Jika ID = C00001 (misalnya admin awal), beri 'Admin'. Kita asumsikan semua di bawah C10001 adalah data historis.
            const role = data.customer_id.length > 5 && parseInt(data.customer_id.substring(1)) > 10000 ? 'User' : 'Admin';
            localStorage.setItem('currentUserRole', role);
            
            displayMessage(`Login berhasil! Mengalihkan ke halaman simulasi...`, 'success');
            
            // Redirect setelah jeda singkat
            setTimeout(() => {
                window.location.href = 'data_input.html';
            }, 1500);

        } else if (response.status === 401) {
            displayMessage(data.message || "Email atau password salah.", 'error');
        } else {
            displayMessage(data.message || "Gagal login. Silakan coba lagi.", 'error');
        }
    } catch (error) {
        console.error('Error:', error);
        displayMessage('Terjadi kesalahan jaringan. Pastikan Backend sudah berjalan.', 'error');
    }
});

// Fungsi untuk menangani proses Register
registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    displayMessage('Memproses Pendaftaran...', 'info');

    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;

    try {
        const response = await fetch(`${API_BASE_URL}/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.ok) {
            // Registrasi Berhasil! Otomatis login.
            localStorage.setItem('currentUserId', data.customer_id);
            localStorage.setItem('currentUserEmail', email);
            localStorage.setItem('currentUserRole', 'User'); // User baru selalu diberi role 'User'
            
            displayMessage(`Pendaftaran berhasil! ID Pelanggan Anda: ${data.customer_id}. Anda akan dialihkan.`, 'success');
            
            setTimeout(() => {
                window.location.href = 'data_input.html';
            }, 2000);

        } else if (response.status === 409) {
            displayMessage("Gagal daftar: Email sudah terdaftar.", 'error');
        } else {
            displayMessage(data.message || "Gagal mendaftar. Silakan coba lagi.", 'error');
        }
    } catch (error) {
        console.error('Error:', error);
        displayMessage('Terjadi kesalahan jaringan. Pastikan Backend sudah berjalan.', 'error');
    }
});


// =======================================================
// B. FUNGSI UTILITY (TOGGLE VIEW SPA)
// =======================================================

// Fungsi untuk beralih antara tampilan Login dan Register
window.toggleView = () => {
    const isLoginVisible = !loginForm.classList.contains('hidden');

    if (isLoginVisible) {
        // Tampilkan Register, Sembunyikan Login
        loginForm.classList.add('hidden');
        registerForm.classList.remove('hidden');
        formTitle.textContent = 'Daftar Akun Baru';
        toggleBtn.textContent = 'Sudah punya akun? Masuk di sini!';
    } else {
        // Tampilkan Login, Sembunyikan Register
        loginForm.classList.remove('hidden');
        registerForm.classList.add('hidden');
        formTitle.textContent = 'Masuk ke Sistem';
        toggleBtn.textContent = 'Belum punya akun? Daftar sekarang!';
    }
    // Bersihkan pesan saat berganti tampilan
    displayMessage(''); 
}