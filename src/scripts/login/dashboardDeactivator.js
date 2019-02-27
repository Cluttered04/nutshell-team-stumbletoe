// this module clears the dashboard upon logout
// built by Sydney Wait

import friendActivator from "../friends/friendActivator";
import eventDeactivator from "../Events/EventDeactivator";

const dashboardDeactivator = () => {

    document.querySelector("#frnds-list").innerHTML = ""
    document.querySelector("#frnds-input").innerHTML = ""
    // insert your functions or HTML strings that need to be cleared on logout
    eventDeactivator();

}

export default dashboardDeactivator;