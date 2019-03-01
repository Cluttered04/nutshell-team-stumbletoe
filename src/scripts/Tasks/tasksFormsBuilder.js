//Michelle Tabor - This component builds HTML strings for the forms
const forms = {
    //new task form
    newTaskForm: () => {
        return `<h3>Add New Task</h3>
<input type="textarea" name="task" id="task-name-input" placeholder="Task"></input>
<input type="date" name="dueDate" id="task-date-input"></input>`
    },
    //edit task form
    editTaskForm: (taskObject) => {
        console.log(taskObject)
        return `<h3>Edit Task</h3>
<input type="textarea" name="task" id="task-edit-name-input-${taskObject.id}" placeholder="Task" value="${taskObject.task}"></input>
<input type="date" name="dueDate" id="task-edit-date-input-${taskObject.id}" value="${taskObject.dueDate}"></input>`
    },
    saveButton: (userId) => { //save button html
        return `<button type="button" class="save-new" id="save-tasks-btn-${userId}">Save</button>`
    },
    cancelButton: () => { //cancel button html
        return `<button type="button" class="cancel" id="canc-tasks-btn">Cancel</button>`
    },
    saveEdit: (taskId) => { //save edit button
        return `<button type="button" class="edit" id="save-edit-btn-${taskId}">Save Edit</button>`
    },
    saveEditButton: (userId) => { //save edit form button
        return `<button type="button" class="save-edit" id="save-tasks-btn-${userId}">Save</button>`
    }
}

export default forms