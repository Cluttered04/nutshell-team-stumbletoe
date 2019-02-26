import APIManager from "./APIManager"


const buildFriends = (userId) => {
    let htmlString ="<h1>Friends:</h1>"
    APIManager.getAllFriendsByFriend(userId)
        .then(friends => {
            friends.forEach(friend => {
                htmlString +=`<h4>${friend.user.username}<h4>`
                console.log(friend.user.username)
            })
        })
        .then(() => {
            APIManager.getAllFriendsByUser(userId)
                .then(friends => {
                    friends.forEach(friend => {
                        console.log(friend.otherFriendId)
                        const otherFriendId = friend.otherFriendId

                        APIManager.getSingleFriend(otherFriendId)
                            .then((singleFriend) => {
                                htmlString +=`<h4>${singleFriend.username}<h4>`
                                console.log(singleFriend.username)
                                console.log(htmlString)
                                document.querySelector("#frnds-cont").innerHTML = htmlString;
                            })

                    })

                })
        })

}

export default buildFriends
