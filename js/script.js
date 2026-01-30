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
      li.textContent = task;

      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete";
      deleteBtn.addEventListener("click", function () {
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
      });

      li.appendChild(deleteBtn);
      taskList.appendChild(li);
    });
  }

  addTaskBtn.addEventListener("click", function () {
    const taskText = taskInput.value.trim();

    if (taskText === "") return;

    tasks.push(taskText);
    saveTasks();
    renderTasks();

    taskInput.value = "";
  });

  renderTasks();
});

