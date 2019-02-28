// import createMessage from "./"
// import scrollController from "./scrollController"
import createMessage from "./createMessage"
import apiManager from "./apiManager"
import refresh from "./refresh"

const username = apiManager.username()
function printToDOM(activeUser) {
  let messageHTML = "";
  fetch(`http://localhost:8088/messages?_expand=user`)
    .then(messages => messages.json())
    .then(messages => {
      for (let i = 0; i < messages.length; i++) {
        if (messages[i].userId === activeUser) {
          messageHTML += `<h4 class="name-chat-${messages[i].userId}">${messages[i].user.username}</h4><p class="msg-chat-${messages[i].id}">${
            messages[i].message
          }</p>`;
          document.getElementById("chat-cont").innerHTML = `${messageHTML}`;
        } else {
          messageHTML += `<h4 class="name-chat-${messages[i].userId}">${messages[i].user.username}</h4><p class="msg-chat-otherUser">${messages[i].message}</p>`;
          document.getElementById("chat-cont").innerHTML = `${messageHTML}`;
        }
      }
      document.getElementById("chat-cont").innerHTML = `${messageHTML}` + `<form>
      <input type="text" id="create-msg" placeholder="Type Something!">
  </form><button id="create-msg-btn">New Message</button>`
    }).then(() => {createMessage(activeUser, username)})
}

export default printToDOM;
