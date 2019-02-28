import formBuilder from "./formBuilder.js"

const articlePrinter = {
    buildNewForm: () => {
        document.querySelector("#news-cont").innerHTML = formBuilder.newsForm()
    },
    removeNewForm: () => {
        document.querySelector("#new-form").innerHTML = ""
    },
    buildEditForm: (singleParam) => {
        document.querySelector("#news-cont").innerHTML = formBuilder.editForm(singleParam)
    },
    removeEditForm: () => {
        document.querySelector("#edit-form").innerHTML = ""
    }
}

export default articlePrinter;