//This function imports all the event listeners and page loads from the individual modules
//news, events, tasks, chats, and friends
import formPrinter from "./printToDom.js"
import tasks from "../scripts/Tasks/tasksManager"
const dashboardActivator = () => {
    formPrinter.printLogoutForm()

    //this prints the tasks section after login - MT
    tasks.afterLogin(sessionStorage.getItem("activeUser"));

    //This is just a placeholder until we get all the other pieces
    document.querySelector("#header").innerHTML = `you are logged in`


}

export default dashboardActivator;