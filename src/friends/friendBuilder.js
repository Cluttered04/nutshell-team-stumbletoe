import APIManager from "./APIManager";

const buildFriends =(userId)=>{
APIManager.getAllFriendsByFriend(userId)
.then.forEach(friend => {
    console.log(friend[0].user.username)
})





}

export default buildFriends
