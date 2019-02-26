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

var _tasksManager = _interopRequireDefault(require("../scripts/Tasks/tasksManager"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//This function imports all the event listeners and page loads from the individual modules
//news, events, tasks, chats, and friends
const dashboardActivator = () => {
  _printToDom.default.printLogoutForm(); //this prints the tasks section after login - MT


  _tasksManager.default.afterLogin(sessionStorage.getItem("activeUser")); //This is just a placeholder until we get all the other pieces


  document.querySelector("#body").innerHTML = `you are logged in`;
};

var _default = dashboardActivator;
exports.default = _default;

},{"../scripts/Tasks/tasksManager":13,"./printToDom.js":6}],3:[function(require,module,exports){
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

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
//Michelle Tabor - This module will house API calls that are for the tasks element
//fetch calls
const api = {
  //Get all tasks
  all: userId => {
    return fetch(`http://localhost:8088/tasks?userId=${userId}&complete=false`).then(r => r.json());
  },
  //POST new task
  new: taskObject => {
    return fetch("http://localhost:8088/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(taskObject)
    }).then(r => r.json());
  } //PUT new edited task
  //PATCH completed task

};
var _default = api;
exports.default = _default;

},{}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _taskPrintToDOM = _interopRequireDefault(require("./taskPrintToDOM"));

var _tasksSaveButton = _interopRequireDefault(require("./tasksSaveButton"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const listen = {
  activateNewTask: userId => {
    document.querySelector("#tasks-foot").addEventListener("click", e => {
      if (e.target.classList.contains("new")) {
        console.log(e);

        _taskPrintToDOM.default.newTaskForm();

        _taskPrintToDOM.default.saveButton(userId);

        _tasksSaveButton.default;
      }
    });
  }
};
var _default = listen;
exports.default = _default;

},{"./taskPrintToDOM":10,"./tasksSaveButton":14}],9:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
//Michelle Tabor - This module builds objects that will be posted to the database
//imports
const object = {
  //use for new and edited tasks
  taskObject: (task, dueDate) => {
    return `{
        userId: ${sessionStorage.getItem("activeUser")},
        task: ${task},
        "dueDate": ${dueDate},
        "complete": false  
    }`;
  },
  //part of a task
  completeTaskObject: tf => {
    return `{complete: ${tf}}`;
  }
};
var _default = object;
exports.default = _default;

},{}],10:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tasksFormBuilder = _interopRequireDefault(require("./tasksFormBuilder"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//Michelle Tabor - This module houses functions that will print items to the DOM
//imports
//print function object
const print = {
  //button for new task
  button: userId => {
    document.querySelector("#tasks-foot").innerHTML = `<button type="button" class="new" id="tasks-new-btn-${userId}">Add New Task</button>`;
  },
  //print form
  newTaskForm: () => {
    document.querySelector("#tasks-cont").innerHTML = _tasksFormBuilder.default.newTaskForm();
  },
  //print edit form
  editForm: () => {
    document.querySelector("#tasks-cont").innerHTML = _tasksFormBuilder.default.editForm();
  },
  saveButton: () => {
    document.querySelector("#tasks-foot").innerHTML = _tasksFormBuilder.default.saveButton();
  },
  taskbox: () => {
    document.querySelector("#task-container").innerHTML = `<div id="task-head">TASKS</div>
      <div id="tasks-cont"></div>
      <div id="tasks-foot"></div>`;
  }
};
var _default = print;
exports.default = _default;

},{"./tasksFormBuilder":12}],11:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _taskAPIManager = _interopRequireDefault(require("./taskAPIManager"));

var _tasksSingleComponentBuilder = _interopRequireDefault(require("./tasksSingleComponentBuilder"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//Michelle Tabor - This module builds the entire component HTML String
//imports
//builds task list and prints it to the DOM
const build = {
  tasksList: userId => {
    document.querySelector("#tasks-cont").innerHTML = "";

    _taskAPIManager.default.all(userId).then(tasks => {
      tasks.forEach(singleTask => {
        if (tasks.complete !== true) {
          console.log(singleTask);
          document.querySelector("#tasks-cont").innerHTML += (0, _tasksSingleComponentBuilder.default)(singleTask);
        } else {
          document.querySelector("#tasks-cont").innerHTML = `<p class="error">All Caught Up!</p>`;
        }

        ;
      });
    });
  }
};
var _default = build;
exports.default = _default;

},{"./taskAPIManager":7,"./tasksSingleComponentBuilder":15}],12:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
//Michelle Tabor - This component builds HTML strings for the forms
const forms = {
  //new task form
  newTaskForm: () => {
    return `<h3>Add New Task</h3>
<input type="textarea" name="task" id="task-name-input" placeholder="Task"></input>
<input type="date" name="dueDate" id="task-date-input"></input>`;
  },
  //edit task form
  editTaskForm: () => {},
  saveButton: userId => {
    return `<button type="button" class="save" id="save-tasks-btn${userId}">Save</button>`;
  }
};
var _default = forms;
exports.default = _default;

},{}],13:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _taskPrintToDOM = _interopRequireDefault(require("./taskPrintToDOM"));

var _tasksboxAfterBuild = _interopRequireDefault(require("./tasksboxAfterBuild"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//Michelle Tabor - This Module is the sub-main module that houses the event listeners for the Tasks Element
//imports
//tasks manager main function
const tasks = {
  //after login
  afterLogin: userId => {
    if (sessionStorage.length > 0) {
      _taskPrintToDOM.default.taskbox();

      (0, _tasksboxAfterBuild.default)(userId);
    }
  },
  //add new task button
  //edit task
  //completed task
  completed: () => {} //save edited task

};
var _default = tasks;
exports.default = _default;

},{"./taskPrintToDOM":10,"./tasksboxAfterBuild":16}],14:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _taskAPIManager = _interopRequireDefault(require("./taskAPIManager"));

