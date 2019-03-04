import apiManager from "./apiManager";
import printToDOM from "./printToDOM";
function editMessageAPI(messageId) {
  document.querySelector("#save-edit").addEventListener("click", () => {
    const editedMessageVal = document.querySelector("#create-msg").value;
    const editedMessageValAPI = {
      message: `${editedMessageVal}`
    };
    apiManager.saveEditedMessage(editedMessageValAPI, messageId);
    document.querySelector("#create-msg").value = "";
  });
}

export default editMessageAPI;
