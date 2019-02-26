import article from "./singleArticle.js"
import newsCollection from "./apiManager.js"
import newsForm from "./newsForm.js";
// import activateEditButton from "./editForm.js";
// import activateDeleteButton from "./deleteArticle.js";
// import buttonHandler from "./newsManager.js";



const articleList = () => {
    newsCollection.getAllUserArticles()
        .then(news => {
            news.forEach(singleArticle => {
                document.querySelector("#news-cont").innerHTML += article(singleArticle);

            })
        })

    }

export default articleList;