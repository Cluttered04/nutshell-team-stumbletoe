import article from "./singleArticle.js"
import newsCollection from "./apiManager.js"



const articleList = () => {
    console.log("Inside article list")
    document.querySelector("#news-cont").innerHTML = "";
    newsCollection.getAllArticles()
    .then(news => {
        news.forEach(singleArticle => {
            document.querySelector("#news-cont").innerHTML += article(singleArticle);
        })

    })
}

export default articleList;