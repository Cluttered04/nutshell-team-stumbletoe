import newsCollection from "./apiManager.js"
import articleList from "./articleList.js"

const activateDeleteButton = () => {
    document.querySelector("#news-cont").addEventListener("click", () => {
        if(event.target.id.includes("delete")){
            const idToDelete = event.target.id.split("-")[2];
            newsCollection.deleteArticle(idToDelete)
            .then(() => {
                document.querySelector("#news-cont").innerHTML = ""
            }).then (() => {
                articleList();
            })
        }
    })
}

export default activateDeleteButton;