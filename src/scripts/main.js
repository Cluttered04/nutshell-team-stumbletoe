import tasks from "./Tasks/tasksManager"
import formPrinter from "../login/printToDom.js"
import loginManager from "../login/loginManager.js"

sessionStorage.setItem("activeUser", 1)
console.log(sessionStorage.getItem("activeUser"))

tasks.afterLogin(sessionStorage.getItem("activeUser"));


formPrinter.printLoginForm();
loginManager();