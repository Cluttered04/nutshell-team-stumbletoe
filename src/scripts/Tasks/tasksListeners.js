//Michelle Tabor - This Module activates event listeners on key parts of the DOM
import print from "./tasksDOMPrinters"

import api from "./tasksAPIManager"
import object from "./tasksObjectsBuilders"
import afterLogin from "./tasksLoadContent";



const listen = {
  activateNewTask: () => {
    document.querySelector("#tasks-foot").addEventListener("click", e => {
      if (e.target.classList.contains("new")) { //if the new button is clicked
        print.newTaskForm(); //print the new task form
        print.saveButton(sessionStorage.getItem("activeUser")) //loads save-new and cancel buttons
      }
    })
  },
  checkBoxes: () => {
    document.querySelector("#tasks-box").addEventListener("click", e => {
      if (e.target.classList.contains("check")) { //if the check box if clicked
        const taskId = e.target.id.split("-")[2] //gets the task id that was place previously from the db
        api.checkbox(taskId, object.completeTaskObject()) //patch the object in the db, changing the value from false to true
          .then(() => {
            afterLogin.eventTrigger(sessionStorage.getItem("activeUser")) //reloads user's uncomplete tasks
          })
      }
    })
  },
  loadEdit: () => {
    document.querySelector("#tasks-box").addEventListener("click", e => {
      if (e.target.classList.contains("taskN")) {
        const taskId = e.target.id.split("-")[2];
        document.querySelector("#tasks-box").innerHTML = "";
        api.single(taskId)
          .then(sharks => {
            console.log(sharks)
            print.editForm(sharks)
            print.saveEditButton(sharks.id)
          })
      }
    })
  },
  SaveButton: () => { //save new task save Button
    document.querySelector("#tasks-foot").addEventListener("click", e => { //listening to #tasks-foot container
      if (e.target.classList.contains("save-new")) { //save button
        api.new(object.taskObject(document.querySelector("#task-name-input").value, document.querySelector("#task-date-input").value)) //builds a json object from the input values and posts that to the API as a new entry
          .then(() => {
            afterLogin.buildCont(sessionStorage.getItem("activeUser")) //load tasks
          })
      }
      if (e.target.classList.contains("cancel")) { //cancel button
        document.querySelector("#tasks-box").innerHTML = ""; //clears the tasks box
        afterLogin.eventTrigger(sessionStorage.getItem("activeUser")) //load tasks
      }
    })
  },
  editButton: () => {
    document.querySelector("#tasks-foot").addEventListener("click", e => {
      const taskId = e.target.id.split("-")[3]
      if (e.target.classList.contains("save-edit")) {
        api.edit(taskId, object.taskObject(document.querySelector(`#task-name-input-${taskId}`).value, document.querySelector(`#task-date-input-${taskId}`).value))
          .then(() => {
            afterLogin.eventTrigger(sessionStorage.getItem("activeUser")) //load tasks

          })
      }
    })
  },
  enterOnEdit: () => {
    document.querySelector("#tasks-box").addEventListener('keypress', e => {
      const nodeName = document.getElementsByName("task")
      const tId = nodeName[0].attributes[2].nodeValue
      const taskId = tId.split("-")[3]
      if (e.keyCode === 13) {
        api.edit(taskId, object.taskObject(document.querySelector(`#task-name-input-${taskId}`).value, document.querySelector(`#task-date-input-${taskId}`).value))
          .then(() => {
            afterLogin.eventTrigger(sessionStorage.getItem("activeUser"))
            //load tasks
          })
      }
    })
  }
}

export default listen