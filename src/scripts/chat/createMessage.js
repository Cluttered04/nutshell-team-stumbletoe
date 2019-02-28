import printToDOM from "./printToDOM";
import apiManager from "./apiManager";
var moment = require("../../lib/node_modules/moment");
import refresh from "./refresh";

function createMessage(activeUser, username) {
  const activeUser = sessionStorage.getItem("activeUser");
  document.getElementById("create-msg-btn").addEventListener("click", () => {
    const messageVal = document.querySelector("#create-msg").value;
    document.querySelector(
      "#chat-cont"
    ).innerHTML = `<h4 class="name-chat-${activeUser}">${username}</h4><p class="msg-chat-">${messageVal}</p>`;
    document.getElementById("chat-cont").innerHTML =
      `${messageVal}` +
      `<form>
      <input type="text" id="create-msg" placeholder="Type Something!">
  </form><button id="create-msg-btn">New Message</button>`;
    document.querySelector("#create-msg").value = "";
    const activeUserId = sessionStorage.getItem("activeUser");
    console.log(activeUserId);
    const newMessage = {
      userId: `${activeUserId}`,
      message: `${messageVal}`,
      timestamp: `${new Date()}`
    };
    apiManager.saveNewMessage(newMessage)
    .then(() => {
      printToDOM(activeUser);});
  });
  refresh.scrollData();
}
export default createMessage;
