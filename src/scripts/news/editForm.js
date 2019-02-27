import newsCollection from "./apiManager.js";
import handleEdit from "./editBuilder.js";
import newsForm from "./newsForm.js";

const editForm = {
    editForm: () => {
        return `
        <div>
          <h3>Edit Article</h3>
          <form action="">
            <input type="text"  id="news-title" value="title">
            <input type="text"  id="news-url" value="url">
            <input type="text" id="news-synopsis" value="synopsis">
          </form>
           <button id="save-news-btn">Save</button>
        </div>`;
      },

    activateEditButton: () => {
        document.querySelector("#news-cont").addEventListener("click", () => {

            if (event.target.id.includes("edit")) {
            newsCollection.editArticle()


                editForm.editForm();

                console.log("This is edit button")

            }
        })
    }
}

                // newsCollection.getSingleArticle(event.target.id.split("-")[2])
                //     .then((singleEdit) => {
                //         editForm.editForm();
                //         document.querySelector("#news-title").value = singleEdit.title;

                //         document.querySelector("#news-url").value = singleEdit.url;

                //         document.querySelector("#news-synopsis").value = singleEdit.synopsis;


                        // handleEdit();

            //         })
            // }
//         })
//     },
// }

// editForm.activateEditButton();

export default editForm