//Michelle Tabor - This module houses functions that will print items to the DOM

//imports
import form from "./tasksFormsBuilder";


//print function object
const print = {
  //print button for new task
  button: userId => {
    document.querySelector("#tasks-foot").innerHTML = `<button type="button" class="new" id="tasks-new-btn-${userId}">New Task</button>`
  },
  //print new task form
  newTaskForm: () => {
    document.querySelector("#tasks-box").innerHTML = form.newTaskForm();
  },
  //print edit form
  editForm: (taskObject) => {
    document.querySelector("#tasks-box").innerHTML = form.editTaskForm(taskObject);
  },
  //print save new and cancel button
  saveButton: (userId) => {
    document.querySelector("#tasks-foot").innerHTML = form.saveButton(userId) + form.cancelButton();
  },
  //print save edit and cancel button
  saveEditButton: (userId) => {
    document.querySelector("#tasks-foot").innerHTML = form.saveEditButton(userId) + form.cancelButton();
  },
  //prints tasks containters
  taskbox: () => {
    document.querySelector("#tasks-cont").innerHTML = `<div id="tasks-head"><h2>TASKS</h2></div>
      <div id="tasks-box"></div><div id="tasks-foot"></div>`
  },
};

export default print;