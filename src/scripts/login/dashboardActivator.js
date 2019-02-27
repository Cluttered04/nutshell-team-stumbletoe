//This function imports all the event listeners and page loads from the individual modules
//news, events, tasks, chats, and friends
import formPrinter from "./printToDom.js";
import chat from "../chat/chat";

const dashboardActivator = () => {
  formPrinter.printLogoutForm();
  chat();
};

export default dashboardActivator;
