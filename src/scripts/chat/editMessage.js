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

export default editMessage;
