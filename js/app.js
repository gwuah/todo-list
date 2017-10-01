const appendTask = function(document, task) {
    document.querySelector("#incompleteTasks").innerHTML += task ;
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
        `<li>
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
    const taskName = document.querySelector("#newTask").value;
    const task = createTask(taskName);
    appendTask(document, task);
}















document.addEventListener("keydown", (e) => {
  if (e.keyCode == 13) {
    // console.log("Enter was pressed")
    addTask()
  }
})