var _taskObjectBuilder = _interopRequireDefault(require("./taskObjectBuilder"));

var _tasksManager = _interopRequireDefault(require("./tasksManager"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const activateSaveButton = () => {
  document.querySelector("#tasks-foot").addEventListener("click", e => {
    if (e.target.classList.contains("save")) {
      _taskAPIManager.default.new(_taskObjectBuilder.default.taskObject(document.querySelector("#task-name-input").value, document.querySelector("#task-date-input").value)).then(() => {
        _tasksManager.default.afterLogin(sessionStorage.getItem("activeUser"));
      });
    }
  });
};

var _default = activateSaveButton;
exports.default = _default;

},{"./taskAPIManager":7,"./taskObjectBuilder":9,"./tasksManager":13}],15:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

//Michelle Tabor - This module builds a single html string
//build single task
const buildSingleTask = task => {
  return `<input type="checkbox" id="task-check"><strong>${task.dueDate}</strong> - ${task.task}</input><br />`;
};

var _default = buildSingleTask;
exports.default = _default;

},{}],16:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tasksContentBuilder = _interopRequireDefault(require("./tasksContentBuilder"));

var _taskPrintToDOM = _interopRequireDefault(require("./taskPrintToDOM"));

var _taskListeners = _interopRequireDefault(require("./taskListeners"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const afterBuild = userId => {
  _tasksContentBuilder.default.tasksList(userId);

  _taskPrintToDOM.default.button(userId);

  _taskListeners.default.activateNewTask(userId);
};

var _default = afterBuild;
exports.default = _default;

},{"./taskListeners":8,"./taskPrintToDOM":10,"./tasksContentBuilder":11}],17:[function(require,module,exports){
"use strict";

var _printToDom = _interopRequireDefault(require("../login/printToDom.js"));

var _loginManager = _interopRequireDefault(require("../login/loginManager.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_printToDom.default.printLoginForm();

(0, _loginManager.default)();

},{"../login/loginManager.js":4,"../login/printToDom.js":6}]},{},[17])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9sb2dpbi9BUElNYW5hZ2VyLmpzIiwiLi4vbG9naW4vZGFzaGJvYXJkQWN0aXZhdG9yLmpzIiwiLi4vbG9naW4vZm9ybUJ1aWxkZXIuanMiLCIuLi9sb2dpbi9sb2dpbk1hbmFnZXIuanMiLCIuLi9sb2dpbi9vYmplY3RCdWlsZGVyLmpzIiwiLi4vbG9naW4vcHJpbnRUb0RvbS5qcyIsIi4uL3NjcmlwdHMvVGFza3MvdGFza0FQSU1hbmFnZXIuanMiLCIuLi9zY3JpcHRzL1Rhc2tzL3Rhc2tMaXN0ZW5lcnMuanMiLCIuLi9zY3JpcHRzL1Rhc2tzL3Rhc2tPYmplY3RCdWlsZGVyLmpzIiwiLi4vc2NyaXB0cy9UYXNrcy90YXNrUHJpbnRUb0RPTS5qcyIsIi4uL3NjcmlwdHMvVGFza3MvdGFza3NDb250ZW50QnVpbGRlci5qcyIsIi4uL3NjcmlwdHMvVGFza3MvdGFza3NGb3JtQnVpbGRlci5qcyIsIi4uL3NjcmlwdHMvVGFza3MvdGFza3NNYW5hZ2VyLmpzIiwiLi4vc2NyaXB0cy9UYXNrcy90YXNrc1NhdmVCdXR0b24uanMiLCIuLi9zY3JpcHRzL1Rhc2tzL3Rhc2tzU2luZ2xlQ29tcG9uZW50QnVpbGRlci5qcyIsIi4uL3NjcmlwdHMvVGFza3MvdGFza3Nib3hBZnRlckJ1aWxkLmpzIiwiLi4vc2NyaXB0cy9tYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7O0FDQUE7QUFDQTtBQUVBLE1BQU0sVUFBVSxHQUFDO0FBQ2pCLEVBQUEsYUFBYSxFQUFFLENBQUMsT0FBRCxFQUFVLFNBQVYsS0FBc0I7QUFFakMsV0FBTyxLQUFLLENBQUUsK0JBQThCLE9BQVEsSUFBRyxTQUFVLEVBQXJELENBQUwsQ0FDTixJQURNLENBQ0QsUUFBUSxJQUFJLFFBQVEsQ0FBQyxJQUFULEVBRFgsQ0FBUDtBQUVILEdBTGdCO0FBT2pCLEVBQUEsV0FBVyxFQUFFLE1BQUk7QUFD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QU4sQ0FBYSxNQUFiOztBQUNBLHlCQUFPLGVBQVAsQ0FBdUIsTUFBdkI7QUFDSCxDQUpEOztlQU1lLFU7Ozs7OztBQ1ZmOztBQUNBOzs7O0FBRUEsb0JBQVksY0FBWjs7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsIi8vVGhpcyBtb2R1bGUgYWxsb3dzIGZvciBmZXRjaCBhbmQgcG9zdCBjYWxscyB0byB0aGUgdXNlciBkYXRhYmFzZVxyXG4vL2J1aWx0IGJ5IFN5ZG5leSBXYWl0XHJcblxyXG5jb25zdCBBUElNYW5hZ2VyPXtcclxuZ2V0U2luZ2xlVXNlcjogKHVzZXJLZXksIHVzZXJWYWx1ZSk9PntcclxuXHJcbiAgICByZXR1cm4gZmV0Y2goYGh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC91c2Vycz8ke3VzZXJLZXl9PSR7dXNlclZhbHVlfWApXHJcbiAgICAudGhlbihjb250YWN0cyA9PiBjb250YWN0cy5qc29uKCkpXHJcbn0sXHJcblxyXG5nZXRBbGxVc2VyczogKCk9PntcclxuICAgIHJldHVybiBmZXRjaChcImh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC91c2Vyc1wiKVxyXG4gICAgICAgICAgICAudGhlbihjb250YWN0cyA9PiBjb250YWN0cy5qc29uKCkpXHJcblxyXG5cclxufSxcclxuXHJcbmFkZFVzZXI6KHVzZXJPYmplY3QpPT57XHJcblxyXG4gICAgcmV0dXJuIGZldGNoKFwiaHR0cDovL2xvY2FsaG9zdDo4MDg4L3VzZXJzXCIsIHtcclxuICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxyXG4gICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCJcclxuICAgICAgICB9LFxyXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHVzZXJPYmplY3QpXHJcbiAgICB9KVxyXG59XHJcblxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBBUElNYW5hZ2VyOyIsIi8vVGhpcyBmdW5jdGlvbiBpbXBvcnRzIGFsbCB0aGUgZXZlbnQgbGlzdGVuZXJzIGFuZCBwYWdlIGxvYWRzIGZyb20gdGhlIGluZGl2aWR1YWwgbW9kdWxlc1xyXG4vL25ld3MsIGV2ZW50cywgdGFza3MsIGNoYXRzLCBhbmQgZnJpZW5kc1xyXG5pbXBvcnQgZm9ybVByaW50ZXIgZnJvbSBcIi4vcHJpbnRUb0RvbS5qc1wiXHJcbmltcG9ydCB0YXNrcyBmcm9tIFwiLi4vc2NyaXB0cy9UYXNrcy90YXNrc01hbmFnZXJcIlxyXG5jb25zdCBkYXNoYm9hcmRBY3RpdmF0b3IgPSAoKSA9PiB7XHJcbiAgICBmb3JtUHJpbnRlci5wcmludExvZ291dEZvcm0oKVxyXG5cclxuICAgIC8vdGhpcyBwcmludHMgdGhlIHRhc2tzIHNlY3Rpb24gYWZ0ZXIgbG9naW4gLSBNVFxyXG4gICAgdGFza3MuYWZ0ZXJMb2dpbihzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKFwiYWN0aXZlVXNlclwiKSk7XHJcblxyXG4gICAgLy9UaGlzIGlzIGp1c3QgYSBwbGFjZWhvbGRlciB1bnRpbCB3ZSBnZXQgYWxsIHRoZSBvdGhlciBwaWVjZXNcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjYm9keVwiKS5pbm5lckhUTUwgPSBgeW91IGFyZSBsb2dnZWQgaW5gXHJcblxyXG5cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgZGFzaGJvYXJkQWN0aXZhdG9yOyIsIi8vbW9kdWxlIHRvIGJ1aWxkIHRoZSBsb2dpbiBhbmQgcmVnaXN0cmF0aW9uIGZvcm1zXHJcbi8vIGJ1aWx0IGJ5IFN5ZG5leSBXYWl0XHJcblxyXG5jb25zdCBmb3JtQnVpbGRlciA9e1xyXG5tYWtlTG9naW5Gb3JtOiAoKSA9PntcclxuICAgIHJldHVybiBgPGgxPldlbGNvbWUgdG8gTnV0c2hlbGwhPC9oMT5cclxuICAgIDxpbnB1dCBjbGFzcz1cImlucHV0IGxvZ2luLWlucHV0XCIgdHlwZT1cInRleHRcIiBuYW1lPVwidXNlck5hbWVcIiBpZD1cImxvZ2luLW5hbWVcIiBwbGFjZWhvbGRlcj1cIlVzZXJuYW1lXCI+PGJyPlxyXG4gICAgPGlucHV0IGNsYXNzPVwiaW5wdXQgbG9naW4taW5wdXRcIiB0eXBlPVwicGFzc3dvcmRcIiBuYW1lPVwicGFzc3dvcmRcIiBpZD1cImxvZ2luLXBhc3NcIiBwbGFjZWhvbGRlcj1cIlBhc3N3b3JkXCI+PGJyPlxyXG4gICAgPGJ1dHRvbiB0eXBlPVwic3VibWl0XCIgY2xhc3MgPSBcImJ0blwiIGlkPVwibG9naW4tYnRuXCI+bG9naW48L2J1dHRvbj5cclxuICAgIDxidXR0b24gdHlwZT1cInN1Ym1pdFwiIGNsYXNzID0gXCJidG5cIiBpZD1cInJlZy1idG5cIj5yZWdpc3RlcjwvYnV0dG9uPmBcclxufSxcclxuXHJcblxyXG5tYWtlUmVnaXN0ZXJGb3JtOigpPT4ge1xyXG5cclxuICAgIHJldHVybiBgPGgxPlBsZWFzZSBSZWdpc3Rlcjo8L2gxPlxyXG4gICAgPGlucHV0IGNsYXNzPVwicmVnaXN0ZXItaW5wdXRcIiB0eXBlPVwidGV4dFwiIG5hbWU9XCJlbWFpbFwiIGlkPVwicmVnLWVtYWlsXCIgcGxhY2Vob2xkZXI9XCJFbWFpbCBBZGRyZXNzXCI+PGJyPlxyXG4gICAgPGlucHV0IGNsYXNzPVwicmVnaXN0ZXItaW5wdXRcIiB0eXBlPVwidGV4dFwiIG5hbWU9XCJ1c2VyTmFtZVwiIGlkPVwicmVnLW5hbWVcIiBwbGFjZWhvbGRlcj1cIlVzZXJuYW1lXCI+PGJyPlxyXG4gICAgPGlucHV0IGNsYXNzPVwicmVnaXN0ZXItaW5wdXRcIiB0eXBlPVwicGFzc3dvcmRcIiBuYW1lPVwicGFzc3dvcmRcIiBpZD1cInJlZy1wYXNzXCIgcGxhY2Vob2xkZXI9XCJQYXNzd29yZFwiPjxicj5cclxuICAgIDxidXR0b24gdHlwZT1cInJlZ2lzdGVyXCIgY2xhc3MgPSBcImJ0blwiIGlkPVwic3VibWl0LXJlZy1idG5cIj5yZWdpc3RlcjwvYnV0dG9uPmBcclxufSxcclxubWFrZUxvZ291dEZvcm06KCk9PntcclxuICAgIHJldHVybiBgPGJ1dHRvbiB0eXBlPVwicmVnaXN0ZXJcIiBjbGFzcyA9IFwiYnRuXCIgaWQ9XCJsb2dvdXQtYnRuXCI+bG9nb3V0PC9idXR0b24+YFxyXG59XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZvcm1CdWlsZGVyOyIsIi8vVGhpcyBtb2R1bGUgaGFuZGxlcyB0aGUgbG9naW4gYW5kIHJlZ2lzdHJhdGlvbiBmdW5jdGlvbmFsaXR5IG9mIHRoZSBBUFBcclxuLy8gQnVpbHQgYnkgU3lkbmV5IFdhaXRcclxuXHJcbmltcG9ydCBmb3JtUHJpbnRlciBmcm9tIFwiLi9wcmludFRvRG9tLmpzXCJcclxuaW1wb3J0IGJ1aWxkVXNlck9iamVjdCBmcm9tIFwiLi9vYmplY3RCdWlsZGVyLmpzXCJcclxuaW1wb3J0IEFQSU1hbmFnZXIgZnJvbSBcIi4vQVBJTWFuYWdlci5qc1wiXHJcbmltcG9ydCBkYXNoYm9hcmRBY3RpdmF0b3IgZnJvbSBcIi4vZGFzaGJvYXJkQWN0aXZhdG9yLmpzXCI7XHJcblxyXG5cclxuXHJcbmNvbnN0IGxvZ2luTWFuYWdlciA9ICgpID0+IHtcclxuICAgIC8vRVZFTlQgTElTVEVORVIgT04gVEhFIExPR0lOIENPTlRBSU5FUiBUTyBIQU5ETEUgQUxMIE9GIExPR0lOIEFORCBSRUdJU1RSQVRJT04gRkVBVFVSRVNcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbG9naW4tY29udFwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG5cclxuICAgICAgICBjb25zdCBldmVudFRhcmdldCA9IGV2ZW50LnRhcmdldC5pZC5zcGxpdChcIi1cIilcclxuXHJcbiAgICAgICAgaWYgKGV2ZW50LnRhcmdldC5pZCA9PT0gXCJsb2dpbi1idG5cIikge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIllvdSBjbGlja2VkIHRoZSBsb2dpbiBidXR0b24hXCIpXHJcbiAgICAgICAgICAgIGNvbnN0IHVzZXJOYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNsb2dpbi1uYW1lXCIpLnZhbHVlXHJcbiAgICAgICAgICAgIGNvbnN0IHBhc3N3b3JkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNsb2dpbi1wYXNzXCIpLnZhbHVlXHJcbiAgICAgICAgICAgIC8vY2hlY2sgaWYgdXNlcm5hbWUgaXMgaW4gdGhlIGRhdGFiYXNlXHJcbiAgICAgICAgICAgIEFQSU1hbmFnZXIuZ2V0U2luZ2xlVXNlcihcInVzZXJuYW1lXCIsIHVzZXJOYW1lKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oKHNpbmdsZVVzZXIpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoc2luZ2xlVXNlci5sZW5ndGggPT09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJUaGUgdXNlcm5hbWUgb2ZcIiwgdXNlck5hbWUsIFwid2FzIHZlcmlmaWVkXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vY2hlY2sgaWYgcGFzc3dvcmQgbWF0Y2hlc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2luZ2xlVXNlclswXS5wYXNzd29yZCA9PT0gcGFzc3dvcmQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1QcmludGVyLnJlbW92ZUxvZ2luRm9ybSgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKFwiYWN0aXZlVXNlclwiLCBzaW5nbGVVc2VyWzBdLmlkKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vdGhpcyBhY3RpdmF0ZXMgdGhlIGRhc2hib2FyZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGFzaGJvYXJkQWN0aXZhdG9yKClcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cuYWxlcnQoXCJUaGUgcGFzc3dvcmQgaXMgaW5jb3JyZWN0IVwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cuYWxlcnQoXCJ0aGF0IHVzZXJuYW1lIGRvZXMgbm90IGV4aXN0IGluIHRoZSBkYXRhYmFzZVwiKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL0lmIHVzZXIgY2xpY2tzIHRoZSByZWdpc3RlciBidXR0b24sIGxvYWQgdGhlIHJlZ2lzdHJhdGlvbiBmb3JtXHJcbiAgICAgICAgaWYgKGV2ZW50LnRhcmdldC5pZCA9PT0gXCJyZWctYnRuXCIpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJ5b3UgY2xpY2tlZCB0aGUgcmVnaXN0ZXIgYnV0dG9uXCIpXHJcbiAgICAgICAgICAgIGZvcm1QcmludGVyLnByaW50UmVnaXN0ZXJGb3JtKClcclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vaWYgdXNlciBjbGlja3MgdGhlIHN1Ym1pdCBidXR0b24sIHJlZ2lzdHJhdGlvbiB3aWxsIGJlIHBvc3RlZCB0byBkYXRhYmFzZVxyXG4gICAgICAgIGlmIChldmVudC50YXJnZXQuaWQgPT09IFwic3VibWl0LXJlZy1idG5cIikge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcInlvdSBjbGlja2VkIHRoZSBzdWJtaXQgYnV0dG9uXCIpXHJcbiAgICAgICAgICAgIC8vZmlyc3QgY2hlY2sgaWYgdXNlcm5hbWUgaXMgYWxyZWFkeSBpbiB0aGUgZGF0YWJhc2UuXHJcbiAgICAgICAgICAgIGNvbnN0IHVzZXJOYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNyZWctbmFtZVwiKS52YWx1ZVxyXG4gICAgICAgICAgICBBUElNYW5hZ2VyLmdldFNpbmdsZVVzZXIoXCJ1c2VybmFtZVwiLCB1c2VyTmFtZSlcclxuICAgICAgICAgICAgICAgIC50aGVuKChzaW5nbGVVc2VyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy91c2VybmFtZSBub3QgaW4gZGF0YWJhc2UsIHByb2NlZWRcclxuICAgICAgICAgICAgICAgICAgICBpZiAoc2luZ2xlVXNlci5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJUaGUgdXNlcm5hbWUgb2ZcIiwgdXNlck5hbWUsIFwid2FzIHZlcmlmaWVkXCIpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBwYXNzd29yZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcmVnLXBhc3NcIikudmFsdWVcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZW1haWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3JlZy1lbWFpbFwiKS52YWx1ZVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdXNlck9iamVjdCA9IGJ1aWxkVXNlck9iamVjdCh1c2VyTmFtZSwgcGFzc3dvcmQsIGVtYWlsKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInRoaXMgaXMgdGhlIHVzZXJPYmplY3RcIiwgdXNlck9iamVjdClcclxuICAgICAgICAgICAgICAgICAgICAgICAgQVBJTWFuYWdlci5hZGRVc2VyKHVzZXJPYmplY3QpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JtUHJpbnRlci5yZW1vdmVSZWdpc3RlckZvcm0oKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3RoaXMgYWN0aXZhdGVzIHRoZSBkYXNoYm9hcmRcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGFzaGJvYXJkQWN0aXZhdG9yKClcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3VzZXJuYW1lIGlzIGFscmVhZHkgaW4gZGF0YWJhc2UsIGRvIG5vdCBwcm9jZWVkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy5hbGVydChcInRoYXQgdXNlcm5hbWUgYWxyZWFkeSBleGlzdHNcIilcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgIH0pXHJcbiAgICAvLyBFVkVOVCBMSVNURU5FUiBGT1IgVEhFIExPR09VVCBPUEVSQVRJT05cclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjaGVhZGVyXCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XHJcbiAgICAgICAgaWYgKGV2ZW50LnRhcmdldC5pZCA9PT0gXCJsb2dvdXQtYnRuXCIpIHtcclxuXHJcbiAgICAgICAgICAgIHNlc3Npb25TdG9yYWdlLnJlbW92ZUl0ZW0oXCJhY3RpdmVVc2VyXCIpXHJcbiAgICAgICAgICAgIC8vdGhpcyBpcyBqdXN0IGEgcGxhY2Vob2xkZXIgdW50aWwgd2UgaGF2ZSB0aGUgZGFzaGJvYXJkIC8vXHJcbiAgICAgICAgICAgIGZvcm1QcmludGVyLnJlbW92ZUxvZ291dEZvcm0oKVxyXG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2JvZHlcIikuaW5uZXJIVE1MID0gXCJcIlxyXG4gICAgICAgICAgICBmb3JtUHJpbnRlci5wcmludExvZ2luRm9ybSgpXHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxuXHJcblxyXG5cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgbG9naW5NYW5hZ2VyO1xyXG4iLCIvLyBNb2R1bGUgdG8gYnVpbGQgYW4gb2JqZWN0IHVzaW5nIGlucHV0cyBmcm9tIHRoZSByZWdpc3RyYXRpb24gZmllbGRcclxuLy9CdWlsdCBieSBTeWRuZXkgV2FpdFxyXG5cclxuY29uc3QgYnVpbGRVc2VyT2JqZWN0ID0gKHVzZXJOYW1lLCBwYXNzd29yZCwgZW1haWwpID0+IHtcclxuXHJcbiAgICBjb25zdCB1c2VyT2JqZWN0ID0ge1xyXG4gICAgICAgIFwidXNlcm5hbWVcIjogdXNlck5hbWUsXHJcbiAgICAgICAgXCJwYXNzd29yZFwiOiBwYXNzd29yZCxcclxuICAgICAgICBcImVtYWlsXCI6IGVtYWlsXHJcbiAgICB9XHJcbiAgICByZXR1cm4gdXNlck9iamVjdDtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgYnVpbGRVc2VyT2JqZWN0OyIsIi8vIE1vZHVsZSB0byBwcmludCB0aGUgbG9naW4gYW5kIHJlZ2lzdHJhdGlvbiBmb3JtcyB0byB0aGUgRE9NXHJcbi8vIGFsc28gaGFzIGZ1bmN0aW9uYWxpdHkgdG8gY2xlYXIgdGhlIGZvcm1zIGZyb20gdGhlIERPTVxyXG4vLyBCdWlsdCBieSBTeWRuZXkgV2FpdFxyXG5cclxuaW1wb3J0IGZvcm1CdWlsZGVyIGZyb20gXCIuL2Zvcm1CdWlsZGVyLmpzXCJcclxuXHJcbmNvbnN0IGZvcm1QcmludGVyID0ge1xyXG5cclxuICAgIHByaW50TG9naW5Gb3JtOiAoKSA9PiB7XHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNsb2dpbi1jb250XCIpLmlubmVySFRNTCA9IGZvcm1CdWlsZGVyLm1ha2VMb2dpbkZvcm0oKVxyXG4gICAgfSxcclxuXHJcbiAgICByZW1vdmVMb2dpbkZvcm06ICgpID0+IHtcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2xvZ2luLWNvbnRcIikuaW5uZXJIVE1MID0gXCJcIlxyXG4gICAgfSxcclxuXHJcbiAgICBwcmludFJlZ2lzdGVyRm9ybTogKCkgPT4ge1xyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbG9naW4tY29udFwiKS5pbm5lckhUTUwgPSBmb3JtQnVpbGRlci5tYWtlUmVnaXN0ZXJGb3JtKClcclxuICAgIH0sXHJcblxyXG4gICAgcmVtb3ZlUmVnaXN0ZXJGb3JtOiAoKSA9PiB7XHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNsb2dpbi1jb250XCIpLmlubmVySFRNTCA9IFwiXCJcclxuICAgIH0sXHJcblxyXG4gICAgcHJpbnRMb2dvdXRGb3JtOigpPT57XHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNoZWFkZXJcIikuaW5uZXJIVE1MPWZvcm1CdWlsZGVyLm1ha2VMb2dvdXRGb3JtKClcclxuICAgIH0sXHJcblxyXG4gICAgcmVtb3ZlTG9nb3V0Rm9ybTooKT0+e1xyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjaGVhZGVyXCIpLmlubmVySFRNTD1cIlwiXHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZvcm1QcmludGVyXHJcbiIsIi8vTWljaGVsbGUgVGFib3IgLSBUaGlzIG1vZHVsZSB3aWxsIGhvdXNlIEFQSSBjYWxscyB0aGF0IGFyZSBmb3IgdGhlIHRhc2tzIGVsZW1lbnRcclxuXHJcbi8vZmV0Y2ggY2FsbHNcclxuXHJcbmNvbnN0IGFwaSA9IHtcclxuICAgIC8vR2V0IGFsbCB0YXNrc1xyXG4gICAgYWxsOiAodXNlcklkKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIGZldGNoKGBodHRwOi8vbG9jYWxob3N0OjgwODgvdGFza3M/dXNlcklkPSR7dXNlcklkfSZjb21wbGV0ZT1mYWxzZWApXHJcbiAgICAgICAgICAgIC50aGVuKHIgPT4gci5qc29uKCkpXHJcbiAgICB9LFxyXG4gICAgLy9QT1NUIG5ldyB0YXNrXHJcbm5ldzoodGFza09iamVjdCk9PntcclxuICAgIHJldHVybiBmZXRjaChcImh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC90YXNrc1wiLHtcclxuICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxyXG4gICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh0YXNrT2JqZWN0KVxyXG4gICAgICAgIH0pLnRoZW4ociA9PiByLmpzb24oKSlcclxuXHJcbn1cclxuICAgIC8vUFVUIG5ldyBlZGl0ZWQgdGFza1xyXG5cclxuICAgIC8vUEFUQ0ggY29tcGxldGVkIHRhc2tcclxufVxyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGFwaSIsImltcG9ydCBwcmludCBmcm9tIFwiLi90YXNrUHJpbnRUb0RPTVwiXHJcbmltcG9ydCBhY3RpdmF0ZVNhdmVCdXR0b24gZnJvbSBcIi4vdGFza3NTYXZlQnV0dG9uXCI7XHJcblxyXG5cclxuY29uc3QgbGlzdGVuID17XHJcbiAgICBhY3RpdmF0ZU5ld1Rhc2s6ICh1c2VySWQpID0+IHtcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Rhc2tzLWZvb3RcIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGUgPT4ge1xyXG4gICAgICAgIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJuZXdcIikpIHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKGUpO1xyXG4gICAgICAgICAgcHJpbnQubmV3VGFza0Zvcm0oKTtcclxuICAgICAgICAgIHByaW50LnNhdmVCdXR0b24odXNlcklkKTtcclxuICAgICAgICAgIGFjdGl2YXRlU2F2ZUJ1dHRvbjtcclxuICAgICAgICB9XHJcbn1cclxuICAgIClcclxufSxcclxuXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGxpc3RlbiIsIi8vTWljaGVsbGUgVGFib3IgLSBUaGlzIG1vZHVsZSBidWlsZHMgb2JqZWN0cyB0aGF0IHdpbGwgYmUgcG9zdGVkIHRvIHRoZSBkYXRhYmFzZVxyXG4vL2ltcG9ydHNcclxuXHJcbmNvbnN0IG9iamVjdCA9IHtcclxuICAvL3VzZSBmb3IgbmV3IGFuZCBlZGl0ZWQgdGFza3NcclxuICB0YXNrT2JqZWN0OiAodGFzaywgZHVlRGF0ZSkgPT4ge1xyXG4gICAgcmV0dXJuIGB7XHJcbiAgICAgICAgdXNlcklkOiAke3Nlc3Npb25TdG9yYWdlLmdldEl0ZW0oXCJhY3RpdmVVc2VyXCIpfSxcclxuICAgICAgICB0YXNrOiAke3Rhc2t9LFxyXG4gICAgICAgIFwiZHVlRGF0ZVwiOiAke2R1ZURhdGV9LFxyXG4gICAgICAgIFwiY29tcGxldGVcIjogZmFsc2UgIFxyXG4gICAgfWA7XHJcbiAgfSxcclxuICAvL3BhcnQgb2YgYSB0YXNrXHJcbiAgY29tcGxldGVUYXNrT2JqZWN0OiB0ZiA9PiB7XHJcbiAgICByZXR1cm4gYHtjb21wbGV0ZTogJHt0Zn19YDtcclxuICB9XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBvYmplY3RcclxuIiwiLy9NaWNoZWxsZSBUYWJvciAtIFRoaXMgbW9kdWxlIGhvdXNlcyBmdW5jdGlvbnMgdGhhdCB3aWxsIHByaW50IGl0ZW1zIHRvIHRoZSBET01cclxuXHJcbi8vaW1wb3J0c1xyXG5pbXBvcnQgZm9ybSBmcm9tIFwiLi90YXNrc0Zvcm1CdWlsZGVyXCI7XHJcblxyXG4vL3ByaW50IGZ1bmN0aW9uIG9iamVjdFxyXG5jb25zdCBwcmludCA9IHtcclxuICAvL2J1dHRvbiBmb3IgbmV3IHRhc2tcclxuICBidXR0b246IHVzZXJJZCA9PiB7XHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxyXG4gICAgICBcIiN0YXNrcy1mb290XCJcclxuICAgICkuaW5uZXJIVE1MID0gYDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwibmV3XCIgaWQ9XCJ0YXNrcy1uZXctYnRuLSR7dXNlcklkfVwiPkFkZCBOZXcgVGFzazwvYnV0dG9uPmA7XHJcbiAgfSxcclxuICAvL3ByaW50IGZvcm1cclxuXHJcbiAgbmV3VGFza0Zvcm06ICgpID0+IHtcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdGFza3MtY29udFwiKS5pbm5lckhUTUwgPSBmb3JtLm5ld1Rhc2tGb3JtKCk7XHJcbiAgfSxcclxuICAvL3ByaW50IGVkaXQgZm9ybVxyXG4gIGVkaXRGb3JtOiAoKSA9PiB7XHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Rhc2tzLWNvbnRcIikuaW5uZXJIVE1MID0gZm9ybS5lZGl0Rm9ybSgpO1xyXG4gIH0sXHJcbiAgc2F2ZUJ1dHRvbjogKCk9PntcclxuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN0YXNrcy1mb290XCIpLmlubmVySFRNTCA9IGZvcm0uc2F2ZUJ1dHRvbigpO1xyXG4gIH0sXHJcbiAgdGFza2JveDogKCk9PntcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdGFzay1jb250YWluZXJcIikuaW5uZXJIVE1MID1gPGRpdiBpZD1cInRhc2staGVhZFwiPlRBU0tTPC9kaXY+XHJcbiAgICAgIDxkaXYgaWQ9XCJ0YXNrcy1jb250XCI+PC9kaXY+XHJcbiAgICAgIDxkaXYgaWQ9XCJ0YXNrcy1mb290XCI+PC9kaXY+YFxyXG4gIH1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHByaW50O1xyXG4iLCIvL01pY2hlbGxlIFRhYm9yIC0gVGhpcyBtb2R1bGUgYnVpbGRzIHRoZSBlbnRpcmUgY29tcG9uZW50IEhUTUwgU3RyaW5nXHJcblxyXG4vL2ltcG9ydHNcclxuaW1wb3J0IGFwaSBmcm9tIFwiLi90YXNrQVBJTWFuYWdlclwiO1xyXG5pbXBvcnQgYnVpbGRTaW5nbGVUYXNrIGZyb20gXCIuL3Rhc2tzU2luZ2xlQ29tcG9uZW50QnVpbGRlclwiO1xyXG5cclxuLy9idWlsZHMgdGFzayBsaXN0IGFuZCBwcmludHMgaXQgdG8gdGhlIERPTVxyXG5jb25zdCBidWlsZCA9IHtcclxuICB0YXNrc0xpc3Q6IHVzZXJJZCA9PiB7XHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Rhc2tzLWNvbnRcIikuaW5uZXJIVE1MID0gXCJcIjtcclxuICAgIGFwaS5hbGwodXNlcklkKS50aGVuKHRhc2tzID0+IHtcclxuICAgICAgdGFza3MuZm9yRWFjaChzaW5nbGVUYXNrID0+IHtcclxuICAgICAgICAgIGlmKHRhc2tzLmNvbXBsZXRlICE9PSB0cnVlKXtcclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhzaW5nbGVUYXNrKVxyXG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Rhc2tzLWNvbnRcIikuaW5uZXJIVE1MICs9IGJ1aWxkU2luZ2xlVGFzayhzaW5nbGVUYXNrKVxyXG4gICAgICAgICAgfSBlbHNle1xyXG4gICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdGFza3MtY29udFwiKS5pbm5lckhUTUwgPSBgPHAgY2xhc3M9XCJlcnJvclwiPkFsbCBDYXVnaHQgVXAhPC9wPmBcclxuICAgICAgICAgIH1cclxuICAgICAgICA7XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgYnVpbGQ7IiwiLy9NaWNoZWxsZSBUYWJvciAtIFRoaXMgY29tcG9uZW50IGJ1aWxkcyBIVE1MIHN0cmluZ3MgZm9yIHRoZSBmb3Jtc1xyXG5jb25zdCBmb3JtcyA9IHtcclxuLy9uZXcgdGFzayBmb3JtXHJcbm5ld1Rhc2tGb3JtOiAoKT0+e1xyXG5yZXR1cm4gYDxoMz5BZGQgTmV3IFRhc2s8L2gzPlxyXG48aW5wdXQgdHlwZT1cInRleHRhcmVhXCIgbmFtZT1cInRhc2tcIiBpZD1cInRhc2stbmFtZS1pbnB1dFwiIHBsYWNlaG9sZGVyPVwiVGFza1wiPjwvaW5wdXQ+XHJcbjxpbnB1dCB0eXBlPVwiZGF0ZVwiIG5hbWU9XCJkdWVEYXRlXCIgaWQ9XCJ0YXNrLWRhdGUtaW5wdXRcIj48L2lucHV0PmBcclxufSxcclxuLy9lZGl0IHRhc2sgZm9ybVxyXG5lZGl0VGFza0Zvcm06ICgpPT57XHJcblxyXG59LFxyXG5zYXZlQnV0dG9uOiAodXNlcklkKT0+e1xyXG4gICAgcmV0dXJuIGA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cInNhdmVcIiBpZD1cInNhdmUtdGFza3MtYnRuJHt1c2VySWR9XCI+U2F2ZTwvYnV0dG9uPmBcclxufVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmb3JtcyIsIi8vTWljaGVsbGUgVGFib3IgLSBUaGlzIE1vZHVsZSBpcyB0aGUgc3ViLW1haW4gbW9kdWxlIHRoYXQgaG91c2VzIHRoZSBldmVudCBsaXN0ZW5lcnMgZm9yIHRoZSBUYXNrcyBFbGVtZW50XHJcblxyXG4vL2ltcG9ydHNcclxuaW1wb3J0IHByaW50IGZyb20gXCIuL3Rhc2tQcmludFRvRE9NXCI7XHJcbmltcG9ydCBhZnRlckJ1aWxkIGZyb20gXCIuL3Rhc2tzYm94QWZ0ZXJCdWlsZFwiXHJcblxyXG4vL3Rhc2tzIG1hbmFnZXIgbWFpbiBmdW5jdGlvblxyXG5jb25zdCB0YXNrcyA9IHtcclxuICAvL2FmdGVyIGxvZ2luXHJcbiAgYWZ0ZXJMb2dpbjogKHVzZXJJZCkgPT4ge1xyXG4gICAgaWYgKHNlc3Npb25TdG9yYWdlLmxlbmd0aCA+IDApIHtcclxuICAgICAgcHJpbnQudGFza2JveCgpO1xyXG4gICAgICBhZnRlckJ1aWxkKHVzZXJJZClcclxuICAgIH1cclxuICB9LFxyXG4gIC8vYWRkIG5ldyB0YXNrIGJ1dHRvblxyXG5cclxuICAvL2VkaXQgdGFza1xyXG5cclxuICAvL2NvbXBsZXRlZCB0YXNrXHJcbiAgY29tcGxldGVkOiAoKSA9PiB7fVxyXG4gIC8vc2F2ZSBlZGl0ZWQgdGFza1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgdGFza3M7IiwiaW1wb3J0IGFwaSBmcm9tIFwiLi90YXNrQVBJTWFuYWdlclwiXHJcbmltcG9ydCBvYmplY3QgZnJvbSBcIi4vdGFza09iamVjdEJ1aWxkZXJcIlxyXG5pbXBvcnQgdGFza3MgZnJvbSBcIi4vdGFza3NNYW5hZ2VyXCJcclxuXHJcbmNvbnN0IGFjdGl2YXRlU2F2ZUJ1dHRvbiA9ICgpID0+e1xyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN0YXNrcy1mb290XCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBlID0+e1xyXG4gICAgICAgIGlmKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcInNhdmVcIikpe1xyXG4gICAgICAgICAgICBhcGkubmV3KG9iamVjdC50YXNrT2JqZWN0KGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdGFzay1uYW1lLWlucHV0XCIpLnZhbHVlLCBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Rhc2stZGF0ZS1pbnB1dFwiKS52YWx1ZSkpXHJcbiAgICAgICAgICAgIC50aGVuKCgpPT57XHJcbiAgICAgICAgICAgICAgICB0YXNrcy5hZnRlckxvZ2luKHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oXCJhY3RpdmVVc2VyXCIpKVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgIH0pXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGFjdGl2YXRlU2F2ZUJ1dHRvbiIsIi8vTWljaGVsbGUgVGFib3IgLSBUaGlzIG1vZHVsZSBidWlsZHMgYSBzaW5nbGUgaHRtbCBzdHJpbmdcclxuXHJcbi8vYnVpbGQgc2luZ2xlIHRhc2tcclxuY29uc3QgYnVpbGRTaW5nbGVUYXNrID0gKHRhc2spID0+e1xyXG4gICAgcmV0dXJuIGA8aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgaWQ9XCJ0YXNrLWNoZWNrXCI+PHN0cm9uZz4ke3Rhc2suZHVlRGF0ZX08L3N0cm9uZz4gLSAke3Rhc2sudGFza308L2lucHV0PjxiciAvPmBcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgYnVpbGRTaW5nbGVUYXNrIiwiaW1wb3J0IGJ1aWxkIGZyb20gXCIuL3Rhc2tzQ29udGVudEJ1aWxkZXJcIlxyXG5pbXBvcnQgcHJpbnQgZnJvbSBcIi4vdGFza1ByaW50VG9ET01cIlxyXG5pbXBvcnQgbGlzdGVuIGZyb20gXCIuL3Rhc2tMaXN0ZW5lcnNcIlxyXG5cclxuY29uc3QgYWZ0ZXJCdWlsZCA9ICh1c2VySWQpID0+IHtcclxuICAgIGJ1aWxkLnRhc2tzTGlzdCh1c2VySWQpO1xyXG4gICAgcHJpbnQuYnV0dG9uKHVzZXJJZCk7XHJcbiAgICBsaXN0ZW4uYWN0aXZhdGVOZXdUYXNrKHVzZXJJZCk7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGFmdGVyQnVpbGQiLCJpbXBvcnQgZm9ybVByaW50ZXIgZnJvbSBcIi4uL2xvZ2luL3ByaW50VG9Eb20uanNcIlxyXG5pbXBvcnQgbG9naW5NYW5hZ2VyIGZyb20gXCIuLi9sb2dpbi9sb2dpbk1hbmFnZXIuanNcIlxyXG5cclxuZm9ybVByaW50ZXIucHJpbnRMb2dpbkZvcm0oKTtcclxubG9naW5NYW5hZ2VyKCk7Il19
