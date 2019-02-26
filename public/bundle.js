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
  getSingleFriend: otherFriendId => {
    return fetch(`http://localhost:8088/users/${otherFriendId}`).then(contacts => contacts.json());
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

},{"./friendBuilder":3}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _APIManager = _interopRequireDefault(require("./APIManager"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//This module goes and finds all the friend relationships of a single user and posts to dom
// built by Sydney Wait
const buildFriends = userId => {
  let htmlString = "<h1>Friends:</h1>";

  _APIManager.default.getAllFriendsByFriend(userId).then(friends => {
    friends.forEach(friend => {
      htmlString += `<h4>${friend.user.username}<h4>`;
    });
  }).then(() => {
    _APIManager.default.getAllFriendsByUser(userId).then(friends => {
      friends.forEach(friend => {
        const otherFriendId = friend.otherFriendId;

        _APIManager.default.getSingleFriend(otherFriendId).then(singleFriend => {
          htmlString += `<h4>${singleFriend.username}<h4>`; // console.log(htmlString)

          document.querySelector("#frnds-cont").innerHTML = htmlString;
        });
      });
    });
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
  _printToDom.default.printLogoutForm();

  (0, _friendActivator.default)();
};

var _default = dashboardActivator;
exports.default = _default;

},{"../friends/friendActivator.js":2,"./printToDom.js":10}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _friendActivator = _interopRequireDefault(require("../friends/friendActivator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// this module clears the dashboard upon logout
// built by Sydney Wait
const dashboardDeactivator = () => {
  document.querySelector("#frnds-cont").innerHTML = ""; // insert your functions or HTML strings that need to be cleared on logout
};

var _default = dashboardDeactivator;
exports.default = _default;

},{"../friends/friendActivator":2}],7:[function(require,module,exports){
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

},{}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _printToDom = _interopRequireDefault(require("./printToDom.js"));

var _objectBuilder = _interopRequireDefault(require("./objectBuilder.js"));

var _APIManager = _interopRequireDefault(require("./APIManager.js"));

var _dashboardActivator = _interopRequireDefault(require("./dashboardActivator.js"));

var _dashboardDeactivator = _interopRequireDefault(require("./dashboardDeactivator.js"));

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

          _APIManager.default.addUser(userObject).then(() => {
            _APIManager.default.getSingleUser("username", userName).then(singleUser => {
              sessionStorage.setItem("activeUser", singleUser[0].id);

              _printToDom.default.removeRegisterForm();

              (0, _dashboardActivator.default)();
            });
          });
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

      (0, _dashboardDeactivator.default)();

      _printToDom.default.printLoginForm();
    }
  });
};

