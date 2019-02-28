//This module goes and finds all the friend relationships of a single user and posts to dom
// built by Sydney Wait

import APIManager from "./friendAPIManager"


const buildFriends = (userId) => {
    let htmlString = "<h2>Friends:</h2>"
    // Get all the friends when the user is in the otherFriendId place
    APIManager.getAllFriendsByFriend(userId)
        .then((friends) => {
            // If there are any friends assigned to the user, continue
            if (friends.length > 0) {

                friends.forEach(friend => {
                    htmlString += `<h4>${friend.user.username}<h4><button type="submit" class = "btn" id ="del-frnds-btn-${friend.id}">delete</button>`
                    document.querySelector("#frnds-list").innerHTML = htmlString;
                })
                // get all the friends when the user is in the userId place
                APIManager.getAllFriendsByUser(userId)
                    .then((friends) => {
                        // Check to see if there are any. If so, get their Ids
                        if (friends.length > 0) {
                            friends.forEach(friend => {
                                const otherFriendId = friend.otherFriendId
                                const friendshipId = friend.id
                                // use the ids to get them individually
                                APIManager.getSingleFriendbyId(otherFriendId)
                                    .then((singleFriend) => {
                                        htmlString += `<h4>${singleFriend.username}<h4><button type="submit" class = "btn" id ="del-frnds-btn-${friendshipId}">delete</button>`
                                        document.querySelector("#frnds-list").innerHTML = htmlString;
                                    })
                            })
                        }
                        else {
                            // otherwise, leave the HTML string unchanged

                            htmlString = htmlString
                            document.querySelector("#frnds-list").innerHTML = htmlString;
                        }

                    })

            }
            else {
                // If the user is never in the otherFriendId place, check the userId place by itself
                APIManager.getAllFriendsByUser(userId)
                    .then(friends => {
                        // if they have friends, get ids
                        if (friends.length > 0) {
                            friends.forEach(friend => {
                                const otherFriendId = friend.otherFriendId
                                const friendshipId = friend.id
                                // use ids to look up friends and make a list
                                APIManager.getSingleFriendbyId(otherFriendId)
                                    .then((singleFriend) => {
                                        htmlString += `<h4>${singleFriend.username}<h4><button type="submit" class = "btn" id ="del-frnds-btn-${friendshipId}">delete</button>`
                                        document.querySelector("#frnds-list").innerHTML = htmlString;
                                    })
                            })
                        }
                        //If the user has no friends, print the following
                        else {
                            htmlString = "add a friend to get started"
                            document.querySelector("#frnds-list").innerHTML = htmlString;
                        }
                    }


                    )
            }
        })

}

export default buildFriends
