//Michelle Tabor - This module builds a single html string

//build single task
const singleTask = (dueDate, taskName) =>{
    return `<input type="checkbox id="task-check"></input><p><strong>${dueDate}</strong> - ${taskName}`
}

export default singleTask