document.addEventListener("DOMContentLoaded", () => {
  const arrayContainer = document.getElementById("array-container");
  const algorithmSelector = document.getElementById("algorithm-selector");
  const speedInput = document.getElementById("speed");
  const explanation = document.getElementById("explanation");
  const generateArrayButton = document.getElementById("generate-array");
  const startSortingButton = document.getElementById("start-sorting");
  const resetButton = document.getElementById("reset");

  let array = [];
  let animationSpeed = 500; // Default animation speed in ms
  let isSorting = false;
  let stopSorting = false; // Flag to stop sorting mid-process

  function generateArray(size = 20) {
    array = Array.from({ length: size }, () => Math.floor(Math.random() * 100) + 10);
    renderArray();
    explanation.textContent = "Array generated. Select a sorting algorithm and click 'Start Sorting' to begin.";
  }

  function renderArray(highlightIndex = null, secondaryHighlightIndex = null) {
    arrayContainer.innerHTML = "";
    array.forEach((value, index) => {
      const bar = document.createElement("div");
      bar.className = "bar";
      bar.style.height = `${value * 2}px`;

      // Highlight the currently active item in green
      if (index === highlightIndex) {
        bar.style.backgroundColor = "#28a745";
      }
      // Optionally, highlight another active comparison item
      if (index === secondaryHighlightIndex) {
        bar.style.backgroundColor = "#ffc107";
      }

      arrayContainer.appendChild(bar);
    });
  }

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async function bubbleSort() {
    explanation.textContent = "Bubble Sort: Repeatedly compare and swap adjacent elements if they are in the wrong order.";
    for (let i = 0; i < array.length; i++) {
      for (let j = 0; j < array.length - i - 1; j++) {
        if (stopSorting) return; // Stop sorting if reset is triggered

        renderArray(j, j + 1);

        if (array[j] > array[j + 1]) {
          [array[j], array[j + 1]] = [array[j + 1], array[j]];
          renderArray(j, j + 1);
        }

        await sleep(animationSpeed);
      }
    }
    renderArray();
    explanation.textContent = "Array is sorted!";
    isSorting = false;
    stopSorting = false;
  }

  async function insertionSort() {
    explanation.textContent = "Insertion Sort: Build the sorted array by inserting elements in the correct position.";
    for (let i = 1; i < array.length; i++) {
      if (stopSorting) return; // Stop sorting if reset is triggered

      let key = array[i];
      let j = i - 1;

      while (j >= 0 && array[j] > key) {
        if (stopSorting) return; // Stop sorting if reset is triggered

        array[j + 1] = array[j];
        renderArray(j + 1, j);
        await sleep(animationSpeed);
        j--;
      }
      array[j + 1] = key;
      renderArray(j + 1);
    }
    renderArray();
    explanation.textContent = "Array is sorted!";
    isSorting = false;
    stopSorting = false;
  }

  async function startSorting() {
    if (isSorting) return;
    isSorting = true;
    stopSorting = false;

    const algorithm = algorithmSelector.value;

    switch (algorithm) {
      case "bubbleSort":
        await bubbleSort();
        break;
      case "insertionSort":
        await insertionSort();
        break;
      default:
        explanation.textContent = "Invalid sorting algorithm selected.";
    }
  }

  function resetArray() {
    if (isSorting) {
      stopSorting = true; // Stop the sorting process
      isSorting = false; // Reset the sorting flag
    }
    generateArray(); // Generate a new array
  }

  generateArrayButton.addEventListener("click", resetArray);
  startSortingButton.addEventListener("click", startSorting);
  resetButton.addEventListener("click", resetArray);
  speedInput.addEventListener("input", event => {
    animationSpeed = 1050 - event.target.value; // Speed adjustment (higher value = slower)
  });

  // Generate the initial array
  generateArray();
});
