const formBuilder = {
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

    newsForm: () => {
        return `
        <div>
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
      return `<button id="new-news-btn">New Article</button>`
    },
}

export default formBuilder