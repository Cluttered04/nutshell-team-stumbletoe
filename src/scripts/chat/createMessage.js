
let messageHTML = "";

function createMessage(activeUser){
    for (let i = messages.length; i--;) {
        if (messages[i].userId === activeUser) {
          messageHTML += `<h4 class="name-chat-${messages[i].id}">${messages[i].user.username}</h4><p class="msg-chat-${messages[i].id}">${
            messages[i].message
          }</p>`;
          document.getElementById("chat-cont").innerHTML = `${messageHTML}`;
        } else {
          messageHTML += `<h4 class="name-chat-${messages[i].id}">${messages[i].user.username}</h4><p class="msg-chat-otherUser">${messages[i].message}</p>`;
          document.getElementById("chat-cont").innerHTML = `${messageHTML}`;
        }
    }
    return
}

export default createMessage;