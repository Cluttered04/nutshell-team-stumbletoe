//Michelle Tabor - This module builds a single html string

//required moment.js variables
var moment = require('../../lib/node_modules/moment');
moment().format("MMM DD YYYY");

//build single task
const buildSingleTask = (task) => {
    let dueDate = moment(`${task.dueDate}`).format("MMM DD YYYY"); //moment formatting of dates
    return `<input type="checkbox" class="check" id="task-check-${task.id}"><strong>${dueDate}</strong> - ${task.task}</input><br />`
}

export default buildSingleTask