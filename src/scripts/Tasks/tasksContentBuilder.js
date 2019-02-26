//Michelle Tabor - This module builds the entire component HTML String

//imports
import api from "./taskAPIManager";
import buildSingleTask from "./tasksSingleComponentBuilder";

//builds task list and prints it to the DOM
const build = {
  tasksList: userId => {
    document.querySelector("#tasks-box").innerHTML = "";
    api.all(userId).then(tasks => {
      tasks.forEach(singleTask => {
          document.querySelector("#tasks-box").innerHTML += buildSingleTask(singleTask)
      });
    });
  }
};

export default build;