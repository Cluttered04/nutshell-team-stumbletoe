const buildArticleObject = (titleParam, urlParam, synopsisParam) => {
    return {
      title: titleParam,
      url: urlParam,
      synopsis: synopsisParam,
      userId: sessionStorage.getItem("activeUser")
    };
  };

  export default buildArticleObject;