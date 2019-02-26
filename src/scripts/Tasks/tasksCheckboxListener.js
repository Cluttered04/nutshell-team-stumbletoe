import api from "./taskAPIManager";
import object from "./taskObjectBuilder";
import tasks from "./tasksManager";

const activateCheckBoxes = () => {
    document.querySelector("#tasks-box").addEventListener("click", e => {
        console.log(e.target.id);
        if (e.target.classList.contains("#check")) {
            taskId = e.target.dispatchEvent.split("-")[2]
            api.checkbox(taskId, object.completetaskObject())
                .then(() => {
                    tasks.afterLogin(sessionStorage.getItem("activeUser"))
                })
        }
    })
}
export default activateCheckBoxes