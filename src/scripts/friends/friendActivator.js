// Module to generate the friends console in the dashboard
// built by Sydney Wait

import buildFriends from "./friendBuilder";

const friendActivator = () => {
const activeUser = sessionStorage.getItem("activeUser")

    buildFriends(activeUser)
}

export default friendActivator;