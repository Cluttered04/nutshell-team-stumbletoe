import print from "./taskPrintToDOM"
import activateSaveButton from "./tasksSaveButton";
import activateCheckBoxes from "./tasksCheckboxListener"


const listen = {
  activateNewTask: (userId) => {
    document.querySelector("#tasks-cont").addEventListener("click", e => {
      if (e.target.classList.contains("new")) {
        console.log(e);
        print.newTaskForm();
        print.saveButton(userId);
        activateSaveButton(userId);
        activateCheckBoxes
      }
    })
  },
}

export default listen