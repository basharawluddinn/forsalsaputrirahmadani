// Periksa apakah audio player sudah ada
if (!window.audioPlayer) {
  // Jika belum ada, buat elemen audio global
  const audio = document.createElement('audio');
  audio.src = 'monolog.mp3'; // Ganti dengan jalur file audio
  audio.loop = true; // Ulangi terus
  audio.volume = 0.5; // Atur volume
  window.audioPlayer = audio; // Simpan elemen audio ke global

  // Cek posisi terakhir dari sessionStorage
  const savedTime = sessionStorage.getItem('audioCurrentTime');
  if (savedTime) {
    audio.currentTime = parseFloat(savedTime); // Lanjutkan dari posisi terakhir
  }

  // Cek apakah audio dalam keadaan paused
  const isPaused = sessionStorage.getItem('audioPaused');
  if (isPaused === 'false') {
    // Mulai audio jika sebelumnya tidak dipause
    audio.play().catch(() => {
      console.log('Autoplay dicegah, menunggu interaksi pengguna.');
    });
  }

  // Simpan waktu pemutaran secara berkala
  audio.addEventListener('timeupdate', () => {
    sessionStorage.setItem('audioCurrentTime', audio.currentTime);
  });
}

// Fungsi untuk memperbarui teks tombol play/pause
function updateButtonText(button) {
  button.textContent = window.audioPlayer.paused ? 'Mulai Musik' : 'Hentikan Musik';
}

// Fungsi untuk menangani tombol play/pause
function setupMusicButton(buttonId) {
  const button = document.getElementById(buttonId);
  if (!button) return; // Jika tombol tidak ada, hentikan fungsi

  // Perbarui teks tombol saat halaman dimuat
  updateButtonText(button);

  // Tambahkan event listener untuk klik tombol
  button.addEventListener('click', () => {
    if (window.audioPlayer.paused) {
      // Jika musik sedang paused, lanjutkan dari posisi terakhir
      const savedTime = sessionStorage.getItem('audioCurrentTime');
      if (savedTime) {
        window.audioPlayer.currentTime = parseFloat(savedTime);
      }
      window.audioPlayer.play().catch((err) => console.log('Autoplay dicegah:', err));
      sessionStorage.setItem('audioPaused', 'false'); // Simpan status
    } else {
      // Jika musik sedang bermain, pause musik
      window.audioPlayer.pause();
      sessionStorage.setItem('audioPaused', 'true'); // Simpan status
    }
    updateButtonText(button);
  });
}

// Jalankan fungsi ini saat halaman dimuat
window.onload = function () {
  setupMusicButton('toggle-music');
};
