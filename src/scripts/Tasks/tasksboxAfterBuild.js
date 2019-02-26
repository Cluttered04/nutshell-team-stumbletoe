//Michelle Tabor - This module hosts a function that calls the other functions to build out the content of the task container
import build from "./tasksContentBuilder"
import print from "./taskPrintToDOM"
import listen from "./taskListeners"

const afterBuild = (userId) => {
    build.tasksList(userId); //build the task list
    print.button(userId); //print the new task button
    listen.activateNewTask(userId); //activated the listener on the New Task button
    listen.checkBoxes(); //activates the listener on the check boxes
}

export default afterBuild