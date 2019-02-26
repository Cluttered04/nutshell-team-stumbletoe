// this module clears the dashboard upon logout
// built by Sydney Wait

import friendActivator from "../friends/friendActivator";

const dashboardDeactivator = () => {

    document.querySelector("#frnds-cont").innerHTML = ""
    // insert your functions or HTML strings that need to be cleared on logout

}

export default dashboardDeactivator;