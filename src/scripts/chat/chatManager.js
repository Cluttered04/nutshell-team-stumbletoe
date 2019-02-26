function chatManager(activeUser) {
  let messageHTML = "";
  fetch(`http://localhost:8088/messages?_expand=user`)
    // ?userId=${activeUser}
    .then(messages => messages.json())
    .then(messages => {
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
    });
}

export default chatManager;
