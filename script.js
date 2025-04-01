// Menunggu halaman dimuat sepenuhnya
document.addEventListener('DOMContentLoaded', function () {
    // Menampilkan opening screen dan menyembunyikan game container
    const startBtn = document.getElementById('startBtn');
    const gameContainer = document.getElementById('game-container');
    const openingScreen = document.getElementById('opening-screen');
    const shuffleBtn = document.getElementById('shuffleBtn');
    const puzzleContainer = document.getElementById('puzzle');
    const timerDisplay = document.getElementById('timer');
    let puzzlePieces = [];
    let timer = 0;
    let interval;
    
    // Tombol untuk mulai permainan
    startBtn.addEventListener('click', function () {
        openingScreen.classList.add('hidden');
        gameContainer.classList.remove('hidden');
        startGame();
    });

    // Fungsi untuk memulai permainan
    function startGame() {
        puzzlePieces = generatePuzzle();
        renderPuzzle();
        startTimer();
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
        for (let i = 1; i <= 16; i++) {
            pieces.push(i);
        }
        return pieces;
    }

    // Fungsi untuk me-render puzzle di halaman
    function renderPuzzle() {
        puzzleContainer.innerHTML = '';
        puzzlePieces.forEach(piece => {
            const pieceElement = document.createElement('div');
            pieceElement.classList.add('puzzle-piece');
            pieceElement.innerHTML = piece !== 16 ? piece : ''; // 16 kosongkan
            pieceElement.setAttribute('data-value', piece);
            pieceElement.addEventListener('click', handlePieceClick);
            puzzleContainer.appendChild(pieceElement);
        });
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

    // Fungsi untuk menghandle klik pada setiap potongan puzzle
    function handlePieceClick(event) {
        const clickedPiece = event.target;
        const emptyPiece = document.querySelector('.puzzle-piece[data-value="16"]');
        
        if (isAdjacent(clickedPiece, emptyPiece)) {
            // Tukar posisi potongan puzzle
            const tempValue = clickedPiece.innerHTML;
            clickedPiece.innerHTML = emptyPiece.innerHTML;
            emptyPiece.innerHTML = tempValue;
        }
    }

    // Fungsi untuk memeriksa apakah dua potongan puzzle bersebelahan
    function isAdjacent(piece1, piece2) {
        const index1 = Array.from(puzzleContainer.children).indexOf(piece1);
        const index2 = Array.from(puzzleContainer.children).indexOf(piece2);
        const row1 = Math.floor(index1 / 4);
        const col1 = index1 % 4;
        const row2 = Math.floor(index2 / 4);
        const col2 = index2 % 4;

        return Math.abs(row1 - row2) + Math.abs(col1 - col2) === 1;
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
});
