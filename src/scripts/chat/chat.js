import printToDOM from "./printToDOM";

function chat() {
  const activeUser = sessionStorage.getItem("activeUser");
  printToDOM(+activeUser);
}
export default chat;
