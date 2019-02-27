const apiManager = {
  getAllContacts: () => {
    const activeUserId = sessionStorage.getItem("userId");
    return fetch(`http://localhost:8088/contacts?userId=${activeUserId}`).then(
      r => r.json()
    );
  }
};
