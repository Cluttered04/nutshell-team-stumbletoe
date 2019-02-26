import build from "./tasksContentBuilder"
import print from "./taskPrintToDOM"
import listen from "./taskListeners"

const afterBuild = (userId) => {
    build.tasksList(userId);
    print.button(userId);
    listen.activateNewTask(userId);
}

export default afterBuild