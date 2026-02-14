const gameBoard = document.getElementById("gameBoard");
const restartBtn = document.getElementById("restartBtn");

let cardsArray = ["🐶","🐱","🐰","🦊","🐼","🐸","🐵","🦁"];
let cards = [...cardsArray, ...cardsArray]; // duplicate for pairs
let flippedCards = [];
let matchedCount = 0;

// Shuffle function
function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

// Create game board
function createBoard() {
    gameBoard.innerHTML = "";
    flippedCards = [];
    matchedCount = 0;
    shuffle(cards).forEach(symbol => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.innerText = "";
        card.dataset.symbol = symbol;
        card.addEventListener("click", flipCard);
        gameBoard.appendChild(card);
    });
}

// Flip card function
function flipCard() {
    if (this.classList.contains("flipped") || this.classList.contains("matched") || flippedCards.length === 2) return;

    this.classList.add("flipped");
    this.innerText = this.dataset.symbol;
    flippedCards.push(this);

    if (flippedCards.length === 2) {
        checkMatch();
    }
}

// Check for match
function checkMatch() {
    const [card1, card2] = flippedCards;
    if (card1.dataset.symbol === card2.dataset.symbol) {
        card1.classList.add("matched");
        card2.classList.add("matched");
        flippedCards = [];
        matchedCount += 2;

        if (matchedCount === cards.length) {
            setTimeout(() => alert("🎉 You won!"), 200);
        }
    } else {
        setTimeout(() => {
            card1.classList.remove("flipped");
            card1.innerText = "";
            card2.classList.remove("flipped");
            card2.innerText = "";
            flippedCards = [];
        }, 800);
    }
}

// Restart button
restartBtn.addEventListener("click", createBoard);

// Initialize
createBoard();
