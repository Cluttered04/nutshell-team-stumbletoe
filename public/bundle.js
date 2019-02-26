(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
    return fetch(`http://localhost:8088/tasks?userId=${userId}`).then(r => r.json());
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

},{}],2:[function(require,module,exports){
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
      console.log(e.target);

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

},{"./taskPrintToDOM":4,"./tasksSaveButton":8}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
//Michelle Tabor - This module builds objects that will be posted to the database
//imports
const object = {
  //use for new and edited tasks
  taskObject: (taskId, userId, task, dueDate) => {
    return `{
        id: ${taskId},
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

},{}],4:[function(require,module,exports){
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
  }
};
var _default = print;
exports.default = _default;

},{"./tasksFormBuilder":6}],5:[function(require,module,exports){
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

},{"./taskAPIManager":1,"./tasksSingleComponentBuilder":9}],6:[function(require,module,exports){
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

},{}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _taskPrintToDOM = _interopRequireDefault(require("./taskPrintToDOM"));

var _tasksContentBuilder = _interopRequireDefault(require("./tasksContentBuilder"));

var _tasksFormBuilder = _interopRequireDefault(require("./tasksFormBuilder"));

var _taskListeners = _interopRequireDefault(require("./taskListeners"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//Michelle Tabor - This Module is the sub-main module that houses the event listeners for the Tasks Element
//imports
//tasks manager main function
const tasks = {
  //after login
  afterLogin: userId => {
    if (sessionStorage.length > 0) {
      _tasksContentBuilder.default.tasksList(userId);

      _taskPrintToDOM.default.button(userId);

      _taskListeners.default.activateNewTask(userId);
    }
  },
  //add new task button
  //edit task
  //completed task
  completed: () => {} //save edited task

};
var _default = tasks;
exports.default = _default;

},{"./taskListeners":2,"./taskPrintToDOM":4,"./tasksContentBuilder":5,"./tasksFormBuilder":6}],8:[function(require,module,exports){
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

},{"./taskAPIManager":1,"./taskObjectBuilder":3,"./tasksManager":7}],9:[function(require,module,exports){
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

},{}],10:[function(require,module,exports){
"use strict";

var _tasksManager = _interopRequireDefault(require("./Tasks/tasksManager"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

sessionStorage.setItem("activeUser", 1);
console.log(sessionStorage.getItem("activeUser"));

_tasksManager.default.afterLogin(sessionStorage.getItem("activeUser"));

},{"./Tasks/tasksManager":7}]},{},[10])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9zY3JpcHRzL1Rhc2tzL3Rhc2tBUElNYW5hZ2VyLmpzIiwiLi4vc2NyaXB0cy9UYXNrcy90YXNrTGlzdGVuZXJzLmpzIiwiLi4vc2NyaXB0cy9UYXNrcy90YXNrT2JqZWN0QnVpbGRlci5qcyIsIi4uL3NjcmlwdHMvVGFza3MvdGFza1ByaW50VG9ET00uanMiLCIuLi9zY3JpcHRzL1Rhc2tzL3Rhc2tzQ29udGVudEJ1aWxkZXIuanMiLCIuLi9zY3JpcHRzL1Rhc2tzL3Rhc2tzRm9ybUJ1aWxkZXIuanMiLCIuLi9zY3JpcHRzL1Rhc2tzL3Rhc2tzTWFuYWdlci5qcyIsIi4uL3NjcmlwdHMvVGFza3MvdGFza3NTYXZlQnV0dG9uLmpzIiwiLi4vc2NyaXB0cy9UYXNrcy90YXNrc1NpbmdsZUNvbXBvbmVudEJ1aWxkZXIuanMiLCIuLi9zY3JpcHRzL21haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7QUNBQTtBQUVBO0FBRUEsTUFBTSxHQUFHLEdBQUc7QUFDUjtBQUNBLEVBQUEsR0FBRyxFQUFHLE1BQUQsSUFBWTtBQUNiLFdBQU8sS0FBSyxDQUFFLHNDQUFxQyxNQUFPLEVBQTlDLENBQUwsQ0FDRixJQURFLENBQ0csQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFGLEVBRFIsQ0FBUDtBQUVILEdBTE87QUFNUjtBQUNKLEVBQUEsR0FBRyxFQUFFLFVBQUQsSUFBYztBQUNkLFdBQU8sS0FBSyxDQUFDLDZCQUFELEVBQStCO0FBQ3ZDLE1BQUEsTUFBTSxFQUFFLE1BRCtCO0FBRW5DLE1BQUEsT0FBTyxFQUFFO0FBQ0wsd0JBQWdCO0FBRFgsT0FGMEI7QUFLbkMsTUFBQSxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQUwsQ0FBZSxVQUFmO0FBTDZCLEtBQS9CLENBQUwsQ0FNQSxJQU5BLENBTUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFGLEVBTlYsQ0FBUDtBQVFILEdBaEJXLENBaUJSO0FBRUE7O0FBbkJRLENBQVo7ZUF1QmUsRzs7Ozs7Ozs7Ozs7QUMzQmY7O0FBQ0E7Ozs7QUFHQSxNQUFNLE1BQU0sR0FBRTtBQUNWLEVBQUEsZUFBZSxFQUFHLE1BQUQsSUFBWTtBQUN6QixJQUFBLFFBQVEsQ0FBQyxhQUFULENBQXVCLGFBQXZCLEVBQXNDLGdCQUF0QyxDQUF1RCxPQUF2RCxFQUFnRSxDQUFDLElBQUk7QUFDckUsTUFBQSxPQUFPLENBQUMsR0FBUixDQUFZLENBQUMsQ0FBQyxNQUFkOztBQUNBLFVBQUksQ0FBQyxDQUFDLE1BQUYsQ0FBUyxTQUFULENBQW1CLFFBQW5CLENBQTRCLEtBQTVCLENBQUosRUFBd0M7QUFDdEMsUUFBQSxPQUFPLENBQUMsR0FBUixDQUFZLENBQVo7O0FBQ0EsZ0NBQU0sV0FBTjs7QUFDQSxnQ0FBTSxVQUFOLENBQWlCLE1BQWpCOztBQUNBO0FBQ0Q7QUFDUixLQVJPO0FBVVA7QUFaYSxDQUFkO2VBZ0JlLE07Ozs7Ozs7Ozs7QUNwQmY7QUFDQTtBQUVBLE1BQU0sTUFBTSxHQUFHO0FBQ2I7QUFDQSxFQUFBLFVBQVUsRUFBRSxDQUFDLE1BQUQsRUFBUyxNQUFULEVBQWlCLElBQWpCLEVBQXVCLE9BQXZCLEtBQW1DO0FBQzdDLFdBQVE7Y0FDRSxNQUFPO2tCQUNILGNBQWMsQ0FBQyxPQUFmLENBQXVCLFlBQXZCLENBQXFDO2dCQUN2QyxJQUFLO3FCQUNBLE9BQVE7O01BSnpCO0FBT0QsR0FWWTtBQVdiO0FBQ0EsRUFBQSxrQkFBa0IsRUFBRSxFQUFFLElBQUk7QUFDeEIsV0FBUSxjQUFhLEVBQUcsR0FBeEI7QUFDRDtBQWRZLENBQWY7ZUFpQmUsTTs7Ozs7Ozs7Ozs7QUNqQmY7Ozs7QUFIQTtBQUVBO0FBR0E7QUFDQSxNQUFNLEtBQUssR0FBRztBQUNaO0FBQ0EsRUFBQSxNQUFNLEVBQUUsTUFBTSxJQUFJO0FBQ2hCLElBQUEsUUFBUSxDQUFDLGFBQVQsQ0FDRSxhQURGLEVBRUUsU0FGRixHQUVlLHVEQUFzRCxNQUFPLHlCQUY1RTtBQUdELEdBTlc7QUFPWjtBQUVBLEVBQUEsV0FBVyxFQUFFLE1BQU07QUFDakIsSUFBQSxRQUFRLENBQUMsYUFBVCxDQUF1QixhQUF2QixFQUFzQyxTQUF0QyxHQUFrRCwwQkFBSyxXQUFMLEVBQWxEO0FBQ0QsR0FYVztBQVlaO0FBQ0EsRUFBQSxRQUFRLEVBQUUsTUFBTTtBQUNkLElBQUEsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsYUFBdkIsRUFBc0MsU0FBdEMsR0FBa0QsMEJBQUssUUFBTCxFQUFsRDtBQUNELEdBZlc7QUFnQlosRUFBQSxVQUFVLEVBQUUsTUFBSTtBQUNaLElBQUEsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsYUFBdkIsRUFBc0MsU0FBdEMsR0FBa0QsMEJBQUssVUFBTCxFQUFsRDtBQUNIO0FBbEJXLENBQWQ7ZUFxQmUsSzs7Ozs7Ozs7Ozs7QUN4QmY7O0FBQ0E7Ozs7QUFKQTtBQUVBO0FBSUE7QUFDQSxNQUFNLEtBQUssR0FBRztBQUNaLEVBQUEsU0FBUyxFQUFFLE1BQU0sSUFBSTtBQUNuQixJQUFBLFFBQVEsQ0FBQyxhQUFULENBQXVCLGFBQXZCLEVBQXNDLFNBQXRDLEdBQWtELEVBQWxEOztBQUNBLDRCQUFJLEdBQUosQ0FBUSxNQUFSLEVBQWdCLElBQWhCLENBQXFCLEtBQUssSUFBSTtBQUM1QixNQUFBLEtBQUssQ0FBQyxPQUFOLENBQWMsVUFBVSxJQUFJO0FBQ3hCLFlBQUcsS0FBSyxDQUFDLFFBQU4sS0FBbUIsSUFBdEIsRUFBMkI7QUFDdkIsVUFBQSxPQUFPLENBQUMsR0FBUixDQUFZLFVBQVo7QUFDRixVQUFBLFFBQVEsQ0FBQyxhQUFULENBQXVCLGFBQXZCLEVBQXNDLFNBQXRDLElBQW1ELDBDQUFnQixVQUFoQixDQUFuRDtBQUNELFNBSEQsTUFHTTtBQUNGLFVBQUEsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsYUFBdkIsRUFBc0MsU0FBdEMsR0FBbUQscUNBQW5EO0FBQ0g7O0FBQ0g7QUFDRCxPQVJEO0FBU0QsS0FWRDtBQVdEO0FBZFcsQ0FBZDtlQWlCZSxLOzs7Ozs7Ozs7O0FDeEJmO0FBQ0EsTUFBTSxLQUFLLEdBQUc7QUFDZDtBQUNBLEVBQUEsV0FBVyxFQUFFLE1BQUk7QUFDakIsV0FBUTs7Z0VBQVI7QUFHQyxHQU5hO0FBT2Q7QUFDQSxFQUFBLFlBQVksRUFBRSxNQUFJLENBRWpCLENBVmE7QUFXZCxFQUFBLFVBQVUsRUFBRyxNQUFELElBQVU7QUFDbEIsV0FBUSx3REFBdUQsTUFBTyxpQkFBdEU7QUFDSDtBQWJhLENBQWQ7ZUFnQmUsSzs7Ozs7Ozs7Ozs7QUNkZjs7QUFDQTs7QUFDQTs7QUFDQTs7OztBQU5BO0FBRUE7QUFNQTtBQUNBLE1BQU0sS0FBSyxHQUFHO0FBQ1o7QUFDQSxFQUFBLFVBQVUsRUFBRSxNQUFNLElBQUk7QUFDcEIsUUFBSSxjQUFjLENBQUMsTUFBZixHQUF3QixDQUE1QixFQUErQjtBQUM3QixtQ0FBTSxTQUFOLENBQWdCLE1BQWhCOztBQUNBLDhCQUFNLE1BQU4sQ0FBYSxNQUFiOztBQUNBLDZCQUFPLGVBQVAsQ0FBdUIsTUFBdkI7QUFDRDtBQUNGLEdBUlc7QUFTWjtBQUVBO0FBRUE7QUFDQSxFQUFBLFNBQVMsRUFBRSxNQUFNLENBQUUsQ0FkUCxDQWVaOztBQWZZLENBQWQ7ZUFrQmUsSzs7Ozs7Ozs7Ozs7QUMzQmY7O0FBQ0E7O0FBQ0E7Ozs7QUFFQSxNQUFNLGtCQUFrQixHQUFHLE1BQUs7QUFDNUIsRUFBQSxRQUFRLENBQUMsYUFBVCxDQUF1QixhQUF2QixFQUFzQyxnQkFBdEMsQ0FBdUQsT0FBdkQsRUFBZ0UsQ0FBQyxJQUFHO0FBQ2hFLFFBQUcsQ0FBQyxDQUFDLE1BQUYsQ0FBUyxTQUFULENBQW1CLFFBQW5CLENBQTRCLE1BQTVCLENBQUgsRUFBdUM7QUFDbkMsOEJBQUksR0FBSixDQUFRLDJCQUFPLFVBQVAsQ0FBa0IsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsa0JBQXZCLEVBQTJDLEtBQTdELEVBQW9FLFFBQVEsQ0FBQyxhQUFULENBQXVCLGtCQUF2QixFQUEyQyxLQUEvRyxDQUFSLEVBQ0MsSUFERCxDQUNNLE1BQUk7QUFDTiw4QkFBTSxVQUFOLENBQWlCLGNBQWMsQ0FBQyxPQUFmLENBQXVCLFlBQXZCLENBQWpCO0FBQ0gsT0FIRDtBQUlIO0FBQ0osR0FQRDtBQVFILENBVEQ7O2VBV2Usa0I7Ozs7Ozs7Ozs7O0FDZmY7QUFFQTtBQUNBLE1BQU0sZUFBZSxHQUFJLElBQUQsSUFBUztBQUM3QixTQUFRLGtEQUFpRCxJQUFJLENBQUMsT0FBUSxlQUFjLElBQUksQ0FBQyxJQUFLLGdCQUE5RjtBQUNILENBRkQ7O2VBSWUsZTs7Ozs7O0FDUGY7Ozs7QUFFQSxjQUFjLENBQUMsT0FBZixDQUF1QixZQUF2QixFQUFxQyxDQUFyQztBQUNBLE9BQU8sQ0FBQyxHQUFSLENBQVksY0FBYyxDQUFDLE9BQWYsQ0FBdUIsWUFBdkIsQ0FBWjs7QUFFQSxzQkFBTSxVQUFOLENBQWlCLGNBQWMsQ0FBQyxPQUFmLENBQXVCLFlBQXZCLENBQWpCIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiLy9NaWNoZWxsZSBUYWJvciAtIFRoaXMgbW9kdWxlIHdpbGwgaG91c2UgQVBJIGNhbGxzIHRoYXQgYXJlIGZvciB0aGUgdGFza3MgZWxlbWVudFxyXG5cclxuLy9mZXRjaCBjYWxsc1xyXG5cclxuY29uc3QgYXBpID0ge1xyXG4gICAgLy9HZXQgYWxsIHRhc2tzXHJcbiAgICBhbGw6ICh1c2VySWQpID0+IHtcclxuICAgICAgICByZXR1cm4gZmV0Y2goYGh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC90YXNrcz91c2VySWQ9JHt1c2VySWR9YClcclxuICAgICAgICAgICAgLnRoZW4ociA9PiByLmpzb24oKSlcclxuICAgIH0sXHJcbiAgICAvL1BPU1QgbmV3IHRhc2tcclxubmV3Oih0YXNrT2JqZWN0KT0+e1xyXG4gICAgcmV0dXJuIGZldGNoKFwiaHR0cDovL2xvY2FsaG9zdDo4MDg4L3Rhc2tzXCIse1xyXG4gICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXHJcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHRhc2tPYmplY3QpXHJcbiAgICAgICAgfSkudGhlbihyID0+IHIuanNvbigpKVxyXG5cclxufVxyXG4gICAgLy9QVVQgbmV3IGVkaXRlZCB0YXNrXHJcblxyXG4gICAgLy9QQVRDSCBjb21wbGV0ZWQgdGFza1xyXG59XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgYXBpIiwiaW1wb3J0IHByaW50IGZyb20gXCIuL3Rhc2tQcmludFRvRE9NXCJcclxuaW1wb3J0IGFjdGl2YXRlU2F2ZUJ1dHRvbiBmcm9tIFwiLi90YXNrc1NhdmVCdXR0b25cIjtcclxuXHJcblxyXG5jb25zdCBsaXN0ZW4gPXtcclxuICAgIGFjdGl2YXRlTmV3VGFzazogKHVzZXJJZCkgPT4ge1xyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdGFza3MtZm9vdFwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZSA9PiB7XHJcbiAgICAgICAgY29uc29sZS5sb2coZS50YXJnZXQpO1xyXG4gICAgICAgIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJuZXdcIikpIHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKGUpO1xyXG4gICAgICAgICAgcHJpbnQubmV3VGFza0Zvcm0oKTtcclxuICAgICAgICAgIHByaW50LnNhdmVCdXR0b24odXNlcklkKTtcclxuICAgICAgICAgIGFjdGl2YXRlU2F2ZUJ1dHRvbjtcclxuICAgICAgICB9XHJcbn1cclxuICAgIClcclxufSxcclxuXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGxpc3RlbiIsIi8vTWljaGVsbGUgVGFib3IgLSBUaGlzIG1vZHVsZSBidWlsZHMgb2JqZWN0cyB0aGF0IHdpbGwgYmUgcG9zdGVkIHRvIHRoZSBkYXRhYmFzZVxyXG4vL2ltcG9ydHNcclxuXHJcbmNvbnN0IG9iamVjdCA9IHtcclxuICAvL3VzZSBmb3IgbmV3IGFuZCBlZGl0ZWQgdGFza3NcclxuICB0YXNrT2JqZWN0OiAodGFza0lkLCB1c2VySWQsIHRhc2ssIGR1ZURhdGUpID0+IHtcclxuICAgIHJldHVybiBge1xyXG4gICAgICAgIGlkOiAke3Rhc2tJZH0sXHJcbiAgICAgICAgdXNlcklkOiAke3Nlc3Npb25TdG9yYWdlLmdldEl0ZW0oXCJhY3RpdmVVc2VyXCIpfSxcclxuICAgICAgICB0YXNrOiAke3Rhc2t9LFxyXG4gICAgICAgIFwiZHVlRGF0ZVwiOiAke2R1ZURhdGV9LFxyXG4gICAgICAgIFwiY29tcGxldGVcIjogZmFsc2UgIFxyXG4gICAgfWA7XHJcbiAgfSxcclxuICAvL3BhcnQgb2YgYSB0YXNrXHJcbiAgY29tcGxldGVUYXNrT2JqZWN0OiB0ZiA9PiB7XHJcbiAgICByZXR1cm4gYHtjb21wbGV0ZTogJHt0Zn19YDtcclxuICB9XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBvYmplY3RcclxuIiwiLy9NaWNoZWxsZSBUYWJvciAtIFRoaXMgbW9kdWxlIGhvdXNlcyBmdW5jdGlvbnMgdGhhdCB3aWxsIHByaW50IGl0ZW1zIHRvIHRoZSBET01cclxuXHJcbi8vaW1wb3J0c1xyXG5pbXBvcnQgZm9ybSBmcm9tIFwiLi90YXNrc0Zvcm1CdWlsZGVyXCI7XHJcblxyXG4vL3ByaW50IGZ1bmN0aW9uIG9iamVjdFxyXG5jb25zdCBwcmludCA9IHtcclxuICAvL2J1dHRvbiBmb3IgbmV3IHRhc2tcclxuICBidXR0b246IHVzZXJJZCA9PiB7XHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxyXG4gICAgICBcIiN0YXNrcy1mb290XCJcclxuICAgICkuaW5uZXJIVE1MID0gYDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwibmV3XCIgaWQ9XCJ0YXNrcy1uZXctYnRuLSR7dXNlcklkfVwiPkFkZCBOZXcgVGFzazwvYnV0dG9uPmA7XHJcbiAgfSxcclxuICAvL3ByaW50IGZvcm1cclxuXHJcbiAgbmV3VGFza0Zvcm06ICgpID0+IHtcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdGFza3MtY29udFwiKS5pbm5lckhUTUwgPSBmb3JtLm5ld1Rhc2tGb3JtKCk7XHJcbiAgfSxcclxuICAvL3ByaW50IGVkaXQgZm9ybVxyXG4gIGVkaXRGb3JtOiAoKSA9PiB7XHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Rhc2tzLWNvbnRcIikuaW5uZXJIVE1MID0gZm9ybS5lZGl0Rm9ybSgpO1xyXG4gIH0sXHJcbiAgc2F2ZUJ1dHRvbjogKCk9PntcclxuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN0YXNrcy1mb290XCIpLmlubmVySFRNTCA9IGZvcm0uc2F2ZUJ1dHRvbigpO1xyXG4gIH1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHByaW50O1xyXG4iLCIvL01pY2hlbGxlIFRhYm9yIC0gVGhpcyBtb2R1bGUgYnVpbGRzIHRoZSBlbnRpcmUgY29tcG9uZW50IEhUTUwgU3RyaW5nXHJcblxyXG4vL2ltcG9ydHNcclxuaW1wb3J0IGFwaSBmcm9tIFwiLi90YXNrQVBJTWFuYWdlclwiO1xyXG5pbXBvcnQgYnVpbGRTaW5nbGVUYXNrIGZyb20gXCIuL3Rhc2tzU2luZ2xlQ29tcG9uZW50QnVpbGRlclwiO1xyXG5cclxuLy9idWlsZHMgdGFzayBsaXN0IGFuZCBwcmludHMgaXQgdG8gdGhlIERPTVxyXG5jb25zdCBidWlsZCA9IHtcclxuICB0YXNrc0xpc3Q6IHVzZXJJZCA9PiB7XHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Rhc2tzLWNvbnRcIikuaW5uZXJIVE1MID0gXCJcIjtcclxuICAgIGFwaS5hbGwodXNlcklkKS50aGVuKHRhc2tzID0+IHtcclxuICAgICAgdGFza3MuZm9yRWFjaChzaW5nbGVUYXNrID0+IHtcclxuICAgICAgICAgIGlmKHRhc2tzLmNvbXBsZXRlICE9PSB0cnVlKXtcclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhzaW5nbGVUYXNrKVxyXG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Rhc2tzLWNvbnRcIikuaW5uZXJIVE1MICs9IGJ1aWxkU2luZ2xlVGFzayhzaW5nbGVUYXNrKVxyXG4gICAgICAgICAgfSBlbHNle1xyXG4gICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdGFza3MtY29udFwiKS5pbm5lckhUTUwgPSBgPHAgY2xhc3M9XCJlcnJvclwiPkFsbCBDYXVnaHQgVXAhPC9wPmBcclxuICAgICAgICAgIH1cclxuICAgICAgICA7XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgYnVpbGQ7IiwiLy9NaWNoZWxsZSBUYWJvciAtIFRoaXMgY29tcG9uZW50IGJ1aWxkcyBIVE1MIHN0cmluZ3MgZm9yIHRoZSBmb3Jtc1xyXG5jb25zdCBmb3JtcyA9IHtcclxuLy9uZXcgdGFzayBmb3JtXHJcbm5ld1Rhc2tGb3JtOiAoKT0+e1xyXG5yZXR1cm4gYDxoMz5BZGQgTmV3IFRhc2s8L2gzPlxyXG48aW5wdXQgdHlwZT1cInRleHRhcmVhXCIgbmFtZT1cInRhc2tcIiBpZD1cInRhc2stbmFtZS1pbnB1dFwiIHBsYWNlaG9sZGVyPVwiVGFza1wiPjwvaW5wdXQ+XHJcbjxpbnB1dCB0eXBlPVwiZGF0ZVwiIG5hbWU9XCJkdWVEYXRlXCIgaWQ9XCJ0YXNrLWRhdGUtaW5wdXRcIj48L2lucHV0PmBcclxufSxcclxuLy9lZGl0IHRhc2sgZm9ybVxyXG5lZGl0VGFza0Zvcm06ICgpPT57XHJcblxyXG59LFxyXG5zYXZlQnV0dG9uOiAodXNlcklkKT0+e1xyXG4gICAgcmV0dXJuIGA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cInNhdmVcIiBpZD1cInNhdmUtdGFza3MtYnRuJHt1c2VySWR9XCI+U2F2ZTwvYnV0dG9uPmBcclxufVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmb3JtcyIsIi8vTWljaGVsbGUgVGFib3IgLSBUaGlzIE1vZHVsZSBpcyB0aGUgc3ViLW1haW4gbW9kdWxlIHRoYXQgaG91c2VzIHRoZSBldmVudCBsaXN0ZW5lcnMgZm9yIHRoZSBUYXNrcyBFbGVtZW50XHJcblxyXG4vL2ltcG9ydHNcclxuaW1wb3J0IHByaW50IGZyb20gXCIuL3Rhc2tQcmludFRvRE9NXCI7XHJcbmltcG9ydCBidWlsZCBmcm9tIFwiLi90YXNrc0NvbnRlbnRCdWlsZGVyXCI7XHJcbmltcG9ydCBmb3JtcyBmcm9tIFwiLi90YXNrc0Zvcm1CdWlsZGVyXCI7XHJcbmltcG9ydCBsaXN0ZW4gZnJvbSBcIi4vdGFza0xpc3RlbmVyc1wiO1xyXG5cclxuLy90YXNrcyBtYW5hZ2VyIG1haW4gZnVuY3Rpb25cclxuY29uc3QgdGFza3MgPSB7XHJcbiAgLy9hZnRlciBsb2dpblxyXG4gIGFmdGVyTG9naW46IHVzZXJJZCA9PiB7XHJcbiAgICBpZiAoc2Vzc2lvblN0b3JhZ2UubGVuZ3RoID4gMCkge1xyXG4gICAgICBidWlsZC50YXNrc0xpc3QodXNlcklkKTtcclxuICAgICAgcHJpbnQuYnV0dG9uKHVzZXJJZCk7XHJcbiAgICAgIGxpc3Rlbi5hY3RpdmF0ZU5ld1Rhc2sodXNlcklkKTtcclxuICAgIH1cclxuICB9LFxyXG4gIC8vYWRkIG5ldyB0YXNrIGJ1dHRvblxyXG5cclxuICAvL2VkaXQgdGFza1xyXG5cclxuICAvL2NvbXBsZXRlZCB0YXNrXHJcbiAgY29tcGxldGVkOiAoKSA9PiB7fVxyXG4gIC8vc2F2ZSBlZGl0ZWQgdGFza1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgdGFza3M7XHJcbiIsImltcG9ydCBhcGkgZnJvbSBcIi4vdGFza0FQSU1hbmFnZXJcIlxyXG5pbXBvcnQgb2JqZWN0IGZyb20gXCIuL3Rhc2tPYmplY3RCdWlsZGVyXCJcclxuaW1wb3J0IHRhc2tzIGZyb20gXCIuL3Rhc2tzTWFuYWdlclwiXHJcblxyXG5jb25zdCBhY3RpdmF0ZVNhdmVCdXR0b24gPSAoKSA9PntcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdGFza3MtZm9vdFwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZSA9PntcclxuICAgICAgICBpZihlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJzYXZlXCIpKXtcclxuICAgICAgICAgICAgYXBpLm5ldyhvYmplY3QudGFza09iamVjdChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Rhc2stbmFtZS1pbnB1dFwiKS52YWx1ZSwgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN0YXNrLWRhdGUtaW5wdXRcIikudmFsdWUpKVxyXG4gICAgICAgICAgICAudGhlbigoKT0+e1xyXG4gICAgICAgICAgICAgICAgdGFza3MuYWZ0ZXJMb2dpbihzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKFwiYWN0aXZlVXNlclwiKSlcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICB9KVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBhY3RpdmF0ZVNhdmVCdXR0b24iLCIvL01pY2hlbGxlIFRhYm9yIC0gVGhpcyBtb2R1bGUgYnVpbGRzIGEgc2luZ2xlIGh0bWwgc3RyaW5nXHJcblxyXG4vL2J1aWxkIHNpbmdsZSB0YXNrXHJcbmNvbnN0IGJ1aWxkU2luZ2xlVGFzayA9ICh0YXNrKSA9PntcclxuICAgIHJldHVybiBgPGlucHV0IHR5cGU9XCJjaGVja2JveFwiIGlkPVwidGFzay1jaGVja1wiPjxzdHJvbmc+JHt0YXNrLmR1ZURhdGV9PC9zdHJvbmc+IC0gJHt0YXNrLnRhc2t9PC9pbnB1dD48YnIgLz5gXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGJ1aWxkU2luZ2xlVGFzayIsImltcG9ydCB0YXNrcyBmcm9tIFwiLi9UYXNrcy90YXNrc01hbmFnZXJcIlxyXG5cclxuc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShcImFjdGl2ZVVzZXJcIiwgMSlcclxuY29uc29sZS5sb2coc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShcImFjdGl2ZVVzZXJcIikpXHJcblxyXG50YXNrcy5hZnRlckxvZ2luKHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oXCJhY3RpdmVVc2VyXCIpKTtcclxuIl19
