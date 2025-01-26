document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("new-task");
    const addTaskButton = document.getElementById("add-task");
    const taskList = document.getElementById("task-list");
    const filterButtons = {
      all: document.getElementById("filter-all"),
      pending: document.getElementById("filter-pending"),
      completed: document.getElementById("filter-completed")
    };
  
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  
    function saveTasks() {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  
    function renderTasks(filter = "all") {
      taskList.innerHTML = "";
      tasks
        .filter(task => {
          if (filter === "completed") return task.completed;
          if (filter === "pending") return !task.completed;
          return true;
        })
        .forEach((task, index) => {
          const li = document.createElement("li");
          li.draggable = true;
          li.className = task.completed ? "completed" : "";
          li.dataset.index = index;
  
          const span = document.createElement("span");
          span.textContent = task.text;
          span.contentEditable = true;
          span.addEventListener("blur", () => {
            tasks[index].text = span.textContent.trim();
            saveTasks();
          });
  
          const completeButton = document.createElement("button");
          completeButton.textContent = task.completed ? "Undo" : "Complete";
          completeButton.addEventListener("click", () => {
            tasks[index].completed = !tasks[index].completed;
            saveTasks();
            renderTasks(filter);
          });
  
          const deleteButton = document.createElement("button");
          deleteButton.textContent = "Delete";
          deleteButton.addEventListener("click", () => {
            tasks.splice(index, 1);
            saveTasks();
            renderTasks(filter);
          });
  
          li.appendChild(span);
          li.appendChild(completeButton);
          li.appendChild(deleteButton);
          taskList.appendChild(li);
  
          addDragAndDropHandlers(li);
        });
    }
  
    function addDragAndDropHandlers(li) {
      li.addEventListener("dragstart", () => {
        li.classList.add("dragging");
      });
  
      li.addEventListener("dragend", () => {
        li.classList.remove("dragging");
        saveTasks();
      });
  
      taskList.addEventListener("dragover", event => {
        event.preventDefault();
        const afterElement = getDragAfterElement(taskList, event.clientY);
        const draggingElement = document.querySelector(".dragging");
        if (afterElement == null) {
          taskList.appendChild(draggingElement);
        } else {
          taskList.insertBefore(draggingElement, afterElement);
        }
        updateTaskOrder();
      });
    }
  
    function getDragAfterElement(container, y) {
      const draggableElements = [
        ...container.querySelectorAll("li:not(.dragging)")
      ];
  
      return draggableElements.reduce(
        (closest, child) => {
          const box = child.getBoundingClientRect();
          const offset = y - box.top - box.height / 2;
          if (offset < 0 && offset > closest.offset) {
            return { offset, element: child };
          }
          return closest;
        },
        { offset: Number.NEGATIVE_INFINITY }
      ).element;
    }
  
    function updateTaskOrder() {
      const reorderedTasks = [];
      const taskElements = [...taskList.children];
      taskElements.forEach(taskElement => {
        const index = taskElement.dataset.index;
        reorderedTasks.push(tasks[index]);
      });
      tasks = reorderedTasks;
      saveTasks();
    }
  
    addTaskButton.addEventListener("click", () => {
      const taskText = taskInput.value.trim();
      if (taskText) {
        tasks.push({ text: taskText, completed: false });
        saveTasks();
        renderTasks();
        taskInput.value = "";
      }
    });
  
    Object.keys(filterButtons).forEach(filter => {
      filterButtons[filter].addEventListener("click", () => {
        renderTasks(filter);
      });
    });
  
    renderTasks(); // Initial rendering
  });
  