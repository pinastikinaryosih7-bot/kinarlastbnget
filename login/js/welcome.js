document.addEventListener("DOMContentLoaded", function() {
    // 1. Cari tahu apakah ada nama user yang tersimpan di memori browser
    const loggedInUser = sessionStorage.getItem('username');
    
    // 2. Ambil elemen menu login di beranda tadi
    const authArea = document.getElementById('authArea');

    // 3. JIKA ada nama user yang tersimpan (artinya dia sukses login)
    if (loggedInUser) {
        // Ganti tombol LOGIN tadi jadi ucapan Halo dan tombol LOGOUT
        authArea.innerHTML = `
            <span style="font-weight: 600; margin-right: 10px; color: #000;">Halo, ${loggedInUser}</span>
            <button onclick="prosesLogout()" style="background: #ff4e4e; color: white; border: none; padding: 5px 10px; cursor: pointer; border-radius: 4px;">LOGOUT</button>
        `;
    }
});

// 4. Fungsi kalau tombol LOGOUT di-klik
function prosesLogout() {
    sessionStorage.removeItem('username'); // Hapus nama user dari memori browser
    window.location.reload(); // Refresh halaman beranda biar tombol LOGIN muncul lagi
}
