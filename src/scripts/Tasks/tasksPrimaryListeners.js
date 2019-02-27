//Michelle Tabor - This Module activates event listeners on key parts of the DOM
import print from "./tasksDOMPrinters"
import activateSecondary from "./tasksSecondaryListeners";
import api from "./tasksAPIManager"
import object from "./tasksObjectsBuilders"
import tasks from "./tasksManager"



const listen = {
  activateNewTask: (userId) => {
    document.querySelector("#tasks-cont").addEventListener("click", e => {
      if (e.target.classList.contains("new")) { //if the new button is clicked
        print.newTaskForm(); //print the new task form
        print.saveButton(userId); //print the save Button
        activateSecondary.SaveButton(userId); //activate the listeners on the save button
      }
    })
  },
  checkBoxes: () => {
    document.querySelector("#tasks-box").addEventListener("click", e => {
      if (e.target.classList.contains("check")) { //if the check box if clicked
        const taskId = e.target.id.split("-")[2] //gets the task id that was place previously from the db
        api.checkbox(taskId, object.completeTaskObject()) //patch the object in the db, changing the value from false to true
          .then(() => {
            tasks.afterLogin(sessionStorage.getItem("activeUser")) //reloads user's uncomplete tasks
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
              print.saveButton(sharks.id)
              activateSecondary.editButton()
              activateSecondary.enterOnEdit()
            }


          )

      }
    })
  }
}

export default listen