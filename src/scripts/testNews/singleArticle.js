var moment = require("../../lib/node_modules/moment")
moment().format("MMM DD YYYY");



const article = (singleNewsObj) => {
    let momentDate = moment(`${singleNewsObj.date}`).format("MMM DD YYYY, h:mm:ss a")
    return `<div>
    <h3>${singleNewsObj.title}</h3>
    <p><a href="${singleNewsObj.url}">${singleNewsObj.url}</a></p>
    <p>${singleNewsObj.synopsis}</p>
    <p>${momentDate}<p>

    <button class="delete-news-btn" id="delete-news-${singleNewsObj.id}">Delete</button>
    <button class="edit-news-btn" id="burrito-${singleNewsObj.id}">Edit</button>
 </div>`



}


export default article;