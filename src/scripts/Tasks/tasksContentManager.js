//Michelle Tabor - This module hosts a function that calls the other functions to build out the content of the task container
import build from "./tasksContentBuilder"
import print from "./tasksDOMPrinters"
import listen from "./tasksListeners"

const  manageContent = {
    buildCont: (userId) => {
        build.tasksList(userId); //build the task list
        print.button(userId); //print the new task button
        listen.activateNewTask(userId); //activated the listener on the New Task button
        listen.SaveButton() //activates the listeners on the save and cancel buttons
        listen.checkBoxes() //activates the listener on the check boxes
        listen.loadEdit() //loads event listener on the task names
        listen.editButton() //loads event listener for the edit buttons
        listen.enterOnEdit() //loads keypress listener

    },
    eventTrigger: (userId) => {
        build.tasksList(userId); //build the task list
        print.button(userId); //prints save new and cancel button
    },
    clearContent: ()=>{
        document.querySelector("#tasks-cont").innerHTML = ""
    }
}

export default manageContent