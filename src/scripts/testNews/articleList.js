import article from "./singleArticle.js"
import newsCollection from "./apiManager.js"



const articleList = () => {
    newsCollection.getAllUserArticles()
        .then(news => {
            news.forEach(singleArticle => {
                document.querySelector("#news-cont").innerHTML += article(singleArticle);
            })

        })

}

export default articleList;