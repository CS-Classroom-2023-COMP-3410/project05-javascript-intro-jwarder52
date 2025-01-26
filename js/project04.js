document.addEventListener("DOMContentLoaded", () => {
    const quizData = [
      {
        question: "What is the capital of France?",
        options: ["Berlin", "Madrid", "Paris", "Rome"],
        answer: 2
      },
      {
        question: "Which planet is known as the Red Planet?",
        options: ["Earth", "Mars", "Jupiter", "Saturn"],
        answer: 1
      },
      {
        question: "What is the largest ocean on Earth?",
        options: ["Atlantic Ocean", "Indian Ocean", "Pacific Ocean", "Arctic Ocean"],
        answer: 2
      },
      {
        question: "Who wrote 'To Kill a Mockingbird'?",
        options: ["Harper Lee", "J.K. Rowling", "George Orwell", "Jane Austen"],
        answer: 0
      },
    ];
  
    const quizContent = document.getElementById("quiz-content");
    const nextButton = document.getElementById("next-button");
    const restartButton = document.getElementById("restart-button");
  
    let currentQuestionIndex = 0;
    let score = 0;
    let userAnswers = [];
  
    function loadQuestion() {
      const currentQuestion = quizData[currentQuestionIndex];
      quizContent.innerHTML = `
        <div class="question">${currentQuestion.question}</div>
        <ul class="options">
          ${currentQuestion.options
            .map(
              (option, index) =>
                `<li><label><input type="radio" name="option" value="${index}"> ${option}</label></li>`
            )
            .join("")}
        </ul>
        <div id="feedback"></div>
      `;
    }
  
    function handleNext() {
      const selectedOption = document.querySelector('input[name="option"]:checked');
      const feedback = document.getElementById("feedback");
  
      if (!selectedOption) {
        feedback.textContent = "Please select an option!";
        feedback.classList.add("wrong-answer");
        return;
      }
  
      const selectedAnswer = parseInt(selectedOption.value);
      const currentQuestion = quizData[currentQuestionIndex];
  
      if (selectedAnswer === currentQuestion.answer) {
        score++;
        feedback.textContent = "Correct!";
        feedback.className = "correct-answer";
      } else {
        feedback.textContent = `Wrong! Correct answer: ${currentQuestion.options[currentQuestion.answer]}`;
        feedback.className = "wrong-answer";
      }
  
      userAnswers.push(selectedAnswer);
  
      // Delay before moving to the next question
      setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < quizData.length) {
          loadQuestion();
        } else {
          displayResults();
        }
      }, 1500);
    }
  
    function displayResults() {
      quizContent.innerHTML = `
        <div class="result">You scored ${score} out of ${quizData.length}.</div>
        <ul class="review">
          ${quizData
            .map(
              (question, index) =>
                `<li>
                  <div class="question">${question.question}</div>
                  <div>Your answer: ${
                    question.options[userAnswers[index]]
                  } ${
                    userAnswers[index] === question.answer
                      ? '<span class="correct-answer">(Correct)</span>'
                      : `<span class="wrong-answer">(Wrong, Correct: ${question.options[question.answer]})</span>`
                  }</div>
                </li>`
            )
            .join("")}
        </ul>
      `;
      nextButton.style.display = "none";
      restartButton.style.display = "inline-block";
    }
  
    function restartQuiz() {
      currentQuestionIndex = 0;
      score = 0;
      userAnswers = [];
      nextButton.style.display = "inline-block";
      restartButton.style.display = "none";
      loadQuestion();
    }
  
    nextButton.addEventListener("click", handleNext);
    restartButton.addEventListener("click", restartQuiz);
  
    // Initialize quiz
    loadQuestion();
  });
  