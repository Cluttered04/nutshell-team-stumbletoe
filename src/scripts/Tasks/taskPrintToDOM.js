//Michelle Tabor - This module houses functions that will print items to the DOM

//imports
import build from "./tasksContentBuilder"
import form from "./tasksFormBuilder"

//print function object
const print = {
        //print all uncompleted tasks
        userTasks: (userId) => {
            document.querySelector("#tasks-cont").innerHTML = build.taskList(userId)
        },


        //print form

        newTaskForm: () => {
document.querySelector("#tasks-cont").innerHTML = form.newTaskForm()

        },
        //print edit form
        editForm: () => {
            document.querySelector("#tasks-cont").innerHTML = form.editForm()
        }
}

export default print