//This module goes and finds all the friend relationships of a single user and posts to dom
// built by Sydney Wait

let htmlString = "<h2>FRIENDS</h2>"
const buildFriends = (userId) => {
    // Get all the friends when the user is in the otherFriendId place
    fetch(`http://localhost:8088/friends?userId=${userId}`)
        .then(r => r.json())
        .then((friends) => {
            // Check to see if there are any. If so, get their Ids
            if (friends.length > 0) {
                friends.forEach(friend => {
                    const otherFriendId = friend.otherFriendId
                    const friendshipId = friend.id
                    // use the ids to get them individually
                    fetch(`http://localhost:8088/friends?userId=${otherFriendId}`)
                        .then(r => r.json())
                        .then((singleFriend) => {
                            friendPartOne = `<button type="submit" class = "btn" id ="del-frnds-btn-${friendshipId}">delete</button><span><strong>${singleFriend.username}</strong></span>`
                            // document.querySelector("#frnds-list").innerHTML = htmlString;
                            fetch(`http://localhost:8088/events?userId=${otherFriendId}`)
                                .then(r => r.json())
                                .then((events) => {
                                    if (events.length > 0) {
                                        events.forEach((singleEvent) => {
                                            let eventPartOne = `<li>${singleEvent.name}</li>`
                                            console.log(eventPartOne)
                                        })
                                        fetch(`http://localhost:8088/news?userId=${otherFriendId}`)
                                            .then(r => r.json())
                                            .then((news) => {
                                                if (news.length > 0) {
                                                    news.forEach(singleArticle => {
                                                        htmlString += `<li>${singleArticle.title}</li>`
                                                        console.log(htmlString)
                                                        document.querySelector("#frnds-list").innerHTML = htmlString;
                                                    })
                                                } else {
                                                    htmlString += `<p>No News</p>`
                                                    console.log(htmlString)
                                                    document.querySelector("#frnds-list").innerHTML = htmlString;
                                                }
                                            })
                                    } else {
                                        htmlString += `<li>No Events.</li>`
                                        console.log(htmlString)
                                        fetch(`http://localhost:8088/news?userId=${otherFriendId}`)
                                            .then(r => r.json())
                                            .then((news) => {
                                                if (news.length > 0) {
                                                    news.forEach(singleArticle => {
                                                        htmlString += `<li>${singleArticle.title}</li>`
                                                        console.log(htmlString)
                                                        document.querySelector("#frnds-list").innerHTML = htmlString;
                                                    })
                                                } else {
                                                    htmlString += `<p>No News</p>`
                                                    console.log(htmlString)
                                                    document.querySelector("#frnds-list").innerHTML = htmlString;
                                                }
                                            })

                                    }
                                })

                        })
                })

            } else {
                // otherwise, leave the HTML string unchanged

                htmlString += `<p>Add some friends to get started</p>`
                document.querySelector("#frnds-list").innerHTML = htmlString;
            }

        })
}


export default buildFriends