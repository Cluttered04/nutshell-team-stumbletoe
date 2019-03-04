import printToDOM from "./printToDOM";
import apiManager from "./apiManager";
import refresh from "./refresh";
var moment = require("../../lib/node_modules/moment");

function createMessage(activeUser) {
  // const activeUser = sessionStorage.getItem("activeUser");
  document.getElementById("create-msg-btn").addEventListener("click", () => {
    const messageVal = document.querySelector("#create-msg").value;
    document.querySelector("#create-msg").value = "";
    const activeUserId = sessionStorage.getItem("activeUser");
    const newMessage = {
      userId: `${activeUserId}`,
      message: `${messageVal}`,
      timestamp: `${new Date()}`
    };
    apiManager.saveNewMessage(newMessage).then(() => {
      printToDOM(activeUser);
    });
  });
  refresh.scrollData();
}
export default createMessage;
