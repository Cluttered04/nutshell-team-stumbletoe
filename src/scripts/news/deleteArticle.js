import newsCollection from "./newsCollection.js"
import articleList from "./articleList.js"

const activateDeleteButton = () => {
    document.querySelector("#news-cont").addEventListener("click", () => {
        if(event.target.classList.contains("delete")){
            console.log("DELETE")
            const idToDelete = event.target.id.split("-")[2];
            newsCollection.deleteArticle(idToDelete)
            .then(articleList)
        }
    })
}

export default activateDeleteButton;