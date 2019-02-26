// This module performs operations on the friends portion of the database
// Built by Sydney Wait


const APIManager = {

    getAllFriendsByUser: (userId) => {
        return fetch(`http://localhost:8088/friends?_expand=user&userId=${userId}`)
            .then(friends => friends.json())

    },
    getAllFriendsByFriend: (userId) => {
        return fetch(`http://localhost:8088/friends?otherFriendId=${userId}&_expand=user`)
            .then(friends => friends.json())

    },
    getAllFriends: (id) => {
        const htmlString = ""
        getAllFriendsBy(userId)
            .then((friend) => {



            })
    }


}

export default APIManager;
