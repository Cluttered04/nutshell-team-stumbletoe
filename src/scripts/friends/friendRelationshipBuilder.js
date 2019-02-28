//This module builds a friend relationship between two users
// Built by Sydney Wait

const relationshipBuilder =(friendId)=>{
const relationshipObject = {
    "userId": sessionStorage.getItem("activeUser"),
    "otherFriendId": `${friendId}`

}
return relationshipObject
}

export default relationshipBuilder;

