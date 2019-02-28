//Michelle Tabor - This Module activates event listeners on key parts of the DOM
import print from "./tasksDOMPrinters"

import api from "./tasksAPIManager"
import object from "./tasksObjectsBuilders"
import manageContent from "./tasksContentManager";



const listen = {
  activateNewTask: () => { //Listener for the New Task Button
    document.querySelector("#tasks-foot").addEventListener("click", e => {
      if (e.target.classList.contains("add-btn")) { //if the new button is clicked
        print.newTaskForm(); //print the new task form
        print.saveButton(sessionStorage.getItem("activeUser")) //loads save-new and cancel buttons
      }
    })
  },
  checkBoxes: () => { //listener for the checkboxes
    document.querySelector("#tasks-box").addEventListener("click", e => {
      if (e.target.classList.contains("check")) { //if the check box if clicked
        const taskId = e.target.id.split("-")[2] //gets the task id that was place previously from the db
        api.checkbox(taskId, object.completeTaskObject()) //patch the object in the db, changing the value from false to true
          .then(() => {
            manageContent.eventTrigger(sessionStorage.getItem("activeUser")) //reloads user's uncomplete tasks
          })
      }
    })
  },
  loadEdit: () => { //listener on the save edit and cancel buttons
    document.querySelector("#tasks-box").addEventListener("click", e => {
      if (e.target.classList.contains("taskN")) { //if the titles for the tasks are clicked
        const taskId = e.target.id.split("-")[2]; //task id from span id
        document.querySelector("#tasks-box").innerHTML = ""; //clears the task box container
        api.single(taskId)//get single task from api
          .then(sharks => { //sharks is taco
            print.editForm(sharks) //print edit form for sharks
            print.saveEditButton(sharks.id) //prints save edit form with sharks id
          })
      }
    })
  },
  SaveButton: () => { //save new task save Button
    document.querySelector("#tasks-foot").addEventListener("click", e => { //listening to #tasks-foot container
      if (e.target.classList.contains("save-new")) { //save button
        api.new(object.taskObject(document.querySelector("#task-name-input").value, document.querySelector("#task-date-input").value)) //builds a json object from the input values and posts that to the API as a new entry
          .then(() => {
            document.querySelector("#tasks-box").innerHTML = ""; //clears the tasks container
            manageContent.eventTrigger(sessionStorage.getItem("activeUser")) //load tasks
          })
      }
      if (e.target.classList.contains("cancel")) { //cancel button
        document.querySelector("#tasks-box").innerHTML = ""; //clears the tasks box
        manageContent.eventTrigger(sessionStorage.getItem("activeUser")) //load tasks
      }
    })
  },
  editButton: () => { //listener for save edit and cancel button
    document.querySelector("#tasks-foot").addEventListener("click", e => {
      const taskId = e.target.id.split("-")[3] //gets the task id from the button id
      if (e.target.classList.contains("save-edit")) {
        api.edit(taskId, object.taskObject(document.querySelector(`#task-name-input-${taskId}`).value, document.querySelector(`#task-date-input-${taskId}`).value)) //sends single updated task to the api
          .then(() => {
            manageContent.eventTrigger(sessionStorage.getItem("activeUser")) //load tasks after update has been posted

          })
      }
    })
  },
  enterOnEdit: () => { //listener for the ENTER keypress
    document.querySelector("#tasks-box").addEventListener('keypress', e => {
      const nodeName = document.getElementsByName("task") //grabbing the task id from dom component
      const tId = nodeName[0].attributes[2].nodeValue//had to dig deep for it
      const taskId = tId.split("-")[3]//finally splitting the id from the nodeList
      if (e.keyCode === 13) { //keycode 13 is the ENTER key
        api.edit(taskId, object.taskObject(document.querySelector(`#task-name-input-${taskId}`).value, document.querySelector(`#task-date-input-${taskId}`).value)) //sends the edited task to the api
          .then(() => {
            manageContent.eventTrigger(sessionStorage.getItem("activeUser"))
            //load tasks after posting
          })
      }
    })
  }
}

export default listen