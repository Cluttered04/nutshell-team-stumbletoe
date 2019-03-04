import printToDOM from "./printToDOM";
import refresh from "./refresh";
import editMessage from "./editMessage";

function chat() {
  const activeUser = sessionStorage.getItem("activeUser");
  printToDOM(activeUser);
  refresh.scrollData();
  editMessage();
}
export default chat;
