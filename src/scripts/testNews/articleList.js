import article from "./singleArticle.js"
import newsCollection from "./apiManager.js"
import newsEventListeners from "./newsManager.js";


const newsContent = {
    newsList: () => {
        newsCollection.getAllUserArticles()
            .then(news => {
                news.forEach(singleArticle => {
                    document.querySelector("#news-cont").innerHTML += article(singleArticle);
                })

            })

    },
    eventListeners: () => {
        newsEventListeners.activateSaveButton();
        newsEventListeners.activateSaveEdit();
        newsEventListeners.activateDeleteButton();
        newsEventListeners.activateNewButton();
        newsEventListeners.activateEditButton();
    }

}

export default newsContent;