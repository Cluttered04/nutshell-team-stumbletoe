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

const buildFriends = userId => {
  let htmlString = "<h1>Friends:</h1>";

  _APIManager.default.getAllFriendsByFriend(userId).then(friends => {
    friends.forEach(friend => {
      htmlString += `<h4>${friend.user.username}<h4>`;
      console.log(friend.user.username);
    });
  }).then(() => {
    _APIManager.default.getAllFriendsByUser(userId).then(friends => {
      friends.forEach(friend => {
        console.log(friend.otherFriendId);
        const otherFriendId = friend.otherFriendId;

        _APIManager.default.getSingleFriend(otherFriendId).then(singleFriend => {
          htmlString += `<h4>${singleFriend.username}<h4>`;
          console.log(singleFriend.username);
          console.log(htmlString);
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
  _printToDom.default.printLogoutForm(); //This is just a placeholder until we get all the other pieces
  // document.querySelector("#header").innerHTML = `you are logged in`


  console.log("inside the dashboard activator");
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
  // only for a test!!  This will not be #body later
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9zY3JpcHRzL2ZyaWVuZHMvQVBJTWFuYWdlci5qcyIsIi4uL3NjcmlwdHMvZnJpZW5kcy9mcmllbmRBY3RpdmF0b3IuanMiLCIuLi9zY3JpcHRzL2ZyaWVuZHMvZnJpZW5kQnVpbGRlci5qcyIsIi4uL3NjcmlwdHMvbG9naW4vQVBJTWFuYWdlci5qcyIsIi4uL3NjcmlwdHMvbG9naW4vZGFzaGJvYXJkQWN0aXZhdG9yLmpzIiwiLi4vc2NyaXB0cy9sb2dpbi9kYXNoYm9hcmREZWFjdGl2YXRvci5qcyIsIi4uL3NjcmlwdHMvbG9naW4vZm9ybUJ1aWxkZXIuanMiLCIuLi9zY3JpcHRzL2xvZ2luL2xvZ2luTWFuYWdlci5qcyIsIi4uL3NjcmlwdHMvbG9naW4vb2JqZWN0QnVpbGRlci5qcyIsIi4uL3NjcmlwdHMvbG9naW4vcHJpbnRUb0RvbS5qcyIsIi4uL3NjcmlwdHMvbWFpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7OztBQ0FBO0FBQ0E7QUFHQSxNQUFNLFVBQVUsR0FBRztBQUVmLEVBQUEsbUJBQW1CLEVBQUcsTUFBRCxJQUFZO0FBQzdCLFdBQU8sS0FBSyxDQUFFLHFEQUFvRCxNQUFPLEVBQTdELENBQUwsQ0FDRixJQURFLENBQ0csT0FBTyxJQUFJLE9BQU8sQ0FBQyxJQUFSLEVBRGQsQ0FBUDtBQUdILEdBTmM7QUFPZixFQUFBLHFCQUFxQixFQUFHLE1BQUQsSUFBWTtBQUMvQixXQUFPLEtBQUssQ0FBRSwrQ0FBOEMsTUFBTyxlQUF2RCxDQUFMLENBQ0YsSUFERSxDQUNHLE9BQU8sSUFBSSxPQUFPLENBQUMsSUFBUixFQURkLENBQVA7QUFHSCxHQVhjO0FBWWYsRUFBQSxlQUFlLEVBQUcsYUFBRCxJQUFpQjtBQUU5QixXQUFPLEtBQUssQ0FBRSwrQkFBOEIsYUFBYyxFQUE5QyxDQUFMLENBQ04sSUFETSxDQUNELFFBQVEsSUFBSSxRQUFRLENBQUMs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anMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsIi8vIFRoaXMgbW9kdWxlIHBlcmZvcm1zIG9wZXJhdGlvbnMgb24gdGhlIGZyaWVuZHMgcG9ydGlvbiBvZiB0aGUgZGF0YWJhc2VcclxuLy8gQnVpbHQgYnkgU3lkbmV5IFdhaXRcclxuXHJcblxyXG5jb25zdCBBUElNYW5hZ2VyID0ge1xyXG5cclxuICAgIGdldEFsbEZyaWVuZHNCeVVzZXI6ICh1c2VySWQpID0+IHtcclxuICAgICAgICByZXR1cm4gZmV0Y2goYGh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC9mcmllbmRzP19leHBhbmQ9dXNlciZ1c2VySWQ9JHt1c2VySWR9YClcclxuICAgICAgICAgICAgLnRoZW4oZnJpZW5kcyA9PiBmcmllbmRzLmpzb24oKSlcclxuXHJcbiAgICB9LFxyXG4gICAgZ2V0QWxsRnJpZW5kc0J5RnJpZW5kOiAodXNlcklkKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIGZldGNoKGBodHRwOi8vbG9jYWxob3N0OjgwODgvZnJpZW5kcz9vdGhlckZyaWVuZElkPSR7dXNlcklkfSZfZXhwYW5kPXVzZXJgKVxyXG4gICAgICAgICAgICAudGhlbihmcmllbmRzID0+IGZyaWVuZHMuanNvbigpKVxyXG5cclxuICAgIH0sXHJcbiAgICBnZXRTaW5nbGVGcmllbmQ6IChvdGhlckZyaWVuZElkKT0+e1xyXG5cclxuICAgICAgICByZXR1cm4gZmV0Y2goYGh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC91c2Vycy8ke290aGVyRnJpZW5kSWR9YClcclxuICAgICAgICAudGhlbihjb250YWN0cyA9PiBjb250YWN0cy5qc29uKCkpXHJcbiAgICB9LFxyXG4gICAgZ2V0QWxsRnJpZW5kczogKGlkKSA9PiB7XHJcbiAgICAgICAgY29uc3QgaHRtbFN0cmluZyA9IFwiXCJcclxuICAgICAgICBnZXRBbGxGcmllbmRzQnkodXNlcklkKVxyXG4gICAgICAgICAgICAudGhlbigoZnJpZW5kKSA9PiB7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG5cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQVBJTWFuYWdlcjtcclxuIiwiLy8gTW9kdWxlIHRvIGdlbmVyYXRlIHRoZSBmcmllbmRzIGNvbnNvbGUgaW4gdGhlIGRhc2hib2FyZFxyXG4vLyBidWlsdCBieSBTeWRuZXkgV2FpdFxyXG5cclxuaW1wb3J0IGJ1aWxkRnJpZW5kcyBmcm9tIFwiLi9mcmllbmRCdWlsZGVyXCI7XHJcblxyXG5jb25zdCBmcmllbmRBY3RpdmF0b3IgPSAoKSA9PiB7XHJcbmNvbnN0IGFjdGl2ZVVzZXIgPSBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKFwiYWN0aXZlVXNlclwiKVxyXG5cclxuICAgIGJ1aWxkRnJpZW5kcyhhY3RpdmVVc2VyKVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmcmllbmRBY3RpdmF0b3I7IiwiaW1wb3J0IEFQSU1hbmFnZXIgZnJvbSBcIi4vQVBJTWFuYWdlclwiXHJcblxyXG5cclxuY29uc3QgYnVpbGRGcmllbmRzID0gKHVzZXJJZCkgPT4ge1xyXG4gICAgbGV0IGh0bWxTdHJpbmcgPVwiPGgxPkZyaWVuZHM6PC9oMT5cIlxyXG4gICAgQVBJTWFuYWdlci5nZXRBbGxGcmllbmRzQnlGcmllbmQodXNlcklkKVxyXG4gICAgICAgIC50aGVuKGZyaWVuZHMgPT4ge1xyXG4gICAgICAgICAgICBmcmllbmRzLmZvckVhY2goZnJpZW5kID0+IHtcclxuICAgICAgICAgICAgICAgIGh0bWxTdHJpbmcgKz1gPGg0PiR7ZnJpZW5kLnVzZXIudXNlcm5hbWV9PGg0PmBcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGZyaWVuZC51c2VyLnVzZXJuYW1lKVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICBBUElNYW5hZ2VyLmdldEFsbEZyaWVuZHNCeVVzZXIodXNlcklkKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oZnJpZW5kcyA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZnJpZW5kcy5mb3JFYWNoKGZyaWVuZCA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGZyaWVuZC5vdGhlckZyaWVuZElkKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBvdGhlckZyaWVuZElkID0gZnJpZW5kLm90aGVyRnJpZW5kSWRcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEFQSU1hbmFnZXIuZ2V0U2luZ2xlRnJpZW5kKG90aGVyRnJpZW5kSWQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbigoc2luZ2xlRnJpZW5kKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaHRtbFN0cmluZyArPWA8aDQ+JHtzaW5nbGVGcmllbmQudXNlcm5hbWV9PGg0PmBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhzaW5nbGVGcmllbmQudXNlcm5hbWUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coaHRtbFN0cmluZylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2ZybmRzLWNvbnRcIikuaW5uZXJIVE1MID0gaHRtbFN0cmluZztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICB9KVxyXG5cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgYnVpbGRGcmllbmRzXHJcbiIsIi8vVGhpcyBtb2R1bGUgYWxsb3dzIGZvciBmZXRjaCBhbmQgcG9zdCBjYWxscyB0byB0aGUgdXNlciBkYXRhYmFzZVxyXG4vL2J1aWx0IGJ5IFN5ZG5leSBXYWl0XHJcblxyXG5jb25zdCBBUElNYW5hZ2VyPXtcclxuZ2V0U2luZ2xlVXNlcjogKHVzZXJLZXksIHVzZXJWYWx1ZSk9PntcclxuXHJcbiAgICByZXR1cm4gZmV0Y2goYGh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC91c2Vycz8ke3VzZXJLZXl9PSR7dXNlclZhbHVlfWApXHJcbiAgICAudGhlbihjb250YWN0cyA9PiBjb250YWN0cy5qc29uKCkpXHJcbn0sXHJcblxyXG5nZXRBbGxVc2VyczogKCk9PntcclxuICAgIHJldHVybiBmZXRjaChcImh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC91c2Vyc1wiKVxyXG4gICAgICAgICAgICAudGhlbihjb250YWN0cyA9PiBjb250YWN0cy5qc29uKCkpXHJcblxyXG5cclxufSxcclxuXHJcbmFkZFVzZXI6KHVzZXJPYmplY3QpPT57XHJcblxyXG4gICAgcmV0dXJuIGZldGNoKFwiaHR0cDovL2xvY2FsaG9zdDo4MDg4L3VzZXJzXCIsIHtcclxuICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxyXG4gICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCJcclxuICAgICAgICB9LFxyXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHVzZXJPYmplY3QpXHJcbiAgICB9KVxyXG59XHJcblxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBBUElNYW5hZ2VyOyIsIi8vVGhpcyBmdW5jdGlvbiBpbXBvcnRzIGFsbCB0aGUgZXZlbnQgbGlzdGVuZXJzIGFuZCBwYWdlIGxvYWRzIGZyb20gdGhlIGluZGl2aWR1YWwgbW9kdWxlc1xyXG4vL25ld3MsIGV2ZW50cywgdGFza3MsIGNoYXRzLCBhbmQgZnJpZW5kc1xyXG5pbXBvcnQgZm9ybVByaW50ZXIgZnJvbSBcIi4vcHJpbnRUb0RvbS5qc1wiXHJcbmltcG9ydCBmcmllbmRBY3RpdmF0b3IgZnJvbSBcIi4uL2ZyaWVuZHMvZnJpZW5kQWN0aXZhdG9yLmpzXCI7XHJcblxyXG5jb25zdCBkYXNoYm9hcmRBY3RpdmF0b3IgPSAoKSA9PiB7XHJcbiAgICBmb3JtUHJpbnRlci5wcmludExvZ291dEZvcm0oKVxyXG5cclxuICAgIC8vVGhpcyBpcyBqdXN0IGEgcGxhY2Vob2xkZXIgdW50aWwgd2UgZ2V0IGFsbCB0aGUgb3RoZXIgcGllY2VzXHJcbiAgICAvLyBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2hlYWRlclwiKS5pbm5lckhUTUwgPSBgeW91IGFyZSBsb2dnZWQgaW5gXHJcbiAgICBjb25zb2xlLmxvZyhcImluc2lkZSB0aGUgZGFzaGJvYXJkIGFjdGl2YXRvclwiKVxyXG4gICAgZnJpZW5kQWN0aXZhdG9yKClcclxuXHJcblxyXG5cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgZGFzaGJvYXJkQWN0aXZhdG9yO1xyXG4iLCJpbXBvcnQgZnJpZW5kQWN0aXZhdG9yIGZyb20gXCIuLi9mcmllbmRzL2ZyaWVuZEFjdGl2YXRvclwiO1xyXG5cclxuLy8gdGhpcyBtb2R1bGUgY2xlYXJzIHRoZSBkYXNoYm9hcmQgdXBvbiBsb2dvdXRcclxuLy8gYnVpbHQgYnkgU3lkbmV5IFdhaXRcclxuXHJcbmNvbnN0IGRhc2hib2FyZERlYWN0aXZhdG9yID0gKCkgPT4ge1xyXG4gICAgLy8gb25seSBmb3IgYSB0ZXN0ISEgIFRoaXMgd2lsbCBub3QgYmUgI2JvZHkgbGF0ZXJcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZnJuZHMtY29udFwiKS5pbm5lckhUTUwgPSBcIlwiXHJcbiAgICAvLyBpbnNlcnQgeW91ciBmdW5jdGlvbnMgb3IgSFRNTCBzdHJpbmdzIHRoYXQgbmVlZCB0byBiZSBjbGVhcmVkIG9uIGxvZ291dFxyXG5cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgZGFzaGJvYXJkRGVhY3RpdmF0b3I7IiwiLy9tb2R1bGUgdG8gYnVpbGQgdGhlIGxvZ2luIGFuZCByZWdpc3RyYXRpb24gZm9ybXNcclxuLy8gYnVpbHQgYnkgU3lkbmV5IFdhaXRcclxuXHJcbmNvbnN0IGZvcm1CdWlsZGVyID0ge1xyXG4gICAgbWFrZUxvZ2luRm9ybTogKCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBgPGgxPldlbGNvbWUgdG8gTnV0c2hlbGwhPC9oMT5cclxuICAgIDxpbnB1dCBjbGFzcz1cImlucHV0IGxvZ2luLWlucHV0XCIgdHlwZT1cInRleHRcIiBuYW1lPVwidXNlck5hbWVcIiBpZD1cImxvZ2luLW5hbWVcIiBwbGFjZWhvbGRlcj1cIlVzZXJuYW1lXCI+PGJyPlxyXG4gICAgPGlucHV0IGNsYXNzPVwiaW5wdXQgbG9naW4taW5wdXRcIiB0eXBlPVwicGFzc3dvcmRcIiBuYW1lPVwicGFzc3dvcmRcIiBpZD1cImxvZ2luLXBhc3NcIiBwbGFjZWhvbGRlcj1cIlBhc3N3b3JkXCI+PGJyPlxyXG4gICAgPGJ1dHRvbiB0eXBlPVwic3VibWl0XCIgY2xhc3MgPSBcImJ0blwiIGlkPVwibG9naW4tYnRuXCI+bG9naW48L2J1dHRvbj5cclxuICAgIDxidXR0b24gdHlwZT1cInN1Ym1pdFwiIGNsYXNzID0gXCJidG5cIiBpZD1cInJlZy1idG5cIj5yZWdpc3RlcjwvYnV0dG9uPmBcclxuICAgIH0sXHJcblxyXG5cclxuICAgIG1ha2VSZWdpc3RlckZvcm06ICgpID0+IHtcclxuXHJcbiAgICAgICAgcmV0dXJuIGA8aDE+UGxlYXNlIFJlZ2lzdGVyOjwvaDE+XHJcbiAgICA8aW5wdXQgY2xhc3M9XCJyZWdpc3Rlci1pbnB1dFwiIHR5cGU9XCJ0ZXh0XCIgbmFtZT1cImVtYWlsXCIgaWQ9XCJyZWctZW1haWxcIiBwbGFjZWhvbGRlcj1cIkVtYWlsIEFkZHJlc3NcIj48YnI+XHJcbiAgICA8aW5wdXQgY2xhc3M9XCJyZWdpc3Rlci1pbnB1dFwiIHR5cGU9XCJ0ZXh0XCIgbmFtZT1cInVzZXJOYW1lXCIgaWQ9XCJyZWctbmFtZVwiIHBsYWNlaG9sZGVyPVwiVXNlcm5hbWVcIj48YnI+XHJcbiAgICA8aW5wdXQgY2xhc3M9XCJyZWdpc3Rlci1pbnB1dFwiIHR5cGU9XCJwYXNzd29yZFwiIG5hbWU9XCJwYXNzd29yZFwiIGlkPVwicmVnLXBhc3NcIiBwbGFjZWhvbGRlcj1cIlBhc3N3b3JkXCI+PGJyPlxyXG4gICAgPGJ1dHRvbiB0eXBlPVwicmVnaXN0ZXJcIiBjbGFzcyA9IFwiYnRuXCIgaWQ9XCJzdWJtaXQtcmVnLWJ0blwiPnJlZ2lzdGVyPC9idXR0b24+YFxyXG4gICAgfSxcclxuICAgIG1ha2VMb2dvdXRGb3JtOiAoKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIGA8YnV0dG9uIHR5cGU9XCJyZWdpc3RlclwiIGNsYXNzID0gXCJidG5cIiBpZD1cImxvZ291dC1idG5cIj5sb2dvdXQ8L2J1dHRvbj5gXHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZvcm1CdWlsZGVyOyIsIi8vVGhpcyBtb2R1bGUgaGFuZGxlcyB0aGUgbG9naW4gYW5kIHJlZ2lzdHJhdGlvbiBmdW5jdGlvbmFsaXR5IG9mIHRoZSBBUFBcclxuLy8gQnVpbHQgYnkgU3lkbmV5IFdhaXRcclxuXHJcbmltcG9ydCBmb3JtUHJpbnRlciBmcm9tIFwiLi9wcmludFRvRG9tLmpzXCJcclxuaW1wb3J0IGJ1aWxkVXNlck9iamVjdCBmcm9tIFwiLi9vYmplY3RCdWlsZGVyLmpzXCJcclxuaW1wb3J0IEFQSU1hbmFnZXIgZnJvbSBcIi4vQVBJTWFuYWdlci5qc1wiXHJcbmltcG9ydCBkYXNoYm9hcmRBY3RpdmF0b3IgZnJvbSBcIi4vZGFzaGJvYXJkQWN0aXZhdG9yLmpzXCI7XHJcbmltcG9ydCBkYXNoYm9hcmREZWFjdGl2YXRvciBmcm9tIFwiLi9kYXNoYm9hcmREZWFjdGl2YXRvci5qc1wiO1xyXG5cclxuXHJcbmNvbnN0IGxvZ2luTWFuYWdlciA9ICgpID0+IHtcclxuICAgIC8vRVZFTlQgTElTVEVORVIgT04gVEhFIExPR0lOIENPTlRBSU5FUiBUTyBIQU5ETEUgQUxMIE9GIExPR0lOIEFORCBSRUdJU1RSQVRJT04gRkVBVFVSRVNcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbG9naW4tY29udFwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG5cclxuICAgICAgICBjb25zdCBldmVudFRhcmdldCA9IGV2ZW50LnRhcmdldC5pZC5zcGxpdChcIi1cIilcclxuXHJcbiAgICAgICAgaWYgKGV2ZW50LnRhcmdldC5pZCA9PT0gXCJsb2dpbi1idG5cIikge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIllvdSBjbGlja2VkIHRoZSBsb2dpbiBidXR0b24hXCIpXHJcbiAgICAgICAgICAgIGNvbnN0IHVzZXJOYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNsb2dpbi1uYW1lXCIpLnZhbHVlXHJcbiAgICAgICAgICAgIGNvbnN0IHBhc3N3b3JkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNsb2dpbi1wYXNzXCIpLnZhbHVlXHJcbiAgICAgICAgICAgIC8vY2hlY2sgaWYgdXNlcm5hbWUgaXMgaW4gdGhlIGRhdGFiYXNlXHJcbiAgICAgICAgICAgIEFQSU1hbmFnZXIuZ2V0U2luZ2xlVXNlcihcInVzZXJuYW1lXCIsIHVzZXJOYW1lKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oKHNpbmdsZVVzZXIpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoc2luZ2xlVXNlci5sZW5ndGggPT09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJUaGUgdXNlcm5hbWUgb2ZcIiwgdXNlck5hbWUsIFwid2FzIHZlcmlmaWVkXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vY2hlY2sgaWYgcGFzc3dvcmQgbWF0Y2hlc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2luZ2xlVXNlclswXS5wYXNzd29yZCA9PT0gcGFzc3dvcmQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1QcmludGVyLnJlbW92ZUxvZ2luRm9ybSgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKFwiYWN0aXZlVXNlclwiLCBzaW5nbGVVc2VyWzBdLmlkKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vdGhpcyBhY3RpdmF0ZXMgdGhlIGRhc2hib2FyZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGFzaGJvYXJkQWN0aXZhdG9yKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy5hbGVydChcIlRoZSBwYXNzd29yZCBpcyBpbmNvcnJlY3QhXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy5hbGVydChcInRoYXQgdXNlcm5hbWUgZG9lcyBub3QgZXhpc3QgaW4gdGhlIGRhdGFiYXNlXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vSWYgdXNlciBjbGlja3MgdGhlIHJlZ2lzdGVyIGJ1dHRvbiwgbG9hZCB0aGUgcmVnaXN0cmF0aW9uIGZvcm1cclxuICAgICAgICBpZiAoZXZlbnQudGFyZ2V0LmlkID09PSBcInJlZy1idG5cIikge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcInlvdSBjbGlja2VkIHRoZSByZWdpc3RlciBidXR0b25cIilcclxuICAgICAgICAgICAgZm9ybVByaW50ZXIucHJpbnRSZWdpc3RlckZvcm0oKVxyXG5cclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vaWYgdXNlciBjbGlja3MgdGhlIHN1Ym1pdCBidXR0b24sIHJlZ2lzdHJhdGlvbiB3aWxsIGJlIHBvc3RlZCB0byBkYXRhYmFzZVxyXG4gICAgICAgIGlmIChldmVudC50YXJnZXQuaWQgPT09IFwic3VibWl0LXJlZy1idG5cIikge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcInlvdSBjbGlja2VkIHRoZSBzdWJtaXQgYnV0dG9uXCIpXHJcbiAgICAgICAgICAgIC8vZmlyc3QgY2hlY2sgaWYgdXNlcm5hbWUgaXMgYWxyZWFkeSBpbiB0aGUgZGF0YWJhc2UuXHJcbiAgICAgICAgICAgIGNvbnN0IHVzZXJOYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNyZWctbmFtZVwiKS52YWx1ZVxyXG4gICAgICAgICAgICBBUElNYW5hZ2VyLmdldFNpbmdsZVVzZXIoXCJ1c2VybmFtZVwiLCB1c2VyTmFtZSlcclxuICAgICAgICAgICAgICAgIC50aGVuKChzaW5nbGVVc2VyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy91c2VybmFtZSBub3QgaW4gZGF0YWJhc2UsIHByb2NlZWRcclxuICAgICAgICAgICAgICAgICAgICBpZiAoc2luZ2xlVXNlci5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJUaGUgdXNlcm5hbWUgb2ZcIiwgdXNlck5hbWUsIFwid2FzIHZlcmlmaWVkXCIpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBwYXNzd29yZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcmVnLXBhc3NcIikudmFsdWVcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZW1haWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3JlZy1lbWFpbFwiKS52YWx1ZVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdXNlck9iamVjdCA9IGJ1aWxkVXNlck9iamVjdCh1c2VyTmFtZSwgcGFzc3dvcmQsIGVtYWlsKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInRoaXMgaXMgdGhlIHVzZXJPYmplY3RcIiwgdXNlck9iamVjdClcclxuICAgICAgICAgICAgICAgICAgICAgICAgQVBJTWFuYWdlci5hZGRVc2VyKHVzZXJPYmplY3QpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQVBJTWFuYWdlci5nZXRTaW5nbGVVc2VyKFwidXNlcm5hbWVcIiwgdXNlck5hbWUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKChzaW5nbGVVc2VyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKFwiYWN0aXZlVXNlclwiLCBzaW5nbGVVc2VyWzBdLmlkKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9ybVByaW50ZXIucmVtb3ZlUmVnaXN0ZXJGb3JtKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhc2hib2FyZEFjdGl2YXRvcigpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy91c2VybmFtZSBpcyBhbHJlYWR5IGluIGRhdGFiYXNlLCBkbyBub3QgcHJvY2VlZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cuYWxlcnQoXCJ0aGF0IHVzZXJuYW1lIGFscmVhZHkgZXhpc3RzXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICB9KVxyXG4gICAgLy8gRVZFTlQgTElTVEVORVIgRk9SIFRIRSBMT0dPVVQgT1BFUkFUSU9OXHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2hlYWRlclwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG4gICAgICAgIGlmIChldmVudC50YXJnZXQuaWQgPT09IFwibG9nb3V0LWJ0blwiKSB7XHJcblxyXG4gICAgICAgICAgICBzZXNzaW9uU3RvcmFnZS5yZW1vdmVJdGVtKFwiYWN0aXZlVXNlclwiKVxyXG4gICAgICAgICAgICAvL3RoaXMgaXMganVzdCBhIHBsYWNlaG9sZGVyIHVudGlsIHdlIGhhdmUgdGhlIGRhc2hib2FyZCAvL1xyXG4gICAgICAgICAgICBmb3JtUHJpbnRlci5yZW1vdmVMb2dvdXRGb3JtKClcclxuICAgICAgICAgICAgZGFzaGJvYXJkRGVhY3RpdmF0b3IoKVxyXG4gICAgICAgICAgICBmb3JtUHJpbnRlci5wcmludExvZ2luRm9ybSgpXHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxuXHJcblxyXG5cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgbG9naW5NYW5hZ2VyO1xyXG4iLCIvLyBNb2R1bGUgdG8gYnVpbGQgYW4gb2JqZWN0IHVzaW5nIGlucHV0cyBmcm9tIHRoZSByZWdpc3RyYXRpb24gZmllbGRcclxuLy9CdWlsdCBieSBTeWRuZXkgV2FpdFxyXG5cclxuY29uc3QgYnVpbGRVc2VyT2JqZWN0ID0gKHVzZXJOYW1lLCBwYXNzd29yZCwgZW1haWwpID0+IHtcclxuXHJcbiAgICBjb25zdCB1c2VyT2JqZWN0ID0ge1xyXG4gICAgICAgIFwidXNlcm5hbWVcIjogdXNlck5hbWUsXHJcbiAgICAgICAgXCJwYXNzd29yZFwiOiBwYXNzd29yZCxcclxuICAgICAgICBcImVtYWlsXCI6IGVtYWlsXHJcbiAgICB9XHJcbiAgICByZXR1cm4gdXNlck9iamVjdDtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgYnVpbGRVc2VyT2JqZWN0OyIsIi8vIE1vZHVsZSB0byBwcmludCB0aGUgbG9naW4gYW5kIHJlZ2lzdHJhdGlvbiBmb3JtcyB0byB0aGUgRE9NXHJcbi8vIGFsc28gaGFzIGZ1bmN0aW9uYWxpdHkgdG8gY2xlYXIgdGhlIGZvcm1zIGZyb20gdGhlIERPTVxyXG4vLyBCdWlsdCBieSBTeWRuZXkgV2FpdFxyXG5cclxuaW1wb3J0IGZvcm1CdWlsZGVyIGZyb20gXCIuL2Zvcm1CdWlsZGVyLmpzXCJcclxuXHJcbmNvbnN0IGZvcm1QcmludGVyID0ge1xyXG5cclxuICAgIHByaW50TG9naW5Gb3JtOiAoKSA9PiB7XHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNsb2dpbi1jb250XCIpLmlubmVySFRNTCA9IGZvcm1CdWlsZGVyLm1ha2VMb2dpbkZvcm0oKVxyXG4gICAgfSxcclxuXHJcbiAgICByZW1vdmVMb2dpbkZvcm06ICgpID0+IHtcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2xvZ2luLWNvbnRcIikuaW5uZXJIVE1MID0gXCJcIlxyXG4gICAgfSxcclxuXHJcbiAgICBwcmludFJlZ2lzdGVyRm9ybTogKCkgPT4ge1xyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbG9naW4tY29udFwiKS5pbm5lckhUTUwgPSBmb3JtQnVpbGRlci5tYWtlUmVnaXN0ZXJGb3JtKClcclxuICAgIH0sXHJcblxyXG4gICAgcmVtb3ZlUmVnaXN0ZXJGb3JtOiAoKSA9PiB7XHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNsb2dpbi1jb250XCIpLmlubmVySFRNTCA9IFwiXCJcclxuICAgIH0sXHJcblxyXG4gICAgcHJpbnRMb2dvdXRGb3JtOigpPT57XHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNoZWFkZXJcIikuaW5uZXJIVE1MPWZvcm1CdWlsZGVyLm1ha2VMb2dvdXRGb3JtKClcclxuICAgIH0sXHJcblxyXG4gICAgcmVtb3ZlTG9nb3V0Rm9ybTooKT0+e1xyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjaGVhZGVyXCIpLmlubmVySFRNTD1cIlwiXHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZvcm1QcmludGVyXHJcbiIsImltcG9ydCBmb3JtUHJpbnRlciBmcm9tIFwiLi9sb2dpbi9wcmludFRvRG9tLmpzXCJcclxuaW1wb3J0IGxvZ2luTWFuYWdlciBmcm9tIFwiLi9sb2dpbi9sb2dpbk1hbmFnZXIuanNcIlxyXG5cclxuZm9ybVByaW50ZXIucHJpbnRMb2dpbkZvcm0oKTtcclxubG9naW5NYW5hZ2VyKCk7XHJcbiJdfQ==
