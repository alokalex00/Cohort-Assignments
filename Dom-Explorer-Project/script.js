const addBtn = document.querySelector("#addBtn");
const modal = document.querySelector("#modal");
const closeBtn = document.querySelector("#closeBtn");
const createBtn = document.querySelector("#createBtn");
const taskInput = document.querySelector("#taskInput");
const taskList = document.querySelector("#taskList");
const filter = document.querySelector("#filter");
const searchInput = document.querySelector("#searchInput");

const totalCount = document.querySelector("#totalCount");
const pendingCount = document.querySelector("#pendingCount");
const completedCount = document.querySelector("#completedCount");
const progressText = document.querySelector("#progressText");
const progressBar = document.querySelector("#progressBar");
const themeBtn = document.querySelector("#themeBtn");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let editIndex = null;

showTasks();

addBtn.addEventListener("click", () => {
  modal.style.display = "flex";
  taskInput.value = "";
  editIndex = null;
  createBtn.innerText = "Create";
});

closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

createBtn.addEventListener("click", () => {
  let taskName = taskInput.value.trim();

  if(taskName === ""){
    alert("Please enter task");
    return;
  }

  let level = document.querySelector("input[name='level']:checked").value;

  if(editIndex === null){
    tasks.push({
      name: taskName,
      level: level,
      completed: false,
      date: new Date().toLocaleString()
    });
  }else{
    tasks[editIndex].name = taskName;
    tasks[editIndex].level = level;
  }

  saveData();
  modal.style.display = "none";
  showTasks();
});

function showTasks(){
  taskList.innerHTML = "";

  let filterValue = filter.value;
  let searchValue = searchInput.value.toLowerCase();
  let found = false;

  tasks.forEach((task, index) => {
    if(filterValue === "completed" && task.completed === false) return;
    if(filterValue === "pending" && task.completed === true) return;
    if(!task.name.toLowerCase().includes(searchValue)) return;

    found = true;

    let div = document.createElement("div");
    div.className = `task ${task.level}Border`;

    div.innerHTML = `
      <div>
        <h4>${task.name}</h4>
        <p class="date">${task.date}</p>
      </div>

      <span class="level ${task.level}">${task.level}</span>

      <span class="status ${task.completed ? "completed" : "pending"}">
        ${task.completed ? "Completed" : "Pending"}
      </span>

      <div class="actions">
        <button class="edit" onclick="editTask(${index})"><i class="ri-pencil-line"></i></button>
        <button class="done" onclick="completeTask(${index})"><i class="ri-check-line"></i></button>
        <button class="delete" onclick="deleteTask(${index})"><i class="ri-delete-bin-line"></i></button>
      </div>
    `;

    taskList.appendChild(div);
  });

  if(found === false){
    taskList.innerHTML = `<p class="empty">No tasks found</p>`;
  }

  updateCounter();
}

function editTask(index){
  modal.style.display = "flex";
  taskInput.value = tasks[index].name;
  document.querySelector(`input[value="${tasks[index].level}"]`).checked = true;
  editIndex = index;
  createBtn.innerText = "Update";
}

function completeTask(index){
  tasks[index].completed = !tasks[index].completed;
  saveData();
  showTasks();
}

function deleteTask(index){
  let confirmDelete = confirm("Are you sure you want to delete this task?");

  if(confirmDelete){
    tasks.splice(index, 1);
    saveData();
    showTasks();
  }
}

function updateCounter(){
  totalCount.innerText = tasks.length;

  let completed = tasks.filter(task => task.completed === true).length;
  let pending = tasks.length - completed;

  completedCount.innerText = completed;
  pendingCount.innerText = pending;

  let percentage = tasks.length === 0 ? 0 : Math.round((completed / tasks.length) * 100);

  progressText.innerText = percentage + "%";
  progressBar.style.width = percentage + "%";
}

function saveData(){
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

filter.addEventListener("change", showTasks);
searchInput.addEventListener("input", showTasks);

themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  if(document.body.classList.contains("dark")){
    themeBtn.innerHTML = `<i class="ri-sun-line"></i>`;
  }else{
    themeBtn.innerHTML = `<i class="ri-moon-line"></i>`;
  }
});