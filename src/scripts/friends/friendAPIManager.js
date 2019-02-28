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

    getSingleFriendbyId: (otherFriendId)=>{
        return fetch(`http://localhost:8088/users/${otherFriendId}`)
        .then(contacts => contacts.json())
    },
    getSingleFriendbyUserName: (friendName)=>{
        return fetch(`http://localhost:8088/users/?username=${friendName}`)
        .then(contacts => contacts.json())
    },
    addFriendRelationship: (friendObject)=>{
        return fetch("http://localhost:8088/friends", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(friendObject)
        })


    },
    getSingleFriendRelationship: (id1, id2)=>{
        return fetch(`http://localhost:8088/friends?userId=${id1}&otherFriendId=${id2}`)
        .then(contacts => contacts.json())
    },
    deleteSingleFriendRelationship: (id) => {
        return fetch(`http://localhost:8088/friends/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }

        })



    }


}

export default APIManager;
