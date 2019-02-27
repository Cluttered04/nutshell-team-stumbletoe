import printToDOM from "./printToDOM";

function createMessage(activeUser) {
  document.getElementById("create-msg-btn").addEventListener("click", () => {
    const messageVal = document.querySelector("#create-msg").value;
    document.querySelector("#chat-cont").innerHTML = `<h4 class="name-chat-${activeUser
    }">${messages[i].user.username}</h4><p class="msg-chat-${messages[i].id}">${
      messages[i].message
    }</p>`;
    document.querySelector("#create-msg").value = "";
    printToDOM();
  });
}

export default createMessage;
