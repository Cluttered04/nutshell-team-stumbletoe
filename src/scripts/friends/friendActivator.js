// Module to generate the friends console in the dashboard
// built by Sydney Wait

import buildFriends from "./friendBuilder";
import friendFormBuilder from "./friendFormBuilder";
import friendManager from "./friendManager";

const friendActivator = () => {
    const activeUser = sessionStorage.getItem("activeUser")
    friendManager()
    buildFriends(activeUser)
    friendFormBuilder();


}

export default friendActivator;