//Michelle Tabor - This module houses functions that will print items to the DOM

//imports
import form from "./tasksFormBuilder";

//print function object
const print = {
  //button for new task
  button: userId => {
    document.querySelector(
      "#tasks-foot"
    ).innerHTML = `<button type="button" class="new" id="tasks-new-btn-${userId}">Add New Task</button>`;
  },
  //print form

  newTaskForm: () => {
    document.querySelector("#tasks-cont").innerHTML = form.newTaskForm();
  },
  //print edit form
  editForm: () => {
    document.querySelector("#tasks-cont").innerHTML = form.editForm();
  },
  saveButton: ()=>{
      document.querySelector("#tasks-foot").innerHTML = form.saveButton();
  }
};

export default print;
