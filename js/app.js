
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
            <button style="display:none;" class="saveChanges">Save</button>
            <button class="delete">Delete</button>
        ` ;
    console.log(typeof task)
    return task
    
}

const addTask = function() {
    // add new taask
    console.log(`adding a new Task With id ${taskNumber}`);
    const taskName = taskInput.value;
    const task = createTask(taskName);
    bindEvents(task)
    appendTask(task);
    taskNumber += 1;
    taskInput.value = "";
}

const deleteTask = function(parent, taskId) {
    // find the correct task using it's id and remove it from the parent
    console.log(`deleting Task ${taskId}`);
    const trash = document.querySelector(`li[data-id="${taskId}"]`);
    trash.parentElement.removeChild(trash); // i was on some high shit
}

const editTask = function(editBox, taskName,) {
    // hide the label and toggle the edit box
    taskName.style.display = "none"
    editBox.style.display = "block"
    editBox.value = taskName.innerText;
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

function bindEvents(task) {
    const taskComponents = Array.from(task.children);
    const checkBox = taskComponents.find(el => el.type == "checkbox");
    const taskName = taskComponents.find(el => el.nodeName == "LABEL");
    const editBtn = taskComponents.find(el => el.className == "edit");
    const delBtn = taskComponents.find(el => el.className == "delete");
    const editBox = taskComponents.find(el => el.className == "editBox");
    const saveBtn = taskComponents.find(el => el.className =="saveChanges");

    delBtn.addEventListener("click", e => {
        // for every delete button created, bind a function that deletes the respective task
        const parentElement = e.target.parentElement;
        const elementId = e.target.parentElement.getAttribute("data-id");
        deleteTask(parentElement, elementId) 
    })

    editBtn.addEventListener("click", e => {
        // onclick on edit button, enable editing and show save button
        editTask(editBox, taskName)
        saveBtn.style.display ="block"
    })

    saveBtn.addEventListener("click", e=> {
        // after changes have been made in the edit box, hide the editbox, save button and reveal the label
        console.log(editBox.value);
        taskName.innerText = editBox.value;
        editBox.style.display = "none";
        saveBtn.style.display = "none"
        taskName.style.display = "block";
    })

    checkBox.addEventListener("change", e => {
        checkBox.checked ? completedTasks.appendChild(task) : incompleteTaks.appendChild(task)
    })
}
