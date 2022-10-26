// Define UI Elements

let form = document.querySelector("#task-form");
let taskInput = document.querySelector("#new-task");
let taskFilter = document.querySelector("#task-filter");
let taskList = document.querySelector("#tasks");
let clearBtn = document.querySelector("#clear-task-btn");

// Define Event Listener

form.addEventListener("submit", addTask);
taskList.addEventListener("click", removeTask);
clearBtn.addEventListener("click", clearTask);
taskFilter.addEventListener("keyup", filterTask);
document.addEventListener("DOMContentLoaded", getTask);

// Functions

function addTask(eventData) {
  if (taskInput.value === "") {
    alert("Add a task");
  } else {
    let li = document.createElement("li");
    li.appendChild(document.createTextNode(taskInput.value + " "));
    taskList.appendChild(li);
    let link = document.createElement("a");
    link.setAttribute("href", "#");
    link.innerHTML = "x";
    li.appendChild(link);

    // Local Store
    storeTaskInLocalStorage(taskInput.value);

    taskInput.value = "";
  }
  eventData.preventDefault();
}

function removeTask(tsk) {
  if (tsk.target.hasAttribute("href")) {
    if (confirm("Do you want to remove it from the list?")) {
      let ele = tsk.target.parentElement;
      ele.remove();
      // console.log(ele);

      removeFromLS(ele);
    }
  }
}

function clearTask(tsk) {
  // taskList.innerHTML = '';

  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }
  localStorage.clear();
}

function filterTask(tsk) {
  let text = tsk.target.value.toLowerCase();
  document.querySelectorAll("li").forEach((task) => {
    let item = task.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = "block";
    } else {
      task.style.display = "none";
    }
  });
}

function storeTaskInLocalStorage(task) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function getTask() {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach((task) => {
    let li = document.createElement("li");
    li.appendChild(document.createTextNode(task + " "));
    taskList.appendChild(li);
    let link = document.createElement("a");
    link.setAttribute("href", "#");
    link.innerHTML = "x";
    li.appendChild(link);
  });
}

function removeFromLS(taskItem) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  let li = taskItem;
  li.removeChild(li.lastChild);
  tasks.forEach((task, index) => {
    if (li.textContent.trim() === task) {
      tasks.splice(index, 1);
    }
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
