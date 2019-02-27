import newsCollection from "./apiManager.js";
import handleEdit from "./editBuilder.js";
import newsForm from "./newsForm.js";

const editForm = {
    editForm: () => {
        return `
        <div>
          <h3>Edit Article</h3>
          <form action="">
            <input type="text"  id="news-title" placeholder="Enter a Title">
            <input type="text"  id="news-url" placeholder="Enter URL to Article">
            <input type="text" id="news-synopsis" placeholder="Enter a synopsis">
          </form>
           <button id="save-news-btn">Save</button>
        </div>`;
      },

    activateEditButton: () => {
        document.querySelector("#news-cont").addEventListener("click", () => {
            if (event.target.id.includes("edit")) {
                // handleEdit();

                console.log("This is edit button")
                newsCollection.getSingleArticle(event.target.id.split("-")[2])
                    .then((singleEdit) => {
                        editForm.editForm();
                        document.querySelector("#news-title").value = singleEdit.title;

                        document.querySelector("#news-url").value = singleEdit.url;

                        document.querySelector("#news-synopsis").value = singleEdit.synopsis;


                        handleEdit();

                    })
            }
        })
    },
}
export default editForm;