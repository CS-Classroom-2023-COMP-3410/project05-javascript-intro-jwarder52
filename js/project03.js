document.addEventListener("DOMContentLoaded", () => {
    const gameGrid = document.getElementById("game-grid");
    const moveCounter = document.getElementById("move-counter");
    const timer = document.getElementById("timer");
    const restartButton = document.getElementById("restart-button");
  
    const cards = [
      "🍎", "🍎", "🍌", "🍌", "🍇", "🍇", "🍓", "🍓",
      "🍒", "🍒", "🍍", "🍍", "🥝", "🥝", "🍉", "🍉"
    ];
  
    let flippedCards = [];
    let matchedPairs = 0;
    let moves = 0;
    let gameTimer = null;
    let secondsElapsed = 0;
  
    function shuffle(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    }
  
    function initializeGame() {
      // Reset game variables
      flippedCards = [];
      matchedPairs = 0;
      moves = 0;
      secondsElapsed = 0;
      moveCounter.textContent = moves;
      timer.textContent = "0:00";
  
      // Stop any ongoing timer
      clearInterval(gameTimer);
  
      // Shuffle cards and create grid
      gameGrid.innerHTML = "";
      shuffle(cards).forEach(card => {
        const cardElement = document.createElement("div");
        cardElement.classList.add("card");
        cardElement.dataset.cardValue = card;
        cardElement.addEventListener("click", flipCard);
        gameGrid.appendChild(cardElement);
      });
  
      // Start the timer
      startTimer();
    }
  
    function startTimer() {
      gameTimer = setInterval(() => {
        secondsElapsed++;
        const minutes = Math.floor(secondsElapsed / 60);
        const seconds = secondsElapsed % 60;
        timer.textContent = `${minutes}:${seconds.toString().padStart(2, "0")}`;
      }, 1000);
    }
  
    function flipCard() {
      if (flippedCards.length === 2) return;
  
      const card = this;
  
      if (!card.classList.contains("flip")) {
        card.classList.add("flip");
        card.textContent = card.dataset.cardValue;
        flippedCards.push(card);
  
        if (flippedCards.length === 2) {
          moves++;
          moveCounter.textContent = moves;
          checkForMatch();
        }
      }
    }
  
    function checkForMatch() {
      const [card1, card2] = flippedCards;
  
      if (card1.dataset.cardValue === card2.dataset.cardValue) {
        card1.classList.add("match");
        card2.classList.add("match");
        matchedPairs++;
        flippedCards = [];
  
        if (matchedPairs === cards.length / 2) {
          clearInterval(gameTimer);
          alert(`Congratulations! You completed the game in ${moves} moves and ${timer.textContent}.`);
        }
      } else {
        setTimeout(() => {
          card1.classList.remove("flip");
          card2.classList.remove("flip");
          card1.textContent = "";
          card2.textContent = "";
          flippedCards = [];
        }, 1000);
      }
    }
  
    restartButton.addEventListener("click", initializeGame);
  
    // Initialize the game on load
    initializeGame();
  });
  