//Michelle Tabor - This component builds HTML strings for the forms
const forms = {
    //new task form
    newTaskForm: () => {
        return `<h3>Add New Task</h3>
<input type="textarea" name="task" id="task-name-input" placeholder="Task"></input>
<input type="date" name="dueDate" id="task-date-input"></input>`
    },
    //edit task form
    editTaskForm: (userId) => {
        console.log(userId)
    },
    saveButton: (userId) => { //save button html
        return `<button type="button" class="save" id="save-tasks-btn${userId}">Save</button>`
    },
    cancelButton: () => { //cancel button html
        return `<button type="button" class="cancel" id="canc-tasks-btn">Cancel</button>`
    }
}

export default forms