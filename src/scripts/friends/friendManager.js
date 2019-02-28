import APIManager from "./friendAPIManager";
import relationshipBuilder from "./friendRelationshipBuilder";
import friendActivator from "./friendActivator";
import buildFriends from "./friendBuilder";

// This module is to manage the events that happen in the friends page
//  Built by Sydney Wait

const friendManager = () => {

    const clearInput = () => {
        document.querySelector("#friend-input").value = ""


    }
    const activeUser = sessionStorage.getItem("activeUser")
    document.querySelector("#frnds-cont").addEventListener("click", () => {
        console.log(event.target.id)
        // when the user clicks the add a friend button
        if (event.target.id === "save-friend-btn") {
            // console.log("You clicked the add friend button")

            // it collects the friend name and compares it to the usernames in the database
            const friendName = document.querySelector("#friend-input").value
            // console.log("friend name", friendName)
            APIManager.getSingleFriendbyUserName(friendName)
                .then((friend) => {
                    if (friend.length === 1) {
                        console.log(friend)
                        const friendId = friend[0].id
                        // If the user  exists in the database, it looks for already existing relationships
                        // it has to look at both combinations of userId-otherFriendId and otherFriendId-userId
                        APIManager.getSingleFriendRelationship(activeUser, friendId)
                            .then((friendship) => {
                                // console.log("first friendship", friendship)
                                if (friendship.length === 0) {
                                    APIManager.getSingleFriendRelationship(friendId, activeUser)
                                        .then((friendship) => {
                                            // console.log("2nd friendship", friendship)
                                            if (friendship.length === 0) {
                                                const friendObject = relationshipBuilder(friendId)
                                                APIManager.addFriendRelationship(friendObject)
                                                    .then(() => {
                                                        buildFriends(activeUser)
                                                        clearInput()                                                    })
                                            } else {
                                                window.alert("friendship already exists!")
                                                clearInput()
                                            }
                                        })
                                } else {
                                    window.alert("friendship already exists")
                                    clearInput()

                                }
                            })
                    }

                    else {
                        window.alert("that user does not exist in the database")
                        clearInput()

                    }


                })
        }
        //Event listener on the delete button
        if (event.target.id.includes("del-frnds-btn")) {
            // console.log("you clicked the delete button")

            const friendshipId = event.target.id.split("-")[3]
            // console.log(friendshipId)
            APIManager.deleteSingleFriendRelationship(friendshipId)
                .then(() => {
                    buildFriends(activeUser)
                })



        }
    })
}

export default friendManager