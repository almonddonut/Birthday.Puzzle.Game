// Initial game setup
const startBtn = document.getElementById('start-btn');
const gameContainer = document.getElementById('game-container');
const puzzleGrid = document.getElementById('puzzle-grid');
const openingScreen = document.getElementById('opening-screen');
const gameOverScreen = document.getElementById('game-over-screen');
const backgroundMusic = document.getElementById('background-music');
const restartBtn = document.getElementById('restart-btn');
let pieces = [];
let emptyPieceIndex = 0;
let moves = 0;

// Setup the puzzle grid (6x6)
const gridSize = 6;
const totalPieces = gridSize * gridSize;
const image = 'bubu_dudu_puzzle.jpg'; // Change to your image file

// Shuffle puzzle pieces
function shufflePuzzle() {
    let shuffled = [];
    const order = [...Array(totalPieces).keys()];
    for (let i = order.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [order[i], order[j]] = [order[j], order[i]];
    }
    return order;
}

// Create puzzle pieces
function createPuzzlePieces() {
    const shuffledOrder = shufflePuzzle();
    pieces = shuffledOrder.map((index) => {
        const piece = document.createElement('div');
        piece.classList.add('puzzle-piece');
        piece.style.backgroundImage = `url(${image})`;
        piece.style.backgroundPosition = `${(index % gridSize) * 100}px ${(Math.floor(index / gridSize)) * 100}px`;
        piece.setAttribute('data-index', index);
        piece.addEventListener('click', movePiece);
        puzzleGrid.appendChild(piece);
        return piece;
    });
}

// Handle moving puzzle pieces
function movePiece(e) {
    const clickedIndex = parseInt(e.target.getAttribute('data-index'));
    const emptyRow = Math.floor(emptyPieceIndex / gridSize);
    const emptyCol = emptyPieceIndex % gridSize;
    const clickedRow = Math.floor(clickedIndex / gridSize);
    const clickedCol = clickedIndex % gridSize;

    // Check if the clicked piece is adjacent to the empty piece
    if (
        (Math.abs(clickedRow - emptyRow) === 1 && clickedCol === emptyCol) ||
        (Math.abs(clickedCol - emptyCol) === 1 && clickedRow === emptyRow)
    ) {
        // Swap pieces
        pieces[emptyPieceIndex].style.backgroundPosition = `${(clickedCol) * 100}px ${(clickedRow) * 100}px`;
        pieces[clickedIndex].style.backgroundPosition = `${(emptyCol) * 100}px ${(emptyRow) * 100}px`;

        [pieces[emptyPieceIndex], pieces[clickedIndex]] = [pieces[clickedIndex], pieces[emptyPieceIndex]];
        emptyPieceIndex = clickedIndex;
        moves++;

        // Check if the puzzle is solved
        checkWin();
    }
}

// Check if the puzzle is solved
function checkWin() {
    if (pieces.every((piece, index) => parseInt(piece.getAttribute('data-index')) === index)) {
        backgroundMusic.pause();
        const winMusic = new Audio('musik_kemenangan.mp3');
        winMusic.play();
        gameOverScreen.style.display = 'block';
    }
}

// Start the game
startBtn.addEventListener('click', () => {
    openingScreen.style.display = 'none';
    gameContainer.style.display = 'block';
    createPuzzlePieces();
    backgroundMusic.play();
});

// Restart the game
restartBtn.addEventListener('click', () => {
    gameOverScreen.style.display = 'none';
    puzzleGrid.innerHTML = '';
    createPuzzlePieces();
    backgroundMusic.play();
});
