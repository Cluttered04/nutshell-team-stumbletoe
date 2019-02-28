import newsCollection from "./apiManager.js";
import buildArticleObject from "./objectBuilder.js";
import newsContent from "./articleList.js";
import articlePrinter from "./articlePrinter.js";

    //Event Listeners

const newsEventListeners = {
    activateSaveButton: () => {
        document.querySelector("#news-cont").addEventListener("click", () => {

            if (event.target.id === "save-news-btn") {

                const title = document.querySelector("#news-title").value;
                const url = document.querySelector("#news-url").value;
                const synopsis = document.querySelector("#news-synopsis").value;
                const objectToPost = buildArticleObject(title, url, synopsis)

                newsCollection.saveNewArticle(objectToPost)
                    .then(() => {
                        articlePrinter.removeNewForm();
                    })
                    .then(() => {
                        newsContent.newsList()
                    })

            }

        })
    },
    activateNewButton: () => {
        document.querySelector("#news-header").addEventListener("click", () => {
            if (event.target.id === "new-news-btn") {
                articlePrinter.buildNewForm();
            }
        })
    },

    activateDeleteButton: () => {
        document.querySelector("#news-cont").addEventListener("click", () => {
            if (event.target.id.includes("delete")) {
                const idToDelete = event.target.id.split("-")[2];
                newsCollection.deleteArticle(idToDelete)
                    .then(() => {
                        document.querySelector("#news-cont").innerHTML = ""
                    }).then(() => {
                        newsContent.newsList();
                    })
            }
        })
    },
    activateEditButton: () => {
        document.querySelector("#news-cont").addEventListener("click", () => {

            if (event.target.id.includes("burrito")) {

                const idToEdit = event.target.id.split("-")[1];
                newsCollection.getSingleArticle(idToEdit)
                    .then((idToEdit) => {
                        articlePrinter.buildEditForm(idToEdit)
                    })

            }
        })
    },

    activateSaveEdit: () => {
        document.querySelector("#news-cont").addEventListener("click", () => {
            if (event.target.id.includes("save-edit")) {
                const itemId = event.target.id.split("-")[4];
                const title = document.querySelector(`#news-title-${itemId}`).value;
                const url = document.querySelector(`#news-url-${itemId}`).value;
                const synopsis = document.querySelector(`#news-synopsis-${itemId}`).value;

                const objectToPost = buildArticleObject(title, url, synopsis)
                newsCollection.editArticle(itemId, objectToPost)
                    .then(() => {
                        articlePrinter.removeEditForm()
                        newsContent.newsList();
                    })


            }
        })
    }
}




export default newsEventListeners