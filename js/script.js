const taskForm = document.getElementById("task-form");
const subjectInput = document.getElementById("subject");
const dateInput = document.getElementById("date");
const timeInput = document.getElementById("time");
const taskList = document.getElementById("task-list");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

tasks.forEach(task => {
  addTaskToList(task.subject, task.date, task.time);
});

taskForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const subject = subjectInput.value;
  const date = dateInput.value;
  const time = timeInput.value;

  if (subject === "" || date === "" || time === "") {
    alert("Please fill in all fields");
    return;
  }

  const task = { subject, date, time };
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));

  addTaskToList(subject, date, time);

  subjectInput.value = "";
  dateInput.value = "";
  timeInput.value = "";
});

function addTaskToList(subject, date, time) {
  const li = document.createElement("li");
  li.textContent = `${subject} - ${date} at ${time}`;

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.style.marginLeft = "10px";

  deleteBtn.addEventListener("click", function () {
    taskList.removeChild(li);

    tasks = tasks.filter(
      task => !(task.subject === subject && task.date === date && task.time === time)
    );
    localStorage.setItem("tasks", JSON.stringify(tasks));
  });

  li.appendChild(deleteBtn);
  taskList.appendChild(li);
}

