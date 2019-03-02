// import createMessage from "./"
// import scrollController from "./scrollController"
import editMessage from "./editMessage"
import createMessage from "./createMessage";
import apiManager from "./apiManager";

const username = apiManager.username();
function printToDOM(activeUser) {
  let messageHTML = "";
  fetch(`http://localhost:8088/messages?_expand=user`)
    .then(messages => messages.json())
    .then(messages => {
      for (let i = 0; i < messages.length; i++) {
        document.getElementById("chat-header").innerHTML = `<h2>CHAT</h2>`
        if (messages[i].userId === activeUser) {
          messageHTML += `<h4 class="name-chat-${messages[i].userId}">${
            messages[i].user.username
          }</h4><p class="msg-chat-${messages[i].id}"><button id="edit-msg-btn-${messages[i].id}">Edit</button>${
            messages[i].message
          }</p>`;
          document.getElementById("chat-cont").innerHTML = `${messageHTML}`;
        } else {
          messageHTML += `<h4 class="name-chat-${messages[i].userId}">${
            messages[i].user.username
          }</h4><p class="msg-chat-0">${messages[i].message}</p>`;
          document.getElementById("chat-cont").innerHTML = `${messageHTML}`;
        }
      }
      document.getElementById("chat-cont").innerHTML = `${messageHTML}`
      document.getElementById("chat-input").innerHTML =
        `<div>
      <input type="text" id="create-msg" placeholder="Type Something!">
  </div><button id="create-msg-btn">New Message</button>`;
    })
    .then(() => {
      createMessage(activeUser, username);
    });
}

export default printToDOM;
