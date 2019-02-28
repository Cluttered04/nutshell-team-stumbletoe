// const scrollController = {
// scrollData: (function scrollData() {
//   // Get a reference to the div you want to auto-scroll.
//   var someElement = document.querySelector("#chat-cont");
//   // Create an observer and pass it a callback.
//   var observer = new MutationObserver(scrollController.scrollToBottom);
//   // Tell it to look for new children that will change the height.
//   var config = { childList: true };
//   observer.observe(someElement, config);
// }),

// // First, define a helper function.
// animateScroll: (function animateScroll(duration) {
//   var start = document.querySelector("#chat-cont").scrollTop;
//   var end = document.querySelector("#chat-cont").scrollHeight;
//   var change = end - start;
//   var increment = 20;
//   function easeInOut(currentTime, start, change, duration) {
//     // by Robert Penner
//     currentTime /= duration / 2;
//     if (currentTime < 1) {
//       return (change / 2) * currentTime * currentTime + start;
//     }
//     currentTime -= 1;
//     return (-change / 2) * (currentTime * (currentTime - 2) - 1) + start;
//   }
//   function animate(elapsedTime) {
//     elapsedTime += increment;
//     var position = easeInOut(elapsedTime, start, change, duration);
//     document.querySelector("#chat-cont").scrollTop = position;
//     if (elapsedTime < duration) {
//       setTimeout(function() {
//         animate(elapsedTime);
//       }, increment);
//     }
//   }
//   animate(0);
// }),

// // Here's our main callback function we passed to the observer
// scrollToBottom: (function scrollToBottom() {
//   var duration = 1000; // Or however many milliseconds you want to scroll to last
//   scrollController.animateScroll(duration);
// })
// }

// export default scrollController;
