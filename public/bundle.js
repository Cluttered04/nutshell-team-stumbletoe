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

    if (eventTarget[1] === "btn") {
      if (eventTarget[0] === "login") {
        const userName = document.querySelector("#login-name").value;
        const password = document.querySelector("#login-pass").value; //check if username is in the database, check if password matches
        //this is  where we will load the dashboard functionality

        console.log("You clicked the login button!");
      }

      if (eventTarget[0] === "reg") {
        console.log("you clicked the register button");

        _printToDom.default.printRegisterForm();
      }

      console.log(eventTarget);
    }

    if (eventTarget[2] === "btn") {
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
    document.querySelector("#body").innerHTML = _formBuilder.default.makeLoginForm();
  },
  removeLoginForm: () => {
    document.querySelector("#body").innerHTML = "";
  },
  printRegisterForm: () => {
    document.querySelector("#body").innerHTML = _formBuilder.default.makeRegisterForm();
  },
  removeRegisterForm: () => {
    document.querySelector("#body").innerHTML = "";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9sb2dpbi9BUElNYW5hZ2VyLmpzIiwiLi4vbG9naW4vZm9ybUJ1aWxkZXIuanMiLCIuLi9sb2dpbi9sb2dpbk1hbmFnZXIuanMiLCIuLi9sb2dpbi9vYmplY3RCdWlsZGVyLmpzIiwiLi4vbG9naW4vcHJpbnRUb0RvbS5qcyIsIi4uL3NjcmlwdHMvbWFpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7OztBQ0FBO0FBQ0E7QUFFQSxNQUFNLFVBQVUsR0FBQztBQUNqQixFQUFBLGFBQWEsRUFBRyxNQUFELElBQVU7QUFFckIsV0FBTyxLQUFLLENBQUUsOEJBQTZCLE1BQU8sRUFBdEMsQ0FBTCxDQUNOLElBRE0sQ0FDRCxRQUFRLElBQUksUUFBUSxDQUFDLElBQVQsRUFEWCxDQUFQO0FBRUgsR0FMZ0I7QUFPakIsRUFBQSxXQUFXLEVBQUUsTUFBSTtBQUNiLFdBQU8sS0FBSyxDQUFDLDZCQUFELENBQUwsQ0FDRSxJQURGLENBQ08sUUFBUSxJQUFJLFFBQVEsQ0FBQyxJQUFULEVBRG5CLENBQVA7QUFJSCxHQVpnQjtBQWNqQixFQUFBLE9BQU8sRUFBRSxVQUFELElBQWM7QUFFbEIsV0FBTyxLQUFLLENBQUMsNkJBQUQsRUFBZ0M7QUFDeEMsTUFBQSxNQUFNLEVBQUUsTUFEZ0M7QUFFeEMsTUFBQSxPQUFPLEVBQUU7QUFDTCx3QkFBZ0I7QUFEWCxPQUYrQjtBQUt4QyxNQUFBLElBQUksRUFBRSxJQUFJLENBQUMsU0FBTCxDQUFlLFVBQWY7QUFMa0MsS0FBaEMsQ0FBWjtBQU9IO0FBdkJnQixDQUFqQjtlQTJCZSxVOzs7Ozs7Ozs7O0FDOUJmO0FBQ0E7QUFFQSxNQUFNLFdBQVcsR0FBRTtBQUNuQixFQUFBLGFBQWEsRUFBRSxNQUFLO0FBQ2hCLFdBQVE7Ozs7dUVBQVI7QUFLSCxHQVBrQjtBQVVuQixFQUFBLGdCQUFnQixFQUFDLE1BQUs7QUFFbEIsV0FBUTs7Oztn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QUFaOztBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiLy9UaGlzIG1vZHVsZSBhbGxvd3MgZm9yIGZldGNoIGFuZCBwb3N0IGNhbGxzIHRvIHRoZSB1c2VyIGRhdGFiYXNlXHJcbi8vYnVpbHQgYnkgU3lkbmV5IFdhaXRcclxuXHJcbmNvbnN0IEFQSU1hbmFnZXI9e1xyXG5nZXRTaW5nbGVVc2VyOiAodXNlcklkKT0+e1xyXG5cclxuICAgIHJldHVybiBmZXRjaChgaHR0cDovL2xvY2FsaG9zdDo4MDg4L3VzZXIvJHt1c2VySWR9YClcclxuICAgIC50aGVuKGNvbnRhY3RzID0+IGNvbnRhY3RzLmpzb24oKSlcclxufSxcclxuXHJcbmdldEFsbFVzZXJzOiAoKT0+e1xyXG4gICAgcmV0dXJuIGZldGNoKFwiaHR0cDovL2xvY2FsaG9zdDo4MDg4L3VzZXJzXCIpXHJcbiAgICAgICAgICAgIC50aGVuKGNvbnRhY3RzID0+IGNvbnRhY3RzLmpzb24oKSlcclxuXHJcblxyXG59LFxyXG5cclxuYWRkVXNlcjoodXNlck9iamVjdCk9PntcclxuXHJcbiAgICByZXR1cm4gZmV0Y2goXCJodHRwOi8vbG9jYWxob3N0OjgwODgvdXNlcnNcIiwge1xyXG4gICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXHJcbiAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkodXNlck9iamVjdClcclxuICAgIH0pXHJcbn1cclxuXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEFQSU1hbmFnZXI7IiwiLy9tb2R1bGUgdG8gYnVpbGQgdGhlIGxvZ2luIGFuZCByZWdpc3RyYXRpb24gZm9ybXNcclxuLy8gYnVpbHQgYnkgU3lkbmV5IFdhaXRcclxuXHJcbmNvbnN0IGZvcm1CdWlsZGVyID17XHJcbm1ha2VMb2dpbkZvcm06ICgpID0+e1xyXG4gICAgcmV0dXJuIGA8aDE+V2VsY29tZSB0byBOdXRzaGVsbCE8L2gxPlxyXG4gICAgPGlucHV0IGNsYXNzPVwiaW5wdXQgbG9naW4taW5wdXRcIiB0eXBlPVwidGV4dFwiIG5hbWU9XCJ1c2VyTmFtZVwiIGlkPVwibG9naW4tbmFtZVwiIHBsYWNlaG9sZGVyPVwiVXNlcm5hbWVcIj48YnI+XHJcbiAgICA8aW5wdXQgY2xhc3M9XCJpbnB1dCBsb2dpbi1pbnB1dFwiIHR5cGU9XCJ0ZXh0XCIgbmFtZT1cInBhc3N3b3JkXCIgaWQ9XCJsb2dpbi1wYXNzXCIgcGxhY2Vob2xkZXI9XCJQYXNzd29yZFwiPjxicj5cclxuICAgIDxidXR0b24gdHlwZT1cInN1Ym1pdFwiIGNsYXNzID0gXCJidG5cIiBpZD1cImxvZ2luLWJ0blwiPmxvZ2luPC9idXR0b24+XHJcbiAgICA8YnV0dG9uIHR5cGU9XCJzdWJtaXRcIiBjbGFzcyA9IFwiYnRuXCIgaWQ9XCJyZWctYnRuXCI+cmVnaXN0ZXI8L2J1dHRvbj5gXHJcbn0sXHJcblxyXG5cclxubWFrZVJlZ2lzdGVyRm9ybTooKT0+IHtcclxuXHJcbiAgICByZXR1cm4gYDxoMT5QbGVhc2UgUmVnaXN0ZXI6PC9oMT5cclxuICAgIDxpbnB1dCBjbGFzcz1cInJlZ2lzdGVyLWlucHV0XCIgdHlwZT1cInRleHRcIiBuYW1lPVwiZW1haWxcIiBpZD1cInJlZy1lbWFpbFwiIHBsYWNlaG9sZGVyPVwiRW1haWwgQWRkcmVzc1wiPjxicj5cclxuICAgIDxpbnB1dCBjbGFzcz1cInJlZ2lzdGVyLWlucHV0XCIgdHlwZT1cInRleHRcIiBuYW1lPVwidXNlck5hbWVcIiBpZD1cInJlZy1uYW1lXCIgcGxhY2Vob2xkZXI9XCJVc2VybmFtZVwiPjxicj5cclxuICAgIDxpbnB1dCBjbGFzcz1cInJlZ2lzdGVyLWlucHV0XCIgdHlwZT1cInBhc3N3b3JkXCIgbmFtZT1cInBhc3N3b3JkXCIgaWQ9XCJyZWctcGFzc1wiIHBsYWNlaG9sZGVyPVwiUGFzc3dvcmRcIj48YnI+XHJcbiAgICA8YnV0dG9uIHR5cGU9XCJyZWdpc3RlclwiIGNsYXNzID0gXCJidG5cIiBpZD1cInN1Ym1pdC1yZWctYnRuXCI+cmVnaXN0ZXI8L2J1dHRvbj5gXHJcbn1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgZm9ybUJ1aWxkZXI7IiwiLy9UaGlzIG1vZHVsZSBoYW5kbGVzIHRoZSBsb2dpbiBhbmQgcmVnaXN0cmF0aW9uIGZ1bmN0aW9uYWxpdHkgb2YgdGhlIEFQUFxyXG4vLyBCdWlsdCBieSBTeWRuZXkgV2FpdFxyXG5cclxuaW1wb3J0IGZvcm1QcmludGVyIGZyb20gXCIuL3ByaW50VG9Eb20uanNcIlxyXG5pbXBvcnQgYnVpbGRVc2VyT2JqZWN0IGZyb20gXCIuL29iamVjdEJ1aWxkZXIuanNcIlxyXG5pbXBvcnQgQVBJTWFuYWdlciBmcm9tIFwiLi9BUElNYW5hZ2VyLmpzXCJcclxuXHJcbmNvbnN0IGxvZ2luTWFuYWdlciA9ICgpID0+IHtcclxuXHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2xvZ2luLWNvbnRhaW5lclwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG5cclxuICAgICAgICBjb25zdCBldmVudFRhcmdldCA9IGV2ZW50LnRhcmdldC5pZC5zcGxpdChcIi1cIilcclxuICAgICAgICBpZiAoZXZlbnRUYXJnZXRbMV0gPT09IFwiYnRuXCIpIHtcclxuXHJcbiAgICAgICAgICAgIGlmIChldmVudFRhcmdldFswXSA9PT0gXCJsb2dpblwiKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB1c2VyTmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbG9naW4tbmFtZVwiKS52YWx1ZVxyXG4gICAgICAgICAgICAgICAgY29uc3QgcGFzc3dvcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2xvZ2luLXBhc3NcIikudmFsdWVcclxuICAgICAgICAgICAgICAgIC8vY2hlY2sgaWYgdXNlcm5hbWUgaXMgaW4gdGhlIGRhdGFiYXNlLCBjaGVjayBpZiBwYXNzd29yZCBtYXRjaGVzXHJcbiAgICAgICAgICAgICAgICAvL3RoaXMgaXMgIHdoZXJlIHdlIHdpbGwgbG9hZCB0aGUgZGFzaGJvYXJkIGZ1bmN0aW9uYWxpdHlcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiWW91IGNsaWNrZWQgdGhlIGxvZ2luIGJ1dHRvbiFcIilcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGV2ZW50VGFyZ2V0WzBdID09PSBcInJlZ1wiKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInlvdSBjbGlja2VkIHRoZSByZWdpc3RlciBidXR0b25cIilcclxuXHJcbiAgICAgICAgICAgICAgICBmb3JtUHJpbnRlci5wcmludFJlZ2lzdGVyRm9ybSgpXHJcblxyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY29uc29sZS5sb2coZXZlbnRUYXJnZXQpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChldmVudFRhcmdldFsyXSA9PT0gXCJidG5cIikge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcInlvdSBjbGlja2VkIHRoZSBzdWJtaXQgYnV0dG9uXCIpXHJcblxyXG4gICAgICAgICAgICBjb25zdCB1c2VyTmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcmVnLW5hbWVcIikudmFsdWVcclxuICAgICAgICAgICAgY29uc3QgcGFzc3dvcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3JlZy1wYXNzXCIpLnZhbHVlXHJcbiAgICAgICAgICAgIGNvbnN0IGVtYWlsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNyZWctZW1haWxcIikudmFsdWVcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHVzZXJPYmplY3QgPSBidWlsZFVzZXJPYmplY3QodXNlck5hbWUsIHBhc3N3b3JkLCBlbWFpbClcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJ0aGlzIGlzIHRoZSB1c2VyT2JqZWN0XCIsIHVzZXJPYmplY3QpXHJcbiAgICAgICAgICAgIEFQSU1hbmFnZXIuYWRkVXNlcih1c2VyT2JqZWN0KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfSlcclxufVxyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGxvZ2luTWFuYWdlcjtcclxuIiwiLy8gTW9kdWxlIHRvIGJ1aWxkIGFuIG9iamVjdCB1c2luZyBpbnB1dHMgZnJvbSB0aGUgcmVnaXN0cmF0aW9uIGZpZWxkXHJcbi8vQnVpbHQgYnkgU3lkbmV5IFdhaXRcclxuXHJcbmNvbnN0IGJ1aWxkVXNlck9iamVjdCA9ICh1c2VyTmFtZSwgcGFzc3dvcmQsIGVtYWlsKSA9PiB7XHJcblxyXG4gICAgY29uc3QgdXNlck9iamVjdCA9IHtcclxuICAgICAgICBcInVzZXJuYW1lXCI6IHVzZXJOYW1lLFxyXG4gICAgICAgIFwicGFzc3dvcmRcIjogcGFzc3dvcmQsXHJcbiAgICAgICAgXCJlbWFpbFwiOiBlbWFpbFxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBidWlsZFVzZXJPYmplY3Q7IiwiLy8gTW9kdWxlIHRvIHByaW50IHRoZSBsb2dpbiBhbmQgcmVnaXN0cmF0aW9uIGZvcm1zIHRvIHRoZSBET01cclxuLy8gYWxzbyBoYXMgZnVuY3Rpb25hbGl0eSB0byBjbGVhciB0aGUgZm9ybXMgZnJvbSB0aGUgRE9NXHJcbi8vIEJ1aWx0IGJ5IFN5ZG5leSBXYWl0XHJcblxyXG5pbXBvcnQgZm9ybUJ1aWxkZXIgZnJvbSBcIi4vZm9ybUJ1aWxkZXIuanNcIlxyXG5cclxuY29uc3QgZm9ybVByaW50ZXI9IHtcclxuXHJcbiAgICBwcmludExvZ2luRm9ybTogKCkgPT4ge1xyXG5cclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2JvZHlcIikuaW5uZXJIVE1MID0gZm9ybUJ1aWxkZXIubWFrZUxvZ2luRm9ybSgpXHJcblxyXG4gICAgfSxcclxuICAgIHJlbW92ZUxvZ2luRm9ybTogKCkgPT4ge1xyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjYm9keVwiKS5pbm5lckhUTUwgPSBcIlwiXHJcblxyXG4gICAgfSxcclxuICAgIHByaW50UmVnaXN0ZXJGb3JtOiAoKSA9PiB7XHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNib2R5XCIpLmlubmVySFRNTCA9IGZvcm1CdWlsZGVyLm1ha2VSZWdpc3RlckZvcm0oKVxyXG5cclxuICAgIH0sXHJcbiAgICByZW1vdmVSZWdpc3RlckZvcm06ICgpPT57XHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNib2R5XCIpLmlubmVySFRNTCA9IFwiXCJcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgZm9ybVByaW50ZXJcclxuIiwiaW1wb3J0IGZvcm1QcmludGVyIGZyb20gXCIuLi9sb2dpbi9wcmludFRvRG9tLmpzXCJcclxuaW1wb3J0IGxvZ2luTWFuYWdlciBmcm9tIFwiLi4vbG9naW4vbG9naW5NYW5hZ2VyLmpzXCJcclxuXHJcbmZvcm1QcmludGVyLnByaW50TG9naW5Gb3JtKCk7XHJcbmxvZ2luTWFuYWdlcigpO1xyXG4iXX0=
