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
  } //POST new task
  //PUT new edited task
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

var _tasksContentBuilder = _interopRequireDefault(require("./tasksContentBuilder"));

var _tasksFormBuilder = _interopRequireDefault(require("./tasksFormBuilder"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//Michelle Tabor - This module houses functions that will print items to the DOM
//imports
//print function object
const print = {
  //print all uncompleted tasks
  userTasks: userId => {
    document.querySelector("#tasks-cont").innerHTML = _tasksContentBuilder.default.taskList(userId);
  },
  //print form
  newTaskForm: () => {
    document.querySelector("#tasks-cont").innerHTML = _tasksFormBuilder.default.newTaskForm();
  },
  //print edit form
  editForm: () => {
    document.querySelector("#tasks-cont").innerHTML = _tasksFormBuilder.default.editForm();
  }
};
var _default = print;
exports.default = _default;

},{"./tasksContentBuilder":3,"./tasksFormBuilder":4}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tasksSingleComponentBuilder = _interopRequireDefault(require("./tasksSingleComponentBuilder"));

var _taskAPIManager = _interopRequireDefault(require("./taskAPIManager"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//Michelle Tabor - This module builds the entire component HTML String
//imports
//build task list
const build = {
  taskList: userId => {
    _taskAPIManager.default.all(userId).then(tasks => tasks.forEach(task => {
      console.log(task);

      if (task.complete === true) {
        return htmlString += (0, _tasksSingleComponentBuilder.default)(task.dueDate, task.task);
      } else {}
    }));
  }
};
var _default = build;
exports.default = _default;

},{"./taskAPIManager":1,"./tasksSingleComponentBuilder":6}],4:[function(require,module,exports){
//Michelle Tabor - This component builds HTML strings for the forms
//new task form
//edit task form
"use strict";

},{}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _taskPrintToDOM = _interopRequireDefault(require("./taskPrintToDOM"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//Michelle Tabor - This Module is the sub-main module that houses the event listeners for the Tasks Element
//imports
//tasks manager main function
const tasks = {
  //after login
  afterLogin: userId => {
    if (sessionStorage.length > 0) {
      _taskPrintToDOM.default.userTasks(userId);
    } else {}
  } //add new task button
  //edit task
  //completed task
  //save edited task

};
var _default = tasks;
exports.default = _default;

},{"./taskPrintToDOM":2}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

//Michelle Tabor - This module builds a single html string
//build single task
const singleTask = (dueDate, taskName) => {
  return `<input type="checkbox id="task-check"></input><p><strong>${dueDate}</strong> - ${taskName}`;
};

var _default = singleTask;
exports.default = _default;

},{}],7:[function(require,module,exports){
"use strict";

var _tasksManager = _interopRequireDefault(require("./Tasks/tasksManager"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

sessionStorage.setItem("activeUser", 1);
console.log(sessionStorage.getItem("activeUser"));

_tasksManager.default.afterLogin(sessionStorage.getItem("activeUser"));

},{"./Tasks/tasksManager":5}]},{},[7])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9zY3JpcHRzL1Rhc2tzL3Rhc2tBUElNYW5hZ2VyLmpzIiwiLi4vc2NyaXB0cy9UYXNrcy90YXNrUHJpbnRUb0RPTS5qcyIsIi4uL3NjcmlwdHMvVGFza3MvdGFza3NDb250ZW50QnVpbGRlci5qcyIsIi4uL3NjcmlwdHMvVGFza3MvdGFza3NGb3JtQnVpbGRlci5qcyIsIi4uL3NjcmlwdHMvVGFza3MvdGFza3NNYW5hZ2VyLmpzIiwiLi4vc2NyaXB0cy9UYXNrcy90YXNrc1NpbmdsZUNvbXBvbmVudEJ1aWxkZXIuanMiLCIuLi9zY3JpcHRzL21haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7QUNBQTtBQUVBO0FBRUEsTUFBTSxHQUFHLEdBQUc7QUFDUjtBQUNBLEVBQUEsR0FBRyxFQUFHLE1BQUQsSUFBWTtBQUNiLFdBQU8sS0FBSyxDQUFFLHNDQUFxQyxNQUFPLEVBQTlDLENBQUwsQ0FDRixJQURFLENBQ0csQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFGLEVBRFIsQ0FBUDtBQUVILEdBTE8sQ0FNUjtBQUVBO0FBRUE7O0FBVlEsQ0FBWjtlQWNlLEc7Ozs7Ozs7Ozs7O0FDZmY7O0FBQ0E7Ozs7QUFKQTtBQUVBO0FBSUE7QUFDQSxNQUFNLEtBQUssR0FBRztBQUNOO0FBQ0EsRUFBQSxTQUFTLEVBQUcsTUFBRCxJQUFZO0FBQ25CLElBQUEsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsYUFBdkIsRUFBc0MsU0FBdEMsR0FBa0QsNkJBQU0sUUFBTixDQUFlLE1BQWYsQ0FBbEQ7QUFDSCxHQUpLO0FBT047QUFFQSxFQUFBLFdBQVcsRUFBRSxNQUFNO0FBQzNCLElBQUEsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsYUFBdkIsRUFBc0MsU0FBdEMsR0FBa0QsMEJBQUssV0FBTCxFQUFsRDtBQUVTLEdBWks7QUFhTjtBQUNBLEVBQUEsUUFBUSxFQUFFLE1BQU07QUFDWixJQUFBLFFBQVEsQ0FBQyxhQUFULENBQXVCLGFBQXZCLEVBQXNDLFNBQXRDLEdBQWtELDBCQUFLLFFBQUwsRUFBbEQ7QUFDSDtBQWhCSyxDQUFkO2VBbUJlLEs7Ozs7Ozs7Ozs7O0FDdkJmOztBQUNBOzs7O0FBSkE7QUFFQTtBQUdBO0FBQ0EsTUFBTSxLQUFLLEdBQUc7QUFDVixFQUFBLFFBQVEsRUFBRyxNQUFELElBQVk7QUFDbEIsNEJBQUksR0FBSixDQUFRLE1BQVIsRUFDSyxJQURMLENBQ1csS0FBRCxJQUFXLEtBQUssQ0FBQyxPQUFOLENBQWMsSUFBSSxJQUFJO0FBQ25DLE1BQUEsT0FBTyxDQUFDLEdBQVIsQ0FBWSxJQUFaOztBQUNBLFVBQUksSUFBSSxDQUFDLFFBQUwsS0FBa0IsSUFBdEIsRUFBNEI7QUFDeEIsZUFBTyxVQUFVLElBQUksMENBQU8sSUFBSSxDQUFDLE9BQVosRUFBcUIsSUFBSSxDQUFDLElBQTFCLENBQXJCO0FBQ0gsT0FGRCxNQUVPLENBQUU7QUFDWixLQUxnQixDQURyQjtBQU9IO0FBVFMsQ0FBZDtlQVllLEs7Ozs7QUNsQmY7QUFFQTtBQUVBOzs7Ozs7Ozs7OztBQ0RBOzs7O0FBSEE7QUFFQTtBQUdBO0FBQ0EsTUFBTSxLQUFLLEdBQUc7QUFDVjtBQUNBLEVBQUEsVUFBVSxFQUFHLE1BQUQsSUFBWTtBQUNwQixRQUFJLGNBQWMsQ0FBQyxNQUFmLEdBQXdCLENBQTVCLEVBQStCO0FBQzNCLDhCQUFNLFNBQU4sQ0FBZ0IsTUFBaEI7QUFDSCxLQUZELE1BRU8sQ0FBRTtBQUNaLEdBTlMsQ0FPVjtBQUVBO0FBRUE7QUFFQTs7QUFiVSxDQUFkO2VBZ0JlLEs7Ozs7Ozs7Ozs7O0FDdEJmO0FBRUE7QUFDQSxNQUFNLFVBQVUsR0FBRyxDQUFDLE9BQUQsRUFBVSxRQUFWLEtBQXNCO0FBQ3JDLFNBQVEsNERBQTJELE9BQVEsZUFBYyxRQUFTLEVBQWxHO0FBQ0gsQ0FGRDs7ZUFJZSxVOzs7Ozs7QUNQZjs7OztBQUVBLGNBQWMsQ0FBQyxPQUFmLENBQXVCLFlBQXZCLEVBQXFDLENBQXJDO0FBQ0EsT0FBTyxDQUFDLEdBQVIsQ0FBWSxjQUFjLENBQUMsT0FBZixDQUF1QixZQUF2QixDQUFaOztBQUVBLHNCQUFNLFVBQU4sQ0FBaUIsY0FBYyxDQUFDLE9BQWYsQ0FBdUIsWUFBdkIsQ0FBakIiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCIvL01pY2hlbGxlIFRhYm9yIC0gVGhpcyBtb2R1bGUgd2lsbCBob3VzZSBBUEkgY2FsbHMgdGhhdCBhcmUgZm9yIHRoZSB0YXNrcyBlbGVtZW50XHJcblxyXG4vL2ZldGNoIGNhbGxzXHJcblxyXG5jb25zdCBhcGkgPSB7XHJcbiAgICAvL0dldCBhbGwgdGFza3NcclxuICAgIGFsbDogKHVzZXJJZCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBmZXRjaChgaHR0cDovL2xvY2FsaG9zdDo4MDg4L3Rhc2tzP3VzZXJJZD0ke3VzZXJJZH1gKVxyXG4gICAgICAgICAgICAudGhlbihyID0+IHIuanNvbigpKVxyXG4gICAgfVxyXG4gICAgLy9QT1NUIG5ldyB0YXNrXHJcblxyXG4gICAgLy9QVVQgbmV3IGVkaXRlZCB0YXNrXHJcblxyXG4gICAgLy9QQVRDSCBjb21wbGV0ZWQgdGFza1xyXG59XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgYXBpIiwiLy9NaWNoZWxsZSBUYWJvciAtIFRoaXMgbW9kdWxlIGhvdXNlcyBmdW5jdGlvbnMgdGhhdCB3aWxsIHByaW50IGl0ZW1zIHRvIHRoZSBET01cclxuXHJcbi8vaW1wb3J0c1xyXG5pbXBvcnQgYnVpbGQgZnJvbSBcIi4vdGFza3NDb250ZW50QnVpbGRlclwiXHJcbmltcG9ydCBmb3JtIGZyb20gXCIuL3Rhc2tzRm9ybUJ1aWxkZXJcIlxyXG5cclxuLy9wcmludCBmdW5jdGlvbiBvYmplY3RcclxuY29uc3QgcHJpbnQgPSB7XHJcbiAgICAgICAgLy9wcmludCBhbGwgdW5jb21wbGV0ZWQgdGFza3NcclxuICAgICAgICB1c2VyVGFza3M6ICh1c2VySWQpID0+IHtcclxuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN0YXNrcy1jb250XCIpLmlubmVySFRNTCA9IGJ1aWxkLnRhc2tMaXN0KHVzZXJJZClcclxuICAgICAgICB9LFxyXG5cclxuXHJcbiAgICAgICAgLy9wcmludCBmb3JtXHJcblxyXG4gICAgICAgIG5ld1Rhc2tGb3JtOiAoKSA9PiB7XHJcbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdGFza3MtY29udFwiKS5pbm5lckhUTUwgPSBmb3JtLm5ld1Rhc2tGb3JtKClcclxuXHJcbiAgICAgICAgfSxcclxuICAgICAgICAvL3ByaW50IGVkaXQgZm9ybVxyXG4gICAgICAgIGVkaXRGb3JtOiAoKSA9PiB7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdGFza3MtY29udFwiKS5pbm5lckhUTUwgPSBmb3JtLmVkaXRGb3JtKClcclxuICAgICAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHByaW50IiwiLy9NaWNoZWxsZSBUYWJvciAtIFRoaXMgbW9kdWxlIGJ1aWxkcyB0aGUgZW50aXJlIGNvbXBvbmVudCBIVE1MIFN0cmluZ1xyXG5cclxuLy9pbXBvcnRzXHJcbmltcG9ydCBzaW5nbGUgZnJvbSBcIi4vdGFza3NTaW5nbGVDb21wb25lbnRCdWlsZGVyXCJcclxuaW1wb3J0IGFwaSBmcm9tIFwiLi90YXNrQVBJTWFuYWdlclwiXHJcbi8vYnVpbGQgdGFzayBsaXN0XHJcbmNvbnN0IGJ1aWxkID0ge1xyXG4gICAgdGFza0xpc3Q6ICh1c2VySWQpID0+IHtcclxuICAgICAgICBhcGkuYWxsKHVzZXJJZClcclxuICAgICAgICAgICAgLnRoZW4oKHRhc2tzKSA9PiB0YXNrcy5mb3JFYWNoKHRhc2sgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2codGFzaylcclxuICAgICAgICAgICAgICAgIGlmICh0YXNrLmNvbXBsZXRlID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGh0bWxTdHJpbmcgKz0gc2luZ2xlKHRhc2suZHVlRGF0ZSwgdGFzay50YXNrKVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHt9XHJcbiAgICAgICAgICAgIH0pKVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBidWlsZCIsIi8vTWljaGVsbGUgVGFib3IgLSBUaGlzIGNvbXBvbmVudCBidWlsZHMgSFRNTCBzdHJpbmdzIGZvciB0aGUgZm9ybXNcclxuXHJcbi8vbmV3IHRhc2sgZm9ybVxyXG5cclxuLy9lZGl0IHRhc2sgZm9ybSIsIi8vTWljaGVsbGUgVGFib3IgLSBUaGlzIE1vZHVsZSBpcyB0aGUgc3ViLW1haW4gbW9kdWxlIHRoYXQgaG91c2VzIHRoZSBldmVudCBsaXN0ZW5lcnMgZm9yIHRoZSBUYXNrcyBFbGVtZW50XHJcblxyXG4vL2ltcG9ydHNcclxuaW1wb3J0IHByaW50IGZyb20gXCIuL3Rhc2tQcmludFRvRE9NXCJcclxuXHJcbi8vdGFza3MgbWFuYWdlciBtYWluIGZ1bmN0aW9uXHJcbmNvbnN0IHRhc2tzID0ge1xyXG4gICAgLy9hZnRlciBsb2dpblxyXG4gICAgYWZ0ZXJMb2dpbjogKHVzZXJJZCkgPT4ge1xyXG4gICAgICAgIGlmIChzZXNzaW9uU3RvcmFnZS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIHByaW50LnVzZXJUYXNrcyh1c2VySWQpXHJcbiAgICAgICAgfSBlbHNlIHt9XHJcbiAgICB9XHJcbiAgICAvL2FkZCBuZXcgdGFzayBidXR0b25cclxuXHJcbiAgICAvL2VkaXQgdGFza1xyXG5cclxuICAgIC8vY29tcGxldGVkIHRhc2tcclxuXHJcbiAgICAvL3NhdmUgZWRpdGVkIHRhc2tcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgdGFza3MiLCIvL01pY2hlbGxlIFRhYm9yIC0gVGhpcyBtb2R1bGUgYnVpbGRzIGEgc2luZ2xlIGh0bWwgc3RyaW5nXHJcblxyXG4vL2J1aWxkIHNpbmdsZSB0YXNrXHJcbmNvbnN0IHNpbmdsZVRhc2sgPSAoZHVlRGF0ZSwgdGFza05hbWUpID0+e1xyXG4gICAgcmV0dXJuIGA8aW5wdXQgdHlwZT1cImNoZWNrYm94IGlkPVwidGFzay1jaGVja1wiPjwvaW5wdXQ+PHA+PHN0cm9uZz4ke2R1ZURhdGV9PC9zdHJvbmc+IC0gJHt0YXNrTmFtZX1gXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHNpbmdsZVRhc2siLCJpbXBvcnQgdGFza3MgZnJvbSBcIi4vVGFza3MvdGFza3NNYW5hZ2VyXCJcclxuXHJcbnNlc3Npb25TdG9yYWdlLnNldEl0ZW0oXCJhY3RpdmVVc2VyXCIsIDEpXHJcbmNvbnNvbGUubG9nKHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oXCJhY3RpdmVVc2VyXCIpKVxyXG5cclxudGFza3MuYWZ0ZXJMb2dpbihzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKFwiYWN0aXZlVXNlclwiKSk7XHJcbiJdfQ==
