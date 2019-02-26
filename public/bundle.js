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

},{"./taskListeners":2,"./taskPrintToDOM":4,"./tasksContentBuilder":5}],8:[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9zY3JpcHRzL1Rhc2tzL3Rhc2tBUElNYW5hZ2VyLmpzIiwiLi4vc2NyaXB0cy9UYXNrcy90YXNrTGlzdGVuZXJzLmpzIiwiLi4vc2NyaXB0cy9UYXNrcy90YXNrT2JqZWN0QnVpbGRlci5qcyIsIi4uL3NjcmlwdHMvVGFza3MvdGFza1ByaW50VG9ET00uanMiLCIuLi9zY3JpcHRzL1Rhc2tzL3Rhc2tzQ29udGVudEJ1aWxkZXIuanMiLCIuLi9zY3JpcHRzL1Rhc2tzL3Rhc2tzRm9ybUJ1aWxkZXIuanMiLCIuLi9zY3JpcHRzL1Rhc2tzL3Rhc2tzTWFuYWdlci5qcyIsIi4uL3NjcmlwdHMvVGFza3MvdGFza3NTYXZlQnV0dG9uLmpzIiwiLi4vc2NyaXB0cy9UYXNrcy90YXNrc1NpbmdsZUNvbXBvbmVudEJ1aWxkZXIuanMiLCIuLi9zY3JpcHRzL21haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7QUNBQTtBQUVBO0FBRUEsTUFBTSxHQUFHLEdBQUc7QUFDUjtBQUNBLEVBQUEsR0FBRyxFQUFHLE1BQUQsSUFBWTtBQUNiLFdBQU8sS0FBSyxDQUFFLHNDQUFxQyxNQUFPLGlCQUE5QyxDQUFMLENBQ0YsSUFERSxDQUNHLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBRixFQURSLENBQVA7QUFFSCxHQUxPO0FBTVI7QUFDSixFQUFBLEdBQUcsRUFBRSxVQUFELElBQWM7QUFDZCxXQUFPLEtBQUssQ0FBQyw2QkFBRCxFQUErQjtBQUN2QyxNQUFBLE1BQU0sRUFBRSxNQUQrQjtBQUVuQyxNQUFBLE9BQU8sRUFBRTtBQUNMLHdCQUFnQjtBQURYLE9BRjBCO0FBS25DLE1BQUEsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFMLENBQWUsVUFBZjtBQUw2QixLQUEvQixDQUFMLENBTUEsSUFOQSxDQU1LLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBRixFQU5WLENBQVA7QUFRSCxH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Ozs7OztBQ2ZmO0FBRUE7QUFDQSxNQUFNLGVBQWUsR0FBSSxJQUFELElBQVM7QUFDN0IsU0FBUSxrREFBaUQsSUFBSSxDQUFDLE9BQVEsZUFBYyxJQUFJLENBQUMsSUFBSyxnQkFBOUY7QUFDSCxDQUZEOztlQUllLGU7Ozs7OztBQ1BmOzs7O0FBRUEsY0FBYyxDQUFDLE9BQWYsQ0FBdUIsWUFBdkIsRUFBcUMsQ0FBckM7QUFDQSxPQUFPLENBQUMsR0FBUixDQUFZLGNBQWMsQ0FBQyxPQUFmLENBQXVCLFlBQXZCLENBQVo7O0FBRUEsc0JBQU0sVUFBTixDQUFpQixjQUFjLENBQUMsT0FBZixDQUF1QixZQUF2QixDQUFqQiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsIi8vTWljaGVsbGUgVGFib3IgLSBUaGlzIG1vZHVsZSB3aWxsIGhvdXNlIEFQSSBjYWxscyB0aGF0IGFyZSBmb3IgdGhlIHRhc2tzIGVsZW1lbnRcclxuXHJcbi8vZmV0Y2ggY2FsbHNcclxuXHJcbmNvbnN0IGFwaSA9IHtcclxuICAgIC8vR2V0IGFsbCB0YXNrc1xyXG4gICAgYWxsOiAodXNlcklkKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIGZldGNoKGBodHRwOi8vbG9jYWxob3N0OjgwODgvdGFza3M/dXNlcklkPSR7dXNlcklkfSZjb21wbGV0ZT1mYWxzZWApXHJcbiAgICAgICAgICAgIC50aGVuKHIgPT4gci5qc29uKCkpXHJcbiAgICB9LFxyXG4gICAgLy9QT1NUIG5ldyB0YXNrXHJcbm5ldzoodGFza09iamVjdCk9PntcclxuICAgIHJldHVybiBmZXRjaChcImh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC90YXNrc1wiLHtcclxuICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxyXG4gICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh0YXNrT2JqZWN0KVxyXG4gICAgICAgIH0pLnRoZW4ociA9PiByLmpzb24oKSlcclxuXHJcbn1cclxuICAgIC8vUFVUIG5ldyBlZGl0ZWQgdGFza1xyXG5cclxuICAgIC8vUEFUQ0ggY29tcGxldGVkIHRhc2tcclxufVxyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGFwaSIsImltcG9ydCBwcmludCBmcm9tIFwiLi90YXNrUHJpbnRUb0RPTVwiXHJcbmltcG9ydCBhY3RpdmF0ZVNhdmVCdXR0b24gZnJvbSBcIi4vdGFza3NTYXZlQnV0dG9uXCI7XHJcblxyXG5cclxuY29uc3QgbGlzdGVuID17XHJcbiAgICBhY3RpdmF0ZU5ld1Rhc2s6ICh1c2VySWQpID0+IHtcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Rhc2tzLWZvb3RcIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGUgPT4ge1xyXG4gICAgICAgIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJuZXdcIikpIHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKGUpO1xyXG4gICAgICAgICAgcHJpbnQubmV3VGFza0Zvcm0oKTtcclxuICAgICAgICAgIHByaW50LnNhdmVCdXR0b24odXNlcklkKTtcclxuICAgICAgICAgIGFjdGl2YXRlU2F2ZUJ1dHRvbjtcclxuICAgICAgICB9XHJcbn1cclxuICAgIClcclxufSxcclxuXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGxpc3RlbiIsIi8vTWljaGVsbGUgVGFib3IgLSBUaGlzIG1vZHVsZSBidWlsZHMgb2JqZWN0cyB0aGF0IHdpbGwgYmUgcG9zdGVkIHRvIHRoZSBkYXRhYmFzZVxyXG4vL2ltcG9ydHNcclxuXHJcbmNvbnN0IG9iamVjdCA9IHtcclxuICAvL3VzZSBmb3IgbmV3IGFuZCBlZGl0ZWQgdGFza3NcclxuICB0YXNrT2JqZWN0OiAodGFzaywgZHVlRGF0ZSkgPT4ge1xyXG4gICAgcmV0dXJuIGB7XHJcbiAgICAgICAgdXNlcklkOiAke3Nlc3Npb25TdG9yYWdlLmdldEl0ZW0oXCJhY3RpdmVVc2VyXCIpfSxcclxuICAgICAgICB0YXNrOiAke3Rhc2t9LFxyXG4gICAgICAgIFwiZHVlRGF0ZVwiOiAke2R1ZURhdGV9LFxyXG4gICAgICAgIFwiY29tcGxldGVcIjogZmFsc2UgIFxyXG4gICAgfWA7XHJcbiAgfSxcclxuICAvL3BhcnQgb2YgYSB0YXNrXHJcbiAgY29tcGxldGVUYXNrT2JqZWN0OiB0ZiA9PiB7XHJcbiAgICByZXR1cm4gYHtjb21wbGV0ZTogJHt0Zn19YDtcclxuICB9XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBvYmplY3RcclxuIiwiLy9NaWNoZWxsZSBUYWJvciAtIFRoaXMgbW9kdWxlIGhvdXNlcyBmdW5jdGlvbnMgdGhhdCB3aWxsIHByaW50IGl0ZW1zIHRvIHRoZSBET01cclxuXHJcbi8vaW1wb3J0c1xyXG5pbXBvcnQgZm9ybSBmcm9tIFwiLi90YXNrc0Zvcm1CdWlsZGVyXCI7XHJcblxyXG4vL3ByaW50IGZ1bmN0aW9uIG9iamVjdFxyXG5jb25zdCBwcmludCA9IHtcclxuICAvL2J1dHRvbiBmb3IgbmV3IHRhc2tcclxuICBidXR0b246IHVzZXJJZCA9PiB7XHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxyXG4gICAgICBcIiN0YXNrcy1mb290XCJcclxuICAgICkuaW5uZXJIVE1MID0gYDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwibmV3XCIgaWQ9XCJ0YXNrcy1uZXctYnRuLSR7dXNlcklkfVwiPkFkZCBOZXcgVGFzazwvYnV0dG9uPmA7XHJcbiAgfSxcclxuICAvL3ByaW50IGZvcm1cclxuXHJcbiAgbmV3VGFza0Zvcm06ICgpID0+IHtcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdGFza3MtY29udFwiKS5pbm5lckhUTUwgPSBmb3JtLm5ld1Rhc2tGb3JtKCk7XHJcbiAgfSxcclxuICAvL3ByaW50IGVkaXQgZm9ybVxyXG4gIGVkaXRGb3JtOiAoKSA9PiB7XHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Rhc2tzLWNvbnRcIikuaW5uZXJIVE1MID0gZm9ybS5lZGl0Rm9ybSgpO1xyXG4gIH0sXHJcbiAgc2F2ZUJ1dHRvbjogKCk9PntcclxuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN0YXNrcy1mb290XCIpLmlubmVySFRNTCA9IGZvcm0uc2F2ZUJ1dHRvbigpO1xyXG4gIH1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHByaW50O1xyXG4iLCIvL01pY2hlbGxlIFRhYm9yIC0gVGhpcyBtb2R1bGUgYnVpbGRzIHRoZSBlbnRpcmUgY29tcG9uZW50IEhUTUwgU3RyaW5nXHJcblxyXG4vL2ltcG9ydHNcclxuaW1wb3J0IGFwaSBmcm9tIFwiLi90YXNrQVBJTWFuYWdlclwiO1xyXG5pbXBvcnQgYnVpbGRTaW5nbGVUYXNrIGZyb20gXCIuL3Rhc2tzU2luZ2xlQ29tcG9uZW50QnVpbGRlclwiO1xyXG5cclxuLy9idWlsZHMgdGFzayBsaXN0IGFuZCBwcmludHMgaXQgdG8gdGhlIERPTVxyXG5jb25zdCBidWlsZCA9IHtcclxuICB0YXNrc0xpc3Q6IHVzZXJJZCA9PiB7XHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Rhc2tzLWNvbnRcIikuaW5uZXJIVE1MID0gXCJcIjtcclxuICAgIGFwaS5hbGwodXNlcklkKS50aGVuKHRhc2tzID0+IHtcclxuICAgICAgdGFza3MuZm9yRWFjaChzaW5nbGVUYXNrID0+IHtcclxuICAgICAgICAgIGlmKHRhc2tzLmNvbXBsZXRlICE9PSB0cnVlKXtcclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhzaW5nbGVUYXNrKVxyXG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Rhc2tzLWNvbnRcIikuaW5uZXJIVE1MICs9IGJ1aWxkU2luZ2xlVGFzayhzaW5nbGVUYXNrKVxyXG4gICAgICAgICAgfSBlbHNle1xyXG4gICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdGFza3MtY29udFwiKS5pbm5lckhUTUwgPSBgPHAgY2xhc3M9XCJlcnJvclwiPkFsbCBDYXVnaHQgVXAhPC9wPmBcclxuICAgICAgICAgIH1cclxuICAgICAgICA7XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgYnVpbGQ7IiwiLy9NaWNoZWxsZSBUYWJvciAtIFRoaXMgY29tcG9uZW50IGJ1aWxkcyBIVE1MIHN0cmluZ3MgZm9yIHRoZSBmb3Jtc1xyXG5jb25zdCBmb3JtcyA9IHtcclxuLy9uZXcgdGFzayBmb3JtXHJcbm5ld1Rhc2tGb3JtOiAoKT0+e1xyXG5yZXR1cm4gYDxoMz5BZGQgTmV3IFRhc2s8L2gzPlxyXG48aW5wdXQgdHlwZT1cInRleHRhcmVhXCIgbmFtZT1cInRhc2tcIiBpZD1cInRhc2stbmFtZS1pbnB1dFwiIHBsYWNlaG9sZGVyPVwiVGFza1wiPjwvaW5wdXQ+XHJcbjxpbnB1dCB0eXBlPVwiZGF0ZVwiIG5hbWU9XCJkdWVEYXRlXCIgaWQ9XCJ0YXNrLWRhdGUtaW5wdXRcIj48L2lucHV0PmBcclxufSxcclxuLy9lZGl0IHRhc2sgZm9ybVxyXG5lZGl0VGFza0Zvcm06ICgpPT57XHJcblxyXG59LFxyXG5zYXZlQnV0dG9uOiAodXNlcklkKT0+e1xyXG4gICAgcmV0dXJuIGA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cInNhdmVcIiBpZD1cInNhdmUtdGFza3MtYnRuJHt1c2VySWR9XCI+U2F2ZTwvYnV0dG9uPmBcclxufVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmb3JtcyIsIi8vTWljaGVsbGUgVGFib3IgLSBUaGlzIE1vZHVsZSBpcyB0aGUgc3ViLW1haW4gbW9kdWxlIHRoYXQgaG91c2VzIHRoZSBldmVudCBsaXN0ZW5lcnMgZm9yIHRoZSBUYXNrcyBFbGVtZW50XHJcblxyXG4vL2ltcG9ydHNcclxuaW1wb3J0IHByaW50IGZyb20gXCIuL3Rhc2tQcmludFRvRE9NXCI7XHJcbmltcG9ydCBidWlsZCBmcm9tIFwiLi90YXNrc0NvbnRlbnRCdWlsZGVyXCI7XHJcbmltcG9ydCBsaXN0ZW4gZnJvbSBcIi4vdGFza0xpc3RlbmVyc1wiO1xyXG5cclxuLy90YXNrcyBtYW5hZ2VyIG1haW4gZnVuY3Rpb25cclxuY29uc3QgdGFza3MgPSB7XHJcbiAgLy9hZnRlciBsb2dpblxyXG4gIGFmdGVyTG9naW46IHVzZXJJZCA9PiB7XHJcbiAgICBpZiAoc2Vzc2lvblN0b3JhZ2UubGVuZ3RoID4gMCkge1xyXG4gICAgICBidWlsZC50YXNrc0xpc3QodXNlcklkKTtcclxuICAgICAgcHJpbnQuYnV0dG9uKHVzZXJJZCk7XHJcbiAgICAgIGxpc3Rlbi5hY3RpdmF0ZU5ld1Rhc2sodXNlcklkKTtcclxuICAgIH1cclxuICB9LFxyXG4gIC8vYWRkIG5ldyB0YXNrIGJ1dHRvblxyXG5cclxuICAvL2VkaXQgdGFza1xyXG5cclxuICAvL2NvbXBsZXRlZCB0YXNrXHJcbiAgY29tcGxldGVkOiAoKSA9PiB7fVxyXG4gIC8vc2F2ZSBlZGl0ZWQgdGFza1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgdGFza3M7XHJcbiIsImltcG9ydCBhcGkgZnJvbSBcIi4vdGFza0FQSU1hbmFnZXJcIlxyXG5pbXBvcnQgb2JqZWN0IGZyb20gXCIuL3Rhc2tPYmplY3RCdWlsZGVyXCJcclxuaW1wb3J0IHRhc2tzIGZyb20gXCIuL3Rhc2tzTWFuYWdlclwiXHJcblxyXG5jb25zdCBhY3RpdmF0ZVNhdmVCdXR0b24gPSAoKSA9PntcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdGFza3MtZm9vdFwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZSA9PntcclxuICAgICAgICBpZihlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJzYXZlXCIpKXtcclxuICAgICAgICAgICAgYXBpLm5ldyhvYmplY3QudGFza09iamVjdChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Rhc2stbmFtZS1pbnB1dFwiKS52YWx1ZSwgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN0YXNrLWRhdGUtaW5wdXRcIikudmFsdWUpKVxyXG4gICAgICAgICAgICAudGhlbigoKT0+e1xyXG4gICAgICAgICAgICAgICAgdGFza3MuYWZ0ZXJMb2dpbihzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKFwiYWN0aXZlVXNlclwiKSlcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICB9KVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBhY3RpdmF0ZVNhdmVCdXR0b24iLCIvL01pY2hlbGxlIFRhYm9yIC0gVGhpcyBtb2R1bGUgYnVpbGRzIGEgc2luZ2xlIGh0bWwgc3RyaW5nXHJcblxyXG4vL2J1aWxkIHNpbmdsZSB0YXNrXHJcbmNvbnN0IGJ1aWxkU2luZ2xlVGFzayA9ICh0YXNrKSA9PntcclxuICAgIHJldHVybiBgPGlucHV0IHR5cGU9XCJjaGVja2JveFwiIGlkPVwidGFzay1jaGVja1wiPjxzdHJvbmc+JHt0YXNrLmR1ZURhdGV9PC9zdHJvbmc+IC0gJHt0YXNrLnRhc2t9PC9pbnB1dD48YnIgLz5gXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGJ1aWxkU2luZ2xlVGFzayIsImltcG9ydCB0YXNrcyBmcm9tIFwiLi9UYXNrcy90YXNrc01hbmFnZXJcIlxyXG5cclxuc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShcImFjdGl2ZVVzZXJcIiwgMSlcclxuY29uc29sZS5sb2coc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShcImFjdGl2ZVVzZXJcIikpXHJcblxyXG50YXNrcy5hZnRlckxvZ2luKHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oXCJhY3RpdmVVc2VyXCIpKTtcclxuIl19
