import article from "./singleArticle.js"
import newsCollection from "./apiManager.js"
import newsForm from "./newsForm.js";
import activateEditButton from "./editForm.js";
import activateDeleteButton from "./deleteArticle.js";



const articleList = () => {
    console.log("Inside article list")

    newsCollection.getAllUserArticles()
        .then(news => {
            news.forEach(singleArticle => {
                document.querySelector("#news-cont").innerHTML += article(singleArticle);

            })
        }).then(() => {
            activateEditButton();
            activateDeleteButton();

        }).then(() => {
            document.querySelector("#news-cont").innerHTML += newsForm.buildNewsForm();

        }).then(() => {
            newsForm.activateSaveButton();
        })
}

document.querySelector("news-cont").innerHTML = "";

export default articleList;