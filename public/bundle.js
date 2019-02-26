(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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

},{}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _printToDom = _interopRequireDefault(require("./printToDom.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//This function imports all the event listeners and page loads from the individual modules
//news, events, tasks, chats, and friends
const dashboardActivator = () => {
  _printToDom.default.printLogoutForm(); //This is just a placeholder until we get all the other pieces


  document.querySelector("#body").innerHTML = `you are logged in`;
};

var _default = dashboardActivator;
exports.default = _default;

},{"./printToDom.js":6}],3:[function(require,module,exports){
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

},{}],4:[function(require,module,exports){
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

},{"./APIManager.js":1,"./dashboardActivator.js":2,"./objectBuilder.js":5,"./printToDom.js":6}],5:[function(require,module,exports){
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

},{}],6:[function(require,module,exports){
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

},{"./formBuilder.js":3}],7:[function(require,module,exports){
"use strict";

var _printToDom = _interopRequireDefault(require("../login/printToDom.js"));

var _loginManager = _interopRequireDefault(require("../login/loginManager.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_printToDom.default.printLoginForm();

(0, _loginManager.default)();

},{"../login/loginManager.js":4,"../login/printToDom.js":6}]},{},[7])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9sb2dpbi9BUElNYW5hZ2VyLmpzIiwiLi4vbG9naW4vZGFzaGJvYXJkQWN0aXZhdG9yLmpzIiwiLi4vbG9naW4vZm9ybUJ1aWxkZXIuanMiLCIuLi9sb2dpbi9sb2dpbk1hbmFnZXIuanMiLCIuLi9sb2dpbi9vYmplY3RCdWlsZGVyLmpzIiwiLi4vbG9naW4vcHJpbnRUb0RvbS5qcyIsIi4uL3NjcmlwdHMvbWFpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7OztBQ0FBO0FBQ0E7QUFFQSxNQUFNLFVBQVUsR0FBQztBQUNqQixFQUFBLGFBQWEsRUFBRSxDQUFDLE9BQUQsRUFBVSxTQUFWLEtBQXNCO0FBRWpDLFdBQU8sS0FBSyxDQUFFLCtCQUE4QixPQUFRLElBQUcsU0FBVSxFQUFyRCxDQUFMLENBQ04sSUFETSxDQUNELFFBQVEsSUFBSSxRQUFRLENBQUMsSUFBVCxFQURYLENBQVA7QUFFSCxHQUxnQjtBQU9qQixFQUFBLFdBQVcsRUFBRSxNQUFJO0FBQ2IsV0FBTyxLQUFLLENBQUMsNkJBQUQsQ0FBTCxDQUNFLElBREYsQ0FDTyxRQUFRLElBQUksUUFBUSxDQUFDLElBQVQsRUFEbkIsQ0FBUDtBQUlILEdBWmdCO0FBY2pCLEVBQUEsT0FBTyxFQUFFLFVBQUQsSUFBYztBQUVsQixXQUFPLEtBQUssQ0FBQyw2QkFBRCxFQUFnQztBQUN4QyxNQUFBLE1BQU0sRUFBRSxNQURnQztBQUV4QyxNQUFBLE9BQU8sRUFBRTtBQUNMLHdCQUFnQjtBQURYLE9BRitCO0FBS3hDLE1BQUEsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFMLENBQWUsVUFBZjtBQUxrQyxLQUFoQyxDQUFaO0FBT0g7QUF2QmdCLENBQWpCO2VBMkJlLFU7Ozs7Ozs7Ozs7O0FDNUJmOzs7O0FBRkE7QUFDQTtBQUdBLE1BQU0sa0JBQWtCLEdBQUcsTUFBSztBQUM1QixzQkFBWSxlQUFaLEdBRDRCLENBRzVCOzs7QUFDQSxFQUFBLFFBQVEsQ0FBQyxhQUFULENBQXVCLE9BQXZCLEVBQWdDLFNBQWhDLEdBQTZDLG1CQUE3QztBQUdILENBUEQ7O2VBU2Usa0I7Ozs7Ozs7Ozs7QUNiZjtBQUNBO0FBRUEsTUFBTSxXQUFXLEdBQUU7QUFDbkIsRUFBQSxhQUFhLEVBQUUsTUFBSztBQUNoQixXQUFROzs7O3VFQUFSO0FBS0gsR0FQa0I7QUFVbkIsRUFBQSxnQkFBZ0IsRUFBQyxNQUFLO0FBRWxCLFdBQVE7Ozs7Z0ZBQVI7QUFLSCxHQWpCa0I7QUFrQm5CLEVBQUEsY0FBYyxFQUFDLE1BQUk7QUFDZixXQUFRLHVFQUFSO0FBQ0g7QUFwQmtCLENBQW5CO2VBdUJlLFc7Ozs7Ozs7Ozs7O0FDdkJmOztBQUNBOztBQUNBOztBQUNBOzs7O0FBTkE7QUFDQTtBQVNBLE1BQU0sWUFBWSxHQUFHLE1BQU07QUFDdkI7QUFDQSxFQUFBLFFBQVEsQ0FBQyxhQUFULENBQXVCLGFBQXZCLEVBQXNDLGdCQUF0QyxDQUF1RCxPQUF2RCxFQUFnRSxNQUFNO0FBRWxFLFVBQU0sV0FBVyxHQUFHLEtBQUssQ0FBQyxNQUFOLENBQWEsRUFBYixDQUFnQixLQUFoQixDQUFzQixHQUF0QixDQUFwQjs7QUFFQSxRQUFJLEtBQUssQ0FBQyxNQUFOLENBQWEsRUFBYixLQUFvQixXQUF4QixFQUFxQztBQUNqQyxNQUFBLE9BQU8sQ0FBQyxHQUFSLENBQVksK0JBQVo7QUFDQSxZQUFNLFFBQVEsR0FBRyxRQUFRLENBQUMsYUFBVCxDQUF1QixhQUF2QixFQUFzQyxLQUF2RDtBQUNBLFlBQU0sUUFBUSxHQUFHLFFBQVEsQ0FBQyxhQUFULENBQXVCLGFBQXZCLEVBQXNDLEtBQXZELENBSGlDLENBSWpDOztBQUNBLDBCQUFXLGFBQVgsQ0FBeUIsVUFBekIsRUFBcUMsUUFBckMsRUFDSyxJQURMLENBQ1csVUFBRCxJQUFnQjtBQUNsQixZQUFJLFVBQVUsQ0FBQyxNQUFYLEtBQXNCLENBQTFCLEVBQTZCO0FBQ3pCLFVBQUEsT0FBTyxDQUFDLEdBQVIsQ0FBWSxpQkFBWixFQUErQixRQUEvQixFQUF5QyxjQUF6QyxFQUR5QixDQUV6Qjs7QUFDQSxjQUFJLFVBQVUsQ0FBQyxDQUFELENBQVYsQ0FBYyxRQUFkLEtBQTJCLFFBQS9CLEVBQXlDO0FBQ3JDLGdDQUFZLGVBQVo7O0FBQ0EsWUFBQSxjQUFjLENBQUMsT0FBZixDQUF1QixZQUF2QixFQUFxQyxVQUFVLENBQUMsQ0FBRCxDQUFWLENBQWMsRUFBbkQsRUFGcUMsQ0FJckM7O0FBQ0E7QUFFSCxXQVBELE1BUUs7QUFDRCxZQUFBLE1BQU0sQ0FBQyxLQUFQLENBQWEsNEJBQWI7QUFDSDtBQUNKLFNBZEQsTUFlSztBQUNELFVBQUEsTUFBTSxDQUFDLEtBQVAsQ0FBYSw4Q0FBYjtBQUNIO0FBQ0osT0FwQkw7QUFxQkgsS0E5QmlFLENBZ0NsRTs7O0FBQ0EsUUFBSSxLQUFLLENBQUMsTUFBTixDQUFhLEVBQWIsS0FBb0IsU0FBeEIsRUFBbUM7QUFDL0IsTUFBQSxPQUFPLENBQUMsR0FBUixDQUFZLGlDQUFaOztBQUNBLDBCQUFZLGlCQUFaO0FBRUgsS0FyQ2lFLENBc0NsRTs7O0FBQ0EsUUFBSSxLQUFLLENBQUMsTUFBTixDQUFhLEVBQWIsS0FBb0IsZ0JBQXhCLEVBQTBDO0FBQ3RDLE1BQUEsT0FBTyxDQUFDLEdBQVIsQ0FBWSwrQkFBWixFQURzQyxDQUV0Qzs7QUFDQSxZQUFNLFFBQVEsR0FBRyxRQUFRLENBQUMsYUFBVCxDQUF1QixXQUF2QixFQUFvQyxLQUFyRDs7QUFDQSwwQkFBVyxhQUFYLENBQXlCLFVBQXpCLEVBQXFDLFFBQXJDLEVBQ0ssSUFETCxDQUNXLFVBQUQsSUFBZ0I7QUFDbEI7QUFDQSxZQUFJLFVBQVUsQ0FBQyxNQUFYLEtBQXNCLENBQTFCLEVBQTZCO0FBQ3pCLFVBQUEsT0FBTyxDQUFDLEdBQVIsQ0FBWSxpQkFBWixFQUErQixRQUEvQixFQUF5QyxjQUF6QztBQUVBLGdCQUFNLFFBQVEsR0FBRyxRQUFRLENBQUMsYUFBVCxDQUF1QixXQUF2QixFQUFvQyxLQUFyRDtBQUNBLGdCQUFNLEtBQUssR0FBRyxRQUFRLENBQUMsYUFBVCxDQUF1QixZQUF2QixFQUFxQyxLQUFuRDtBQUVBLGdCQUFNLFVBQVUsR0FBRyw0QkFBZ0IsUUFBaEIsRUFBMEIsUUFBMUIsRUFBb0MsS0FBcEMsQ0FBbkI7QUFDQSxVQUFBLE9BQU8sQ0FBQyxHQUFSLENBQVksd0JBQVosRUFBc0MsVUFBdEM7O0FBQ0EsOEJBQVcsT0FBWCxDQUFtQixVQUFuQjs7QUFDQSw4QkFBWSxrQkFBWixHQVR5QixDQVV6Qjs7O0FBQ0E7QUFFSCxTQWJELE1BY0s7QUFDRDtBQUNBLFVBQUEsTUFBTSxDQUFDLEtBQVAsQ0FBYSw4QkFBYjtBQUNIO0FBQ0osT0FyQkw7QUFzQkg7QUFDSixHQWxFRCxFQUZ1QixDQXFFdkI7O0FBQ0EsRUFBQSxRQUFRLENBQUMsYUFBVCxDQUF1QixTQUF2QixFQUFrQyxnQkFBbEMsQ0FBbUQsT0FBbkQsRUFBNEQsTUFBTTtBQUM5RCxRQUFJLEtBQUssQ0FBQyxNQUFOLENBQWEsRUFBYixLQUFvQixZQUF4QixFQUFzQztBQUVsQyxNQUFBLGNBQWMsQ0FBQyxVQUFmLENBQTBCLFlBQTFCLEVBRmtDLENBR2xDOztBQUNBLDBCQUFZLGdCQUFaOztBQUNBLE1BQUEsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsT0FBdkIsRUFBZ0MsU0FBaEMsR0FBNEMsRUFBNUM7O0FBQ0EsMEJBQVksY0FBWjtBQUNIO0FBQ0osR0FURDtBQWFILENBbkZEOztlQXFGZSxZOzs7Ozs7Ozs7OztBQy9GZjtBQUNBO0FBRUEsTUFBTSxlQUFlLEdBQUcsQ0FBQyxRQUFELEVBQVcsUUFBWCxFQUFxQixLQUFyQixLQUErQjtBQUVuRCxRQUFNLFVBQVUsR0FBRztBQUNmLGdCQUFZLFFBREc7QUFFZixnQkFBWSxRQUZHO0FBR2YsYUFBUztBQUhNLEdBQW5CO0FBS0EsU0FBTyxVQUFQO0FBQ0gsQ0FSRDs7ZUFVZSxlOzs7Ozs7Ozs7OztBQ1RmOzs7O0FBSkE7QUFDQTtBQUNBO0FBSUEsTUFBTSxXQUFXLEdBQUc7QUFFaEIsRUFBQSxjQUFjLEVBQUUsTUFBTTtBQUNsQixJQUFBLFFBQVEsQ0FBQyxhQUFULENBQXVCLGFBQXZCLEVBQXNDLFNBQXRDLEdBQWtELHFCQUFZLGFBQVosRUFBbEQ7QUFDSCxHQUplO0FBTWhCLEVBQUEsZUFBZSxFQUFFLE1BQU07QUFDbkIsSUFBQSxRQUFRLENBQUMsYUFBVCxDQUF1QixhQUF2QixFQUFzQyxTQUF0QyxHQUFrRCxFQUFsRDtBQUNILEdBUmU7QUFVaEIsRUFBQSxpQkFBaUIsRUFBRSxNQUFNO0FBQ3JCLElBQUEsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsYUFBdkIsRUFBc0MsU0FBdEMsR0FBa0QscUJBQVksZ0JBQVosRUFBbEQ7QUFDSCxHQVplO0FBY2hCLEVBQUEsa0JBQWtCLEVBQUUsTUFBTTtBQUN0QixJQUFBLFFBQVEsQ0FBQyxhQUFULENBQXVCLGFBQXZCLEVBQXNDLFNBQXRDLEdBQWtELEVBQWxEO0FBQ0gsR0FoQmU7QUFrQmhCLEVBQUEsZUFBZSxFQUFDLE1BQUk7QUFDaEIsSUFBQSxRQUFRLENBQUMsYUFBVCxDQUF1QixTQUF2QixFQUFrQyxTQUFsQyxHQUE0QyxxQkFBWSxjQUFaLEVBQTVDO0FBQ0gsR0FwQmU7QUFzQmhCLEVBQUEsZ0JBQWdCLEVBQUMsTUFBSTtBQUNqQixJQUFBLFFBQVEsQ0FBQyxhQUFULENBQXVCLFNBQXZCLEVBQWtDLFNBQWxDLEdBQTRDLEVBQTVDO0FBQ0g7QUF4QmUsQ0FBcEI7ZUEyQmUsVzs7Ozs7O0FDakNmOztBQUNBOzs7O0FBRUEsb0JBQVksY0FBWjs7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsIi8vVGhpcyBtb2R1bGUgYWxsb3dzIGZvciBmZXRjaCBhbmQgcG9zdCBjYWxscyB0byB0aGUgdXNlciBkYXRhYmFzZVxyXG4vL2J1aWx0IGJ5IFN5ZG5leSBXYWl0XHJcblxyXG5jb25zdCBBUElNYW5hZ2VyPXtcclxuZ2V0U2luZ2xlVXNlcjogKHVzZXJLZXksIHVzZXJWYWx1ZSk9PntcclxuXHJcbiAgICByZXR1cm4gZmV0Y2goYGh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC91c2Vycz8ke3VzZXJLZXl9PSR7dXNlclZhbHVlfWApXHJcbiAgICAudGhlbihjb250YWN0cyA9PiBjb250YWN0cy5qc29uKCkpXHJcbn0sXHJcblxyXG5nZXRBbGxVc2VyczogKCk9PntcclxuICAgIHJldHVybiBmZXRjaChcImh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC91c2Vyc1wiKVxyXG4gICAgICAgICAgICAudGhlbihjb250YWN0cyA9PiBjb250YWN0cy5qc29uKCkpXHJcblxyXG5cclxufSxcclxuXHJcbmFkZFVzZXI6KHVzZXJPYmplY3QpPT57XHJcblxyXG4gICAgcmV0dXJuIGZldGNoKFwiaHR0cDovL2xvY2FsaG9zdDo4MDg4L3VzZXJzXCIsIHtcclxuICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxyXG4gICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCJcclxuICAgICAgICB9LFxyXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHVzZXJPYmplY3QpXHJcbiAgICB9KVxyXG59XHJcblxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBBUElNYW5hZ2VyOyIsIi8vVGhpcyBmdW5jdGlvbiBpbXBvcnRzIGFsbCB0aGUgZXZlbnQgbGlzdGVuZXJzIGFuZCBwYWdlIGxvYWRzIGZyb20gdGhlIGluZGl2aWR1YWwgbW9kdWxlc1xyXG4vL25ld3MsIGV2ZW50cywgdGFza3MsIGNoYXRzLCBhbmQgZnJpZW5kc1xyXG5pbXBvcnQgZm9ybVByaW50ZXIgZnJvbSBcIi4vcHJpbnRUb0RvbS5qc1wiXHJcblxyXG5jb25zdCBkYXNoYm9hcmRBY3RpdmF0b3IgPSAoKT0+IHtcclxuICAgIGZvcm1QcmludGVyLnByaW50TG9nb3V0Rm9ybSgpXHJcblxyXG4gICAgLy9UaGlzIGlzIGp1c3QgYSBwbGFjZWhvbGRlciB1bnRpbCB3ZSBnZXQgYWxsIHRoZSBvdGhlciBwaWVjZXNcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjYm9keVwiKS5pbm5lckhUTUwgPSBgeW91IGFyZSBsb2dnZWQgaW5gXHJcblxyXG5cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgZGFzaGJvYXJkQWN0aXZhdG9yO1xyXG4iLCIvL21vZHVsZSB0byBidWlsZCB0aGUgbG9naW4gYW5kIHJlZ2lzdHJhdGlvbiBmb3Jtc1xyXG4vLyBidWlsdCBieSBTeWRuZXkgV2FpdFxyXG5cclxuY29uc3QgZm9ybUJ1aWxkZXIgPXtcclxubWFrZUxvZ2luRm9ybTogKCkgPT57XHJcbiAgICByZXR1cm4gYDxoMT5XZWxjb21lIHRvIE51dHNoZWxsITwvaDE+XHJcbiAgICA8aW5wdXQgY2xhc3M9XCJpbnB1dCBsb2dpbi1pbnB1dFwiIHR5cGU9XCJ0ZXh0XCIgbmFtZT1cInVzZXJOYW1lXCIgaWQ9XCJsb2dpbi1uYW1lXCIgcGxhY2Vob2xkZXI9XCJVc2VybmFtZVwiPjxicj5cclxuICAgIDxpbnB1dCBjbGFzcz1cImlucHV0IGxvZ2luLWlucHV0XCIgdHlwZT1cInBhc3N3b3JkXCIgbmFtZT1cInBhc3N3b3JkXCIgaWQ9XCJsb2dpbi1wYXNzXCIgcGxhY2Vob2xkZXI9XCJQYXNzd29yZFwiPjxicj5cclxuICAgIDxidXR0b24gdHlwZT1cInN1Ym1pdFwiIGNsYXNzID0gXCJidG5cIiBpZD1cImxvZ2luLWJ0blwiPmxvZ2luPC9idXR0b24+XHJcbiAgICA8YnV0dG9uIHR5cGU9XCJzdWJtaXRcIiBjbGFzcyA9IFwiYnRuXCIgaWQ9XCJyZWctYnRuXCI+cmVnaXN0ZXI8L2J1dHRvbj5gXHJcbn0sXHJcblxyXG5cclxubWFrZVJlZ2lzdGVyRm9ybTooKT0+IHtcclxuXHJcbiAgICByZXR1cm4gYDxoMT5QbGVhc2UgUmVnaXN0ZXI6PC9oMT5cclxuICAgIDxpbnB1dCBjbGFzcz1cInJlZ2lzdGVyLWlucHV0XCIgdHlwZT1cInRleHRcIiBuYW1lPVwiZW1haWxcIiBpZD1cInJlZy1lbWFpbFwiIHBsYWNlaG9sZGVyPVwiRW1haWwgQWRkcmVzc1wiPjxicj5cclxuICAgIDxpbnB1dCBjbGFzcz1cInJlZ2lzdGVyLWlucHV0XCIgdHlwZT1cInRleHRcIiBuYW1lPVwidXNlck5hbWVcIiBpZD1cInJlZy1uYW1lXCIgcGxhY2Vob2xkZXI9XCJVc2VybmFtZVwiPjxicj5cclxuICAgIDxpbnB1dCBjbGFzcz1cInJlZ2lzdGVyLWlucHV0XCIgdHlwZT1cInBhc3N3b3JkXCIgbmFtZT1cInBhc3N3b3JkXCIgaWQ9XCJyZWctcGFzc1wiIHBsYWNlaG9sZGVyPVwiUGFzc3dvcmRcIj48YnI+XHJcbiAgICA8YnV0dG9uIHR5cGU9XCJyZWdpc3RlclwiIGNsYXNzID0gXCJidG5cIiBpZD1cInN1Ym1pdC1yZWctYnRuXCI+cmVnaXN0ZXI8L2J1dHRvbj5gXHJcbn0sXHJcbm1ha2VMb2dvdXRGb3JtOigpPT57XHJcbiAgICByZXR1cm4gYDxidXR0b24gdHlwZT1cInJlZ2lzdGVyXCIgY2xhc3MgPSBcImJ0blwiIGlkPVwibG9nb3V0LWJ0blwiPmxvZ291dDwvYnV0dG9uPmBcclxufVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmb3JtQnVpbGRlcjsiLCIvL1RoaXMgbW9kdWxlIGhhbmRsZXMgdGhlIGxvZ2luIGFuZCByZWdpc3RyYXRpb24gZnVuY3Rpb25hbGl0eSBvZiB0aGUgQVBQXHJcbi8vIEJ1aWx0IGJ5IFN5ZG5leSBXYWl0XHJcblxyXG5pbXBvcnQgZm9ybVByaW50ZXIgZnJvbSBcIi4vcHJpbnRUb0RvbS5qc1wiXHJcbmltcG9ydCBidWlsZFVzZXJPYmplY3QgZnJvbSBcIi4vb2JqZWN0QnVpbGRlci5qc1wiXHJcbmltcG9ydCBBUElNYW5hZ2VyIGZyb20gXCIuL0FQSU1hbmFnZXIuanNcIlxyXG5pbXBvcnQgZGFzaGJvYXJkQWN0aXZhdG9yIGZyb20gXCIuL2Rhc2hib2FyZEFjdGl2YXRvci5qc1wiO1xyXG5cclxuXHJcblxyXG5jb25zdCBsb2dpbk1hbmFnZXIgPSAoKSA9PiB7XHJcbiAgICAvL0VWRU5UIExJU1RFTkVSIE9OIFRIRSBMT0dJTiBDT05UQUlORVIgVE8gSEFORExFIEFMTCBPRiBMT0dJTiBBTkQgUkVHSVNUUkFUSU9OIEZFQVRVUkVTXHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2xvZ2luLWNvbnRcIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcclxuXHJcbiAgICAgICAgY29uc3QgZXZlbnRUYXJnZXQgPSBldmVudC50YXJnZXQuaWQuc3BsaXQoXCItXCIpXHJcblxyXG4gICAgICAgIGlmIChldmVudC50YXJnZXQuaWQgPT09IFwibG9naW4tYnRuXCIpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJZb3UgY2xpY2tlZCB0aGUgbG9naW4gYnV0dG9uIVwiKVxyXG4gICAgICAgICAgICBjb25zdCB1c2VyTmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbG9naW4tbmFtZVwiKS52YWx1ZVxyXG4gICAgICAgICAgICBjb25zdCBwYXNzd29yZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbG9naW4tcGFzc1wiKS52YWx1ZVxyXG4gICAgICAgICAgICAvL2NoZWNrIGlmIHVzZXJuYW1lIGlzIGluIHRoZSBkYXRhYmFzZVxyXG4gICAgICAgICAgICBBUElNYW5hZ2VyLmdldFNpbmdsZVVzZXIoXCJ1c2VybmFtZVwiLCB1c2VyTmFtZSlcclxuICAgICAgICAgICAgICAgIC50aGVuKChzaW5nbGVVc2VyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNpbmdsZVVzZXIubGVuZ3RoID09PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiVGhlIHVzZXJuYW1lIG9mXCIsIHVzZXJOYW1lLCBcIndhcyB2ZXJpZmllZFwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2NoZWNrIGlmIHBhc3N3b3JkIG1hdGNoZXNcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNpbmdsZVVzZXJbMF0ucGFzc3dvcmQgPT09IHBhc3N3b3JkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3JtUHJpbnRlci5yZW1vdmVMb2dpbkZvcm0oKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShcImFjdGl2ZVVzZXJcIiwgc2luZ2xlVXNlclswXS5pZClcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3RoaXMgYWN0aXZhdGVzIHRoZSBkYXNoYm9hcmRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhc2hib2FyZEFjdGl2YXRvcigpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93LmFsZXJ0KFwiVGhlIHBhc3N3b3JkIGlzIGluY29ycmVjdCFcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93LmFsZXJ0KFwidGhhdCB1c2VybmFtZSBkb2VzIG5vdCBleGlzdCBpbiB0aGUgZGF0YWJhc2VcIilcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9JZiB1c2VyIGNsaWNrcyB0aGUgcmVnaXN0ZXIgYnV0dG9uLCBsb2FkIHRoZSByZWdpc3RyYXRpb24gZm9ybVxyXG4gICAgICAgIGlmIChldmVudC50YXJnZXQuaWQgPT09IFwicmVnLWJ0blwiKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwieW91IGNsaWNrZWQgdGhlIHJlZ2lzdGVyIGJ1dHRvblwiKVxyXG4gICAgICAgICAgICBmb3JtUHJpbnRlci5wcmludFJlZ2lzdGVyRm9ybSgpXHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICAvL2lmIHVzZXIgY2xpY2tzIHRoZSBzdWJtaXQgYnV0dG9uLCByZWdpc3RyYXRpb24gd2lsbCBiZSBwb3N0ZWQgdG8gZGF0YWJhc2VcclxuICAgICAgICBpZiAoZXZlbnQudGFyZ2V0LmlkID09PSBcInN1Ym1pdC1yZWctYnRuXCIpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJ5b3UgY2xpY2tlZCB0aGUgc3VibWl0IGJ1dHRvblwiKVxyXG4gICAgICAgICAgICAvL2ZpcnN0IGNoZWNrIGlmIHVzZXJuYW1lIGlzIGFscmVhZHkgaW4gdGhlIGRhdGFiYXNlLlxyXG4gICAgICAgICAgICBjb25zdCB1c2VyTmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcmVnLW5hbWVcIikudmFsdWVcclxuICAgICAgICAgICAgQVBJTWFuYWdlci5nZXRTaW5nbGVVc2VyKFwidXNlcm5hbWVcIiwgdXNlck5hbWUpXHJcbiAgICAgICAgICAgICAgICAudGhlbigoc2luZ2xlVXNlcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vdXNlcm5hbWUgbm90IGluIGRhdGFiYXNlLCBwcm9jZWVkXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNpbmdsZVVzZXIubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiVGhlIHVzZXJuYW1lIG9mXCIsIHVzZXJOYW1lLCBcIndhcyB2ZXJpZmllZFwiKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcGFzc3dvcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3JlZy1wYXNzXCIpLnZhbHVlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGVtYWlsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNyZWctZW1haWxcIikudmFsdWVcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHVzZXJPYmplY3QgPSBidWlsZFVzZXJPYmplY3QodXNlck5hbWUsIHBhc3N3b3JkLCBlbWFpbClcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJ0aGlzIGlzIHRoZSB1c2VyT2JqZWN0XCIsIHVzZXJPYmplY3QpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEFQSU1hbmFnZXIuYWRkVXNlcih1c2VyT2JqZWN0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9ybVByaW50ZXIucmVtb3ZlUmVnaXN0ZXJGb3JtKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy90aGlzIGFjdGl2YXRlcyB0aGUgZGFzaGJvYXJkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhc2hib2FyZEFjdGl2YXRvcigpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy91c2VybmFtZSBpcyBhbHJlYWR5IGluIGRhdGFiYXNlLCBkbyBub3QgcHJvY2VlZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cuYWxlcnQoXCJ0aGF0IHVzZXJuYW1lIGFscmVhZHkgZXhpc3RzXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICB9KVxyXG4gICAgLy8gRVZFTlQgTElTVEVORVIgRk9SIFRIRSBMT0dPVVQgT1BFUkFUSU9OXHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2hlYWRlclwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG4gICAgICAgIGlmIChldmVudC50YXJnZXQuaWQgPT09IFwibG9nb3V0LWJ0blwiKSB7XHJcblxyXG4gICAgICAgICAgICBzZXNzaW9uU3RvcmFnZS5yZW1vdmVJdGVtKFwiYWN0aXZlVXNlclwiKVxyXG4gICAgICAgICAgICAvL3RoaXMgaXMganVzdCBhIHBsYWNlaG9sZGVyIHVudGlsIHdlIGhhdmUgdGhlIGRhc2hib2FyZCAvL1xyXG4gICAgICAgICAgICBmb3JtUHJpbnRlci5yZW1vdmVMb2dvdXRGb3JtKClcclxuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNib2R5XCIpLmlubmVySFRNTCA9IFwiXCJcclxuICAgICAgICAgICAgZm9ybVByaW50ZXIucHJpbnRMb2dpbkZvcm0oKVxyXG4gICAgICAgIH1cclxuICAgIH0pXHJcblxyXG5cclxuXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGxvZ2luTWFuYWdlcjtcclxuIiwiLy8gTW9kdWxlIHRvIGJ1aWxkIGFuIG9iamVjdCB1c2luZyBpbnB1dHMgZnJvbSB0aGUgcmVnaXN0cmF0aW9uIGZpZWxkXHJcbi8vQnVpbHQgYnkgU3lkbmV5IFdhaXRcclxuXHJcbmNvbnN0IGJ1aWxkVXNlck9iamVjdCA9ICh1c2VyTmFtZSwgcGFzc3dvcmQsIGVtYWlsKSA9PiB7XHJcblxyXG4gICAgY29uc3QgdXNlck9iamVjdCA9IHtcclxuICAgICAgICBcInVzZXJuYW1lXCI6IHVzZXJOYW1lLFxyXG4gICAgICAgIFwicGFzc3dvcmRcIjogcGFzc3dvcmQsXHJcbiAgICAgICAgXCJlbWFpbFwiOiBlbWFpbFxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHVzZXJPYmplY3Q7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGJ1aWxkVXNlck9iamVjdDsiLCIvLyBNb2R1bGUgdG8gcHJpbnQgdGhlIGxvZ2luIGFuZCByZWdpc3RyYXRpb24gZm9ybXMgdG8gdGhlIERPTVxyXG4vLyBhbHNvIGhhcyBmdW5jdGlvbmFsaXR5IHRvIGNsZWFyIHRoZSBmb3JtcyBmcm9tIHRoZSBET01cclxuLy8gQnVpbHQgYnkgU3lkbmV5IFdhaXRcclxuXHJcbmltcG9ydCBmb3JtQnVpbGRlciBmcm9tIFwiLi9mb3JtQnVpbGRlci5qc1wiXHJcblxyXG5jb25zdCBmb3JtUHJpbnRlciA9IHtcclxuXHJcbiAgICBwcmludExvZ2luRm9ybTogKCkgPT4ge1xyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbG9naW4tY29udFwiKS5pbm5lckhUTUwgPSBmb3JtQnVpbGRlci5tYWtlTG9naW5Gb3JtKClcclxuICAgIH0sXHJcblxyXG4gICAgcmVtb3ZlTG9naW5Gb3JtOiAoKSA9PiB7XHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNsb2dpbi1jb250XCIpLmlubmVySFRNTCA9IFwiXCJcclxuICAgIH0sXHJcblxyXG4gICAgcHJpbnRSZWdpc3RlckZvcm06ICgpID0+IHtcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2xvZ2luLWNvbnRcIikuaW5uZXJIVE1MID0gZm9ybUJ1aWxkZXIubWFrZVJlZ2lzdGVyRm9ybSgpXHJcbiAgICB9LFxyXG5cclxuICAgIHJlbW92ZVJlZ2lzdGVyRm9ybTogKCkgPT4ge1xyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbG9naW4tY29udFwiKS5pbm5lckhUTUwgPSBcIlwiXHJcbiAgICB9LFxyXG5cclxuICAgIHByaW50TG9nb3V0Rm9ybTooKT0+e1xyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjaGVhZGVyXCIpLmlubmVySFRNTD1mb3JtQnVpbGRlci5tYWtlTG9nb3V0Rm9ybSgpXHJcbiAgICB9LFxyXG5cclxuICAgIHJlbW92ZUxvZ291dEZvcm06KCk9PntcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2hlYWRlclwiKS5pbm5lckhUTUw9XCJcIlxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmb3JtUHJpbnRlclxyXG4iLCJpbXBvcnQgZm9ybVByaW50ZXIgZnJvbSBcIi4uL2xvZ2luL3ByaW50VG9Eb20uanNcIlxyXG5pbXBvcnQgbG9naW5NYW5hZ2VyIGZyb20gXCIuLi9sb2dpbi9sb2dpbk1hbmFnZXIuanNcIlxyXG5cclxuZm9ybVByaW50ZXIucHJpbnRMb2dpbkZvcm0oKTtcclxubG9naW5NYW5hZ2VyKCk7XHJcbiJdfQ==
