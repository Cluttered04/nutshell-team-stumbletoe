//This function imports all the event listeners and page loads from the individual modules
//news, events, tasks, chats, and friends
import formPrinter from "./printToDom.js"
import newnewsActivator from "../testNews/newsActivator.js";
import friendActivator from "../friends/friendActivator.js";

const dashboardActivator = () => {
    formPrinter.printLogoutForm()
    friendActivator()

    //This is just a placeholder until we get all the other pieces
    // document.querySelector("#body").innerHTML = `you are logged in`


    newnewsActivator();
}

export default dashboardActivator;


//*****WORKING ON ACTIVATE NEW ARTICLE BUTTON, FIX EDIT */