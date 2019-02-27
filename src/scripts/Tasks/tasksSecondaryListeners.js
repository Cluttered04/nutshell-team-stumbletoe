//Michelle Tabor - this module hosts secondary event listeners that are loaded after their targets are loaded onto the page
import api from "./tasksAPIManager"
import object from "./tasksObjectsBuilders"
import tasks from "./tasksManager"

//event listener fro the save and cancel buttons
const activateSecondary = {
    SaveButton: () => {
        document.querySelector("#tasks-foot").addEventListener("click", e => { //listening to #tasks-foot container
            if (e.target.classList.contains("save")) { //save button
                api.new(object.taskObject(document.querySelector("#task-name-input").value, document.querySelector("#task-date-input").value)) //builds a json object from the input values and posts that to the API as a new entry
                    .then(() => {
                        tasks.afterLogin(sessionStorage.getItem("activeUser")) //load tasks
                    })
            }
            if (e.target.classList.contains("cancel")) { //cancel button
                document.querySelector("#tasks-box").innerHTML = ""; //listening to the tasks box
                tasks.afterLogin(sessionStorage.getItem("activeUser")) //load tasks
            }
        })
    },
    editButton: () => {
        document.querySelector("#tasks-foot").addEventListener("click", e => {
            const taskId = e.target.id.split("-")[3]
            if (e.target.classList.contains("cancel")) { //cancel button
                document.querySelector("#tasks-box").innerHTML = ""; //sets Task-box to empty
                tasks.afterLogin(sessionStorage.getItem("activeUser")) //load tasks
            }
            if (e.target.classList.contains("save")) {
                api.edit(taskId, object.taskObject(document.querySelector(`#task-name-input-${taskId}`).value, document.querySelector(`#task-date-input-${taskId}`).value))
                    .then(() => {
                        tasks.afterLogin(sessionStorage.getItem("activeUser")) //load tasks
                    })
            }
        })
    },
    enterOnEdit: () => {
        document.querySelector("#tasks-box").addEventListener('keypress', e => {
            const nodeName = document.getElementsByName("task")
            const tId = nodeName[0].attributes[2].nodeValue
            const taskId = tId.split("-")[3]
            if (e.keyCode === 13) {
                api.edit(taskId, object.taskObject(document.querySelector(`#task-name-input-${taskId}`).value, document.querySelector(`#task-date-input-${taskId}`).value))
                    .then(() => {
                        tasks.afterLogin(sessionStorage.getItem("activeUser")) //load tasks
                    })
            }
        })
    }
}
export default activateSecondary