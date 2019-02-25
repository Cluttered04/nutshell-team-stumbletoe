//Michelle Tabor - This module builds the entire component HTML String

//imports
import single from "./tasksSingleComponentBuilder"
import api from "./taskAPIManager"
//build task list
const build = {
    taskList: (userId) => {
        api.all(userId)
            .then((tasks) => tasks.forEach(task => {
                console.log(task)
                if (task.complete === true) {
                    return htmlString += single(task.dueDate, task.task)
                } else {}
            }))
    }
}

export default build