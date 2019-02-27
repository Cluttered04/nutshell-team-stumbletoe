import articleList from "./articleList.js";
import activateDeleteButton from "./deleteArticle.js";
import activateEditButton from "./editForm.js";
import newsForm from "./newsForm.js";

// import newsForm from "./newsForm.js";


const newsActivator = () => {
    articleList();
    document.querySelector("#news-cont").innerHTML = newsForm.newButton();
    newsForm.activateNewButton();
    newsForm.activateSaveButton();
}

export default newsActivator