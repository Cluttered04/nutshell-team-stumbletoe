import newsCollection from "./apiManager.js";
import buildArticleObject from "./objectBuilder.js";
import articleList from "./articleList.js";
import articlePrinter from "./articlePrinter.js";
import formBuilder from "./formBuilder.js";

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
                        articleList()
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
        // .then(() => {
        //     articlePrinter.removeNewForm()
        // })
    },

    activateDeleteButton: () => {
        document.querySelector("#news-cont").addEventListener("click", () => {
            if (event.target.id.includes("delete")) {
                newsCollection.deleteArticle()
                    .then(() => {
                        document.querySelector("#news-cont").innerHTML = ""
                    }).then(() => {
                        articleList();
                    })
            }
        })
    },
    activateEditButton: () => {
        document.querySelector("#news-cont").addEventListener("click", () => {

            if (event.target.id.includes("edit")) {
                newsCollection.editArticle()

                console.log("This is edit button")

            }
        })
    }
};

export default newsEventListeners