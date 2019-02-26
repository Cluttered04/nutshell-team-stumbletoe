const article = (singleNewsObj) => {
    console.log("Inside article")
    return `<div>
    <h3>${singleNewsObj.title}</h3>
    <p>${singleNewsObj.url}</p>
    <p>${singleNewsObj.synopsis}</p>
    <button class="delete-btn" id="delete-news-${singleNewsObj.id}">Delete</button>
    <button class="edit-btn" id="edit-news-${singleNewsObj.id}">Edit</button>
 </div>`
 }

 export default article;