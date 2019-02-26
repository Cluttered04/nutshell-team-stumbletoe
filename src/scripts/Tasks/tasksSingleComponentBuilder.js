//Michelle Tabor - This module builds a single html string

//build single task
const buildSingleTask = (task) =>{
    return `<input type="checkbox" id="task-check"><strong>${task.dueDate}</strong> - ${task.task}</input><br />`
}

export default buildSingleTask