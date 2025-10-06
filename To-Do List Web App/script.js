const taskInput = document.getElementById("task-input");
const addBtn = document.getElementById("add-btn");
const taskList = document.getElementById("task-list");

// Load tasks from localStorage
window.onload = () => {
  const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  savedTasks.forEach((task) => addTask(task.text, task.completed));
};

// Add task
addBtn.addEventListener("click", () => {
  const taskText = taskInput.value.trim();
  if (taskText !== "") {
    addTask(taskText);
    saveTasks();
    taskInput.value = "";
  }
});

taskInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addBtn.click();
});

function addTask(text, completed = false) {
  const li = document.createElement("li");
  li.textContent = text;
  if (completed) li.classList.add("completed");

  li.addEventListener("click", () => {
    li.classList.toggle("completed");
    saveTasks();
  });

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "✖";
  deleteBtn.classList.add("delete-btn");
  deleteBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    li.remove();
    saveTasks();
  });

  li.appendChild(deleteBtn);
  taskList.appendChild(li);
}

function saveTasks() {
  const tasks = [];
  taskList.querySelectorAll("li").forEach((li) => {
    tasks.push({
      text: li.firstChild.textContent,
      completed: li.classList.contains("completed"),
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
