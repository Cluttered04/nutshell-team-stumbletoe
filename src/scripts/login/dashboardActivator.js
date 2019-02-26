//This function imports all the event listeners and page loads from the individual modules
//news, events, tasks, chats, and friends
import formPrinter from "./printToDom.js"
import eventDashboard from "../Events/eventMain"

const dashboardActivator = ()=> {
    formPrinter.printLogoutForm()

    //This is just a placeholder until we get all the other pieces
    document.querySelector("#header").innerHTML = `you are logged in`

    //Adds event dashboard
    eventDashboard();

}

export default dashboardActivator;
