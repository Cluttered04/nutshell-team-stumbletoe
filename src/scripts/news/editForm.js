import newsCollection from "./apiManager.js";
import handleEdit from "./editBuilder.js";


const activateEditButton = () => {
    document.querySelector("#news-cont").addEventListener("click", () => {
        if(event.target.classList.contains("edit")){
            newsCollection.getSingleArticle(event.target.id.split("-")[2])
            .then((singleArticle) => {
                document.querySelector("#news-title").value = singleArticle.name;

                document.querySelector("#news-url").value = singleArticle.phone;

                document.querySelector("#news-synopsis").value = singleArticle.email;

                document.querySelector("#save-news-btn").textContent = "Edit";
                document.querySelector("#save-news-btn").id= `edit-news-btn-${singleNewsObj.id}`;

                handleEdit();

            })
        }
    })
}

export default activateEditButton;