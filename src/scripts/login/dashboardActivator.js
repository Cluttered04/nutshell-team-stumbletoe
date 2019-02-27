//This function imports all the event listeners and page loads from the individual modules
//news, events, tasks, chats, and friends
// import formPrinter from "./printToDom.js"

import formPrinter from "./printToDom.js"
import eventDashboard from "../Events/eventMain"
import friendActivator from "../friends/friendActivator.js";

const dashboardActivator = () => {
    formPrinter.printLogoutForm()
    friendActivator()


    //Adds event dashboard
    eventDashboard();
    console.log("Activator is running!")

}

export default dashboardActivator;

//src\scripts\Events\eventMain.js
