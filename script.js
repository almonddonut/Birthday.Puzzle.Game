// Mengambil elemen-elemen penting
const startButton = document.getElementById('startBtn');
const shuffleButton = document.getElementById('shuffleBtn');
const playAgainButton = document.getElementById('playAgainBtn');
const openingScreen = document.getElementById('opening-screen');
const gameContainer = document.getElementById('game-container');
const closingScreen = document.getElementById('closing-screen');
const puzzleContainer = document.getElementById('puzzle');
const backgroundMusic = document.getElementById('background-music');
const winSound = document.getElementById('win-sound');

let pieces = [];
let image = new Image();
image.src = 'bubu_dudu_puzzle.jpg'; // Gambar puzzle yang digunakan
const rows = 6;
const cols = 6;

// Mulai game
startButton.addEventListener('click', () => {
    openingScreen.classList.add('hidden');
    gameContainer.classList.remove('hidden');
    backgroundMusic.play();
    createPuzzle();
});

// Fungsi untuk membuat puzzle
function createPuzzle() {
    pieces = [];
    const pieceWidth = image.width / cols;
    const pieceHeight = image.height / rows;

    // Membuat potongan puzzle
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            const piece = document.createElement('div');
            piece.classList.add('puzzle-piece');
            piece.setAttribute('draggable', true);
            piece.style.backgroundImage = `url(${image.src})`;
            piece.style.backgroundSize = `${image.width}px ${image.height}px`;
            piece.style.backgroundPosition = `-${col * pieceWidth}px -${row * pieceHeight}px`;
            piece.dataset.position = `${row}-${col}`;

            piece.addEventListener('dragstart', (e) => {
                e.dataTransfer.setData('text', e.target.dataset.position);
                e.target.classList.add('dragging');  // Menandai elemen yang sedang di-drag
            });

            piece.addEventListener('dragend', (e) => {
                e.target.classList.remove('dragging');  // Menghapus tanda dragging setelah selesai
                renderPuzzle();  // Merender ulang posisi potongan puzzle
                checkPuzzleCompletion();  // Mengecek apakah puzzle selesai
            });

            piece.addEventListener('dragover', (e) => {
                e.preventDefault();  // Mencegah default untuk memperbolehkan drop
            });

            piece.addEventListener('drop', (e) => {
                e.preventDefault();
                const startPos = e.dataTransfer.getData('text').split('-');
                const startRow = parseInt(startPos[0]);
                const startCol = parseInt(startPos[1]);
                const endPos = e.target.dataset.position.split('-');
                const endRow = parseInt(endPos[0]);
                const endCol = parseInt(endPos[1]);

                // Menukar posisi
                const startPiece = document.querySelector(`[data-position='${startRow}-${startCol}']`);
                const endPiece = document.querySelector(`[data-position='${endRow}-${endCol}']`);
                startPiece.dataset.position = `${endRow}-${endCol}`;
                endPiece.dataset.position = `${startRow}-${startCol}`;

                renderPuzzle();
                checkPuzzleCompletion(); // Mengecek apakah puzzle selesai
            });

            pieces.push(piece);
        }
    }
    renderPuzzle();
}

// Fungsi untuk menampilkan potongan puzzle di layar
function renderPuzzle() {
    puzzleContainer.innerHTML = '';  // Bersihkan puzzle lama
    pieces.forEach(piece => {
        puzzleContainer.appendChild(piece);
    });
}

// Fungsi untuk mengacak puzzle
shuffleButton.addEventListener('click', () => {
    pieces = shuffleArray(pieces);
    updatePuzzlePositions(); // Perbarui posisi puzzle setelah diacak
    renderPuzzle();
});

// Mengacak urutan array puzzle menggunakan algoritma Fisher-Yates
function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]]; // Tukar elemen
    }
    return arr;
}

// Memperbarui posisi background puzzle setelah diacak
function updatePuzzlePositions() {
    pieces.forEach((piece, index) => {
        const row = Math.floor(index / cols);
        const col = index % cols;
        const pieceWidth = image.width / cols;
        const pieceHeight = image.height / rows;
        
        piece.style.backgroundPosition = `-${col * pieceWidth}px -${row * pieceHeight}px`;
        piece.dataset.position = `${row}-${col}`;
    });
}

// Fungsi untuk mengecek apakah puzzle sudah selesai
function checkPuzzleCompletion() {
    const isCompleted = pieces.every(piece => {
        const correctPos = piece.dataset.position.split('-');
        const row = parseInt(correctPos[0]);
        const col = parseInt(correctPos[1]);
        return piece.style.backgroundPosition === `-${col * (image.width / cols)}px -${row * (image.height / rows)}px`;
    });

    if (isCompleted) {
        winSound.play();
        closingScreen.classList.remove('hidden');
        gameContainer.classList.add('hidden');
    }
}

// Tombol "Play Again"
playAgainButton.addEventListener('click', () => {
    closingScreen.classList.add('hidden');
    openingScreen.classList.remove('hidden');
    backgroundMusic.pause();
    backgroundMusic.currentTime = 0;
});
