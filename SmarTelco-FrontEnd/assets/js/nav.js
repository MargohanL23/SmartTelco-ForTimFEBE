// SmartTelco-FrontEnd/assets/js/nav.js (FINAL FIX: Toggle Menu)

document.addEventListener('DOMContentLoaded', () => {
    const currentUserId = localStorage.getItem('currentUserId');
    const currentUserRole = localStorage.getItem('currentUserRole');
    
    // Mengambil elemen berdasarkan ID yang baru kita definisikan di HTML
    const navElement = document.getElementById('navbar-menu');
    const menuToggle = document.getElementById('menu-toggle');
    
    const isLoginPage = window.location.pathname.indexOf('login.html') !== -1;

    // 1. Logika Redirect (Jika tidak login dan tidak di halaman Login)
    if (!currentUserId && !isLoginPage) {
        window.location.href = 'login.html';
        return;
    }
    
    // Periksa apakah elemen nav ada sebelum memproses
    if (!navElement) return;

    // Bersihkan navigasi lama
    navElement.innerHTML = '';
    
    // Inisialisasi daftar link
    let links = [
        { href: 'index.html', text: 'Home' }
    ];

    // Jika user sudah login (berhasil di-authenticate)
    if (currentUserId) {
        links.push({ href: 'data_input.html', text: 'Simulasi Profil' });
        
        // Tambahkan link History/Admin sesuai role
        // Logika role Anda sudah tepat (C1-C10000 dianggap user historis)
        if (currentUserRole === 'User' || (currentUserId.startsWith('C') && parseInt(currentUserId.substring(1)) <= 10000)) {
            links.push({ href: 'history.html', text: 'Riwayat Saya' });
        }
        if (currentUserRole === 'Admin') {
            links.push({ href: 'admin.html', text: 'Dashboard Admin' });
        }
    }
    
    // Render semua link
    links.forEach(link => {
        let newLink = document.createElement('a');
        newLink.href = link.href;
        newLink.textContent = link.text;
        navElement.appendChild(newLink);
    });

    // 2. Tambahkan tombol Logout
    if (currentUserId) {
        let logoutLink = document.createElement('a');
        logoutLink.href = '#';
        logoutLink.textContent = `Logout (${currentUserId})`;
        logoutLink.onclick = (e) => {
            e.preventDefault();
            localStorage.clear();
            window.location.href = 'login.html';
        };
        navElement.appendChild(logoutLink);
    } 
    
    // 3. FUNGSI TOGGLE MENU BARU (Hanya untuk mode mobile)
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            // Menambahkan/menghapus class 'active' yang sudah didefinisikan di style.css
            navElement.classList.toggle('active');
        });
        
        // Tutup menu saat link diklik (opsional, untuk pengalaman mobile yang lebih baik)
        navElement.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                // Hanya tutup jika menu sedang aktif (di mode mobile)
                if(navElement.classList.contains('active')) {
                    navElement.classList.remove('active');
                }
            });
        });
    }
});