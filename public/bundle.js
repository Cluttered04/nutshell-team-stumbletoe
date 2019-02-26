(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
// This module performs operations on the friends portion of the database
// Built by Sydney Wait
const APIManager = {
  getAllFriendsByUser: userId => {
    return fetch(`http://localhost:8088/friends?_expand=user&userId=${userId}`).then(friends => friends.json());
  },
  getAllFriendsByFriend: userId => {
    return fetch(`http://localhost:8088/friends?otherFriendId=${userId}&_expand=user`).then(friends => friends.json());
  },
  getAllFriends: id => {
    const htmlString = "";
    getAllFriendsBy(userId).then(friend => {});
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

var _APIManager = _interopRequireDefault(require("./APIManager"));

var _friendBuilder = _interopRequireDefault(require("./friendBuilder"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Module to generate the friends console in the dashboard
// built by Sydney Wait
const friendActivator = () => {
  const activeUser = sessionStorage.getItem("activeUser");
  (0, _friendBuilder.default)(activeUser);
};

var _default = friendActivator;
exports.default = _default;

},{"./APIManager":1,"./friendBuilder":3}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _APIManager = _interopRequireDefault(require("./APIManager"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const buildFriends = userId => {
  _APIManager.default.getAllFriendsByFriend(userId).then.forEach(friend => {
    console.log(friend[0].user.username);
  });
};

var _default = buildFriends;
exports.default = _default;

},{"./APIManager":1}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
//This module allows for fetch and post calls to the user database
//built by Sydney Wait
const APIManager = {
  getSingleUser: (userKey, userValue) => {
    return fetch(`http://localhost:8088/users?${userKey}=${userValue}`).then(contacts => contacts.json());
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

},{}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _printToDom = _interopRequireDefault(require("./printToDom.js"));

var _friendActivator = _interopRequireDefault(require("../friends/friendActivator.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//This function imports all the event listeners and page loads from the individual modules
//news, events, tasks, chats, and friends
const dashboardActivator = () => {
  _printToDom.default.printLogoutForm(); //This is just a placeholder until we get all the other pieces


  document.querySelector("#header").innerHTML = `you are logged in`;
  (0, _friendActivator.default)();
};

var _default = dashboardActivator;
exports.default = _default;

},{"../friends/friendActivator.js":2,"./printToDom.js":9}],6:[function(require,module,exports){
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
    <input class="input login-input" type="password" name="password" id="login-pass" placeholder="Password"><br>
    <button type="submit" class = "btn" id="login-btn">login</button>
    <button type="submit" class = "btn" id="reg-btn">register</button>`;
  },
  makeRegisterForm: () => {
    return `<h1>Please Register:</h1>
    <input class="register-input" type="text" name="email" id="reg-email" placeholder="Email Address"><br>
    <input class="register-input" type="text" name="userName" id="reg-name" placeholder="Username"><br>
    <input class="register-input" type="password" name="password" id="reg-pass" placeholder="Password"><br>
    <button type="register" class = "btn" id="submit-reg-btn">register</button>`;
  },
  makeLogoutForm: () => {
    return `<button type="register" class = "btn" id="logout-btn">logout</button>`;
  }
};
var _default = formBuilder;
exports.default = _default;

},{}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _printToDom = _interopRequireDefault(require("./printToDom.js"));

var _objectBuilder = _interopRequireDefault(require("./objectBuilder.js"));

var _APIManager = _interopRequireDefault(require("./APIManager.js"));

var _dashboardActivator = _interopRequireDefault(require("./dashboardActivator.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//This module handles the login and registration functionality of the APP
// Built by Sydney Wait
const loginManager = () => {
  //EVENT LISTENER ON THE LOGIN CONTAINER TO HANDLE ALL OF LOGIN AND REGISTRATION FEATURES
  document.querySelector("#login-cont").addEventListener("click", () => {
    const eventTarget = event.target.id.split("-");

    if (event.target.id === "login-btn") {
      console.log("You clicked the login button!");
      const userName = document.querySelector("#login-name").value;
      const password = document.querySelector("#login-pass").value; //check if username is in the database

      _APIManager.default.getSingleUser("username", userName).then(singleUser => {
        if (singleUser.length === 1) {
          console.log("The username of", userName, "was verified"); //check if password matches

          if (singleUser[0].password === password) {
            _printToDom.default.removeLoginForm();

            sessionStorage.setItem("activeUser", singleUser[0].id); //this activates the dashboard

            (0, _dashboardActivator.default)();
          } else {
            window.alert("The password is incorrect!");
          }
        } else {
          window.alert("that username does not exist in the database");
        }
      });
    } //If user clicks the register button, load the registration form


    if (event.target.id === "reg-btn") {
      console.log("you clicked the register button");

      _printToDom.default.printRegisterForm();
    } //if user clicks the submit button, registration will be posted to database


    if (event.target.id === "submit-reg-btn") {
      console.log("you clicked the submit button"); //first check if username is already in the database.

      const userName = document.querySelector("#reg-name").value;

      _APIManager.default.getSingleUser("username", userName).then(singleUser => {
        //username not in database, proceed
        if (singleUser.length === 0) {
          console.log("The username of", userName, "was verified");
          const password = document.querySelector("#reg-pass").value;
          const email = document.querySelector("#reg-email").value;
          const userObject = (0, _objectBuilder.default)(userName, password, email);
          console.log("this is the userObject", userObject);

          _APIManager.default.addUser(userObject);

          _printToDom.default.removeRegisterForm(); //this activates the dashboard


          (0, _dashboardActivator.default)();
        } else {
          //username is already in database, do not proceed
          window.alert("that username already exists");
        }
      });
    }
  }); // EVENT LISTENER FOR THE LOGOUT OPERATION

  document.querySelector("#header").addEventListener("click", () => {
    if (event.target.id === "logout-btn") {
      sessionStorage.removeItem("activeUser"); //this is just a placeholder until we have the dashboard //

      _printToDom.default.removeLogoutForm();

      document.querySelector("#body").innerHTML = "";

      _printToDom.default.printLoginForm();
    }
  });
};

var _default = loginManager;
exports.default = _default;

},{"./APIManager.js":4,"./dashboardActivator.js":5,"./objectBuilder.js":8,"./printToDom.js":9}],8:[function(require,module,exports){
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

},{}],9:[function(require,module,exports){
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
    document.querySelector("#login-cont").innerHTML = _formBuilder.default.makeLoginForm();
  },
  removeLoginForm: () => {
    document.querySelector("#login-cont").innerHTML = "";
  },
  printRegisterForm: () => {
    document.querySelector("#login-cont").innerHTML = _formBuilder.default.makeRegisterForm();
  },
  removeRegisterForm: () => {
    document.querySelector("#login-cont").innerHTML = "";
  },
  printLogoutForm: () => {
    document.querySelector("#header").innerHTML = _formBuilder.default.makeLogoutForm();
  },
  removeLogoutForm: () => {
    document.querySelector("#header").innerHTML = "";
  }
};
var _default = formPrinter;
exports.default = _default;

},{"./formBuilder.js":6}],10:[function(require,module,exports){
"use strict";

var _printToDom = _interopRequireDefault(require("../login/printToDom.js"));

var _loginManager = _interopRequireDefault(require("../login/loginManager.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_printToDom.default.printLoginForm();

(0, _loginManager.default)();

},{"../login/loginManager.js":7,"../login/printToDom.js":9}]},{},[10])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9mcmllbmRzL0FQSU1hbmFnZXIuanMiLCIuLi9mcmllbmRzL2ZyaWVuZEFjdGl2YXRvci5qcyIsIi4uL2ZyaWVuZHMvZnJpZW5kQnVpbGRlci5qcyIsIi4uL2xvZ2luL0FQSU1hbmFnZXIuanMiLCIuLi9sb2dpbi9kYXNoYm9hcmRBY3RpdmF0b3IuanMiLCIuLi9sb2dpbi9mb3JtQnVpbGRlci5qcyIsIi4uL2xvZ2luL2xvZ2luTWFuYWdlci5qcyIsIi4uL2xvZ2luL29iamVjdEJ1aWxkZXIuanMiLCIuLi9sb2dpbi9wcmludFRvRG9tLmpzIiwiLi4vc2NyaXB0cy9tYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7O0FDQUE7QUFDQTtBQUdBLE1BQU0sVUFBVSxHQUFHO0FBRWYsRUFBQSxtQkFBbUIsRUFBRyxNQUFELElBQVk7QUFDN0IsV0FBTyxLQUFLLENBQUUscURBQW9ELE1BQU8sRUFBN0QsQ0FBTCxDQUNGLElBREUsQ0FDRyxPQUFPLElBQUksT0FBTyxDQUFDLElBQVIsRUFEZCxDQUFQO0FBR0gsR0FOYztBQU9mLEVBQUEscUJBQXFCLEVBQUcsTUFBRCxJQUFZO0FBQy9CLFdBQU8sS0FBSyxDQUFFLCtDQUE4QyxNQUFPLGVBQXZELENBQUwsQ0FDRixJQURFLENBQ0csT0FBTyxJQUFJLE9BQU8sQ0FBQyxJQUFSLEVBRGQsQ0FBUDtBQUdILEdBWGM7QUFZZixFQUFBLGFBQWEsRUFBRyxFQUFELElBQVE7QUFDbkIsVUFBTSxVQUFVLEdBQUcsRUFBbkI7QUFDQSxJQUFBLGVBQWUsQ0FBQyxNQUFELENBQWYsQ0FDSyxJQURMLENBQ1csTUFBRCxJQUFZLENBSWpCLENBTEw7QUFNSDtBQXBCYyxDQUFuQjtlQXlCZSxVOzs7Ozs7Ozs7OztBQzdCZjs7QUFDQTs7OztBQUVBO0FBQ0E7QUFFQSxNQUFNLGVBQWUsR0FBRSxNQUFJO0FBQ3ZCLFFBQU0sVUFBVSxH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QixFQUFBLGNBQWMsRUFBRSxNQUFNO0FBQ2xCLElBQUEsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsYUFBdkIsRUFBc0MsU0FBdEMsR0FBa0QscUJBQVksYUFBWixFQUFsRDtBQUNILEdBSmU7QUFNaEIsRUFBQSxlQUFlLEVBQUUsTUFBTTtBQUNuQixJQUFBLFFBQVEsQ0FBQyxhQUFULENBQXVCLGFBQXZCLEVBQXNDLFNBQXRDLEdBQWtELEVBQWxEO0FBQ0gsR0FSZTtBQVVoQixFQUFBLGlCQUFpQixFQUFFLE1BQU07QUFDckIsSUFBQSxRQUFRLENBQUMsYUFBVCxDQUF1QixhQUF2QixFQUFzQyxTQUF0QyxHQUFrRCxxQkFBWSxnQkFBWixFQUFsRDtBQUNILEdBWmU7QUFjaEIsRUFBQSxrQkFBa0IsRUFBRSxNQUFNO0FBQ3RCLElBQUEsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsYUFBdkIsRUFBc0MsU0FBdEMsR0FBa0QsRUFBbEQ7QUFDSCxHQWhCZTtBQWtCaEIsRUFBQSxlQUFlLEVBQUMsTUFBSTtBQUNoQixJQUFBLFFBQVEsQ0FBQyxhQUFULENBQXVCLFNBQXZCLEVBQWtDLFNBQWxDLEdBQTRDLHFCQUFZLGNBQVosRUFBNUM7QUFDSCxHQXBCZTtBQXNCaEIsRUFBQSxnQkFBZ0IsRUFBQyxNQUFJO0FBQ2pCLElBQUEsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsU0FBdkIsRUFBa0MsU0FBbEMsR0FBNEMsRUFBNUM7QUFDSDtBQXhCZSxDQUFwQjtlQTJCZSxXOzs7Ozs7QUNqQ2Y7O0FBQ0E7Ozs7QUFFQSxvQkFBWSxjQUFaOztBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiLy8gVGhpcyBtb2R1bGUgcGVyZm9ybXMgb3BlcmF0aW9ucyBvbiB0aGUgZnJpZW5kcyBwb3J0aW9uIG9mIHRoZSBkYXRhYmFzZVxyXG4vLyBCdWlsdCBieSBTeWRuZXkgV2FpdFxyXG5cclxuXHJcbmNvbnN0IEFQSU1hbmFnZXIgPSB7XHJcblxyXG4gICAgZ2V0QWxsRnJpZW5kc0J5VXNlcjogKHVzZXJJZCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBmZXRjaChgaHR0cDovL2xvY2FsaG9zdDo4MDg4L2ZyaWVuZHM/X2V4cGFuZD11c2VyJnVzZXJJZD0ke3VzZXJJZH1gKVxyXG4gICAgICAgICAgICAudGhlbihmcmllbmRzID0+IGZyaWVuZHMuanNvbigpKVxyXG5cclxuICAgIH0sXHJcbiAgICBnZXRBbGxGcmllbmRzQnlGcmllbmQ6ICh1c2VySWQpID0+IHtcclxuICAgICAgICByZXR1cm4gZmV0Y2goYGh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC9mcmllbmRzP290aGVyRnJpZW5kSWQ9JHt1c2VySWR9Jl9leHBhbmQ9dXNlcmApXHJcbiAgICAgICAgICAgIC50aGVuKGZyaWVuZHMgPT4gZnJpZW5kcy5qc29uKCkpXHJcblxyXG4gICAgfSxcclxuICAgIGdldEFsbEZyaWVuZHM6IChpZCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGh0bWxTdHJpbmcgPSBcIlwiXHJcbiAgICAgICAgZ2V0QWxsRnJpZW5kc0J5KHVzZXJJZClcclxuICAgICAgICAgICAgLnRoZW4oKGZyaWVuZCkgPT4ge1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEFQSU1hbmFnZXI7XHJcbiIsImltcG9ydCBBUElNYW5hZ2VyIGZyb20gXCIuL0FQSU1hbmFnZXJcIjtcclxuaW1wb3J0IGJ1aWxkRnJpZW5kcyBmcm9tIFwiLi9mcmllbmRCdWlsZGVyXCI7XHJcblxyXG4vLyBNb2R1bGUgdG8gZ2VuZXJhdGUgdGhlIGZyaWVuZHMgY29uc29sZSBpbiB0aGUgZGFzaGJvYXJkXHJcbi8vIGJ1aWx0IGJ5IFN5ZG5leSBXYWl0XHJcblxyXG5jb25zdCBmcmllbmRBY3RpdmF0b3IgPSgpPT57XHJcbiAgICBjb25zdCBhY3RpdmVVc2VyID0gc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShcImFjdGl2ZVVzZXJcIilcclxuXHJcbiAgICBidWlsZEZyaWVuZHMoYWN0aXZlVXNlcilcclxuXHJcblxyXG5cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnJpZW5kQWN0aXZhdG9yOyIsImltcG9ydCBBUElNYW5hZ2VyIGZyb20gXCIuL0FQSU1hbmFnZXJcIjtcclxuXHJcbmNvbnN0IGJ1aWxkRnJpZW5kcyA9KHVzZXJJZCk9PntcclxuQVBJTWFuYWdlci5nZXRBbGxGcmllbmRzQnlGcmllbmQodXNlcklkKVxyXG4udGhlbi5mb3JFYWNoKGZyaWVuZCA9PiB7XHJcbiAgICBjb25zb2xlLmxvZyhmcmllbmRbMF0udXNlci51c2VybmFtZSlcclxufSlcclxuXHJcblxyXG5cclxuXHJcblxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBidWlsZEZyaWVuZHNcclxuIiwiLy9UaGlzIG1vZHVsZSBhbGxvd3MgZm9yIGZldGNoIGFuZCBwb3N0IGNhbGxzIHRvIHRoZSB1c2VyIGRhdGFiYXNlXHJcbi8vYnVpbHQgYnkgU3lkbmV5IFdhaXRcclxuXHJcbmNvbnN0IEFQSU1hbmFnZXI9e1xyXG5nZXRTaW5nbGVVc2VyOiAodXNlcktleSwgdXNlclZhbHVlKT0+e1xyXG5cclxuICAgIHJldHVybiBmZXRjaChgaHR0cDovL2xvY2FsaG9zdDo4MDg4L3VzZXJzPyR7dXNlcktleX09JHt1c2VyVmFsdWV9YClcclxuICAgIC50aGVuKGNvbnRhY3RzID0+IGNvbnRhY3RzLmpzb24oKSlcclxufSxcclxuXHJcbmdldEFsbFVzZXJzOiAoKT0+e1xyXG4gICAgcmV0dXJuIGZldGNoKFwiaHR0cDovL2xvY2FsaG9zdDo4MDg4L3VzZXJzXCIpXHJcbiAgICAgICAgICAgIC50aGVuKGNvbnRhY3RzID0+IGNvbnRhY3RzLmpzb24oKSlcclxuXHJcblxyXG59LFxyXG5cclxuYWRkVXNlcjoodXNlck9iamVjdCk9PntcclxuXHJcbiAgICByZXR1cm4gZmV0Y2goXCJodHRwOi8vbG9jYWxob3N0OjgwODgvdXNlcnNcIiwge1xyXG4gICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXHJcbiAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkodXNlck9iamVjdClcclxuICAgIH0pXHJcbn1cclxuXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEFQSU1hbmFnZXI7IiwiLy9UaGlzIGZ1bmN0aW9uIGltcG9ydHMgYWxsIHRoZSBldmVudCBsaXN0ZW5lcnMgYW5kIHBhZ2UgbG9hZHMgZnJvbSB0aGUgaW5kaXZpZHVhbCBtb2R1bGVzXHJcbi8vbmV3cywgZXZlbnRzLCB0YXNrcywgY2hhdHMsIGFuZCBmcmllbmRzXHJcbmltcG9ydCBmb3JtUHJpbnRlciBmcm9tIFwiLi9wcmludFRvRG9tLmpzXCJcclxuaW1wb3J0IGZyaWVuZEFjdGl2YXRvciBmcm9tIFwiLi4vZnJpZW5kcy9mcmllbmRBY3RpdmF0b3IuanNcIjtcclxuXHJcbmNvbnN0IGRhc2hib2FyZEFjdGl2YXRvciA9ICgpPT4ge1xyXG4gICAgZm9ybVByaW50ZXIucHJpbnRMb2dvdXRGb3JtKClcclxuXHJcbiAgICAvL1RoaXMgaXMganVzdCBhIHBsYWNlaG9sZGVyIHVudGlsIHdlIGdldCBhbGwgdGhlIG90aGVyIHBpZWNlc1xyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNoZWFkZXJcIikuaW5uZXJIVE1MID0gYHlvdSBhcmUgbG9nZ2VkIGluYFxyXG4gICAgZnJpZW5kQWN0aXZhdG9yKClcclxuXHJcblxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBkYXNoYm9hcmRBY3RpdmF0b3I7XHJcbiIsIi8vbW9kdWxlIHRvIGJ1aWxkIHRoZSBsb2dpbiBhbmQgcmVnaXN0cmF0aW9uIGZvcm1zXHJcbi8vIGJ1aWx0IGJ5IFN5ZG5leSBXYWl0XHJcblxyXG5jb25zdCBmb3JtQnVpbGRlciA9e1xyXG5tYWtlTG9naW5Gb3JtOiAoKSA9PntcclxuICAgIHJldHVybiBgPGgxPldlbGNvbWUgdG8gTnV0c2hlbGwhPC9oMT5cclxuICAgIDxpbnB1dCBjbGFzcz1cImlucHV0IGxvZ2luLWlucHV0XCIgdHlwZT1cInRleHRcIiBuYW1lPVwidXNlck5hbWVcIiBpZD1cImxvZ2luLW5hbWVcIiBwbGFjZWhvbGRlcj1cIlVzZXJuYW1lXCI+PGJyPlxyXG4gICAgPGlucHV0IGNsYXNzPVwiaW5wdXQgbG9naW4taW5wdXRcIiB0eXBlPVwicGFzc3dvcmRcIiBuYW1lPVwicGFzc3dvcmRcIiBpZD1cImxvZ2luLXBhc3NcIiBwbGFjZWhvbGRlcj1cIlBhc3N3b3JkXCI+PGJyPlxyXG4gICAgPGJ1dHRvbiB0eXBlPVwic3VibWl0XCIgY2xhc3MgPSBcImJ0blwiIGlkPVwibG9naW4tYnRuXCI+bG9naW48L2J1dHRvbj5cclxuICAgIDxidXR0b24gdHlwZT1cInN1Ym1pdFwiIGNsYXNzID0gXCJidG5cIiBpZD1cInJlZy1idG5cIj5yZWdpc3RlcjwvYnV0dG9uPmBcclxufSxcclxuXHJcblxyXG5tYWtlUmVnaXN0ZXJGb3JtOigpPT4ge1xyXG5cclxuICAgIHJldHVybiBgPGgxPlBsZWFzZSBSZWdpc3Rlcjo8L2gxPlxyXG4gICAgPGlucHV0IGNsYXNzPVwicmVnaXN0ZXItaW5wdXRcIiB0eXBlPVwidGV4dFwiIG5hbWU9XCJlbWFpbFwiIGlkPVwicmVnLWVtYWlsXCIgcGxhY2Vob2xkZXI9XCJFbWFpbCBBZGRyZXNzXCI+PGJyPlxyXG4gICAgPGlucHV0IGNsYXNzPVwicmVnaXN0ZXItaW5wdXRcIiB0eXBlPVwidGV4dFwiIG5hbWU9XCJ1c2VyTmFtZVwiIGlkPVwicmVnLW5hbWVcIiBwbGFjZWhvbGRlcj1cIlVzZXJuYW1lXCI+PGJyPlxyXG4gICAgPGlucHV0IGNsYXNzPVwicmVnaXN0ZXItaW5wdXRcIiB0eXBlPVwicGFzc3dvcmRcIiBuYW1lPVwicGFzc3dvcmRcIiBpZD1cInJlZy1wYXNzXCIgcGxhY2Vob2xkZXI9XCJQYXNzd29yZFwiPjxicj5cclxuICAgIDxidXR0b24gdHlwZT1cInJlZ2lzdGVyXCIgY2xhc3MgPSBcImJ0blwiIGlkPVwic3VibWl0LXJlZy1idG5cIj5yZWdpc3RlcjwvYnV0dG9uPmBcclxufSxcclxubWFrZUxvZ291dEZvcm06KCk9PntcclxuICAgIHJldHVybiBgPGJ1dHRvbiB0eXBlPVwicmVnaXN0ZXJcIiBjbGFzcyA9IFwiYnRuXCIgaWQ9XCJsb2dvdXQtYnRuXCI+bG9nb3V0PC9idXR0b24+YFxyXG59XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZvcm1CdWlsZGVyOyIsIi8vVGhpcyBtb2R1bGUgaGFuZGxlcyB0aGUgbG9naW4gYW5kIHJlZ2lzdHJhdGlvbiBmdW5jdGlvbmFsaXR5IG9mIHRoZSBBUFBcclxuLy8gQnVpbHQgYnkgU3lkbmV5IFdhaXRcclxuXHJcbmltcG9ydCBmb3JtUHJpbnRlciBmcm9tIFwiLi9wcmludFRvRG9tLmpzXCJcclxuaW1wb3J0IGJ1aWxkVXNlck9iamVjdCBmcm9tIFwiLi9vYmplY3RCdWlsZGVyLmpzXCJcclxuaW1wb3J0IEFQSU1hbmFnZXIgZnJvbSBcIi4vQVBJTWFuYWdlci5qc1wiXHJcbmltcG9ydCBkYXNoYm9hcmRBY3RpdmF0b3IgZnJvbSBcIi4vZGFzaGJvYXJkQWN0aXZhdG9yLmpzXCI7XHJcblxyXG5cclxuXHJcbmNvbnN0IGxvZ2luTWFuYWdlciA9ICgpID0+IHtcclxuICAgIC8vRVZFTlQgTElTVEVORVIgT04gVEhFIExPR0lOIENPTlRBSU5FUiBUTyBIQU5ETEUgQUxMIE9GIExPR0lOIEFORCBSRUdJU1RSQVRJT04gRkVBVFVSRVNcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbG9naW4tY29udFwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG5cclxuICAgICAgICBjb25zdCBldmVudFRhcmdldCA9IGV2ZW50LnRhcmdldC5pZC5zcGxpdChcIi1cIilcclxuXHJcbiAgICAgICAgaWYgKGV2ZW50LnRhcmdldC5pZCA9PT0gXCJsb2dpbi1idG5cIikge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIllvdSBjbGlja2VkIHRoZSBsb2dpbiBidXR0b24hXCIpXHJcbiAgICAgICAgICAgIGNvbnN0IHVzZXJOYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNsb2dpbi1uYW1lXCIpLnZhbHVlXHJcbiAgICAgICAgICAgIGNvbnN0IHBhc3N3b3JkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNsb2dpbi1wYXNzXCIpLnZhbHVlXHJcbiAgICAgICAgICAgIC8vY2hlY2sgaWYgdXNlcm5hbWUgaXMgaW4gdGhlIGRhdGFiYXNlXHJcbiAgICAgICAgICAgIEFQSU1hbmFnZXIuZ2V0U2luZ2xlVXNlcihcInVzZXJuYW1lXCIsIHVzZXJOYW1lKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oKHNpbmdsZVVzZXIpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoc2luZ2xlVXNlci5sZW5ndGggPT09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJUaGUgdXNlcm5hbWUgb2ZcIiwgdXNlck5hbWUsIFwid2FzIHZlcmlmaWVkXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vY2hlY2sgaWYgcGFzc3dvcmQgbWF0Y2hlc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2luZ2xlVXNlclswXS5wYXNzd29yZCA9PT0gcGFzc3dvcmQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1QcmludGVyLnJlbW92ZUxvZ2luRm9ybSgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKFwiYWN0aXZlVXNlclwiLCBzaW5nbGVVc2VyWzBdLmlkKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vdGhpcyBhY3RpdmF0ZXMgdGhlIGRhc2hib2FyZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGFzaGJvYXJkQWN0aXZhdG9yKClcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cuYWxlcnQoXCJUaGUgcGFzc3dvcmQgaXMgaW5jb3JyZWN0IVwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cuYWxlcnQoXCJ0aGF0IHVzZXJuYW1lIGRvZXMgbm90IGV4aXN0IGluIHRoZSBkYXRhYmFzZVwiKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL0lmIHVzZXIgY2xpY2tzIHRoZSByZWdpc3RlciBidXR0b24sIGxvYWQgdGhlIHJlZ2lzdHJhdGlvbiBmb3JtXHJcbiAgICAgICAgaWYgKGV2ZW50LnRhcmdldC5pZCA9PT0gXCJyZWctYnRuXCIpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJ5b3UgY2xpY2tlZCB0aGUgcmVnaXN0ZXIgYnV0dG9uXCIpXHJcbiAgICAgICAgICAgIGZvcm1QcmludGVyLnByaW50UmVnaXN0ZXJGb3JtKClcclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vaWYgdXNlciBjbGlja3MgdGhlIHN1Ym1pdCBidXR0b24sIHJlZ2lzdHJhdGlvbiB3aWxsIGJlIHBvc3RlZCB0byBkYXRhYmFzZVxyXG4gICAgICAgIGlmIChldmVudC50YXJnZXQuaWQgPT09IFwic3VibWl0LXJlZy1idG5cIikge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcInlvdSBjbGlja2VkIHRoZSBzdWJtaXQgYnV0dG9uXCIpXHJcbiAgICAgICAgICAgIC8vZmlyc3QgY2hlY2sgaWYgdXNlcm5hbWUgaXMgYWxyZWFkeSBpbiB0aGUgZGF0YWJhc2UuXHJcbiAgICAgICAgICAgIGNvbnN0IHVzZXJOYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNyZWctbmFtZVwiKS52YWx1ZVxyXG4gICAgICAgICAgICBBUElNYW5hZ2VyLmdldFNpbmdsZVVzZXIoXCJ1c2VybmFtZVwiLCB1c2VyTmFtZSlcclxuICAgICAgICAgICAgICAgIC50aGVuKChzaW5nbGVVc2VyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy91c2VybmFtZSBub3QgaW4gZGF0YWJhc2UsIHByb2NlZWRcclxuICAgICAgICAgICAgICAgICAgICBpZiAoc2luZ2xlVXNlci5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJUaGUgdXNlcm5hbWUgb2ZcIiwgdXNlck5hbWUsIFwid2FzIHZlcmlmaWVkXCIpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBwYXNzd29yZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcmVnLXBhc3NcIikudmFsdWVcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZW1haWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3JlZy1lbWFpbFwiKS52YWx1ZVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdXNlck9iamVjdCA9IGJ1aWxkVXNlck9iamVjdCh1c2VyTmFtZSwgcGFzc3dvcmQsIGVtYWlsKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInRoaXMgaXMgdGhlIHVzZXJPYmplY3RcIiwgdXNlck9iamVjdClcclxuICAgICAgICAgICAgICAgICAgICAgICAgQVBJTWFuYWdlci5hZGRVc2VyKHVzZXJPYmplY3QpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JtUHJpbnRlci5yZW1vdmVSZWdpc3RlckZvcm0oKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3RoaXMgYWN0aXZhdGVzIHRoZSBkYXNoYm9hcmRcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGFzaGJvYXJkQWN0aXZhdG9yKClcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3VzZXJuYW1lIGlzIGFscmVhZHkgaW4gZGF0YWJhc2UsIGRvIG5vdCBwcm9jZWVkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy5hbGVydChcInRoYXQgdXNlcm5hbWUgYWxyZWFkeSBleGlzdHNcIilcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgIH0pXHJcbiAgICAvLyBFVkVOVCBMSVNURU5FUiBGT1IgVEhFIExPR09VVCBPUEVSQVRJT05cclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjaGVhZGVyXCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XHJcbiAgICAgICAgaWYgKGV2ZW50LnRhcmdldC5pZCA9PT0gXCJsb2dvdXQtYnRuXCIpIHtcclxuXHJcbiAgICAgICAgICAgIHNlc3Npb25TdG9yYWdlLnJlbW92ZUl0ZW0oXCJhY3RpdmVVc2VyXCIpXHJcbiAgICAgICAgICAgIC8vdGhpcyBpcyBqdXN0IGEgcGxhY2Vob2xkZXIgdW50aWwgd2UgaGF2ZSB0aGUgZGFzaGJvYXJkIC8vXHJcbiAgICAgICAgICAgIGZvcm1QcmludGVyLnJlbW92ZUxvZ291dEZvcm0oKVxyXG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2JvZHlcIikuaW5uZXJIVE1MID0gXCJcIlxyXG4gICAgICAgICAgICBmb3JtUHJpbnRlci5wcmludExvZ2luRm9ybSgpXHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxuXHJcblxyXG5cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgbG9naW5NYW5hZ2VyO1xyXG4iLCIvLyBNb2R1bGUgdG8gYnVpbGQgYW4gb2JqZWN0IHVzaW5nIGlucHV0cyBmcm9tIHRoZSByZWdpc3RyYXRpb24gZmllbGRcclxuLy9CdWlsdCBieSBTeWRuZXkgV2FpdFxyXG5cclxuY29uc3QgYnVpbGRVc2VyT2JqZWN0ID0gKHVzZXJOYW1lLCBwYXNzd29yZCwgZW1haWwpID0+IHtcclxuXHJcbiAgICBjb25zdCB1c2VyT2JqZWN0ID0ge1xyXG4gICAgICAgIFwidXNlcm5hbWVcIjogdXNlck5hbWUsXHJcbiAgICAgICAgXCJwYXNzd29yZFwiOiBwYXNzd29yZCxcclxuICAgICAgICBcImVtYWlsXCI6IGVtYWlsXHJcbiAgICB9XHJcbiAgICByZXR1cm4gdXNlck9iamVjdDtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgYnVpbGRVc2VyT2JqZWN0OyIsIi8vIE1vZHVsZSB0byBwcmludCB0aGUgbG9naW4gYW5kIHJlZ2lzdHJhdGlvbiBmb3JtcyB0byB0aGUgRE9NXHJcbi8vIGFsc28gaGFzIGZ1bmN0aW9uYWxpdHkgdG8gY2xlYXIgdGhlIGZvcm1zIGZyb20gdGhlIERPTVxyXG4vLyBCdWlsdCBieSBTeWRuZXkgV2FpdFxyXG5cclxuaW1wb3J0IGZvcm1CdWlsZGVyIGZyb20gXCIuL2Zvcm1CdWlsZGVyLmpzXCJcclxuXHJcbmNvbnN0IGZvcm1QcmludGVyID0ge1xyXG5cclxuICAgIHByaW50TG9naW5Gb3JtOiAoKSA9PiB7XHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNsb2dpbi1jb250XCIpLmlubmVySFRNTCA9IGZvcm1CdWlsZGVyLm1ha2VMb2dpbkZvcm0oKVxyXG4gICAgfSxcclxuXHJcbiAgICByZW1vdmVMb2dpbkZvcm06ICgpID0+IHtcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2xvZ2luLWNvbnRcIikuaW5uZXJIVE1MID0gXCJcIlxyXG4gICAgfSxcclxuXHJcbiAgICBwcmludFJlZ2lzdGVyRm9ybTogKCkgPT4ge1xyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbG9naW4tY29udFwiKS5pbm5lckhUTUwgPSBmb3JtQnVpbGRlci5tYWtlUmVnaXN0ZXJGb3JtKClcclxuICAgIH0sXHJcblxyXG4gICAgcmVtb3ZlUmVnaXN0ZXJGb3JtOiAoKSA9PiB7XHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNsb2dpbi1jb250XCIpLmlubmVySFRNTCA9IFwiXCJcclxuICAgIH0sXHJcblxyXG4gICAgcHJpbnRMb2dvdXRGb3JtOigpPT57XHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNoZWFkZXJcIikuaW5uZXJIVE1MPWZvcm1CdWlsZGVyLm1ha2VMb2dvdXRGb3JtKClcclxuICAgIH0sXHJcblxyXG4gICAgcmVtb3ZlTG9nb3V0Rm9ybTooKT0+e1xyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjaGVhZGVyXCIpLmlubmVySFRNTD1cIlwiXHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZvcm1QcmludGVyXHJcbiIsImltcG9ydCBmb3JtUHJpbnRlciBmcm9tIFwiLi4vbG9naW4vcHJpbnRUb0RvbS5qc1wiXHJcbmltcG9ydCBsb2dpbk1hbmFnZXIgZnJvbSBcIi4uL2xvZ2luL2xvZ2luTWFuYWdlci5qc1wiXHJcblxyXG5mb3JtUHJpbnRlci5wcmludExvZ2luRm9ybSgpO1xyXG5sb2dpbk1hbmFnZXIoKTtcclxuIl19
