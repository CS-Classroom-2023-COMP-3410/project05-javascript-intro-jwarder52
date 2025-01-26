document.addEventListener("DOMContentLoaded", () => {
    const clock = document.getElementById("clock");
    const toggleFormatBtn = document.getElementById("toggle-format");
    const colorInput = document.getElementById("color");
    const fontSizeInput = document.getElementById("font-size");
    const alarmTimeInput = document.getElementById("alarm-time");
    const setAlarmBtn = document.getElementById("set-alarm");
    const alertsDiv = document.getElementById("alerts");
  
    let is24Hour = JSON.parse(localStorage.getItem("is24Hour")) || false;
    let clockColor = localStorage.getItem("clockColor") || "#333";
    let fontSize = localStorage.getItem("fontSize") || "48";
    let alarms = JSON.parse(localStorage.getItem("alarms")) || [];
  
    // Apply saved preferences
    clock.style.color = clockColor;
    clock.style.fontSize = `${fontSize}px`;
    colorInput.value = clockColor;
    fontSizeInput.value = fontSize;
  
    function updateClock() {
      const now = new Date();
      let hours = now.getHours();
      const minutes = String(now.getMinutes()).padStart(2, "0");
      const seconds = String(now.getSeconds()).padStart(2, "0");
  
      if (!is24Hour) {
        const period = hours >= 12 ? "PM" : "AM";
        hours = hours % 12 || 12;
        clock.textContent = `${hours}:${minutes}:${seconds} ${period}`;
      } else {
        clock.textContent = `${hours}:${minutes}:${seconds}`;
      }
  
      checkAlarms(hours, minutes);
    }
  
    function checkAlarms(hours, minutes) {
      const currentTime = `${String(hours).padStart(2, "0")}:${minutes}`;
      if (alarms.includes(currentTime)) {
        alertsDiv.textContent = `Alarm triggered at ${currentTime}`;
        setTimeout(() => (alertsDiv.textContent = ""), 5000); // Clear alert after 5 seconds
      }
    }
  
    toggleFormatBtn.addEventListener("click", () => {
      is24Hour = !is24Hour;
      localStorage.setItem("is24Hour", JSON.stringify(is24Hour));
    });
  
    colorInput.addEventListener("input", (event) => {
      clockColor = event.target.value;
      clock.style.color = clockColor;
      localStorage.setItem("clockColor", clockColor);
    });
  
    fontSizeInput.addEventListener("input", (event) => {
      fontSize = event.target.value;
      clock.style.fontSize = `${fontSize}px`;
      localStorage.setItem("fontSize", fontSize);
    });
  
    setAlarmBtn.addEventListener("click", () => {
      const alarmTime = alarmTimeInput.value;
      if (alarmTime) {
        alarms.push(alarmTime);
        localStorage.setItem("alarms", JSON.stringify(alarms));
        alertsDiv.textContent = `Alarm set for ${alarmTime}`;
        setTimeout(() => (alertsDiv.textContent = ""), 3000);
      }
    });
  
    setInterval(updateClock, 1000);
    updateClock(); // Initial call
  });
  