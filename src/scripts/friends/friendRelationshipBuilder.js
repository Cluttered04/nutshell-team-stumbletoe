const relationshipBuilder =(friendId)=>{
const relationshipObject = {
    "userId": sessionStorage.getItem("activeUser"),
    "otherFriendId": `${friendId}`
}
}

export default relationshipBuilder;

