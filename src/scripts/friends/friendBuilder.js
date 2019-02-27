//This module goes and finds all the friend relationships of a single user and posts to dom
// built by Sydney Wait

import APIManager from "./friendAPIManager"


const buildFriends = (userId) => {
    let htmlString = "<h2>Friends:</h2>"
    APIManager.getAllFriendsByFriend(userId)
        .then(friends => {
            friends.forEach(friend => {
                htmlString += `<h4>${friend.user.username}<h4>`
                document.querySelector("#frnds-list").innerHTML = htmlString;

            })
        })
        // .then(() => {
            APIManager.getAllFriendsByUser(userId)
                .then(friends => {
                    friends.forEach(friend => {
                        const otherFriendId = friend.otherFriendId

                        APIManager.getSingleFriendbyId(otherFriendId)
                            .then((singleFriend) => {
                                htmlString += `<h4>${singleFriend.username}<h4>`
                                // console.log(htmlString)
                                document.querySelector("#frnds-list").innerHTML = htmlString;
                            })

                    })

                })
        // })

}

export default buildFriends
