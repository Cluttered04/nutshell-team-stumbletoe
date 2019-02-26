import print from "./taskPrintToDOM"
import activateSaveButton from "./tasksSaveButton";


const listen ={
    activateNewTask: (userId) => {
        document.querySelector("#tasks-foot").addEventListener("click", e => {
        console.log(e.target);
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