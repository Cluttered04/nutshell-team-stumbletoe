// import createMessage from "./"
// var moment = require('moment');
// moment().format();

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
    })
    .then(document.getElementById(""))
}

export default printToDOM;
