import tasks from "./Tasks/tasksManager"

sessionStorage.setItem("activeUser", 1)
console.log(sessionStorage.getItem("activeUser"))

tasks.afterLogin(sessionStorage.getItem("activeUser"));
