(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

var _articleList = _interopRequireDefault(require("./news/articleList"));

var _editForm = _interopRequireDefault(require("./news/editForm"));

var _deleteArticle = _interopRequireDefault(require("./news/deleteArticle"));

var _newsForm = _interopRequireDefault(require("./news/newsForm"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _articleList.default)();
(0, _deleteArticle.default)();
(0, _editForm.default)();

_newsForm.default.buildNewsForm();

},{"./news/articleList":3,"./news/deleteArticle":5,"./news/editForm":7,"./news/newsForm":8}],2:[function(require,module,exports){
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

},{"./apiManager.js":2,"./singleArticle.js":9}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const buildArticleObject = (titleParam, urlParam, synopsisParam) => {
  return {
    title: titleParam,
    url: urlParam,
    synopsis: synopsisParam,
    userId: sessionStorage.getItem("activeUser")
  };
};

var _default = buildArticleObject;
exports.default = _default;

},{}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _apiManager = _interopRequireDefault(require("./apiManager.js"));

var _articleList = _interopRequireDefault(require("./articleList.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const activateDeleteButton = () => {
  document.querySelector("#news-cont").addEventListener("click", () => {
    if (event.target.classList.contains("delete")) {
      console.log("DELETE");
      const idToDelete = event.target.id.split("-")[2];

      _apiManager.default.deleteArticle(idToDelete).then(_articleList.default);
    }
  });
};

var _default = activateDeleteButton;
exports.default = _default;

},{"./apiManager.js":2,"./articleList.js":3}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _articleObjBuilder = _interopRequireDefault(require("./articleObjBuilder.js"));

var _apiManager = _interopRequireDefault(require("./apiManager.js"));

var _articleList = _interopRequireDefault(require("./articleList.js"));

var _newsForm = _interopRequireDefault(require("./newsForm.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const handleEdit = () => {
  document.querySelector("#news-cont").addEventListener("click", () => {
    if (event.target.id.includes("edit-news-btn")) {
      const title = document.querySelector("#news-title").value;
      const url = document.querySelector("#news-url").value;
      const synopsis = document.querySelector("#news-synopsis").value;
      const activeUserId = event.target.id.split("-")[2];
      const objectToPost = (0, _articleObjBuilder.default)(title, url, synopsis);

      _apiManager.default.editArticle(activeUserId, objectToPost).then(() => {
        (0, _articleList.default)();
        document.querySelector("#news-cont").innerHTML = _newsForm.default.buildForm();
      });
    }
  });
};

var _default = handleEdit;
exports.default = _default;

},{"./apiManager.js":2,"./articleList.js":3,"./articleObjBuilder.js":4,"./newsForm.js":8}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _apiManager = _interopRequireDefault(require("./apiManager.js"));

var _editBuilder = _interopRequireDefault(require("./editBuilder.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const activateEditButton = () => {
  document.querySelector("#news-cont").addEventListener("click", () => {
    if (event.target.classList.contains("edit")) {
      _apiManager.default.getSingleArticle(event.target.id.split("-")[2]).then(singleArticle => {
        document.querySelector("#news-title").value = singleArticle.name;
        document.querySelector("#news-url").value = singleArticle.phone;
        document.querySelector("#news-synopsis").value = singleArticle.email;
        document.querySelector("#save-news-btn").textContent = "Edit";
        document.querySelector("#save-news-btn").id = `edit-news-btn-${singleNewsObj.id}`;
        (0, _editBuilder.default)();
      });
    }
  });
};

var _default = activateEditButton;
exports.default = _default;

},{"./apiManager.js":2,"./editBuilder.js":6}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _apiManager = _interopRequireDefault(require("./apiManager.js"));

var _articleObjBuilder = _interopRequireDefault(require("./articleObjBuilder.js"));

