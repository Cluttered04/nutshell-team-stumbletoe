import printToDOM from "./printToDOM";
import refresh from "./refresh"

function chat() {
  const activeUser = sessionStorage.getItem("activeUser");
  printToDOM(activeUser);
  refresh.scrollData();
}
export default chat;
