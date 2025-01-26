document.addEventListener("DOMContentLoaded", () => {
  const difficultySelect = document.getElementById("difficulty");
  const startButton = document.getElementById("start-training");
  const restartButton = document.getElementById("restart");
  const textToTypeDiv = document.getElementById("text-to-type");
  const userInput = document.getElementById("user-input");
  const wpmDisplay = document.getElementById("wpm");
  const accuracyDisplay = document.getElementById("accuracy");

  let targetText = "";
  let startTime = null;
  let typedCharacters = 0;
  let totalMistakes = 0;

  const textOptions = {
    easy: ["cat", "dog", "tree", "book", "star"],
    medium: ["Hello, world!", "JavaScript is fun!", "Type this sentence.", "Practice makes perfect."],
    hard: [
      "Typing tests are challenging! @#$",
      "Accuracy > Speed!",
      "WPM includes spaces & punctuation.",
      "12345 is easy, isn't it?"
    ]
  };

  function generateText(difficulty) {
    const options = textOptions[difficulty];
    return options[Math.floor(Math.random() * options.length)];
  }

  function startTraining() {
    const difficulty = difficultySelect.value;
    targetText = generateText(difficulty);
    textToTypeDiv.textContent = targetText;
    userInput.value = "";
    userInput.disabled = false;
    userInput.focus();
    startTime = new Date();
    typedCharacters = 0;
    totalMistakes = 0;
    wpmDisplay.textContent = "WPM: 0";
    accuracyDisplay.textContent = "Accuracy: 0%";
  }

  function calculateResults() {
    const elapsedTime = (new Date() - startTime) / 1000; // in seconds
    const wordsTyped = targetText.split(" ").length;
    const wpm = Math.round((wordsTyped / elapsedTime) * 60);
    const accuracy = Math.max(0, Math.round(((targetText.length - totalMistakes) / targetText.length) * 100));

    wpmDisplay.textContent = `WPM: ${wpm}`;
    accuracyDisplay.textContent = `Accuracy: ${accuracy}%`;
  }

  userInput.addEventListener("input", () => {
    const typedText = userInput.value;
    typedCharacters += 1;

    // Highlight errors
    let highlightedText = "";
    for (let i = 0; i < targetText.length; i++) {
      if (i < typedText.length) {
        if (typedText[i] === targetText[i]) {
          highlightedText += `<span style="color: #0f0;">${targetText[i]}</span>`;
        } else {
          highlightedText += `<span style="color: #f00;">${targetText[i] || " "}</span>`;
          totalMistakes += 1; // Increment mistakes for each error
        }
      } else {
        highlightedText += targetText[i];
      }
    }
    textToTypeDiv.innerHTML = highlightedText;

    // Update accuracy and WPM dynamically
    calculateResults();

    // Check for completion
    if (typedText === targetText) {
      userInput.disabled = true;
      calculateResults(); // Final calculation
    }
  });

  startButton.addEventListener("click", startTraining);
  restartButton.addEventListener("click", () => {
    textToTypeDiv.textContent = "Select a difficulty and click 'Start Training' to begin.";
    userInput.value = "";
    userInput.disabled = true;
    wpmDisplay.textContent = "WPM: 0";
    accuracyDisplay.textContent = "Accuracy: 0%";
    totalMistakes = 0;
  });
});
