let dashboard = document.querySelector("#dashboard");
let cards = document.querySelectorAll(".card");
let features = document.querySelectorAll(".feature");
let backBtns = document.querySelectorAll(".backBtn");

cards.forEach(function(card) {
  card.addEventListener("click", function() {
    let targetId = card.getAttribute("data-target");

    dashboard.style.display = "none";

    features.forEach(function(feature) {
      feature.style.display = "none";
    });

    document.querySelector("#" + targetId).style.display = "block";
  });
});

backBtns.forEach(function(btn) {
  btn.addEventListener("click", function() {
    features.forEach(function(feature) {
      feature.style.display = "none";
    });

    dashboard.style.display = "grid";
  });
});

let dateText = document.querySelector("#dateText");
let timeText = document.querySelector("#timeText");

function updateDateTime() {
  let now = new Date();

  dateText.innerText = now.toDateString();
  timeText.innerText = now.toLocaleTimeString();
}

updateDateTime();
setInterval(updateDateTime, 1000);

let themeBtn = document.querySelector("#themeBtn");

if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
  themeBtn.innerText = "☀️ Light";
}

themeBtn.addEventListener("click", function() {
  document.body.classList.toggle("dark");

  if (document.body.classList.contains("dark")) {
    themeBtn.innerText = "☀️ Light";
    localStorage.setItem("theme", "dark");
  } else {
    themeBtn.innerText = "🌙 Dark";
    localStorage.setItem("theme", "light");
  }
});

let todoInput = document.querySelector("#todoInput");
let addTodoBtn = document.querySelector("#addTodoBtn");
let todoList = document.querySelector("#todoList");

let todos = JSON.parse(localStorage.getItem("todos")) || [];

function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function renderTodos() {
  todoList.innerHTML = "";

  todos.forEach(function(todo, index) {
    let li = document.createElement("li");

    if (todo.completed) {
      li.classList.add("completed");
    }

    if (todo.important) {
      li.classList.add("important");
    }

    li.innerHTML = `
      <span>${todo.text}</span>
      <div>
        <button onclick="importantTodo(${index})">⭐</button>
        <button onclick="completeTodo(${index})">✔</button>
        <button onclick="deleteTodo(${index})">🗑</button>
      </div>
    `;

    todoList.appendChild(li);
  });
}

addTodoBtn.addEventListener("click", function() {
  let text = todoInput.value.trim();

  if (text === "") {
    alert("Please enter task");
    return;
  }

  todos.push({
    text: text,
    completed: false,
    important: false
  });

  todoInput.value = "";
  saveTodos();
  renderTodos();
});

function completeTodo(index) {
  todos[index].completed = !todos[index].completed;
  saveTodos();
  renderTodos();
}

function importantTodo(index) {
  todos[index].important = !todos[index].important;
  saveTodos();
  renderTodos();
}

function deleteTodo(index) {
  todos.splice(index, 1);
  saveTodos();
  renderTodos();
}

renderTodos();

let plannerList = document.querySelector("#plannerList");
let plannerData = JSON.parse(localStorage.getItem("planner")) || {};

let hours = [
  "06:00 AM", "07:00 AM", "08:00 AM", "09:00 AM",
  "10:00 AM", "11:00 AM", "12:00 PM", "01:00 PM",
  "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM",
  "06:00 PM", "07:00 PM", "08:00 PM", "09:00 PM"
];

function renderPlanner() {
  plannerList.innerHTML = "";

  hours.forEach(function(hour) {
    let row = document.createElement("div");
    row.classList.add("planner-row");

    row.innerHTML = `
      <span>${hour}</span>
      <input type="text" value="${plannerData[hour] || ""}" placeholder="Write your plan">
    `;

    let input = row.querySelector("input");

    input.addEventListener("input", function() {
      plannerData[hour] = input.value;
      localStorage.setItem("planner", JSON.stringify(plannerData));
    });

    plannerList.appendChild(row);
  });
}

renderPlanner();

let goalInput = document.querySelector("#goalInput");
let addGoalBtn = document.querySelector("#addGoalBtn");
let goalList = document.querySelector("#goalList");
let goalProgress = document.querySelector("#goalProgress");

let goals = JSON.parse(localStorage.getItem("goals")) || [];

