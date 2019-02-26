import build from "./tasksContentBuilder"
import listen from "./taskListeners"

const afterBuild = (userId) => {
    build.tasksList(userId);
    listen.activateNewTask(userId);
}

export default afterBuild