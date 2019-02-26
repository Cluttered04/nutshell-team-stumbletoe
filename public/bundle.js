(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

var _articleList = _interopRequireDefault(require("./news/articleList"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _articleList.default)();

},{"./news/articleList":3}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const newsCollection = {
  saveNewArticle: newsObj => {
    return fetch("http://localhost:8088/news", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newsObj)
    });
  },
  getAllArticles: () => {
    //   const activeUserId = sessionStorage.getItem("activeUser");
    return fetch(`http://localhost:8088/news?userId=1`).then(r => r.json());
  },
  deleteArticle: newsId => {
    return fetch(`http://localhost:8088/news/${newsId}`, {
      method: "DELETE"
    });
  },
  getSingleArticle: newsId => {
    return fetch(`http://localhost:8088/news/${newsId}`).then(r => r.json());
  },
  editArticle: (newsId, newsObj) => {
    return fetch(`http://localhost:8088/news/${newsId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newsObj)
    });
  }
};
var _default = newsCollection;
exports.default = _default;

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _singleArticle = _interopRequireDefault(require("./singleArticle.js"));

var _apiManager = _interopRequireDefault(require("./apiManager.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const articleList = () => {
  console.log("Inside article list");
  document.querySelector("#news-cont").innerHTML = "";

  _apiManager.default.getAllArticles().then(news => {
    news.forEach(singleArticle => {
      document.querySelector("#news-cont").innerHTML += (0, _singleArticle.default)(singleArticle);
    });
  });
};

var _default = articleList;
exports.default = _default;

},{"./apiManager.js":2,"./singleArticle.js":4}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const article = singleNewsObj => {
  console.log("Inside article");
  return `<div>
    <h3>${singleNewsObj.title}</h3>
    <p>${singleNewsObj.url}</p>
    <p>${singleNewsObj.synopsis}</p>
    <button class="btn" id="delete-news-${singleNewsObj.id}">Delete</button>
    <button class="btn" id="edit-news-${singleNewsObj.id}">Edit</button>
 </div>`;
};

var _default = article;
exports.default = _default;

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9zY3JpcHRzL21haW4uanMiLCIuLi9zY3JpcHRzL25ld3MvYXBpTWFuYWdlci5qcyIsIi4uL3NjcmlwdHMvbmV3cy9hcnRpY2xlTGlzdC5qcyIsIi4uL3NjcmlwdHMvbmV3cy9zaW5nbGVBcnRpY2xlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQTs7OztBQUVBOzs7Ozs7Ozs7QUNGQSxNQUFNLGNBQWMsR0FBRztBQUNuQixFQUFBLGNBQWMsRUFBRSxPQUFPLElBQUk7QUFDekIsV0FBTyxLQUFLLENBQUMsNEJBQUQsRUFBK0I7QUFDekMsTUFBQSxNQUFNLEVBQUUsTUFEaUM7QUFFekMsTUFBQSxPQUFPLEVBQUU7QUFDUCx3QkFBZ0I7QUFEVCxPQUZnQztBQUt6QyxNQUFBLElBQUksRUFBRSxJQUFJLENBQUMsU0FBTCxDQUFlLE9BQWY7QUFMbUMsS0FBL0IsQ0FBWjtBQU9ELEdBVGtCO0FBVW5CLEVBQUEsY0FBYyxFQUFFLE1BQU07QUFDdEI7QUFDRSxXQUFPLEtBQUssQ0FBRSxxQ0FBRixDQUFMLENBQTZDLElBQTdDLENBQWtELENBQUMsSUFBSSxDQUFDLENBQUMsSUFBRixFQUF2RCxDQUFQO0FBQ0QsR0Fia0I7QUFjbkIsRUFBQSxhQUFhLEVBQUcsTUFBRCxJQUFZO0FBQ3pCLFdBQU8sS0FBSyxDQUFFLDhCQUE2QixNQUFPLEVBQXRDLEVBQXlDO0FBQ25ELE1BQUEsTUFBTSxFQUFFO0FBRDJDLEtBQXpDLENBQVo7QUFHRCxHQWxCa0I7QUFtQm5CLEVBQUEsZ0JBQWdCLEVBQUcsTUFBRCxJQUFZO0FBQzVCLFdBQU8sS0FBSyxDQUFFLDhCQUE2QixNQUFPLEVBQXRDLENBQUwsQ0FDTixJQURNLENBQ0QsQ0FBQyxJQUFHLENBQUMsQ0FBQyxJQUFGLEVBREgsQ0FBUDtBQUVELEdBdEJrQjtBQXVCbkIsRUFBQSxXQUFXLEVBQUUsQ0FBQyxNQUFELEVBQVMsT0FBVCxLQUFxQjtBQUNoQyxXQUFPLEtBQUssQ0FBRSw4QkFBNkIsTUFBTyxFQUF0QyxFQUF5QztBQUNuRCxNQUFBLE1BQU0sRUFBRSxLQUQyQztBQUVuRCxNQUFBLE9BQU8sRUFBRTtBQUNQLHdCQUFnQjtBQURULE9BRjBDO0FBS25ELE1BQUEsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFMLENBQWUsT0FBZjtBQUw2QyxLQUF6QyxDQUFaO0FBT0Q7QUEvQmtCLENBQXZCO2VBa0NpQixjOzs7Ozs7Ozs7OztBQ2xDakI7O0FBQ0E7Ozs7QUFJQSxNQUFNLFdBQVcsR0FBRyxNQUFNO0FBQ3RCLEVBQUEsT0FBTyxDQUFDLEdBQVIsQ0FBWSxxQkFBWjtBQUNBLEVBQUEsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsWUFBdkIsRUFBcUMsU0FBckMsR0FBaUQsRUFBakQ7O0FBQ0Esc0JBQWUsY0FBZixHQUNDLElBREQsQ0FDTSxJQUFJLElBQUk7QUFDVixJQUFBLElBQUksQ0FBQyxPQUFMLENBQWEsYUFBYSxJQUFJO0FBQzFCLE1BQUEsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsWUFBdkIsRUFBcUMsU0FBckMsSUFBa0QsNEJBQVEsYUFBUixDQUFsRDtBQUNILEtBRkQ7QUFJSCxHQU5EO0FBT0gsQ0FWRDs7ZUFZZSxXOzs7Ozs7Ozs7OztBQ2pCZixNQUFNLE9BQU8sR0FBSSxhQUFELElBQW1CO0FBQy9CLEVBQUEsT0FBTyxDQUFDLEdBQVIsQ0FBWSxnQkFBWjtBQUNBLFNBQVE7VUFDRixhQUFhLENBQUMsS0FBTTtTQUNyQixhQUFhLENBQUMsR0FBSTtTQUNsQixhQUFhLENBQUMsUUFBUzswQ0FDVSxhQUFhLENBQUMsRUFBRzt3Q0FDbkIsYUFBYSxDQUFDLEVBQUc7UUFMckQ7QUFPRixDQVRGOztlQVdnQixPIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiaW1wb3J0IGFydGljbGVMaXN0IGZyb20gXCIuL25ld3MvYXJ0aWNsZUxpc3RcIjtcclxuXHJcbmFydGljbGVMaXN0KCk7IiwiY29uc3QgbmV3c0NvbGxlY3Rpb24gPSB7XHJcbiAgICBzYXZlTmV3QXJ0aWNsZTogbmV3c09iaiA9PiB7XHJcbiAgICAgIHJldHVybiBmZXRjaChcImh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC9uZXdzXCIsIHtcclxuICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxyXG4gICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiXHJcbiAgICAgICAgfSxcclxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShuZXdzT2JqKVxyXG4gICAgICB9KTtcclxuICAgIH0sXHJcbiAgICBnZXRBbGxBcnRpY2xlczogKCkgPT4ge1xyXG4gICAgLy8gICBjb25zdCBhY3RpdmVVc2VySWQgPSBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKFwiYWN0aXZlVXNlclwiKTtcclxuICAgICAgcmV0dXJuIGZldGNoKGBodHRwOi8vbG9jYWxob3N0OjgwODgvbmV3cz91c2VySWQ9MWApLnRoZW4ociA9PiByLmpzb24oKSk7XHJcbiAgICB9LFxyXG4gICAgZGVsZXRlQXJ0aWNsZTogKG5ld3NJZCkgPT4ge1xyXG4gICAgICByZXR1cm4gZmV0Y2goYGh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC9uZXdzLyR7bmV3c0lkfWAsIHtcclxuICAgICAgICBtZXRob2Q6IFwiREVMRVRFXCJcclxuICAgICAgfSlcclxuICAgIH0sXHJcbiAgICBnZXRTaW5nbGVBcnRpY2xlOiAobmV3c0lkKSA9PiB7XHJcbiAgICAgIHJldHVybiBmZXRjaChgaHR0cDovL2xvY2FsaG9zdDo4MDg4L25ld3MvJHtuZXdzSWR9YClcclxuICAgICAgLnRoZW4ocj0+IHIuanNvbigpKVxyXG4gICAgfSxcclxuICAgIGVkaXRBcnRpY2xlOiAobmV3c0lkLCBuZXdzT2JqKSA9PiB7XHJcbiAgICAgIHJldHVybiBmZXRjaChgaHR0cDovL2xvY2FsaG9zdDo4MDg4L25ld3MvJHtuZXdzSWR9YCwge1xyXG4gICAgICAgIG1ldGhvZDogXCJQVVRcIixcclxuICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkobmV3c09iailcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgZXhwb3J0IGRlZmF1bHQgbmV3c0NvbGxlY3Rpb247IiwiaW1wb3J0IGFydGljbGUgZnJvbSBcIi4vc2luZ2xlQXJ0aWNsZS5qc1wiXHJcbmltcG9ydCBuZXdzQ29sbGVjdGlvbiBmcm9tIFwiLi9hcGlNYW5hZ2VyLmpzXCJcclxuXHJcblxyXG5cclxuY29uc3QgYXJ0aWNsZUxpc3QgPSAoKSA9PiB7XHJcbiAgICBjb25zb2xlLmxvZyhcIkluc2lkZSBhcnRpY2xlIGxpc3RcIilcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbmV3cy1jb250XCIpLmlubmVySFRNTCA9IFwiXCI7XHJcbiAgICBuZXdzQ29sbGVjdGlvbi5nZXRBbGxBcnRpY2xlcygpXHJcbiAgICAudGhlbihuZXdzID0+IHtcclxuICAgICAgICBuZXdzLmZvckVhY2goc2luZ2xlQXJ0aWNsZSA9PiB7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbmV3cy1jb250XCIpLmlubmVySFRNTCArPSBhcnRpY2xlKHNpbmdsZUFydGljbGUpO1xyXG4gICAgICAgIH0pXHJcblxyXG4gICAgfSlcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgYXJ0aWNsZUxpc3Q7IiwiY29uc3QgYXJ0aWNsZSA9IChzaW5nbGVOZXdzT2JqKSA9PiB7XHJcbiAgICBjb25zb2xlLmxvZyhcIkluc2lkZSBhcnRpY2xlXCIpXHJcbiAgICByZXR1cm4gYDxkaXY+XHJcbiAgICA8aDM+JHtzaW5nbGVOZXdzT2JqLnRpdGxlfTwvaDM+XHJcbiAgICA8cD4ke3NpbmdsZU5ld3NPYmoudXJsfTwvcD5cclxuICAgIDxwPiR7c2luZ2xlTmV3c09iai5zeW5vcHNpc308L3A+XHJcbiAgICA8YnV0dG9uIGNsYXNzPVwiYnRuXCIgaWQ9XCJkZWxldGUtbmV3cy0ke3NpbmdsZU5ld3NPYmouaWR9XCI+RGVsZXRlPC9idXR0b24+XHJcbiAgICA8YnV0dG9uIGNsYXNzPVwiYnRuXCIgaWQ9XCJlZGl0LW5ld3MtJHtzaW5nbGVOZXdzT2JqLmlkfVwiPkVkaXQ8L2J1dHRvbj5cclxuIDwvZGl2PmBcclxuIH1cclxuXHJcbiBleHBvcnQgZGVmYXVsdCBhcnRpY2xlOyJdfQ==
