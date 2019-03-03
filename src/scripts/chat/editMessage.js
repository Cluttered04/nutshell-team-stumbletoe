import printToDOM from "./printToDOM";
import editMessageApi from "./editMessageAPI";

const editMessage = () => {
  document.querySelector("#chat-cont").addEventListener("click", e => {
    console.log(e);
    if (e.target.id.includes("edit-msg-btn")) {
      const messageId = e.target.id.split("-")[3];
      document.querySelector("#chat-input").innerHTML = `<div>
      <input type="text" id="create-msg">
  </div><button id="save-edit">Save Edit</button>`;
      editMessageApi(messageId);
    } else {
      console.log("Error: Not able to edit.");
    }
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