function saveGoals() {
  localStorage.setItem("goals", JSON.stringify(goals));
}

function renderGoals() {
  goalList.innerHTML = "";

  let completedCount = goals.filter(function(goal) {
    return goal.completed;
  }).length;

  goalProgress.innerText = completedCount + " of " + goals.length + " completed";

  goals.forEach(function(goal, index) {
    let li = document.createElement("li");

    if (goal.completed) {
      li.classList.add("completed");
    }

    li.innerHTML = `
      <span>${goal.text}</span>
      <div>
        <button onclick="completeGoal(${index})">✔</button>
        <button onclick="deleteGoal(${index})">🗑</button>
      </div>
    `;

    goalList.appendChild(li);
  });
}

addGoalBtn.addEventListener("click", function() {
  let text = goalInput.value.trim();

  if (text === "") {
    alert("Please enter goal");
    return;
  }

  goals.push({
    text: text,
    completed: false
  });

  goalInput.value = "";
  saveGoals();
  renderGoals();
});

function completeGoal(index) {
  goals[index].completed = !goals[index].completed;
  saveGoals();
  renderGoals();
}

function deleteGoal(index) {
  goals.splice(index, 1);
  saveGoals();
  renderGoals();
}

renderGoals();

let timerDisplay = document.querySelector("#timerDisplay");
let startBtn = document.querySelector("#startBtn");
let pauseBtn = document.querySelector("#pauseBtn");
let resetBtn = document.querySelector("#resetBtn");

let totalSeconds = 25 * 60;
let timer = null;

function updateTimerDisplay() {
  let minutes = Math.floor(totalSeconds / 60);
  let seconds = totalSeconds % 60;

  if (seconds < 10) {
    seconds = "0" + seconds;
  }

  timerDisplay.innerText = minutes + ":" + seconds;
}

startBtn.addEventListener("click", function() {
  if (timer !== null) {
    return;
  }

  timer = setInterval(function() {
    if (totalSeconds > 0) {
      totalSeconds--;
      updateTimerDisplay();
    } else {
      clearInterval(timer);
      timer = null;
      alert("Time is over!");
    }
  }, 1000);
});

pauseBtn.addEventListener("click", function() {
  clearInterval(timer);
  timer = null;
});

resetBtn.addEventListener("click", function() {
  clearInterval(timer);
  timer = null;
  totalSeconds = 25 * 60;
  updateTimerDisplay();
});

updateTimerDisplay();

let quoteText = document.querySelector("#quoteText");
let quoteAuthor = document.querySelector("#quoteAuthor");
let newQuoteBtn = document.querySelector("#newQuoteBtn");

newQuoteBtn.addEventListener("click", getQuote);

async function getQuote() {
  quoteText.innerText = "Loading quote...";
  quoteAuthor.innerText = "";

  try {
    let response = await fetch("https://api.quotable.io/random");
    let data = await response.json();

    quoteText.innerText = `"${data.content}"`;
    quoteAuthor.innerText = "- " + data.author;
  } catch (error) {
    quoteText.innerText = "Stay focused. Great things take time.";
    quoteAuthor.innerText = "- Motivation";
  }
}

let cityInput = document.querySelector("#cityInput");
let weatherBtn = document.querySelector("#weatherBtn");
let cityName = document.querySelector("#cityName");
let temperature = document.querySelector("#temperature");
let condition = document.querySelector("#condition");

weatherBtn.addEventListener("click", function() {
  let city = cityInput.value.trim();

  if (city === "") {
    alert("Please enter city name");
    return;
  }

  cityName.innerText = city;
  temperature.innerText = "Temperature: API key required";
  condition.innerText = "Condition: Connect weather API";
});

function changeBackground() {
  let hour = new Date().getHours();

  if (hour >= 5 && hour < 12) {
    document.body.style.background = "linear-gradient(135deg, #fef3c7, #bfdbfe)";
  } else if (hour >= 12 && hour < 17) {
    document.body.style.background = "linear-gradient(135deg, #bae6fd, #bbf7d0)";
  } else if (hour >= 17 && hour < 20) {
    document.body.style.background = "linear-gradient(135deg, #fed7aa, #fecaca)";
  } else {
    document.body.style.background = "linear-gradient(135deg, #111827, #334155)";
  }
}

changeBackground();
setInterval(changeBackground, 60000);