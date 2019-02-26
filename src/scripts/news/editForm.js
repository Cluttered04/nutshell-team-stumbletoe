import newsCollection from "./apiManager.js";
import handleEdit from "./editBuilder.js";
import newsForm from "./newsForm.js";

const activateEditButton = () => {
    document.querySelector("#news-cont").addEventListener("click", () => {
        if (event.target.id.includes("edit")) {
            // handleEdit();

            console.log("This is edit button")
            newsCollection.getSingleArticle(event.target.id.split("-")[2])
                .then((singleEdit) => {
                    newsForm.buildNewsForm();
                    document.querySelector("#news-title").value = singleEdit.title;

                    document.querySelector("#news-url").value = singleEdit.url;

                    document.querySelector("#news-synopsis").value = singleEdit.synopsis;


                    handleEdit();

                })
        }
    })
}

export default activateEditButton;