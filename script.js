// Game setup
let puzzlePieces = [];
const puzzleContainer = document.getElementById('puzzle');
const shuffleButton = document.getElementById('shuffleBtn');
const startButton = document.getElementById('startBtn');
const openingScreen = document.getElementById('opening-screen');
const gameContainer = document.getElementById('game-container');
const closingScreen = document.getElementById('closing-screen');
const playAgainButton = document.getElementById('playAgainBtn');

// Musik dan suara
const backgroundMusic = document.getElementById('background-music');
const winSound = document.getElementById('win-sound');

// Gambar puzzle
const image = new Image();
image.src = 'bubu_dudu_puzzle.jpg'; // Gambar puzzle yang digunakan
let rows = 6; // Ukuran grid 6x6
let cols = 6;

// Fungsi untuk membuat puzzle
function createPuzzle() {
    const pieceWidth = image.width / cols;
    const pieceHeight = image.height / rows;

    puzzlePieces = [];

    // Membuat potongan puzzle dan menambahkannya ke array
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            const piece = document.createElement('div');
            piece.style.backgroundImage = `url(${image.src})`;
            piece.style.backgroundSize = `${image.width}px ${image.height}px`;
            piece.style.backgroundPosition = `-${col * pieceWidth}px -${row * pieceHeight}px`;
            piece.classList.add('puzzle-piece');
            piece.dataset.position = `${row}-${col}`;
            piece.setAttribute('draggable', true);

            // Menambahkan event listener untuk drag
            piece.addEventListener('dragstart', (e) => {
                e.dataTransfer.setData('text', e.target.dataset.position);
            });

            piece.addEventListener('dragover', (e) => {
                e.preventDefault();
            });

            piece.addEventListener('drop', (e) => {
                e.preventDefault();
                const startPos = e.dataTransfer.getData('text').split('-');
                const startRow = parseInt(startPos[0]);
                const startCol = parseInt(startPos[1]);
                const endPos = e.target.dataset.position.split('-');
                const endRow = parseInt(endPos[0]);
                const endCol = parseInt(endPos[1]);

                const startPiece = document.querySelector(`[data-position='${startRow}-${startCol}']`);
                const endPiece = document.querySelector(`[data-position='${endRow}-${endCol}']`);

                // Menukar posisi dua potongan puzzle
                startPiece.dataset.position = `${endRow}-${endCol}`;
                endPiece.dataset.position = `${startRow}-${startCol}`;

                renderPuzzle();
                checkPuzzleCompletion(); // Mengecek apakah puzzle sudah selesai
            });

            puzzlePieces.push(piece);
        }
    }

    renderPuzzle();
}

// Fungsi untuk menampilkan puzzle di layar
function renderPuzzle() {
    puzzleContainer.innerHTML = '';  // Bersihkan puzzle yang lama

    // Menambahkan potongan puzzle yang sudah diacak ke dalam grid
    puzzlePieces.forEach(piece => {
        puzzleContainer.appendChild(piece);
    });
}

// Fungsi untuk mengacak posisi puzzle
function shufflePuzzle() {
    // Mengacak urutan potongan puzzle secara acak
    puzzlePieces = shuffleArray(puzzlePieces);

    renderPuzzle(); // Menyusun kembali puzzle setelah diacak
}

// Fungsi untuk mengacak array (menggunakan algoritma Fisher-Yates)
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Tukar elemen
    }
    return array;
}

// Fungsi untuk mulai permainan
startButton.addEventListener('click', () => {
    openingScreen.classList.add('hidden');
    gameContainer.classList.remove('hidden');
    backgroundMusic.play();
    createPuzzle();
});

// Fungsi untuk selesai dan menampilkan pesan kemenangan
function endGame() {
    closingScreen.classList.remove('hidden');
    winSound.play();
    gameContainer.classList.add('hidden');
}

// Memeriksa apakah puzzle sudah selesai
function checkPuzzleCompletion() {
    const isCompleted = puzzlePieces.every(piece => {
        const correctPosition = piece.dataset.position.split('-');
        const row = parseInt(correctPosition[0]);
        const col = parseInt(correctPosition[1]);
        return piece.style.backgroundPosition === `-${col * (image.width / cols)}px -${row * (image.height / rows)}px`;
    });

    if (isCompleted) {
        endGame();
    }
}

// Play again button
playAgainButton.addEventListener('click', () => {
    closingScreen.classList.add('hidden');
    openingScreen.classList.remove('hidden');
    backgroundMusic.pause();
    backgroundMusic.currentTime = 0;
});
