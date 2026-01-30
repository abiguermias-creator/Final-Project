document.addEventListener("DOMContentLoaded", function () {

  const taskInput = document.getElementById("taskInput");
  const addTaskBtn = document.getElementById("addTaskBtn");
  const taskList = document.getElementById("taskList");

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  function renderTasks() {
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
      const li = document.createElement("li");

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = task.completed;

      // Task text
      const span = document.createElement("span");
      span.textContent = task.text;

      if (task.completed) {
        span.style.textDecoration = "line-through";
        span.style.color = "gray";
      }

      checkbox.addEventListener("change", function () {
        task.completed = checkbox.checked;
        saveTasks();
        renderTasks();
      });

      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete";
      deleteBtn.addEventListener("click", function () {
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
      });

      li.appendChild(checkbox);
      li.appendChild(span);
      li.appendChild(deleteBtn);
      taskList.appendChild(li);
    });
  }

  addTaskBtn.addEventListener("click", function () {
    const taskText = taskInput.value.trim();
    if (taskText === "") return;

    tasks.push({
      text: taskText,
      completed: false
    });

    saveTasks();
    renderTasks();
    taskInput.value = "";
  });

  renderTasks();
});


