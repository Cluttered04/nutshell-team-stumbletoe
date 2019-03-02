import apiManager from "./apiManager";
import printToDOM from "./printToDOM";

const editMessage = () => {
  const activeUserId = sessionStorage.getItem("activeUser");
  document.querySelector("#chat-cont").addEventListener("click", e => {
    console.log(e);
    if (e.target.id.includes("edit-msg-btn")) {
      const messageId = e.target.id.split("-")[3];
      const editedMessageVal = document.querySelector("#create-msg").value;
      const editedMessageValAPI = {
        message: `${editedMessageVal}`,
      };
      apiManager.saveEditedMessage(editedMessageValAPI, messageId);
    } else {
      console.log("Error: Not able to edit.");
    }
    printToDOM(activeUserId);
  });
};

// function createMessage(activeUser) {
//   // const activeUser = sessionStorage.getItem("activeUser");
//   document.getElementById("create-msg-btn").addEventListener("click", () => {
//     const messageVal = document.querySelector("#create-msg").value;
//     document.querySelector("#create-msg").value = "";
//     const activeUserId = sessionStorage.getItem("activeUser");
//     const newMessage = {
//       userId: `${activeUserId}`,
//       message: `${messageVal}`,
//       timestamp: `${new Date()}`
//     };
//     apiManager.saveNewMessage(newMessage).then(() => {
//       printToDOM(activeUser);
//     });
//   });
//   refresh.scrollData();
// }

export default editMessage;
