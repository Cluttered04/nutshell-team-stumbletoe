import articleList from "./articleList.js";
import activateEditButton from "./editForm.js";
import activateDeleteButton from "./deleteArticle.js";
// import newsForm from "./newsForm.js";


const newsActivator = () => {
articleList();
// newsForm.buildNewsForm();

activateDeleteButton();
activateEditButton();
}

export default newsActivator