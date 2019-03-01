//Michelle Tabor - This module hosts a function that calls the other functions to build out the content of the task container
import build from "./tasksContentBuilder"
import print from "./tasksDOMPrinters"


const  manageContent = {
    buildCont: (userId) => {
        build.tasksList(userId); //build the task list
        print.button(userId); //print the new task button


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