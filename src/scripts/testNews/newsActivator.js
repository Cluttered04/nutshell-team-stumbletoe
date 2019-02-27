import articleList from "./articleList.js";
import formBuilder from "./formBuilder.js";
import newsEventListeners from "./newsManager.js";

const newnewsActivator = () => {
    document.querySelector("#news-header").innerHTML = formBuilder.newButton()
    newsEventListeners.activateNewButton()
    articleList();
}
export default newnewsActivator