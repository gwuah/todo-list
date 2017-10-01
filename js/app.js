
/* Helper Functions*/
const getById = function(selector) {
    return document.getElementById(selector)
}

const getBySelector = function(selector) {
    return document.querySelector(selector)
}

const appendTask = function(document, task) {
    incompleteTasks.innerHTML += task ;
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
    let task = 
        `<li data-id="${taskNumber}">
            <input type="checkbox">
            <label>${name}</label>
            <span>${dateTime.day} ${dateTime.month} ${dateTime.date} ${dateTime.year}</span>
            <span>${dateTime.hour} ${dateTime.minute}</span>
            <input type="text">
            <button class="edit">Edit</button>
            <button class="delete">Delete</button>
        </li>` ;
    return task
    
}

const addTask = function() {
    console.log(`adding New Task With id ${taskNumber}`);
    const taskName = taskInput.value;
    const task = createTask(taskName);
    appendTask(document, task);
}

const deleteTask = function(parent, taskId) {
    console.log(`deleting Task ${taskId}`);
    const trash = getBySelector(`li[data-id="${taskId}"]`);
    trash.parentElement.removeChild(trash); // i was on some high shit
}





/* Handlers */
const taskInput = getById("newTask");
const incompleteTaks = getById("incompleteTasks");
const completedTasks = getById("completedTasks");
const addNewTask = getById("addNewTask")
const newTask = getById("newTask")

/* Track Number of tasks created */
let taskNumber = 0;














document.addEventListener("keydown", (e) => {
  if (e.keyCode == 13) {
    // console.log("Enter was pressed")
    addTask()
  }
})
