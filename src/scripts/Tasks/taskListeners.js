import print from "./taskPrintToDOM"
import activateSaveButton from "./tasksSaveButton";


const listen ={
    activateNewTask: (userId) => {
        document.querySelector("#tasks-cont").addEventListener("click", e => {
        if (e.target.classList.contains("new")) {
          console.log(e);
          print.newTaskForm();
          print.saveButton(userId);
          activateSaveButton;
        }
}
    )
},

}

export default listen