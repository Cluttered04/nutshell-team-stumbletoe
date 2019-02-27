import formBuilder from "./formBuilder.js"
import newsEventListeners from "./newsManager.js";

const articlePrinter = {
    buildNewForm: () => {
        document.querySelector("#news-cont").innerHTML = formBuilder.newsForm()
            newsEventListeners.activateSaveButton()
    },
    removeNewForm: () => {
        document.querySelector("#news-cont").innerHTML = ""
    },
    buildEditForm: () => {
        document.querySelector("#news-cont").innerHTML = formBuilder.editForm()
    },
    removeEditForm: () => {
        document.querySelector("news-cont").innerHTML = ""
    }
}

export default articlePrinter;