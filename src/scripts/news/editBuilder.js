import buildArticleObject from "./articleObjBuilder.js";
import newsCollection from "./apiManager.js";
import articleList from "./articleList.js";
// import buildNewsForm from "./newsForm.js";
// import newsForm from "./newsForm.js";

const handleEdit = () => {
  document.querySelector("#news-cont").addEventListener("click", () => {
    if (event.target.id.includes("edit")) {
      const title = document.querySelector("#news-title").value;
      const url = document.querySelector("#news-url").value;
      const synopsis = document.querySelector("#news-synopsis").value;

      const activeUserId = event.target.id.split("-")[2];

      const objectToPost = buildArticleObject(title, url, synopsis);

      newsCollection.getAllUserArticles(activeUserId, objectToPost).then(() => {
        articleList();
        // document.querySelector("#news-cont").innerHTML = buildNewsForm.buildForm();
      });
    }
  });
};

export default handleEdit;