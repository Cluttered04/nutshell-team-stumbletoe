(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function chatManager(activeUser) {
  let messageHTML = "";
  fetch(`http://localhost:8088/messages?userId=${activeUser}`).then(messages => messages.json()).then(messages => {
    for (let i = 0; i < messages.length; i++) {
      messageHTML += `<p>${messages[i].message}</p>`;
      document.getElementById("chat-cont").innerHTML = `${messageHTML}`;
    }
  });
}

var _default = chatManager;
exports.default = _default;

},{}],2:[function(require,module,exports){
"use strict";

var _chatManager = _interopRequireDefault(require("./chat/chatManager"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const activeUser = 1;
(0, _chatManager.default)(activeUser);

},{"./chat/chatManager":1}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9zY3JpcHRzL2NoYXQvY2hhdE1hbmFnZXIuanMiLCIuLi9zY3JpcHRzL21haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7O0FDQUEsU0FBUyxXQUFULENBQXFCLFVBQXJCLEVBQWlDO0FBQzdCLE1BQUksV0FBVyxHQUFHLEVBQWxCO0FBQ0EsRUFBQSxLQUFLLENBQ0YseUNBQXdDLFVBQVcsRUFEakQsQ0FBTCxDQUdHLElBSEgsQ0FHUSxRQUFRLElBQUksUUFBUSxDQUFDLElBQVQsRUFIcEIsRUFJRyxJQUpILENBSVEsUUFBUSxJQUFJO0FBQ2hCLFNBQUssSUFBSSxDQUFDLEdBQUcsQ0FBYixFQUFnQixDQUFDLEdBQUcsUUFBUSxDQUFDLE1BQTdCLEVBQXFDLENBQUMsRUFBdEMsRUFBMEM7QUFDeEMsTUFBQSxXQUFXLElBQUssTUFBSyxRQUFRLENBQUMsQ0FBRCxDQUFSLENBQVksT0FBUSxNQUF6QztBQUNBLE1BQUEsUUFBUSxDQUFDLGNBQVQsQ0FBd0IsV0FBeEIsRUFBcUMsU0FBckMsR0FBa0QsR0FBRSxXQUFZLEVBQWhFO0FBQ0Q7QUFDRixHQVRIO0FBVUQ7O2VBRWMsVzs7Ozs7O0FDZGpCOzs7O0FBRUEsTUFBTSxVQUFVLEdBQUcsQ0FBbkI7QUFDQSwwQkFBWSxVQUFaIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiZnVuY3Rpb24gY2hhdE1hbmFnZXIoYWN0aXZlVXNlcikge1xyXG4gICAgbGV0IG1lc3NhZ2VIVE1MID0gXCJcIjtcclxuICAgIGZldGNoKFxyXG4gICAgICBgaHR0cDovL2xvY2FsaG9zdDo4MDg4L21lc3NhZ2VzP3VzZXJJZD0ke2FjdGl2ZVVzZXJ9YFxyXG4gICAgKVxyXG4gICAgICAudGhlbihtZXNzYWdlcyA9PiBtZXNzYWdlcy5qc29uKCkpXHJcbiAgICAgIC50aGVuKG1lc3NhZ2VzID0+IHtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG1lc3NhZ2VzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICBtZXNzYWdlSFRNTCArPSBgPHA+JHttZXNzYWdlc1tpXS5tZXNzYWdlfTwvcD5gXHJcbiAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNoYXQtY29udFwiKS5pbm5lckhUTUwgPSBgJHttZXNzYWdlSFRNTH1gXHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICB9XHJcblxyXG4gIGV4cG9ydCBkZWZhdWx0IGNoYXRNYW5hZ2VyO1xyXG4iLCJpbXBvcnQgY2hhdE1hbmFnZXIgZnJvbSBcIi4vY2hhdC9jaGF0TWFuYWdlclwiXHJcblxyXG5jb25zdCBhY3RpdmVVc2VyID0gMVxyXG5jaGF0TWFuYWdlcihhY3RpdmVVc2VyKTsiXX0=
