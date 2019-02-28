//This module goes and finds all the friend relationships of a single user and posts to dom
// built by Sydney Wait

import APIManager from "./friendAPIManager"


const buildFriends = (userId) => {
    let htmlString = "<h2>Friends:</h2>"
    APIManager.getAllFriendsByFriend(userId)
        .then(friends => {
            console.log("friends inside of friend by friend", friends)
            if (friends.length > 0) {
                friends.forEach(friend => {
                    htmlString += `<h4>${friend.user.username}<h4><button type="submit" class = "btn" id ="del-frnds-btn-${friend.id}">delete</button>`
                    document.querySelector("#frnds-list").innerHTML = htmlString;

                }
                )
            }
            else {
                htmlString = htmlString
                document.querySelector("#frnds-list").innerHTML = htmlString;
            }



        })
    // .then(() => {
    APIManager.getAllFriendsByUser(userId)
        .then(friends => {
            console.log("friends inside of friend by user", friends)
            if (friends.length > 0){
            friends.forEach(friend => {
                const otherFriendId = friend.otherFriendId
                const friendshipId = friend.id

                APIManager.getSingleFriendbyId(otherFriendId)
                    .then((singleFriend) => {
                        htmlString += `<h4>${singleFriend.username}<h4><button type="submit" class = "btn" id ="del-frnds-btn-${friendshipId}">delete</button>`
                        // console.log(htmlString)
                        document.querySelector("#frnds-list").innerHTML = htmlString;
                    })

            })
        }
        else {
            htmlString = htmlString
            document.querySelector("#frnds-list").innerHTML = htmlString;
        }


        })
    // })

}

export default buildFriends
