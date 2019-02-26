(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
//This module allows for fetch and post calls to the user database
//built by Sydney Wait
const APIManager = {
  getSingleUser: userId => {
    return fetch(`http://localhost:8088/user/${userId}`).then(contacts => contacts.json());
  },
  getAllUsers: () => {
    return fetch("http://localhost:8088/users").then(contacts => contacts.json());
  },
  addUser: userObject => {
    return fetch("http://localhost:8088/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userObject)
    });
  }
};
var _default = APIManager;
exports.default = _default;

},{}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
//module to build the login and registration forms
// built by Sydney Wait
const formBuilder = {
  makeLoginForm: () => {
    return `<h1>Welcome to Nutshell!</h1>
    <input class="input login-input" type="text" name="userName" id="login-name" placeholder="Username"><br>
    <input class="input login-input" type="text" name="password" id="login-pass" placeholder="Password"><br>
    <button type="submit" class = "btn" id="login-btn">login</button>
    <button type="submit" class = "btn" id="reg-btn">register</button>`;
  },
  makeRegisterForm: () => {
    return `<h1>Please Register:</h1>
    <input class="register-input" type="text" name="email" id="reg-email" placeholder="Email Address"><br>
    <input class="register-input" type="text" name="userName" id="reg-name" placeholder="Username"><br>
    <input class="register-input" type="password" name="password" id="reg-pass" placeholder="Password"><br>
    <button type="register" class = "btn" id="submit-reg-btn">register</button>`;
  }
};
var _default = formBuilder;
exports.default = _default;

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _printToDom = _interopRequireDefault(require("./printToDom.js"));

var _objectBuilder = _interopRequireDefault(require("./objectBuilder.js"));

