
/* Helper Functions*/
const getById = function(base, selector) {
    return base.getElementById(selector)
}

const appendTask = function(task) {
    incompleteTasks.appendChild(task) ;
}

const parseDateTime = function() {
    const dateTime = /(\w{3}) (\w{3}) (\d{2}) (\d{4}) (\d{2}):(\d{2})/.exec((new Date()));
    return { 
        day: dateTime[1],
        month: dateTime[2],
        date: dateTime[3],
        year: dateTime[4],
        hour: dateTime[5],
        minute: dateTime[6]
    }
}

const createTask = function(name) {
    const dateTime = parseDateTime() ;
    let task = document.createElement("li");
    task.setAttribute("data-id", taskNumber);
    task.innerHTML = 
        `<input type="checkbox">
            <label>${name}</label>
            <span>${dateTime.day} ${dateTime.month} ${dateTime.date} ${dateTime.year}</span>
            <span>${dateTime.hour} ${dateTime.minute}</span>
            <input type="text" class="editBox">
            <button class="edit">Edit</button>
            <button class="delete">Delete</button>
        ` ;
    console.log(typeof task)
    return task
    
}

const addTask = function() {
    console.log(`adding New Task With id ${taskNumber}`);
    const taskName = taskInput.value;
    const task = createTask(taskName);
    appendTask(task);
    taskNumber += 1;
    bindEventListener(task)
}

const deleteTask = function(parent, taskId) {
    console.log(`deleting Task ${taskId}`);
    const trash = document.querySelector(`li[data-id="${taskId}"]`);
    trash.parentElement.removeChild(trash); // i was on some high shit
}

/* Handlers */
const taskInput = getById(document, "newTask");
const incompleteTaks = getById(document, "incompleteTasks");
const completedTasks = getById(document, "completedTasks");
const addNewTask = getById(document, "addNewTask");
const newTask = getById(document, "newTask");


/* Track Number of tasks created */
let taskNumber = 0;

/* Event Listeners */
document.addEventListener("keydown", e => {
  if (e.keyCode == 13) {
    addTask();
  }
}); // add task on press on enter key

addNewTask.addEventListener("click", e => {
    addTask();
}); // add task on button press

function bindEventListener(task) {
    const taskComponents = Array.from(task.children);
    const editBtn = taskComponents.find(el => el.className == "edit");
    const delBtn = taskComponents.find(el => el.className == "delete");

    delBtn.addEventListener("click", e => {
        const parentElement = e.target.parentElement;
        const elementId = e.target.parentElement.getAttribute("data-id");
        // for every delete button created, bind a function that deletes the respective task
        deleteTask(parentElement, elementId) 
    })
}