var _default = loginManager;
exports.default = _default;

},{"./APIManager.js":4,"./dashboardActivator.js":5,"./dashboardDeactivator.js":6,"./objectBuilder.js":9,"./printToDom.js":10}],9:[function(require,module,exports){
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

},{}],10:[function(require,module,exports){
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

},{"./formBuilder.js":7}],11:[function(require,module,exports){
"use strict";

var _printToDom = _interopRequireDefault(require("./login/printToDom.js"));

var _loginManager = _interopRequireDefault(require("./login/loginManager.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_printToDom.default.printLoginForm();

(0, _loginManager.default)();

},{"./login/loginManager.js":8,"./login/printToDom.js":10}]},{},[11])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9zY3JpcHRzL2ZyaWVuZHMvQVBJTWFuYWdlci5qcyIsIi4uL3NjcmlwdHMvZnJpZW5kcy9mcmllbmRBY3RpdmF0b3IuanMiLCIuLi9zY3JpcHRzL2ZyaWVuZHMvZnJpZW5kQnVpbGRlci5qcyIsIi4uL3NjcmlwdHMvbG9naW4vQVBJTWFuYWdlci5qcyIsIi4uL3NjcmlwdHMvbG9naW4vZGFzaGJvYXJkQWN0aXZhdG9yLmpzIiwiLi4vc2NyaXB0cy9sb2dpbi9kYXNoYm9hcmREZWFjdGl2YXRvci5qcyIsIi4uL3NjcmlwdHMvbG9naW4vZm9ybUJ1aWxkZXIuanMiLCIuLi9zY3JpcHRzL2xvZ2luL2xvZ2luTWFuYWdlci5qcyIsIi4uL3NjcmlwdHMvbG9naW4vb2JqZWN0QnVpbGRlci5qcyIsIi4uL3NjcmlwdHMvbG9naW4vcHJpbnRUb0RvbS5qcyIsIi4uL3NjcmlwdHMvbWFpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7OztBQ0FBO0FBQ0E7QUFHQSxNQUFNLFVBQVUsR0FBRztBQUVmLEVBQUEsbUJBQW1CLEVBQUcsTUFBRCxJQUFZO0FBQzdCLFdBQU8sS0FBSyxDQUFFLHFEQUFvRCxNQUFPLEVBQTdELENBQUwsQ0FDRixJQURFLENBQ0csT0FBTyxJQUFJLE9BQU8sQ0FBQyxJQUFSLEVBRGQsQ0FBUDtBQUdILEdBTmM7QUFPZixFQUFBLHFCQUFxQixFQUFHLE1BQUQsSUFBWTtBQUMvQixXQUFPLEtBQUssQ0FBRSwrQ0FBOEMsTUFBTyxlQUF2RCxDQUFMLENBQ0YsSUFERSxDQUNHLE9BQU8sSUFBSSxPQUFPLENBQUMsSUFBUixFQURkLENBQVA7QUFHSCxHQVhjO0FBWWYsRUFBQSxlQUFlLEVBQUcsYUFBRCxJQUFpQjtBQUU5QixXQUFPLEtBQUssQ0FBRSwrQkFBOEIsYUFBYyxFQUE5QyxDQUFMLENBQ04sSUFETSxDQUNELFFBQVEsSUFBSSxRQUFRLENBQUMs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QixJQUFBLFFBQVEsQ0FBQyxhQUFULENBQXVCLGFBQXZCLEVBQXNDLFNBQXRDLEdBQWtELHFCQUFZLGFBQVosRUFBbEQ7QUFDSCxHQUplO0FBTWhCLEVBQUEsZUFBZSxFQUFFLE1BQU07QUFDbkIsSUFBQSxRQUFRLENBQUMsYUFBVCxDQUF1QixhQUF2QixFQUFzQyxTQUF0QyxHQUFrRCxFQUFsRDtBQUNILEdBUmU7QUFVaEIsRUFBQSxpQkFBaUIsRUFBRSxNQUFNO0FBQ3JCLElBQUEsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsYUFBdkIsRUFBc0MsU0FBdEMsR0FBa0QscUJBQVksZ0JBQVosRUFBbEQ7QUFDSCxHQVplO0FBY2hCLEVBQUEsa0JBQWtCLEVBQUUsTUFBTTtBQUN0QixJQUFBLFFBQVEsQ0FBQyxhQUFULENBQXVCLGFBQXZCLEVBQXNDLFNBQXRDLEdBQWtELEVBQWxEO0FBQ0gsR0FoQmU7QUFrQmhCLEVBQUEsZUFBZSxFQUFDLE1BQUk7QUFDaEIsSUFBQSxRQUFRLENBQUMsYUFBVCxDQUF1QixTQUF2QixFQUFrQyxTQUFsQyxHQUE0QyxxQkFBWSxjQUFaLEVBQTVDO0FBQ0gsR0FwQmU7QUFzQmhCLEVBQUEsZ0JBQWdCLEVBQUMsTUFBSTtBQUNqQixJQUFBLFFBQVEsQ0FBQyxhQUFULENBQXVCLFNBQXZCLEVBQWtDLFNBQWxDLEdBQTRDLEVBQTVDO0FBQ0g7QUF4QmUsQ0FBcEI7ZUEyQmUsVzs7Ozs7O0FDakNmOztBQUNBOzs7O0FBRUEsb0JBQVksY0FBWjs7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsIi8vIFRoaXMgbW9kdWxlIHBlcmZvcm1zIG9wZXJhdGlvbnMgb24gdGhlIGZyaWVuZHMgcG9ydGlvbiBvZiB0aGUgZGF0YWJhc2VcclxuLy8gQnVpbHQgYnkgU3lkbmV5IFdhaXRcclxuXHJcblxyXG5jb25zdCBBUElNYW5hZ2VyID0ge1xyXG5cclxuICAgIGdldEFsbEZyaWVuZHNCeVVzZXI6ICh1c2VySWQpID0+IHtcclxuICAgICAgICByZXR1cm4gZmV0Y2goYGh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC9mcmllbmRzP19leHBhbmQ9dXNlciZ1c2VySWQ9JHt1c2VySWR9YClcclxuICAgICAgICAgICAgLnRoZW4oZnJpZW5kcyA9PiBmcmllbmRzLmpzb24oKSlcclxuXHJcbiAgICB9LFxyXG4gICAgZ2V0QWxsRnJpZW5kc0J5RnJpZW5kOiAodXNlcklkKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIGZldGNoKGBodHRwOi8vbG9jYWxob3N0OjgwODgvZnJpZW5kcz9vdGhlckZyaWVuZElkPSR7dXNlcklkfSZfZXhwYW5kPXVzZXJgKVxyXG4gICAgICAgICAgICAudGhlbihmcmllbmRzID0+IGZyaWVuZHMuanNvbigpKVxyXG5cclxuICAgIH0sXHJcbiAgICBnZXRTaW5nbGVGcmllbmQ6IChvdGhlckZyaWVuZElkKT0+e1xyXG5cclxuICAgICAgICByZXR1cm4gZmV0Y2goYGh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC91c2Vycy8ke290aGVyRnJpZW5kSWR9YClcclxuICAgICAgICAudGhlbihjb250YWN0cyA9PiBjb250YWN0cy5qc29uKCkpXHJcbiAgICB9LFxyXG4gICAgZ2V0QWxsRnJpZW5kczogKGlkKSA9PiB7XHJcbiAgICAgICAgY29uc3QgaHRtbFN0cmluZyA9IFwiXCJcclxuICAgICAgICBnZXRBbGxGcmllbmRzQnkodXNlcklkKVxyXG4gICAgICAgICAgICAudGhlbigoZnJpZW5kKSA9PiB7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG5cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQVBJTWFuYWdlcjtcclxuIiwiLy8gTW9kdWxlIHRvIGdlbmVyYXRlIHRoZSBmcmllbmRzIGNvbnNvbGUgaW4gdGhlIGRhc2hib2FyZFxyXG4vLyBidWlsdCBieSBTeWRuZXkgV2FpdFxyXG5cclxuaW1wb3J0IGJ1aWxkRnJpZW5kcyBmcm9tIFwiLi9mcmllbmRCdWlsZGVyXCI7XHJcblxyXG5jb25zdCBmcmllbmRBY3RpdmF0b3IgPSAoKSA9PiB7XHJcbmNvbnN0IGFjdGl2ZVVzZXIgPSBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKFwiYWN0aXZlVXNlclwiKVxyXG5cclxuICAgIGJ1aWxkRnJpZW5kcyhhY3RpdmVVc2VyKVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmcmllbmRBY3RpdmF0b3I7IiwiLy9UaGlzIG1vZHVsZSBnb2VzIGFuZCBmaW5kcyBhbGwgdGhlIGZyaWVuZCByZWxhdGlvbnNoaXBzIG9mIGEgc2luZ2xlIHVzZXIgYW5kIHBvc3RzIHRvIGRvbVxyXG4vLyBidWlsdCBieSBTeWRuZXkgV2FpdFxyXG5cclxuaW1wb3J0IEFQSU1hbmFnZXIgZnJvbSBcIi4vQVBJTWFuYWdlclwiXHJcblxyXG5cclxuY29uc3QgYnVpbGRGcmllbmRzID0gKHVzZXJJZCkgPT4ge1xyXG4gICAgbGV0IGh0bWxTdHJpbmcgPSBcIjxoMT5GcmllbmRzOjwvaDE+XCJcclxuICAgIEFQSU1hbmFnZXIuZ2V0QWxsRnJpZW5kc0J5RnJpZW5kKHVzZXJJZClcclxuICAgICAgICAudGhlbihmcmllbmRzID0+IHtcclxuICAgICAgICAgICAgZnJpZW5kcy5mb3JFYWNoKGZyaWVuZCA9PiB7XHJcbiAgICAgICAgICAgICAgICBodG1sU3RyaW5nICs9IGA8aDQ+JHtmcmllbmQudXNlci51c2VybmFtZX08aDQ+YFxyXG5cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9KVxyXG4gICAgICAgIC50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgQVBJTWFuYWdlci5nZXRBbGxGcmllbmRzQnlVc2VyKHVzZXJJZClcclxuICAgICAgICAgICAgICAgIC50aGVuKGZyaWVuZHMgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGZyaWVuZHMuZm9yRWFjaChmcmllbmQgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBvdGhlckZyaWVuZElkID0gZnJpZW5kLm90aGVyRnJpZW5kSWRcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEFQSU1hbmFnZXIuZ2V0U2luZ2xlRnJpZW5kKG90aGVyRnJpZW5kSWQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbigoc2luZ2xlRnJpZW5kKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaHRtbFN0cmluZyArPSBgPGg0PiR7c2luZ2xlRnJpZW5kLnVzZXJuYW1lfTxoND5gXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coaHRtbFN0cmluZylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2ZybmRzLWNvbnRcIikuaW5uZXJIVE1MID0gaHRtbFN0cmluZztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICB9KVxyXG5cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgYnVpbGRGcmllbmRzXHJcbiIsIi8vVGhpcyBtb2R1bGUgYWxsb3dzIGZvciBmZXRjaCBhbmQgcG9zdCBjYWxscyB0byB0aGUgdXNlciBkYXRhYmFzZVxyXG4vL2J1aWx0IGJ5IFN5ZG5leSBXYWl0XHJcblxyXG5jb25zdCBBUElNYW5hZ2VyPXtcclxuZ2V0U2luZ2xlVXNlcjogKHVzZXJLZXksIHVzZXJWYWx1ZSk9PntcclxuXHJcbiAgICByZXR1cm4gZmV0Y2goYGh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC91c2Vycz8ke3VzZXJLZXl9PSR7dXNlclZhbHVlfWApXHJcbiAgICAudGhlbihjb250YWN0cyA9PiBjb250YWN0cy5qc29uKCkpXHJcbn0sXHJcblxyXG5nZXRBbGxVc2VyczogKCk9PntcclxuICAgIHJldHVybiBmZXRjaChcImh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC91c2Vyc1wiKVxyXG4gICAgICAgICAgICAudGhlbihjb250YWN0cyA9PiBjb250YWN0cy5qc29uKCkpXHJcbn0sXHJcblxyXG5hZGRVc2VyOih1c2VyT2JqZWN0KT0+e1xyXG5cclxuICAgIHJldHVybiBmZXRjaChcImh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC91c2Vyc1wiLCB7XHJcbiAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcclxuICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiXHJcbiAgICAgICAgfSxcclxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh1c2VyT2JqZWN0KVxyXG4gICAgfSlcclxufVxyXG5cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQVBJTWFuYWdlcjsiLCIvL1RoaXMgZnVuY3Rpb24gaW1wb3J0cyBhbGwgdGhlIGV2ZW50IGxpc3RlbmVycyBhbmQgcGFnZSBsb2FkcyBmcm9tIHRoZSBpbmRpdmlkdWFsIG1vZHVsZXNcclxuLy9uZXdzLCBldmVudHMsIHRhc2tzLCBjaGF0cywgYW5kIGZyaWVuZHNcclxuaW1wb3J0IGZvcm1QcmludGVyIGZyb20gXCIuL3ByaW50VG9Eb20uanNcIlxyXG5pbXBvcnQgZnJpZW5kQWN0aXZhdG9yIGZyb20gXCIuLi9mcmllbmRzL2ZyaWVuZEFjdGl2YXRvci5qc1wiO1xyXG5cclxuY29uc3QgZGFzaGJvYXJkQWN0aXZhdG9yID0gKCkgPT4ge1xyXG4gICAgZm9ybVByaW50ZXIucHJpbnRMb2dvdXRGb3JtKClcclxuICAgIGZyaWVuZEFjdGl2YXRvcigpXHJcblxyXG5cclxuXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGRhc2hib2FyZEFjdGl2YXRvcjtcclxuIiwiLy8gdGhpcyBtb2R1bGUgY2xlYXJzIHRoZSBkYXNoYm9hcmQgdXBvbiBsb2dvdXRcclxuLy8gYnVpbHQgYnkgU3lkbmV5IFdhaXRcclxuXHJcbmltcG9ydCBmcmllbmRBY3RpdmF0b3IgZnJvbSBcIi4uL2ZyaWVuZHMvZnJpZW5kQWN0aXZhdG9yXCI7XHJcblxyXG5jb25zdCBkYXNoYm9hcmREZWFjdGl2YXRvciA9ICgpID0+IHtcclxuXHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2ZybmRzLWNvbnRcIikuaW5uZXJIVE1MID0gXCJcIlxyXG4gICAgLy8gaW5zZXJ0IHlvdXIgZnVuY3Rpb25zIG9yIEhUTUwgc3RyaW5ncyB0aGF0IG5lZWQgdG8gYmUgY2xlYXJlZCBvbiBsb2dvdXRcclxuXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGRhc2hib2FyZERlYWN0aXZhdG9yOyIsIi8vbW9kdWxlIHRvIGJ1aWxkIHRoZSBsb2dpbiBhbmQgcmVnaXN0cmF0aW9uIGZvcm1zXHJcbi8vIGJ1aWx0IGJ5IFN5ZG5leSBXYWl0XHJcblxyXG5jb25zdCBmb3JtQnVpbGRlciA9IHtcclxuICAgIG1ha2VMb2dpbkZvcm06ICgpID0+IHtcclxuICAgICAgICByZXR1cm4gYDxoMT5XZWxjb21lIHRvIE51dHNoZWxsITwvaDE+XHJcbiAgICA8aW5wdXQgY2xhc3M9XCJpbnB1dCBsb2dpbi1pbnB1dFwiIHR5cGU9XCJ0ZXh0XCIgbmFtZT1cInVzZXJOYW1lXCIgaWQ9XCJsb2dpbi1uYW1lXCIgcGxhY2Vob2xkZXI9XCJVc2VybmFtZVwiPjxicj5cclxuICAgIDxpbnB1dCBjbGFzcz1cImlucHV0IGxvZ2luLWlucHV0XCIgdHlwZT1cInBhc3N3b3JkXCIgbmFtZT1cInBhc3N3b3JkXCIgaWQ9XCJsb2dpbi1wYXNzXCIgcGxhY2Vob2xkZXI9XCJQYXNzd29yZFwiPjxicj5cclxuICAgIDxidXR0b24gdHlwZT1cInN1Ym1pdFwiIGNsYXNzID0gXCJidG5cIiBpZD1cImxvZ2luLWJ0blwiPmxvZ2luPC9idXR0b24+XHJcbiAgICA8YnV0dG9uIHR5cGU9XCJzdWJtaXRcIiBjbGFzcyA9IFwiYnRuXCIgaWQ9XCJyZWctYnRuXCI+cmVnaXN0ZXI8L2J1dHRvbj5gXHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICBtYWtlUmVnaXN0ZXJGb3JtOiAoKSA9PiB7XHJcblxyXG4gICAgICAgIHJldHVybiBgPGgxPlBsZWFzZSBSZWdpc3Rlcjo8L2gxPlxyXG4gICAgPGlucHV0IGNsYXNzPVwicmVnaXN0ZXItaW5wdXRcIiB0eXBlPVwidGV4dFwiIG5hbWU9XCJlbWFpbFwiIGlkPVwicmVnLWVtYWlsXCIgcGxhY2Vob2xkZXI9XCJFbWFpbCBBZGRyZXNzXCI+PGJyPlxyXG4gICAgPGlucHV0IGNsYXNzPVwicmVnaXN0ZXItaW5wdXRcIiB0eXBlPVwidGV4dFwiIG5hbWU9XCJ1c2VyTmFtZVwiIGlkPVwicmVnLW5hbWVcIiBwbGFjZWhvbGRlcj1cIlVzZXJuYW1lXCI+PGJyPlxyXG4gICAgPGlucHV0IGNsYXNzPVwicmVnaXN0ZXItaW5wdXRcIiB0eXBlPVwicGFzc3dvcmRcIiBuYW1lPVwicGFzc3dvcmRcIiBpZD1cInJlZy1wYXNzXCIgcGxhY2Vob2xkZXI9XCJQYXNzd29yZFwiPjxicj5cclxuICAgIDxidXR0b24gdHlwZT1cInJlZ2lzdGVyXCIgY2xhc3MgPSBcImJ0blwiIGlkPVwic3VibWl0LXJlZy1idG5cIj5yZWdpc3RlcjwvYnV0dG9uPmBcclxuICAgIH0sXHJcbiAgICBtYWtlTG9nb3V0Rm9ybTogKCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBgPGJ1dHRvbiB0eXBlPVwicmVnaXN0ZXJcIiBjbGFzcyA9IFwiYnRuXCIgaWQ9XCJsb2dvdXQtYnRuXCI+bG9nb3V0PC9idXR0b24+YFxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmb3JtQnVpbGRlcjsiLCIvL1RoaXMgbW9kdWxlIGhhbmRsZXMgdGhlIGxvZ2luIGFuZCByZWdpc3RyYXRpb24gZnVuY3Rpb25hbGl0eSBvZiB0aGUgQVBQXHJcbi8vIEJ1aWx0IGJ5IFN5ZG5leSBXYWl0XHJcblxyXG5pbXBvcnQgZm9ybVByaW50ZXIgZnJvbSBcIi4vcHJpbnRUb0RvbS5qc1wiXHJcbmltcG9ydCBidWlsZFVzZXJPYmplY3QgZnJvbSBcIi4vb2JqZWN0QnVpbGRlci5qc1wiXHJcbmltcG9ydCBBUElNYW5hZ2VyIGZyb20gXCIuL0FQSU1hbmFnZXIuanNcIlxyXG5pbXBvcnQgZGFzaGJvYXJkQWN0aXZhdG9yIGZyb20gXCIuL2Rhc2hib2FyZEFjdGl2YXRvci5qc1wiO1xyXG5pbXBvcnQgZGFzaGJvYXJkRGVhY3RpdmF0b3IgZnJvbSBcIi4vZGFzaGJvYXJkRGVhY3RpdmF0b3IuanNcIjtcclxuXHJcblxyXG5jb25zdCBsb2dpbk1hbmFnZXIgPSAoKSA9PiB7XHJcbiAgICAvL0VWRU5UIExJU1RFTkVSIE9OIFRIRSBMT0dJTiBDT05UQUlORVIgVE8gSEFORExFIEFMTCBPRiBMT0dJTiBBTkQgUkVHSVNUUkFUSU9OIEZFQVRVUkVTXHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2xvZ2luLWNvbnRcIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcclxuXHJcbiAgICAgICAgY29uc3QgZXZlbnRUYXJnZXQgPSBldmVudC50YXJnZXQuaWQuc3BsaXQoXCItXCIpXHJcblxyXG4gICAgICAgIGlmIChldmVudC50YXJnZXQuaWQgPT09IFwibG9naW4tYnRuXCIpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJZb3UgY2xpY2tlZCB0aGUgbG9naW4gYnV0dG9uIVwiKVxyXG4gICAgICAgICAgICBjb25zdCB1c2VyTmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbG9naW4tbmFtZVwiKS52YWx1ZVxyXG4gICAgICAgICAgICBjb25zdCBwYXNzd29yZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbG9naW4tcGFzc1wiKS52YWx1ZVxyXG4gICAgICAgICAgICAvL2NoZWNrIGlmIHVzZXJuYW1lIGlzIGluIHRoZSBkYXRhYmFzZVxyXG4gICAgICAgICAgICBBUElNYW5hZ2VyLmdldFNpbmdsZVVzZXIoXCJ1c2VybmFtZVwiLCB1c2VyTmFtZSlcclxuICAgICAgICAgICAgICAgIC50aGVuKChzaW5nbGVVc2VyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNpbmdsZVVzZXIubGVuZ3RoID09PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiVGhlIHVzZXJuYW1lIG9mXCIsIHVzZXJOYW1lLCBcIndhcyB2ZXJpZmllZFwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2NoZWNrIGlmIHBhc3N3b3JkIG1hdGNoZXNcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNpbmdsZVVzZXJbMF0ucGFzc3dvcmQgPT09IHBhc3N3b3JkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3JtUHJpbnRlci5yZW1vdmVMb2dpbkZvcm0oKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShcImFjdGl2ZVVzZXJcIiwgc2luZ2xlVXNlclswXS5pZClcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3RoaXMgYWN0aXZhdGVzIHRoZSBkYXNoYm9hcmRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhc2hib2FyZEFjdGl2YXRvcigpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cuYWxlcnQoXCJUaGUgcGFzc3dvcmQgaXMgaW5jb3JyZWN0IVwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cuYWxlcnQoXCJ0aGF0IHVzZXJuYW1lIGRvZXMgbm90IGV4aXN0IGluIHRoZSBkYXRhYmFzZVwiKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL0lmIHVzZXIgY2xpY2tzIHRoZSByZWdpc3RlciBidXR0b24sIGxvYWQgdGhlIHJlZ2lzdHJhdGlvbiBmb3JtXHJcbiAgICAgICAgaWYgKGV2ZW50LnRhcmdldC5pZCA9PT0gXCJyZWctYnRuXCIpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJ5b3UgY2xpY2tlZCB0aGUgcmVnaXN0ZXIgYnV0dG9uXCIpXHJcbiAgICAgICAgICAgIGZvcm1QcmludGVyLnByaW50UmVnaXN0ZXJGb3JtKClcclxuXHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICAvL2lmIHVzZXIgY2xpY2tzIHRoZSBzdWJtaXQgYnV0dG9uLCByZWdpc3RyYXRpb24gd2lsbCBiZSBwb3N0ZWQgdG8gZGF0YWJhc2VcclxuICAgICAgICBpZiAoZXZlbnQudGFyZ2V0LmlkID09PSBcInN1Ym1pdC1yZWctYnRuXCIpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJ5b3UgY2xpY2tlZCB0aGUgc3VibWl0IGJ1dHRvblwiKVxyXG4gICAgICAgICAgICAvL2ZpcnN0IGNoZWNrIGlmIHVzZXJuYW1lIGlzIGFscmVhZHkgaW4gdGhlIGRhdGFiYXNlLlxyXG4gICAgICAgICAgICBjb25zdCB1c2VyTmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcmVnLW5hbWVcIikudmFsdWVcclxuICAgICAgICAgICAgQVBJTWFuYWdlci5nZXRTaW5nbGVVc2VyKFwidXNlcm5hbWVcIiwgdXNlck5hbWUpXHJcbiAgICAgICAgICAgICAgICAudGhlbigoc2luZ2xlVXNlcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vdXNlcm5hbWUgbm90IGluIGRhdGFiYXNlLCBwcm9jZWVkXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNpbmdsZVVzZXIubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiVGhlIHVzZXJuYW1lIG9mXCIsIHVzZXJOYW1lLCBcIndhcyB2ZXJpZmllZFwiKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcGFzc3dvcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3JlZy1wYXNzXCIpLnZhbHVlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGVtYWlsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNyZWctZW1haWxcIikudmFsdWVcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHVzZXJPYmplY3QgPSBidWlsZFVzZXJPYmplY3QodXNlck5hbWUsIHBhc3N3b3JkLCBlbWFpbClcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJ0aGlzIGlzIHRoZSB1c2VyT2JqZWN0XCIsIHVzZXJPYmplY3QpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEFQSU1hbmFnZXIuYWRkVXNlcih1c2VyT2JqZWN0KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEFQSU1hbmFnZXIuZ2V0U2luZ2xlVXNlcihcInVzZXJuYW1lXCIsIHVzZXJOYW1lKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbigoc2luZ2xlVXNlcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShcImFjdGl2ZVVzZXJcIiwgc2luZ2xlVXNlclswXS5pZClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1QcmludGVyLnJlbW92ZVJlZ2lzdGVyRm9ybSgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXNoYm9hcmRBY3RpdmF0b3IoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vdXNlcm5hbWUgaXMgYWxyZWFkeSBpbiBkYXRhYmFzZSwgZG8gbm90IHByb2NlZWRcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93LmFsZXJ0KFwidGhhdCB1c2VybmFtZSBhbHJlYWR5IGV4aXN0c1wiKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxuICAgIC8vIEVWRU5UIExJU1RFTkVSIEZPUiBUSEUgTE9HT1VUIE9QRVJBVElPTlxyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNoZWFkZXJcIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcclxuICAgICAgICBpZiAoZXZlbnQudGFyZ2V0LmlkID09PSBcImxvZ291dC1idG5cIikge1xyXG5cclxuICAgICAgICAgICAgc2Vzc2lvblN0b3JhZ2UucmVtb3ZlSXRlbShcImFjdGl2ZVVzZXJcIilcclxuICAgICAgICAgICAgLy90aGlzIGlzIGp1c3QgYSBwbGFjZWhvbGRlciB1bnRpbCB3ZSBoYXZlIHRoZSBkYXNoYm9hcmQgLy9cclxuICAgICAgICAgICAgZm9ybVByaW50ZXIucmVtb3ZlTG9nb3V0Rm9ybSgpXHJcbiAgICAgICAgICAgIGRhc2hib2FyZERlYWN0aXZhdG9yKClcclxuICAgICAgICAgICAgZm9ybVByaW50ZXIucHJpbnRMb2dpbkZvcm0oKVxyXG4gICAgICAgIH1cclxuICAgIH0pXHJcblxyXG5cclxuXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGxvZ2luTWFuYWdlcjtcclxuIiwiLy8gTW9kdWxlIHRvIGJ1aWxkIGFuIG9iamVjdCB1c2luZyBpbnB1dHMgZnJvbSB0aGUgcmVnaXN0cmF0aW9uIGZpZWxkXHJcbi8vQnVpbHQgYnkgU3lkbmV5IFdhaXRcclxuXHJcbmNvbnN0IGJ1aWxkVXNlck9iamVjdCA9ICh1c2VyTmFtZSwgcGFzc3dvcmQsIGVtYWlsKSA9PiB7XHJcblxyXG4gICAgY29uc3QgdXNlck9iamVjdCA9IHtcclxuICAgICAgICBcInVzZXJuYW1lXCI6IHVzZXJOYW1lLFxyXG4gICAgICAgIFwicGFzc3dvcmRcIjogcGFzc3dvcmQsXHJcbiAgICAgICAgXCJlbWFpbFwiOiBlbWFpbFxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHVzZXJPYmplY3Q7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGJ1aWxkVXNlck9iamVjdDsiLCIvLyBNb2R1bGUgdG8gcHJpbnQgdGhlIGxvZ2luIGFuZCByZWdpc3RyYXRpb24gZm9ybXMgdG8gdGhlIERPTVxyXG4vLyBhbHNvIGhhcyBmdW5jdGlvbmFsaXR5IHRvIGNsZWFyIHRoZSBmb3JtcyBmcm9tIHRoZSBET01cclxuLy8gQnVpbHQgYnkgU3lkbmV5IFdhaXRcclxuXHJcbmltcG9ydCBmb3JtQnVpbGRlciBmcm9tIFwiLi9mb3JtQnVpbGRlci5qc1wiXHJcblxyXG5jb25zdCBmb3JtUHJpbnRlciA9IHtcclxuXHJcbiAgICBwcmludExvZ2luRm9ybTogKCkgPT4ge1xyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbG9naW4tY29udFwiKS5pbm5lckhUTUwgPSBmb3JtQnVpbGRlci5tYWtlTG9naW5Gb3JtKClcclxuICAgIH0sXHJcblxyXG4gICAgcmVtb3ZlTG9naW5Gb3JtOiAoKSA9PiB7XHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNsb2dpbi1jb250XCIpLmlubmVySFRNTCA9IFwiXCJcclxuICAgIH0sXHJcblxyXG4gICAgcHJpbnRSZWdpc3RlckZvcm06ICgpID0+IHtcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2xvZ2luLWNvbnRcIikuaW5uZXJIVE1MID0gZm9ybUJ1aWxkZXIubWFrZVJlZ2lzdGVyRm9ybSgpXHJcbiAgICB9LFxyXG5cclxuICAgIHJlbW92ZVJlZ2lzdGVyRm9ybTogKCkgPT4ge1xyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbG9naW4tY29udFwiKS5pbm5lckhUTUwgPSBcIlwiXHJcbiAgICB9LFxyXG5cclxuICAgIHByaW50TG9nb3V0Rm9ybTooKT0+e1xyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjaGVhZGVyXCIpLmlubmVySFRNTD1mb3JtQnVpbGRlci5tYWtlTG9nb3V0Rm9ybSgpXHJcbiAgICB9LFxyXG5cclxuICAgIHJlbW92ZUxvZ291dEZvcm06KCk9PntcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2hlYWRlclwiKS5pbm5lckhUTUw9XCJcIlxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmb3JtUHJpbnRlclxyXG4iLCJpbXBvcnQgZm9ybVByaW50ZXIgZnJvbSBcIi4vbG9naW4vcHJpbnRUb0RvbS5qc1wiXHJcbmltcG9ydCBsb2dpbk1hbmFnZXIgZnJvbSBcIi4vbG9naW4vbG9naW5NYW5hZ2VyLmpzXCJcclxuXHJcbmZvcm1QcmludGVyLnByaW50TG9naW5Gb3JtKCk7XHJcbmxvZ2luTWFuYWdlcigpO1xyXG4iXX0=
