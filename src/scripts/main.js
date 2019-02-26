import articleList from "./news/articleList";
import activateEditButton from "./news/editForm";
import activateDeleteButton from "./news/deleteArticle";
import newsForm from "./news/newsForm";

articleList();
activateDeleteButton();
activateEditButton();
newsForm.buildNewsForm();

import formPrinter from "../login/printToDom.js"
import loginManager from "../login/loginManager.js"

formPrinter.printLoginForm();
loginManager();
