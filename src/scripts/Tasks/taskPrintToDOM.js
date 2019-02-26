//Michelle Tabor - This module houses functions that will print items to the DOM

//imports
import form from "./tasksFormBuilder";


//print function object
const print = {
  //button for new task
  button: userId => {
    document.querySelector("#tasks-foot").innerHTML = `<button type="button" class="new" id="tasks-new-btn-${userId}">New Task</button>`
  },
  //print form

  newTaskForm: () => {
    document.querySelector("#tasks-box").innerHTML = form.newTaskForm();
  },
  //print edit form
  editForm: (taskObject) => {
    document.querySelector("#tasks-box").innerHTML = form.editTaskForm(taskObject);
  },
  saveButton: (userId) => {
    document.querySelector("#tasks-foot").innerHTML = form.saveButton(userId) + form.cancelButton();
  },
  taskbox: () => {
    document.querySelector("#tasks-cont").innerHTML = `<div id="tasks-head">TASKS</div>
      <div id="tasks-box"></div><div id="tasks-foot"></div>`
  },
};

export default print;