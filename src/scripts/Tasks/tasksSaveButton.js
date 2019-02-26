//Michelle Tabor - this module hosts secondary event listeners that are loaded after their targets are loaded onto the page
import api from "./taskAPIManager"
import object from "./taskObjectBuilder"
import tasks from "./tasksManager"

//event listener fro the save and cancel buttons
const activateSaveButton = () =>{
    document.querySelector("#tasks-foot").addEventListener("click", e =>{ //listening to #tasks-foot container
        if(e.target.classList.contains("save")){ //save button
            api.new(object.taskObject(document.querySelector("#task-name-input").value, document.querySelector("#task-date-input").value)) //builds a json object from the input values and posts that to the API as a new entry
            .then(()=>{
                tasks.afterLogin(sessionStorage.getItem("activeUser")) //load tasks
            })
        }if(e.target.classList.contains("cancel")){ //cancel button
            document.querySelector("#tasks-box").innerHTML = "";  //listening to the tasks box
            tasks.afterLogin(sessionStorage.getItem("activeUser")) //load tasks
        }
    })
}

export default activateSaveButton