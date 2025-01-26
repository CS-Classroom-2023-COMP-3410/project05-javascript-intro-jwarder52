document.addEventListener("DOMContentLoaded", () => {
    const display = document.getElementById("display");
    let currentInput = "0";
    let previousInput = null;
    let operator = null;
    let memory = null; // Memory for recall
  
    function updateDisplay() {
      display.textContent = currentInput;
    }
  
    function clearAll() {
      currentInput = "0";
      previousInput = null;
      operator = null;
      updateDisplay();
    }
  
    function appendNumber(number) {
      if (currentInput === "0" || currentInput === "Error") {
        currentInput = number;
      } else {
        currentInput += number;
      }
      updateDisplay();
    }
  
    function appendDecimal() {
      if (!currentInput.includes(".")) {
        currentInput += ".";
        updateDisplay();
      }
    }
  
    function setOperator(op) {
      if (currentInput === "Error") return;
  
      if (operator && previousInput !== null) {
        evaluate();
      }
  
      previousInput = currentInput;
      operator = op;
      currentInput = "0";
    }
  
    function evaluate() {
      if (operator === null || previousInput === null) return;
  
      let result;
      const current = parseFloat(currentInput);
      const previous = parseFloat(previousInput);
  
      if (operator === "+") {
        result = previous + current;
      } else if (operator === "−") {
        result = previous - current;
      } else if (operator === "×") {
        result = previous * current;
      } else if (operator === "÷") {
        result = current === 0 ? "Error" : previous / current;
      }
  
      currentInput = result.toString();
      operator = null;
      previousInput = null;
      updateDisplay();
    }
  
    function calculateSquareRoot() {
      const current = parseFloat(currentInput);
      currentInput = current < 0 ? "Error" : Math.sqrt(current).toString();
      updateDisplay();
    }
  
    function calculatePercentage() {
      const current = parseFloat(currentInput);
      currentInput = (current / 100).toString();
      updateDisplay();
    }
  
    function saveMemory() {
      memory = currentInput;
    }
  
    function recallMemory() {
      if (memory !== null) {
        currentInput = memory;
        updateDisplay();
      }
    }
  
    function clearMemory() {
      memory = null;
    }
  
    document.querySelectorAll(".number").forEach(button => {
      button.addEventListener("click", () => appendNumber(button.id));
    });
  
    document.querySelectorAll(".operator").forEach(button => {
      button.addEventListener("click", () => setOperator(button.textContent));
    });
  
    document.getElementById("equals").addEventListener("click", evaluate);
    document.getElementById("clear").addEventListener("click", clearAll);
    document.getElementById("decimal").addEventListener("click", appendDecimal);
    document.getElementById("sqrt").addEventListener("click", calculateSquareRoot);
    document.getElementById("percent").addEventListener("click", calculatePercentage);
    document.getElementById("memory-save").addEventListener("click", saveMemory);
    document.getElementById("memory-recall").addEventListener("click", recallMemory);
    document.getElementById("memory-clear").addEventListener("click", clearMemory);
  
    // Initialize display
    updateDisplay();
  });
  