function chatManager(activeUser) {
    let messageHTML = "";
    fetch(
      `http://localhost:8088/messages?userId=${activeUser}`
    )
      .then(messages => messages.json())
      .then(messages => {
        for (let i = 0; i < messages.length; i++) {
          messageHTML += `<p>${messages[i].message}</p>`
          document.getElementById("chat-cont").innerHTML = `${messageHTML}`
        }
      });
  }

  export default chatManager;
