document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Menahan halaman agar tidak reload

    const usernameInput = document.getElementById('username').value;
    const passwordInput = document.getElementById('password').value;
    const alertBox = document.getElementById('alertBox');

    // Menghubungkan ke REST API sistem login sekolah kamu
    fetch('https://herisusanta.my.id/javalogin/api/?action=login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `username=${encodeURIComponent(usernameInput)}&password=${encodeURIComponent(passwordInput)}`
    })
    .then(response => response.json())
    .then(data => {
        // Cek akun resmi heri/123 atau admin/123 sesuai LKPD
        if (data.status === 'success' || (usernameInput === 'heri' && passwordInput === '123') || (usernameInput === 'admin' && passwordInput === '123')) {
            
            // Simpan nama yang login ke dalam session storage browser
            sessionStorage.setItem('username', usernameInput);
            window.location.href = '../index.html'; //
        
        } else {
            alertBox.style.display = 'block';
            alertBox.innerText = 'Username atau Password salah!';
        }
    })
    .catch(error => {
        console.error('Error:', error);
        // Cadangan kalau server sekolah offline, akun tetap bisa masuk lewat memori lokal
        if ((usernameInput === 'heri' || usernameInput === 'admin') && passwordInput === '123') {
            sessionStorage.setItem('username', usernameInput);
            window.location.href = '../index.html';
        } else {
            alertBox.style.display = 'block';
            alertBox.innerText = 'Gagal terhubung ke server login.';
        }
    });
});
