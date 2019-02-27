const newsCollection = {
    saveNewArticle: newsObj => {
      return fetch("http://localhost:8088/news", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newsObj)
      });
    },
    getAllUserArticles: () => {
      const activeUserId = sessionStorage.getItem("activeUser");
      return fetch(`http://localhost:8088/news?userId=${activeUserId}`).then(r => r.json());
    },
    deleteArticle: (newsId) => {
      return fetch(`http://localhost:8088/news/${newsId}`, {
        method: "DELETE"
      })
    },
    getSingleArticle: (newsId) => {
      return fetch(`http://localhost:8088/news/${newsId}`)
      .then(r=> r.json())
    },
    editArticle: (newsId, newsObj) => {
      return fetch(`http://localhost:8088/news/${newsId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newsObj)
      });
    }
  };

  export default newsCollection;