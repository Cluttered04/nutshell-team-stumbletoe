import chatManager from "./chat/chatManager"

const activeUser = 1
chatManager(activeUser);
import formPrinter from "../login/printToDom.js"
import loginManager from "../login/loginManager.js"

formPrinter.printLoginForm();
loginManager();
