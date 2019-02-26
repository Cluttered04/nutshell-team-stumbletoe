import api from "./taskAPIManager"
import object from "./taskObjectBuilder"
import tasks from "./tasksManager"

const activateSaveButton = () =>{
    document.querySelector("#tasks-foot").addEventListener("click", e =>{
        if(e.target.classList.contains("save")){
            api.new(object.taskObject(document.querySelector("#task-name-input").value, document.querySelector("#task-date-input").value))
            .then(()=>{
                tasks.afterLogin(sessionStorage.getItem("activeUser"))
            })
        }
    })
}

export default activateSaveButton