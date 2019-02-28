const formBuilder = {
    editForm: (singleParam) => {
        return `
        <div id="edit-form">
          <h3>Edit Article</h3>
          <form action="">
            <input type="text"  id="news-title-${singleParam.id}" value="${singleParam.title}">
            <input type="text"  id="news-url-${singleParam.id}" value="${singleParam.url}">
            <input type="text" id="news-synopsis-${singleParam.id}" value="${singleParam.synopsis}">
          </form>
           <button id="save-edit-news-btn-${singleParam.id}">Save</button>
        </div>`;
    },

    newsForm: () => {
        return `
        <div id="new-form">
          <h3>Add an Article</h3>
          <form action="">
            <input type="text"  id="news-title" placeholder="Enter a Title">
            <input type="text"  id="news-url" placeholder="Enter URL to Article">
            <input type="text" id="news-synopsis" placeholder="Enter a synopsis">
          </form>
           <button id="save-news-btn">Save</button>
        </div>`
    },
    newButton: () => {
      return `<h2>NEWS</h2> <button id="new-news-btn">New Article</button>`
    },
}

export default formBuilder