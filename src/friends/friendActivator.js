import APIManager from "./APIManager";
import buildFriends from "./friendBuilder";

// Module to generate the friends console in the dashboard
// built by Sydney Wait

const friendActivator =()=>{
    const activeUser = sessionStorage.getItem("activeUser")

    buildFriends(activeUser)



}

export default friendActivator;