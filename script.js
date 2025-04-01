document.addEventListener('DOMContentLoaded', function () {
    const startBtn = document.getElementById('startBtn');
    const gameContainer = document.getElementById('game-container');
    const openingScreen = document.getElementById('opening-screen');
    const shuffleBtn = document.getElementById('shuffleBtn');
    const puzzleContainer = document.getElementById('puzzle');
    const timerDisplay = document.getElementById('timer');
    const playAgainBtn = document.getElementById('playAgainBtn');
    let puzzlePieces = [];
    let timer = 0;
    let interval;
    const winSound = document.getElementById('win-sound');
    const backgroundMusic = document.getElementById('background-music');
    
    // Play background music
    backgroundMusic.play();

    // Tombol untuk mulai permainan
    startBtn.addEventListener('click', function () {
        openingScreen.classList.add('hidden');  // Menyembunyikan opening screen
        gameContainer.classList.remove('hidden');  // Menampilkan game container
        startGame();  // Memulai game
    });

    // Tombol untuk memainkan ulang
    playAgainBtn.addEventListener('click', function () {
        resetGame();
        startGame();
    });

    // Fungsi untuk memulai permainan
    function startGame() {
        puzzlePieces = generatePuzzle();
        renderPuzzle();
        startTimer();
    }

    // Fungsi untuk memulai ulang game
    function resetGame() {
        clearInterval(interval); // Hentikan timer
        timer = 0;
        timerDisplay.innerHTML = 'Time: 00:00';
    }

    // Fungsi untuk mengacak puzzle
    function shufflePuzzle() {
        puzzlePieces = shuffleArray(puzzlePieces);
        renderPuzzle();
    }

    // Tombol shuffle untuk mengacak puzzle
    shuffleBtn.addEventListener('click', shufflePuzzle);

    // Fungsi untuk membuat puzzle
    function generatePuzzle() {
        const pieces = [];
        for (let i = 1; i <= 35; i++) {  // Total 35 potongan (potongan ke-36 adalah kosong)
            pieces.push(i);
        }
        pieces.push(''); // Tempat kosong (36)
        return pieces;
    }

    // Fungsi untuk me-render puzzle di halaman
    function renderPuzzle() {
        puzzleContainer.innerHTML = '';  // Bersihkan puzzle lama
        puzzlePieces.forEach((piece, index) => {
            const pieceElement = document.createElement('div');
            pieceElement.classList.add('puzzle-piece');
            pieceElement.setAttribute('data-value', piece);
            pieceElement.setAttribute('draggable', true); // Menambahkan draggable ke potongan puzzle
            pieceElement.setAttribute('data-index', index); // Menyimpan index potongan untuk referensi

            // Jika piece bukan kosong, set background-position sesuai data-value
            if (piece !== '') {
                pieceElement.style.backgroundPosition = getBackgroundPosition(piece);
            }

            pieceElement.addEventListener('dragstart', handleDragStart); // Event listener untuk dragstart
            pieceElement.addEventListener('dragover', handleDragOver); // Event listener untuk dragover
            pieceElement.addEventListener('drop', handleDrop); // Event listener untuk drop

            puzzleContainer.appendChild(pieceElement);  // Menambahkan puzzle ke kontainer
        });

        if (checkPuzzleSolved()) {
            winSound.play();  // Putar suara kemenangan
            showClosingScreen();
        }
    }

    // Fungsi untuk mendapatkan background-position berdasarkan value
    function getBackgroundPosition(value) {
        const row = Math.floor((value - 1) / 6);
        const col = (value - 1) % 6;
        return `-${col * 100}px -${row * 100}px`;
    }

    // Fungsi untuk mengacak array
    function shuffleArray(array) {
        let shuffledArray = [...array];
        for (let i = shuffledArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
        }
        return shuffledArray;
    }

    // Fungsi untuk memeriksa apakah puzzle sudah terurut
    function checkPuzzleSolved() {
        for (let i = 0; i < puzzlePieces.length; i++) {
            if (puzzlePieces[i] !== (i + 1) && puzzlePieces[i] !== '') {
                return false;
            }
        }
        return true;
    }

    // Fungsi untuk menangani event dragstart
    function handleDragStart(event) {
        // Simpan data item yang sedang di-drag
        event.dataTransfer.setData("text/plain", event.target.dataset.index);
    }

    // Fungsi untuk menangani event dragover
    function handleDragOver(event) {
        event.preventDefault(); // Wajib untuk memungkinkan drop
    }

    // Fungsi untuk menangani event drop
    function handleDrop(event) {
        event.preventDefault(); // Hindari aksi default

        const draggedIndex = event.dataTransfer.getData("text/plain");
        const targetIndex = event.target.dataset.index;

        // Tukar posisi potongan puzzle jika mereka berada pada posisi yang tepat
        if (isAdjacent(event.target, puzzleContainer.children[draggedIndex])) {
            swapPieces(draggedIndex, targetIndex);
            renderPuzzle();
        }
    }

    // Fungsi untuk memeriksa apakah dua potongan puzzle bersebelahan
    function isAdjacent(piece1, piece2) {
        const index1 = Array.from(puzzleContainer.children).indexOf(piece1);
        const index2 = Array.from(puzzleContainer.children).indexOf(piece2);
        const row1 = Math.floor(index1 / 6);
        const col1 = index1 % 6;
        const row2 = Math.floor(index2 / 6);
        const col2 = index2 % 6;

        return Math.abs(row1 - row2) + Math.abs(col1 - col2) === 1;
    }

    // Fungsi untuk menukar posisi potongan puzzle
    function swapPieces(index1, index2) {
        const temp = puzzlePieces[index1];
        puzzlePieces[index1] = puzzlePieces[index2];
        puzzlePieces[index2] = temp;
    }

    // Fungsi untuk memulai timer
    function startTimer() {
        interval = setInterval(function () {
            timer++;
            const minutes = Math.floor(timer / 60);
            const seconds = timer % 60;
            timerDisplay.innerHTML = `Time: ${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        }, 1000);
    }

    // Menampilkan layar penutupan ketika puzzle selesai
    function showClosingScreen() {
        gameContainer.classList.add('hidden');
        document.getElementById('closing-screen').classList.remove('hidden');
    }
});
