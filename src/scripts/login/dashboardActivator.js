//This function imports all the event listeners and page loads from the individual modules
//news, events, tasks, chats, and friends
import formPrinter from "./printToDom.js"
import friendActivator from "../friends/friendActivator.js";

const dashboardActivator = () => {
    formPrinter.printLogoutForm()
    friendActivator()



}

export default dashboardActivator;
