//This function imports all the event listeners and page loads from the individual modules
//news, events, tasks, chats, and friends
// import formPrinter from "./printToDom.js"

import formPrinter from "./printToDom.js"
import newnewsActivator from "../testNews/newsActivator.js";
import friendActivator from "../friends/friendActivator.js";
import tasks from "../Tasks/tasksManager"
import eventDashboard from "../Events/eventMain"


const dashboardActivator = () => {
    formPrinter.printLogoutForm()
    friendActivator()

    //This is just a placeholder until we get all the other pieces
    // document.querySelector("#body").innerHTML = `you are logged in`
    //this prints the tasks section after login - MT
    tasks.tasksActivator(sessionStorage.getItem("activeUser"));

    //This is just a placeholder until we get all the other pieces
    document.querySelector("#header").innerHTML += `you are logged in`

    //Adds event dashboard
    eventDashboard();
    console.log("Activator is running!")

    newnewsActivator();

    document.querySelector("#hidden").id="visible";
}

export default dashboardActivator;


//src\scripts\Events\eventMain.js
