const refresh = {
  scrollData: function scrollData() {
    // Get a reference to the div you want to auto-scroll.
    var someElement = document.querySelector("#chat-cont");
    // Create an observer and pass it a callback.
    var observer = new MutationObserver(refresh.scrollToBottom);
    // Tell it to look for new children that will change the height.
    var config = { childList: true };
    observer.observe(someElement, config);
  },

  scrollToBottom: function scrollToBottom() {
    document.querySelector("#chat-cont").scrollTop = document.querySelector("#chat-cont").scrollHeight;
  }
};

export default refresh;
