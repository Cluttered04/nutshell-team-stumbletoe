//This function imports all the event listeners and page loads from the individual modules
//news, events, tasks, chats, and friends
import formPrinter from "./printToDom.js"
import newsActivator from "../news/newsManager.js";

const dashboardActivator = ()=> {
    formPrinter.printLogoutForm()

    //This is just a placeholder until we get all the other pieces
    // document.querySelector("#body").innerHTML = `you are logged in`

    newsActivator();
}

export default dashboardActivator;


//*****WORKING ON ACTIVATE NEW ARTICLE BUTTON, FIX EDIT */