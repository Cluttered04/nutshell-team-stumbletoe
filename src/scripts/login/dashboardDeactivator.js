// this module clears the dashboard upon logout
// built by Sydney Wait

import friendActivator from "../friends/friendActivator";
import eventDeactivator from "../Events/EventDeactivator";
import manageContent from "../Tasks/tasksContentManager";


const dashboardDeactivator = () => {

    document.querySelector("#chat-cont").innerHTML = ""
    document.querySelector("#chat-header").innerHTML = ""
    document.querySelector("#frnds-list").innerHTML = ""
    document.querySelector("#frnds-input").innerHTML = ""
    document.querySelector("#news-cont").innerHTML = ""
    document.querySelector("#news-header").innerHTML = ""
    // insert your functions or HTML strings that need to be cleared on logout
    eventDeactivator(); //clears events container

    manageContent.clearContent(); //clears the tasks container
    document.querySelector("#visible").id="hidden";

}

export default dashboardDeactivator;