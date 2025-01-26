document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("drawing-canvas");
    const ctx = canvas.getContext("2d");
  
    const brushSizeInput = document.getElementById("brush-size");
    const brushColorInput = document.getElementById("brush-color");
    const bgColorInput = document.getElementById("bg-color");
    const undoButton = document.getElementById("undo-button");
    const clearButton = document.getElementById("clear-button");
    const saveButton = document.getElementById("save-button");
  
    canvas.width = 800;
    canvas.height = 500;
  
    let isDrawing = false;
    let brushSize = brushSizeInput.value;
    let brushColor = brushColorInput.value;
    let bgColor = bgColorInput.value;
    let strokes = [];
    let currentStroke = [];
  
    function startDrawing(event) {
      isDrawing = true;
      currentStroke = [];
      draw(event);
    }
  
    function draw(event) {
      if (!isDrawing) return;
  
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
  
      ctx.lineWidth = brushSize;
      ctx.lineCap = "round";
      ctx.strokeStyle = brushColor;
  
      if (currentStroke.length === 0) {
        ctx.beginPath();
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
        ctx.stroke();
      }
  
      currentStroke.push({ x, y, color: brushColor, size: brushSize });
    }
  
    function stopDrawing() {
      if (isDrawing) {
        strokes.push(currentStroke);
        isDrawing = false;
      }
    }
  
    function undoLastStroke() {
      strokes.pop();
      redrawCanvas();
    }
  
    function clearCanvas() {
      strokes = [];
      redrawCanvas();
    }
  
    function redrawCanvas() {
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
  
      strokes.forEach(stroke => {
        ctx.beginPath();
        stroke.forEach((point, index) => {
          ctx.lineWidth = point.size;
          ctx.strokeStyle = point.color;
          if (index === 0) {
            ctx.moveTo(point.x, point.y);
          } else {
            ctx.lineTo(point.x, point.y);
            ctx.stroke();
          }
        });
      });
    }
  
    function saveCanvasAsImage() {
      const link = document.createElement("a");
      link.download = "drawing.png";
      link.href = canvas.toDataURL();
      link.click();
    }
  
    // Event listeners
    canvas.addEventListener("mousedown", startDrawing);
    canvas.addEventListener("mousemove", draw);
    canvas.addEventListener("mouseup", stopDrawing);
    canvas.addEventListener("mouseout", stopDrawing);
  
    brushSizeInput.addEventListener("input", event => {
      brushSize = event.target.value;
    });
  
    brushColorInput.addEventListener("input", event => {
      brushColor = event.target.value;
    });
  
    bgColorInput.addEventListener("input", event => {
      bgColor = event.target.value;
      redrawCanvas();
    });
  
    undoButton.addEventListener("click", undoLastStroke);
    clearButton.addEventListener("click", clearCanvas);
    saveButton.addEventListener("click", saveCanvasAsImage);
  
    // Initialize canvas background color
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  });
  