var _APIManager = _interopRequireDefault(require("./APIManager.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//This module handles the login and registration functionality of the APP
// Built by Sydney Wait
const loginManager = () => {
  document.querySelector("#login-container").addEventListener("click", () => {
    const eventTarget = event.target.id.split("-");

    if (event.target.id === "login-btn") {
      const userName = document.querySelector("#login-name").value;
      const password = document.querySelector("#login-pass").value; //check if username is in the database, check if password matches
      //this is  where we will load the dashboard functionality

      console.log("You clicked the login button!");
    }

    if (event.target.id === "reg-btn") {
      console.log("you clicked the register button");

      _printToDom.default.printRegisterForm();
    }

    console.log(eventTarget);

    if (event.target.id === "submit-reg-btn") {
      console.log("you clicked the submit button");
      const userName = document.querySelector("#reg-name").value;
      const password = document.querySelector("#reg-pass").value;
      const email = document.querySelector("#reg-email").value;
      const userObject = (0, _objectBuilder.default)(userName, password, email);
      console.log("this is the userObject", userObject);

      _APIManager.default.addUser(userObject);
    }
  });
};

var _default = loginManager;
exports.default = _default;

},{"./APIManager.js":1,"./objectBuilder.js":4,"./printToDom.js":5}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

// Module to build an object using inputs from the registration field
//Built by Sydney Wait
const buildUserObject = (userName, password, email) => {
  const userObject = {
    "username": userName,
    "password": password,
    "email": email
  };
  return userObject;
};

var _default = buildUserObject;
exports.default = _default;

},{}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _formBuilder = _interopRequireDefault(require("./formBuilder.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Module to print the login and registration forms to the DOM
// also has functionality to clear the forms from the DOM
// Built by Sydney Wait
const formPrinter = {
  printLoginForm: () => {
    document.querySelector("#login-container").innerHTML = _formBuilder.default.makeLoginForm();
  },
  removeLoginForm: () => {
    document.querySelector("#login-container").innerHTML = "";
  },
  printRegisterForm: () => {
    document.querySelector("#login-container").innerHTML = _formBuilder.default.makeRegisterForm();
  },
  removeRegisterForm: () => {
    document.querySelector("#login-container").innerHTML = "";
  }
};
var _default = formPrinter;
exports.default = _default;

},{"./formBuilder.js":2}],6:[function(require,module,exports){
"use strict";

var _printToDom = _interopRequireDefault(require("../login/printToDom.js"));

var _loginManager = _interopRequireDefault(require("../login/loginManager.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_printToDom.default.printLoginForm();

(0, _loginManager.default)();

},{"../login/loginManager.js":3,"../login/printToDom.js":5}]},{},[6])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9sb2dpbi9BUElNYW5hZ2VyLmpzIiwiLi4vbG9naW4vZm9ybUJ1aWxkZXIuanMiLCIuLi9sb2dpbi9sb2dpbk1hbmFnZXIuanMiLCIuLi9sb2dpbi9vYmplY3RCdWlsZGVyLmpzIiwiLi4vbG9naW4vcHJpbnRUb0RvbS5qcyIsIi4uL3NjcmlwdHMvbWFpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7OztBQ0FBO0FBQ0E7QUFFQSxNQUFNLFVBQVUsR0FBQztBQUNqQixFQUFBLGFBQWEsRUFBRyxNQUFELElBQVU7QUFFckIsV0FBTyxLQUFLLENBQUUsOEJBQTZCLE1BQU8sRUFBdEMsQ0FBTCxDQUNOLElBRE0sQ0FDRCxRQUFRLElBQUksUUFBUSxDQUFDLElBQVQsRUFEWCxDQUFQO0FBRUgsR0FMZ0I7QUFPakIsRUFBQSxXQUFXLEVBQUUsTUFBSTtBQUNiLFdBQU8sS0FBSyxDQUFDLDZCQUFELENBQUwsQ0FDRSxJQURGLENBQ08sUUFBUSxJQUFJLFFBQVEsQ0FBQyxJQUFULEVBRG5CLENBQVA7QUFJSCxHQVpnQjtBQWNqQixFQUFBLE9BQU8sRUFBRSxVQUFELElBQWM7QUFFbEIsV0FBTyxLQUFLLENBQUMsNkJBQUQsRUFBZ0M7QUFDeEMsTUFBQSxNQUFNLEVBQUUsTUFEZ0M7QUFFeEMsTUFBQSxPQUFPLEVBQUU7QUFDTCx3QkFBZ0I7QUFEWCxPQUYrQjtBQUt4QyxNQUFBLElBQUksRUFBRSxJQUFJLENBQUMsU0FBTCxDQUFlLFVBQWY7QUFMa0MsS0FBaEMsQ0FBWjtBQU9IO0FBdkJnQixDQUFqQjtlQTJCZSxVOzs7Ozs7Ozs7O0FDOUJmO0FBQ0E7QUFFQSxNQUFNLFdBQVcsR0FBRTtBQUNuQixFQUFBLGFBQWEsRUFBRSxNQUFLO0FBQ2hCLFdBQVE7Ozs7dUVBQVI7QUFLSCxHQVBrQjtBQVVuQixFQUFBLGdCQUFnQixFQUFDLE1BQUs7QUFFbEIsV0FBUTs7Oztn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Z2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCIvL1RoaXMgbW9kdWxlIGFsbG93cyBmb3IgZmV0Y2ggYW5kIHBvc3QgY2FsbHMgdG8gdGhlIHVzZXIgZGF0YWJhc2VcclxuLy9idWlsdCBieSBTeWRuZXkgV2FpdFxyXG5cclxuY29uc3QgQVBJTWFuYWdlcj17XHJcbmdldFNpbmdsZVVzZXI6ICh1c2VySWQpPT57XHJcblxyXG4gICAgcmV0dXJuIGZldGNoKGBodHRwOi8vbG9jYWxob3N0OjgwODgvdXNlci8ke3VzZXJJZH1gKVxyXG4gICAgLnRoZW4oY29udGFjdHMgPT4gY29udGFjdHMuanNvbigpKVxyXG59LFxyXG5cclxuZ2V0QWxsVXNlcnM6ICgpPT57XHJcbiAgICByZXR1cm4gZmV0Y2goXCJodHRwOi8vbG9jYWxob3N0OjgwODgvdXNlcnNcIilcclxuICAgICAgICAgICAgLnRoZW4oY29udGFjdHMgPT4gY29udGFjdHMuanNvbigpKVxyXG5cclxuXHJcbn0sXHJcblxyXG5hZGRVc2VyOih1c2VyT2JqZWN0KT0+e1xyXG5cclxuICAgIHJldHVybiBmZXRjaChcImh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC91c2Vyc1wiLCB7XHJcbiAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcclxuICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiXHJcbiAgICAgICAgfSxcclxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh1c2VyT2JqZWN0KVxyXG4gICAgfSlcclxufVxyXG5cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQVBJTWFuYWdlcjsiLCIvL21vZHVsZSB0byBidWlsZCB0aGUgbG9naW4gYW5kIHJlZ2lzdHJhdGlvbiBmb3Jtc1xyXG4vLyBidWlsdCBieSBTeWRuZXkgV2FpdFxyXG5cclxuY29uc3QgZm9ybUJ1aWxkZXIgPXtcclxubWFrZUxvZ2luRm9ybTogKCkgPT57XHJcbiAgICByZXR1cm4gYDxoMT5XZWxjb21lIHRvIE51dHNoZWxsITwvaDE+XHJcbiAgICA8aW5wdXQgY2xhc3M9XCJpbnB1dCBsb2dpbi1pbnB1dFwiIHR5cGU9XCJ0ZXh0XCIgbmFtZT1cInVzZXJOYW1lXCIgaWQ9XCJsb2dpbi1uYW1lXCIgcGxhY2Vob2xkZXI9XCJVc2VybmFtZVwiPjxicj5cclxuICAgIDxpbnB1dCBjbGFzcz1cImlucHV0IGxvZ2luLWlucHV0XCIgdHlwZT1cInRleHRcIiBuYW1lPVwicGFzc3dvcmRcIiBpZD1cImxvZ2luLXBhc3NcIiBwbGFjZWhvbGRlcj1cIlBhc3N3b3JkXCI+PGJyPlxyXG4gICAgPGJ1dHRvbiB0eXBlPVwic3VibWl0XCIgY2xhc3MgPSBcImJ0blwiIGlkPVwibG9naW4tYnRuXCI+bG9naW48L2J1dHRvbj5cclxuICAgIDxidXR0b24gdHlwZT1cInN1Ym1pdFwiIGNsYXNzID0gXCJidG5cIiBpZD1cInJlZy1idG5cIj5yZWdpc3RlcjwvYnV0dG9uPmBcclxufSxcclxuXHJcblxyXG5tYWtlUmVnaXN0ZXJGb3JtOigpPT4ge1xyXG5cclxuICAgIHJldHVybiBgPGgxPlBsZWFzZSBSZWdpc3Rlcjo8L2gxPlxyXG4gICAgPGlucHV0IGNsYXNzPVwicmVnaXN0ZXItaW5wdXRcIiB0eXBlPVwidGV4dFwiIG5hbWU9XCJlbWFpbFwiIGlkPVwicmVnLWVtYWlsXCIgcGxhY2Vob2xkZXI9XCJFbWFpbCBBZGRyZXNzXCI+PGJyPlxyXG4gICAgPGlucHV0IGNsYXNzPVwicmVnaXN0ZXItaW5wdXRcIiB0eXBlPVwidGV4dFwiIG5hbWU9XCJ1c2VyTmFtZVwiIGlkPVwicmVnLW5hbWVcIiBwbGFjZWhvbGRlcj1cIlVzZXJuYW1lXCI+PGJyPlxyXG4gICAgPGlucHV0IGNsYXNzPVwicmVnaXN0ZXItaW5wdXRcIiB0eXBlPVwicGFzc3dvcmRcIiBuYW1lPVwicGFzc3dvcmRcIiBpZD1cInJlZy1wYXNzXCIgcGxhY2Vob2xkZXI9XCJQYXNzd29yZFwiPjxicj5cclxuICAgIDxidXR0b24gdHlwZT1cInJlZ2lzdGVyXCIgY2xhc3MgPSBcImJ0blwiIGlkPVwic3VibWl0LXJlZy1idG5cIj5yZWdpc3RlcjwvYnV0dG9uPmBcclxufVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmb3JtQnVpbGRlcjsiLCIvL1RoaXMgbW9kdWxlIGhhbmRsZXMgdGhlIGxvZ2luIGFuZCByZWdpc3RyYXRpb24gZnVuY3Rpb25hbGl0eSBvZiB0aGUgQVBQXHJcbi8vIEJ1aWx0IGJ5IFN5ZG5leSBXYWl0XHJcblxyXG5pbXBvcnQgZm9ybVByaW50ZXIgZnJvbSBcIi4vcHJpbnRUb0RvbS5qc1wiXHJcbmltcG9ydCBidWlsZFVzZXJPYmplY3QgZnJvbSBcIi4vb2JqZWN0QnVpbGRlci5qc1wiXHJcbmltcG9ydCBBUElNYW5hZ2VyIGZyb20gXCIuL0FQSU1hbmFnZXIuanNcIlxyXG5cclxuY29uc3QgbG9naW5NYW5hZ2VyID0gKCkgPT4ge1xyXG5cclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbG9naW4tY29udGFpbmVyXCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XHJcblxyXG4gICAgICAgIGNvbnN0IGV2ZW50VGFyZ2V0ID0gZXZlbnQudGFyZ2V0LmlkLnNwbGl0KFwiLVwiKVxyXG4gICAgICAgIGlmIChldmVudC50YXJnZXQuaWQgPT09IFwibG9naW4tYnRuXCIpIHtcclxuICAgICAgICAgICAgY29uc3QgdXNlck5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2xvZ2luLW5hbWVcIikudmFsdWVcclxuICAgICAgICAgICAgY29uc3QgcGFzc3dvcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2xvZ2luLXBhc3NcIikudmFsdWVcclxuICAgICAgICAgICAgLy9jaGVjayBpZiB1c2VybmFtZSBpcyBpbiB0aGUgZGF0YWJhc2UsIGNoZWNrIGlmIHBhc3N3b3JkIG1hdGNoZXNcclxuICAgICAgICAgICAgLy90aGlzIGlzICB3aGVyZSB3ZSB3aWxsIGxvYWQgdGhlIGRhc2hib2FyZCBmdW5jdGlvbmFsaXR5XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiWW91IGNsaWNrZWQgdGhlIGxvZ2luIGJ1dHRvbiFcIilcclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChldmVudC50YXJnZXQuaWQgPT09IFwicmVnLWJ0blwiKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwieW91IGNsaWNrZWQgdGhlIHJlZ2lzdGVyIGJ1dHRvblwiKVxyXG5cclxuICAgICAgICAgICAgZm9ybVByaW50ZXIucHJpbnRSZWdpc3RlckZvcm0oKVxyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKGV2ZW50VGFyZ2V0KVxyXG5cclxuICAgICAgICBpZiAoZXZlbnQudGFyZ2V0LmlkID09PSBcInN1Ym1pdC1yZWctYnRuXCIpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJ5b3UgY2xpY2tlZCB0aGUgc3VibWl0IGJ1dHRvblwiKVxyXG5cclxuICAgICAgICAgICAgY29uc3QgdXNlck5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3JlZy1uYW1lXCIpLnZhbHVlXHJcbiAgICAgICAgICAgIGNvbnN0IHBhc3N3b3JkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNyZWctcGFzc1wiKS52YWx1ZVxyXG4gICAgICAgICAgICBjb25zdCBlbWFpbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcmVnLWVtYWlsXCIpLnZhbHVlXHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHVzZXJPYmplY3QgPSBidWlsZFVzZXJPYmplY3QodXNlck5hbWUsIHBhc3N3b3JkLCBlbWFpbClcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJ0aGlzIGlzIHRoZSB1c2VyT2JqZWN0XCIsIHVzZXJPYmplY3QpXHJcbiAgICAgICAgICAgIEFQSU1hbmFnZXIuYWRkVXNlcih1c2VyT2JqZWN0KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfSlcclxufVxyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGxvZ2luTWFuYWdlcjtcclxuIiwiLy8gTW9kdWxlIHRvIGJ1aWxkIGFuIG9iamVjdCB1c2luZyBpbnB1dHMgZnJvbSB0aGUgcmVnaXN0cmF0aW9uIGZpZWxkXHJcbi8vQnVpbHQgYnkgU3lkbmV5IFdhaXRcclxuXHJcbmNvbnN0IGJ1aWxkVXNlck9iamVjdCA9ICh1c2VyTmFtZSwgcGFzc3dvcmQsIGVtYWlsKSA9PiB7XHJcblxyXG4gICAgY29uc3QgdXNlck9iamVjdCA9IHtcclxuICAgICAgICBcInVzZXJuYW1lXCI6IHVzZXJOYW1lLFxyXG4gICAgICAgIFwicGFzc3dvcmRcIjogcGFzc3dvcmQsXHJcbiAgICAgICAgXCJlbWFpbFwiOiBlbWFpbFxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHVzZXJPYmplY3Q7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGJ1aWxkVXNlck9iamVjdDsiLCIvLyBNb2R1bGUgdG8gcHJpbnQgdGhlIGxvZ2luIGFuZCByZWdpc3RyYXRpb24gZm9ybXMgdG8gdGhlIERPTVxyXG4vLyBhbHNvIGhhcyBmdW5jdGlvbmFsaXR5IHRvIGNsZWFyIHRoZSBmb3JtcyBmcm9tIHRoZSBET01cclxuLy8gQnVpbHQgYnkgU3lkbmV5IFdhaXRcclxuXHJcbmltcG9ydCBmb3JtQnVpbGRlciBmcm9tIFwiLi9mb3JtQnVpbGRlci5qc1wiXHJcblxyXG5jb25zdCBmb3JtUHJpbnRlcj0ge1xyXG5cclxuICAgIHByaW50TG9naW5Gb3JtOiAoKSA9PiB7XHJcblxyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbG9naW4tY29udGFpbmVyXCIpLmlubmVySFRNTCA9IGZvcm1CdWlsZGVyLm1ha2VMb2dpbkZvcm0oKVxyXG5cclxuICAgIH0sXHJcbiAgICByZW1vdmVMb2dpbkZvcm06ICgpID0+IHtcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2xvZ2luLWNvbnRhaW5lclwiKS5pbm5lckhUTUwgPSBcIlwiXHJcblxyXG4gICAgfSxcclxuICAgIHByaW50UmVnaXN0ZXJGb3JtOiAoKSA9PiB7XHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNsb2dpbi1jb250YWluZXJcIikuaW5uZXJIVE1MID0gZm9ybUJ1aWxkZXIubWFrZVJlZ2lzdGVyRm9ybSgpXHJcblxyXG4gICAgfSxcclxuICAgIHJlbW92ZVJlZ2lzdGVyRm9ybTogKCk9PntcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2xvZ2luLWNvbnRhaW5lclwiKS5pbm5lckhUTUwgPSBcIlwiXHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZvcm1QcmludGVyXHJcbiIsImltcG9ydCBmb3JtUHJpbnRlciBmcm9tIFwiLi4vbG9naW4vcHJpbnRUb0RvbS5qc1wiXHJcbmltcG9ydCBsb2dpbk1hbmFnZXIgZnJvbSBcIi4uL2xvZ2luL2xvZ2luTWFuYWdlci5qc1wiXHJcblxyXG5mb3JtUHJpbnRlci5wcmludExvZ2luRm9ybSgpO1xyXG5sb2dpbk1hbmFnZXIoKTtcclxuIl19
