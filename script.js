// Event listener untuk tombol Start Game
document.getElementById('startBtn').addEventListener('click', function() {
    // Sembunyikan opening screen dan tampilkan game container
    document.getElementById('opening-screen').classList.add('hidden');
    document.getElementById('game-container').classList.remove('hidden');
    
    // Memastikan tampilan game muncul setelah tombol Start Game ditekan
    document.getElementById('game-container').style.animation = "fadeIn 1s ease-out"; 

    // Mulai musik latar belakang
    const music = document.getElementById('background-music');
    if (music.paused) {
        music.play();
    }
});

// Fungsi untuk menunjukkan layar penutupan setelah selesai
function showClosingScreen() {
    document.getElementById('game-container').classList.add('hidden');
    document.getElementById('closing-screen').classList.remove('hidden');

    // Mainkan suara kemenangan
    const winSound = document.getElementById('win-sound');
    winSound.play();
}

// Event listener untuk tombol "Play Again"
document.getElementById('playAgainBtn').addEventListener('click', function() {
    // Reset game dan kembali ke opening screen
    document.getElementById('closing-screen').classList.add('hidden');
    document.getElementById('opening-screen').classList.remove('hidden');

    // Hentikan musik kemenangan dan mainkan musik latar lagi
    const winSound = document.getElementById('win-sound');
    winSound.pause();
    winSound.currentTime = 0;

    const music = document.getElementById('background-music');
    if (music.paused) {
        music.play();
    }
});

// Event listener untuk tombol "Shuffle Puzzle" - di sini hanya contoh
document.getElementById('shuffleBtn').addEventListener('click', function() {
    // Fungsi untuk mengacak puzzle (tambahkan logika puzzle di sini)
    console.log("Puzzle shuffled!");
});
