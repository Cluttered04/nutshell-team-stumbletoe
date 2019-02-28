const buildArticleObject = (titleParam, urlParam, synopsisParam) => {
    return {
      title: titleParam,
      url: urlParam,
      synopsis: synopsisParam,
      date: new Date(),
      userId: sessionStorage.getItem("activeUser")
    };
  };

  export default buildArticleObject;