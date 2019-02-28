const apiManager = {
  getUsername: () => {
    const activeUserId = sessionStorage.getItem("activeUser");
    return fetch(`http://localhost:8088/users?id=${activeUserId}`)
      .then(r => r.json())
      .then(r => {
        const username = r.username;
        return username;
      });
  },
  username: () => {
    const userUsername = apiManager.getUsername();
    return userUsername;
  },
  saveNewMessage: messageObj => {
    return fetch("http://localhost:8088/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(messageObj)
    });
  }
};

export default apiManager;
