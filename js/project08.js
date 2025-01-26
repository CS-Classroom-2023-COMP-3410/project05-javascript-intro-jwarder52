document.addEventListener("DOMContentLoaded", () => {
    const storyContent = document.getElementById("story-content");
    const storyText = document.getElementById("story-text");
    const choicesDiv = document.getElementById("choices");
    const progressList = document.getElementById("progress-list");
  
    const startButton = document.getElementById("start-button");
    const resetButton = document.getElementById("reset-button");
    const saveButton = document.getElementById("save-button");
    const resumeButton = document.getElementById("resume-button");
  
    const story = {
      start: {
        text: "You wake up in a dark forest. There are two paths ahead.",
        choices: [
          { text: "Take the left path", next: "leftPath" },
          { text: "Take the right path", next: "rightPath" }
        ]
      },
      leftPath: {
        text: "You encounter a river. You can cross it or follow it downstream.",
        choices: [
          { text: "Cross the river", next: "crossRiver" },
          { text: "Follow the river", next: "followRiver" }
        ]
      },
      rightPath: {
        text: "You find an abandoned cabin. You can enter or keep walking.",
        choices: [
          { text: "Enter the cabin", next: "enterCabin" },
          { text: "Keep walking", next: "keepWalking" }
        ]
      },
      crossRiver: {
        text: "You successfully cross the river and find a treasure chest.",
        choices: []
      },
      followRiver: {
        text: "You follow the river and reach a peaceful village.",
        choices: []
      },
      enterCabin: {
        text: "You enter the cabin and discover a hidden map.",
        choices: []
      },
      keepWalking: {
        text: "You keep walking and encounter a group of friendly travelers.",
        choices: []
      }
    };
  
    let currentStep = null;
    let progress = [];
  
    function updateStory(step) {
      currentStep = step;
      const storyStep = story[step];
  
      // Update story text
      storyText.textContent = storyStep.text;
  
      // Update choices
      choicesDiv.innerHTML = "";
      storyStep.choices.forEach(choice => {
        const button = document.createElement("button");
        button.textContent = choice.text;
        button.addEventListener("click", () => makeChoice(choice.next));
        choicesDiv.appendChild(button);
      });
  
      // Update progress
      if (!progress.includes(step)) {
        progress.push(step);
      }
      updateProgress();
    }
  
    function updateProgress() {
      progressList.innerHTML = "";
      progress.forEach(step => {
        const li = document.createElement("li");
        li.textContent = story[step].text;
        progressList.appendChild(li);
      });
    }
  
    function makeChoice(nextStep) {
      updateStory(nextStep);
    }
  
    function resetGame() {
      currentStep = null;
      progress = [];
      storyText.textContent = "Click 'Start' to begin your adventure.";
      choicesDiv.innerHTML = "";
      progressList.innerHTML = "";
    }
  
    function saveProgress() {
      const savedData = { currentStep, progress };
      localStorage.setItem("storyProgress", JSON.stringify(savedData));
      alert("Progress saved!");
      resumeButton.disabled = false; // Enable resume button if saved
    }
  
    function resumeGame() {
      const savedData = JSON.parse(localStorage.getItem("storyProgress"));
      if (savedData) {
        currentStep = savedData.currentStep;
        progress = savedData.progress;
        updateProgress();
        updateStory(currentStep);
      } else {
        alert("No saved progress found.");
      }
    }
  
    startButton.addEventListener("click", () => updateStory("start"));
    resetButton.addEventListener("click", resetGame);
    saveButton.addEventListener("click", saveProgress);
    resumeButton.addEventListener("click", resumeGame);
  
    // Enable or disable the Resume button based on saved progress
    if (localStorage.getItem("storyProgress")) {
      resumeButton.disabled = false;
    } else {
      resumeButton.disabled = true;
    }
  });
  