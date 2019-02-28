import newsContent from "./articleList.js";
import formBuilder from "./formBuilder.js";

//Activator for Dashboard
const newnewsActivator = () => {
    // document.querySelector("#news-header").innerHTML += "<h2>NEWS</h2>"
    document.querySelector("#news-header").innerHTML = formBuilder.newButton()
    newsContent.eventListeners();
    newsContent.newsList();
}


export default newnewsActivator