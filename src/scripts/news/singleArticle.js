import activateDeleteButton from "./deleteArticle";
import editForm from "./editForm";

const article = (singleNewsObj) => {
    return `<div>
    <h3>${singleNewsObj.title}</h3>
    <p><a href="${singleNewsObj.url}">${singleNewsObj.url}</a></p>
    <p>${singleNewsObj.synopsis}</p>
    <button class="delete-news-btn" id="delete-news-${singleNewsObj.id}">Delete</button>
    <button class="edit-news-btn" id="edit-news-${singleNewsObj.id}">Edit</button>
 </div>`

 }

 activateDeleteButton();
 editForm.activateEditButton();

 export default article;