var _articleList = _interopRequireDefault(require("./articleList.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const newsForm = {
  buildNewsForm: () => {
    return `
    <div>
      <h3>Add an Article</h3>
      <form action="">
        <input type="text"  id="news-title" placeholder="Enter a Title">
        <input type="text"  id="news-url" placeholder="Enter URL to Article">
        <input type="text" id="news-synopsis" placeholder="Enter a synopsis">
      </form>
       <button id="save-news-btn">Save</button>
    </div>`;
  },
  activateSaveButton: () => {
    document.querySelector("#news-cont").addEventListener("click", () => {
      if (event.target.id === "save-news-btn") {
        const title = document.querySelector("#news-title").value;
        const url = document.querySelector("#news-url").value;
        const synopsis = document.querySelector("#news-synopsis").value;
        const objectToPost = (0, _articleObjBuilder.default)(title, url, synopsis);

        _apiManager.default.saveNewArticle(objectToPost).then(() => {
          (0, _articleList.default)();
          document.querySelector("#news-title").value = "";
          document.querySelector("#news-url").value = "";
          document.querySelector("#news-synopsis").value = "";
        });
      }
    });
  }
};
var _default = newsForm;
exports.default = _default;

},{"./apiManager.js":2,"./articleList.js":3,"./articleObjBuilder.js":4}],9:[function(require,module,exports){
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
    <button class="delete-btn" id="delete-news-${singleNewsObj.id}">Delete</button>
    <button class="edit-btn" id="edit-news-${singleNewsObj.id}">Edit</button>
 </div>`;
};

var _default = article;
exports.default = _default;

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9zY3JpcHRzL21haW4uanMiLCIuLi9zY3JpcHRzL25ld3MvYXBpTWFuYWdlci5qcyIsIi4uL3NjcmlwdHMvbmV3cy9hcnRpY2xlTGlzdC5qcyIsIi4uL3NjcmlwdHMvbmV3cy9hcnRpY2xlT2JqQnVpbGRlci5qcyIsIi4uL3NjcmlwdHMvbmV3cy9kZWxldGVBcnRpY2xlLmpzIiwiLi4vc2NyaXB0cy9uZXdzL2VkaXRCdWlsZGVyLmpzIiwiLi4vc2NyaXB0cy9uZXdzL2VkaXRGb3JtLmpzIiwiLi4vc2NyaXB0cy9uZXdzL25ld3NGb3JtLmpzIiwiLi4vc2NyaXB0cy9uZXdzL3NpbmdsZUFydGljbGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBOztBQUNBOztBQUNBOztBQUNBOzs7O0FBRUE7QUFDQTtBQUNBOztBQUNBLGtCQUFTLGFBQVQ7Ozs7Ozs7OztBQ1JBLE1BQU0sY0FBYyxHQUFHO0FBQ25CLEVBQUEsY0FBYyxFQUFFLE9BQU8sSUFBSTtBQUN6QixXQUFPLEtBQUssQ0FBQyw0QkFBRCxFQUErQjtBQUN6QyxNQUFBLE1BQU0sRUFBRSxNQURpQztBQUV6QyxNQUFBLE9BQU8sRUFBRTtBQUNQLHdCQUFnQjtBQURULE9BRmdDO0FBS3pDLE1BQUEsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFMLENBQWUsT0FBZjtBQUxtQyxLQUEvQixDQUFaO0FBT0QsR0FUa0I7QUFVbkIsRUFBQSxjQUFjLEVBQUUsTUFBTTtBQUN0QjtBQUNFLFdBQU8sS0FBSyxDQUFFLHFDQUFGLENBQUwsQ0FBNkMsSUFBN0MsQ0FBa0QsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFGLEVBQXZELENBQVA7QUFDRCxHQWJrQjtBQWNuQixFQUFBLGFBQWEsRUFBRyxNQUFELElBQVk7QUFDekIsV0FBTyxLQUFLLENBQUUsOEJBQTZCLE1BQU8sRUFBdEMsRUFBeUM7QUFDbkQsTUFBQSxNQUFNLEVB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RDtBQUVILFNBUEQ7QUFTSDtBQUVGLEtBcEJEO0FBcUJIO0FBbkNjLENBQWpCO2VBc0NlLFE7Ozs7Ozs7Ozs7O0FDMUNmLE1BQU0sT0FBTyxHQUFJLGFBQUQsSUFBbUI7QUFDL0IsRUFBQSxPQUFPLENBQUMsR0FBUixDQUFZLGdCQUFaO0FBQ0EsU0FBUTtVQUNGLGFBQWEsQ0FBQyxLQUFNO1NBQ3JCLGFBQWEsQ0FBQyxHQUFJO1NBQ2xCLGFBQWEsQ0FBQyxRQUFTO2lEQUNpQixhQUFhLENBQUMsRUFBRzs2Q0FDckIsYUFBYSxDQUFDLEVBQUc7UUFMMUQ7QUFPRixDQVRGOztlQVdnQixPIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiaW1wb3J0IGFydGljbGVMaXN0IGZyb20gXCIuL25ld3MvYXJ0aWNsZUxpc3RcIjtcclxuaW1wb3J0IGFjdGl2YXRlRWRpdEJ1dHRvbiBmcm9tIFwiLi9uZXdzL2VkaXRGb3JtXCI7XHJcbmltcG9ydCBhY3RpdmF0ZURlbGV0ZUJ1dHRvbiBmcm9tIFwiLi9uZXdzL2RlbGV0ZUFydGljbGVcIjtcclxuaW1wb3J0IG5ld3NGb3JtIGZyb20gXCIuL25ld3MvbmV3c0Zvcm1cIjtcclxuXHJcbmFydGljbGVMaXN0KCk7XHJcbmFjdGl2YXRlRGVsZXRlQnV0dG9uKCk7XHJcbmFjdGl2YXRlRWRpdEJ1dHRvbigpO1xyXG5uZXdzRm9ybS5idWlsZE5ld3NGb3JtKCk7IiwiY29uc3QgbmV3c0NvbGxlY3Rpb24gPSB7XHJcbiAgICBzYXZlTmV3QXJ0aWNsZTogbmV3c09iaiA9PiB7XHJcbiAgICAgIHJldHVybiBmZXRjaChcImh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC9uZXdzXCIsIHtcclxuICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxyXG4gICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiXHJcbiAgICAgICAgfSxcclxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShuZXdzT2JqKVxyXG4gICAgICB9KTtcclxuICAgIH0sXHJcbiAgICBnZXRBbGxBcnRpY2xlczogKCkgPT4ge1xyXG4gICAgLy8gICBjb25zdCBhY3RpdmVVc2VySWQgPSBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKFwiYWN0aXZlVXNlclwiKTtcclxuICAgICAgcmV0dXJuIGZldGNoKGBodHRwOi8vbG9jYWxob3N0OjgwODgvbmV3cz91c2VySWQ9MWApLnRoZW4ociA9PiByLmpzb24oKSk7XHJcbiAgICB9LFxyXG4gICAgZGVsZXRlQXJ0aWNsZTogKG5ld3NJZCkgPT4ge1xyXG4gICAgICByZXR1cm4gZmV0Y2goYGh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC9uZXdzLyR7bmV3c0lkfWAsIHtcclxuICAgICAgICBtZXRob2Q6IFwiREVMRVRFXCJcclxuICAgICAgfSlcclxuICAgIH0sXHJcbiAgICBnZXRTaW5nbGVBcnRpY2xlOiAobmV3c0lkKSA9PiB7XHJcbiAgICAgIHJldHVybiBmZXRjaChgaHR0cDovL2xvY2FsaG9zdDo4MDg4L25ld3MvJHtuZXdzSWR9YClcclxuICAgICAgLnRoZW4ocj0+IHIuanNvbigpKVxyXG4gICAgfSxcclxuICAgIGVkaXRBcnRpY2xlOiAobmV3c0lkLCBuZXdzT2JqKSA9PiB7XHJcbiAgICAgIHJldHVybiBmZXRjaChgaHR0cDovL2xvY2FsaG9zdDo4MDg4L25ld3MvJHtuZXdzSWR9YCwge1xyXG4gICAgICAgIG1ldGhvZDogXCJQVVRcIixcclxuICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkobmV3c09iailcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgZXhwb3J0IGRlZmF1bHQgbmV3c0NvbGxlY3Rpb247IiwiaW1wb3J0IGFydGljbGUgZnJvbSBcIi4vc2luZ2xlQXJ0aWNsZS5qc1wiXHJcbmltcG9ydCBuZXdzQ29sbGVjdGlvbiBmcm9tIFwiLi9hcGlNYW5hZ2VyLmpzXCJcclxuXHJcblxyXG5cclxuY29uc3QgYXJ0aWNsZUxpc3QgPSAoKSA9PiB7XHJcbiAgICBjb25zb2xlLmxvZyhcIkluc2lkZSBhcnRpY2xlIGxpc3RcIilcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbmV3cy1jb250XCIpLmlubmVySFRNTCA9IFwiXCI7XHJcbiAgICBuZXdzQ29sbGVjdGlvbi5nZXRBbGxBcnRpY2xlcygpXHJcbiAgICAudGhlbihuZXdzID0+IHtcclxuICAgICAgICBuZXdzLmZvckVhY2goc2luZ2xlQXJ0aWNsZSA9PiB7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbmV3cy1jb250XCIpLmlubmVySFRNTCArPSBhcnRpY2xlKHNpbmdsZUFydGljbGUpO1xyXG4gICAgICAgIH0pXHJcblxyXG4gICAgfSlcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgYXJ0aWNsZUxpc3Q7IiwiY29uc3QgYnVpbGRBcnRpY2xlT2JqZWN0ID0gKHRpdGxlUGFyYW0sIHVybFBhcmFtLCBzeW5vcHNpc1BhcmFtKSA9PiB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICB0aXRsZTogdGl0bGVQYXJhbSxcclxuICAgICAgdXJsOiB1cmxQYXJhbSxcclxuICAgICAgc3lub3BzaXM6IHN5bm9wc2lzUGFyYW0sXHJcbiAgICAgIHVzZXJJZDogc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShcImFjdGl2ZVVzZXJcIilcclxuICAgIH07XHJcbiAgfTtcclxuXHJcbiAgZXhwb3J0IGRlZmF1bHQgYnVpbGRBcnRpY2xlT2JqZWN0OyIsImltcG9ydCBuZXdzQ29sbGVjdGlvbiBmcm9tIFwiLi9hcGlNYW5hZ2VyLmpzXCJcclxuaW1wb3J0IGFydGljbGVMaXN0IGZyb20gXCIuL2FydGljbGVMaXN0LmpzXCJcclxuXHJcbmNvbnN0IGFjdGl2YXRlRGVsZXRlQnV0dG9uID0gKCkgPT4ge1xyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNuZXdzLWNvbnRcIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcclxuICAgICAgICBpZihldmVudC50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiZGVsZXRlXCIpKXtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJERUxFVEVcIilcclxuICAgICAgICAgICAgY29uc3QgaWRUb0RlbGV0ZSA9IGV2ZW50LnRhcmdldC5pZC5zcGxpdChcIi1cIilbMl07XHJcbiAgICAgICAgICAgIG5ld3NDb2xsZWN0aW9uLmRlbGV0ZUFydGljbGUoaWRUb0RlbGV0ZSlcclxuICAgICAgICAgICAgLnRoZW4oYXJ0aWNsZUxpc3QpXHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgYWN0aXZhdGVEZWxldGVCdXR0b247IiwiaW1wb3J0IGJ1aWxkQXJ0aWNsZU9iamVjdCBmcm9tIFwiLi9hcnRpY2xlT2JqQnVpbGRlci5qc1wiO1xyXG5pbXBvcnQgbmV3c0NvbGxlY3Rpb24gZnJvbSBcIi4vYXBpTWFuYWdlci5qc1wiO1xyXG5pbXBvcnQgYXJ0aWNsZUxpc3QgZnJvbSBcIi4vYXJ0aWNsZUxpc3QuanNcIjtcclxuaW1wb3J0IGJ1aWxkTmV3c0Zvcm0gZnJvbSBcIi4vbmV3c0Zvcm0uanNcIjtcclxuXHJcbmNvbnN0IGhhbmRsZUVkaXQgPSAoKSA9PiB7XHJcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNuZXdzLWNvbnRcIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcclxuICAgIGlmIChldmVudC50YXJnZXQuaWQuaW5jbHVkZXMoXCJlZGl0LW5ld3MtYnRuXCIpKSB7XHJcbiAgICAgIGNvbnN0IHRpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNuZXdzLXRpdGxlXCIpLnZhbHVlO1xyXG4gICAgICBjb25zdCB1cmwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI25ld3MtdXJsXCIpLnZhbHVlO1xyXG4gICAgICBjb25zdCBzeW5vcHNpcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbmV3cy1zeW5vcHNpc1wiKS52YWx1ZTtcclxuXHJcbiAgICAgIGNvbnN0IGFjdGl2ZVVzZXJJZCA9IGV2ZW50LnRhcmdldC5pZC5zcGxpdChcIi1cIilbMl07XHJcblxyXG4gICAgICBjb25zdCBvYmplY3RUb1Bvc3QgPSBidWlsZEFydGljbGVPYmplY3QodGl0bGUsIHVybCwgc3lub3BzaXMpO1xyXG5cclxuICAgICAgbmV3c0NvbGxlY3Rpb24uZWRpdEFydGljbGUoYWN0aXZlVXNlcklkLCBvYmplY3RUb1Bvc3QpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgIGFydGljbGVMaXN0KCk7XHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNuZXdzLWNvbnRcIikuaW5uZXJIVE1MID0gYnVpbGROZXdzRm9ybS5idWlsZEZvcm0oKTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfSk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBoYW5kbGVFZGl0OyIsImltcG9ydCBuZXdzQ29sbGVjdGlvbiBmcm9tIFwiLi9hcGlNYW5hZ2VyLmpzXCI7XHJcbmltcG9ydCBoYW5kbGVFZGl0IGZyb20gXCIuL2VkaXRCdWlsZGVyLmpzXCI7XHJcblxyXG5cclxuY29uc3QgYWN0aXZhdGVFZGl0QnV0dG9uID0gKCkgPT4ge1xyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNuZXdzLWNvbnRcIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcclxuICAgICAgICBpZihldmVudC50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiZWRpdFwiKSl7XHJcbiAgICAgICAgICAgIG5ld3NDb2xsZWN0aW9uLmdldFNpbmdsZUFydGljbGUoZXZlbnQudGFyZ2V0LmlkLnNwbGl0KFwiLVwiKVsyXSlcclxuICAgICAgICAgICAgLnRoZW4oKHNpbmdsZUFydGljbGUpID0+IHtcclxuICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbmV3cy10aXRsZVwiKS52YWx1ZSA9IHNpbmdsZUFydGljbGUubmFtZTtcclxuXHJcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI25ld3MtdXJsXCIpLnZhbHVlID0gc2luZ2xlQXJ0aWNsZS5waG9uZTtcclxuXHJcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI25ld3Mtc3lub3BzaXNcIikudmFsdWUgPSBzaW5nbGVBcnRpY2xlLmVtYWlsO1xyXG5cclxuICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjc2F2ZS1uZXdzLWJ0blwiKS50ZXh0Q29udGVudCA9IFwiRWRpdFwiO1xyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNzYXZlLW5ld3MtYnRuXCIpLmlkPSBgZWRpdC1uZXdzLWJ0bi0ke3NpbmdsZU5ld3NPYmouaWR9YDtcclxuXHJcbiAgICAgICAgICAgICAgICBoYW5kbGVFZGl0KCk7XHJcblxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgIH0pXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGFjdGl2YXRlRWRpdEJ1dHRvbjsiLCJpbXBvcnQgbmV3c0NvbGxlY3Rpb24gZnJvbSBcIi4vYXBpTWFuYWdlci5qc1wiO1xyXG5pbXBvcnQgYnVpbGRBcnRpY2xlT2JqZWN0IGZyb20gXCIuL2FydGljbGVPYmpCdWlsZGVyLmpzXCI7XHJcbmltcG9ydCBhcnRpY2xlTGlzdCBmcm9tIFwiLi9hcnRpY2xlTGlzdC5qc1wiO1xyXG5cclxuY29uc3QgbmV3c0Zvcm0gPSB7XHJcbiAgYnVpbGROZXdzRm9ybTogKCkgPT4ge1xyXG4gICAgcmV0dXJuIGBcclxuICAgIDxkaXY+XHJcbiAgICAgIDxoMz5BZGQgYW4gQXJ0aWNsZTwvaDM+XHJcbiAgICAgIDxmb3JtIGFjdGlvbj1cIlwiPlxyXG4gICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiICBpZD1cIm5ld3MtdGl0bGVcIiBwbGFjZWhvbGRlcj1cIkVudGVyIGEgVGl0bGVcIj5cclxuICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiAgaWQ9XCJuZXdzLXVybFwiIHBsYWNlaG9sZGVyPVwiRW50ZXIgVVJMIHRvIEFydGljbGVcIj5cclxuICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBpZD1cIm5ld3Mtc3lub3BzaXNcIiBwbGFjZWhvbGRlcj1cIkVudGVyIGEgc3lub3BzaXNcIj5cclxuICAgICAgPC9mb3JtPlxyXG4gICAgICAgPGJ1dHRvbiBpZD1cInNhdmUtbmV3cy1idG5cIj5TYXZlPC9idXR0b24+XHJcbiAgICA8L2Rpdj5gO1xyXG4gIH0sXHJcbiAgYWN0aXZhdGVTYXZlQnV0dG9uOiAoKSA9PiB7XHJcbiAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbmV3cy1jb250XCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XHJcbiAgICAgICAgaWYoZXZlbnQudGFyZ2V0LmlkID09PSBcInNhdmUtbmV3cy1idG5cIil7XHJcblxyXG4gICAgICAgICAgICBjb25zdCB0aXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbmV3cy10aXRsZVwiKS52YWx1ZTtcclxuICAgICAgICAgICAgY29uc3QgdXJsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNuZXdzLXVybFwiKS52YWx1ZTtcclxuICAgICAgICAgICAgY29uc3Qgc3lub3BzaXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI25ld3Mtc3lub3BzaXNcIikudmFsdWU7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBvYmplY3RUb1Bvc3QgPSBidWlsZEFydGljbGVPYmplY3QodGl0bGUsIHVybCwgc3lub3BzaXMpXHJcblxyXG4gICAgICAgICAgICBuZXdzQ29sbGVjdGlvbi5zYXZlTmV3QXJ0aWNsZShvYmplY3RUb1Bvc3QpXHJcbiAgICAgICAgICAgIC50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGFydGljbGVMaXN0KCk7XHJcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI25ld3MtdGl0bGVcIikudmFsdWUgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNuZXdzLXVybFwiKS52YWx1ZSA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI25ld3Mtc3lub3BzaXNcIikudmFsdWUgPSBcIlwiO1xyXG5cclxuICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgfSlcclxuICB9XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBuZXdzRm9ybTsiLCJjb25zdCBhcnRpY2xlID0gKHNpbmdsZU5ld3NPYmopID0+IHtcclxuICAgIGNvbnNvbGUubG9nKFwiSW5zaWRlIGFydGljbGVcIilcclxuICAgIHJldHVybiBgPGRpdj5cclxuICAgIDxoMz4ke3NpbmdsZU5ld3NPYmoudGl0bGV9PC9oMz5cclxuICAgIDxwPiR7c2luZ2xlTmV3c09iai51cmx9PC9wPlxyXG4gICAgPHA+JHtzaW5nbGVOZXdzT2JqLnN5bm9wc2lzfTwvcD5cclxuICAgIDxidXR0b24gY2xhc3M9XCJkZWxldGUtYnRuXCIgaWQ9XCJkZWxldGUtbmV3cy0ke3NpbmdsZU5ld3NPYmouaWR9XCI+RGVsZXRlPC9idXR0b24+XHJcbiAgICA8YnV0dG9uIGNsYXNzPVwiZWRpdC1idG5cIiBpZD1cImVkaXQtbmV3cy0ke3NpbmdsZU5ld3NPYmouaWR9XCI+RWRpdDwvYnV0dG9uPlxyXG4gPC9kaXY+YFxyXG4gfVxyXG5cclxuIGV4cG9ydCBkZWZhdWx0IGFydGljbGU7Il19
