import newsCollection from "./apiManager.js";
import buildArticleObject from "./articleObjBuilder.js";
import articleList from "./articleList.js";

const newsForm = {
  newButton: () => {
    return `<button id="new-news-btn">New Article</button>`
  },
  activateNewButton: () => {
    document.querySelector("#news-cont").addEventListener("click", () => {
      if (event.target.id === "new-news-btn") {
        document.querySelector("#news-cont").innerHTML = newsForm.buildNewsForm();
      }
    })
  },
  buildNewsForm: () => {
    return `
    <div>
      <h3>Add an Article</h3>
      <form action="">
        <input type="text"  id="news-title" placeholder="Enter a Title">
        <input type="text"  id="news-url" placeholder="Enter URL to Article">
        <input type="text" id="news-synopsis" placeholder="Enter a synopsis">
      </form>
       <button id="save-news-btn">Save</button>
    </div>`;
  },
  activateSaveButton: () => {
    document.querySelector("#news-cont").addEventListener("click", () => {
      if (event.target.id === "save-news-btn") {

        const title = document.querySelector("#news-title").value;
        const url = document.querySelector("#news-url").value;
        const synopsis = document.querySelector("#news-synopsis").value;

        const objectToPost = buildArticleObject(title, url, synopsis)

        newsCollection.saveNewArticle(objectToPost)
          .then(() => {
            document.querySelector("#news-cont").innerHTML += articleList();

          })

      }

    })
  }
};


// document.querySelector("#news-cont").innerHTML = newsForm.buildNewsForm();
export default newsForm;