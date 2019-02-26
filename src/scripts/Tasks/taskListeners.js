import print from "./taskPrintToDOM"
import activateSaveButton from "./tasksSaveButton";
import api from "./taskAPIManager"
import object from "./taskObjectBuilder"
import tasks from "./tasksManager"



const listen = {
  activateNewTask: (userId) => {
    document.querySelector("#tasks-cont").addEventListener("click", e => {
      if (e.target.classList.contains("new")) {
        print.newTaskForm();
        print.saveButton(userId);
        activateSaveButton(userId);
      }
    })
  },
  checkBoxes: () => {
    document.querySelector("#tasks-box").addEventListener("click", e => {
      if (e.target.classList.contains("check")) {
        const taskId = e.target.id.split("-")[2]
        api.checkbox(taskId, object.completeTaskObject())
          .then(() => {
            tasks.afterLogin(sessionStorage.getItem("activeUser"))
          })
      }
    })
  }
}

export default listen