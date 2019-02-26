import friendActivator from "../friends/friendActivator";

// this module clears the dashboard upon logout
// built by Sydney Wait

const dashboardDeactivator = () => {
    // only for a test!!  This will not be #body later
    document.querySelector("#frnds-cont").innerHTML = ""
    // insert your functions or HTML strings that need to be cleared on logout

}

export default dashboardDeactivator;