//Michelle Tabor - This Module is the sub-main module that houses the event listeners for the Tasks Element

//imports
import print from "./taskPrintToDOM"

//tasks manager main function
const tasks = {
    //after login
    afterLogin: (userId) => {
        if (sessionStorage.length > 0) {
            print.userTasks(userId)
        } else {}
    }
    //add new task button

    //edit task

    //completed task

    //save edited task
}

export default tasks