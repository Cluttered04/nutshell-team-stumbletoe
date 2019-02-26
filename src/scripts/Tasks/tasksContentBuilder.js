//Michelle Tabor - This module builds the entire component HTML String

//imports
import api from "./taskAPIManager";
import buildSingleTask from "./tasksSingleComponentBuilder";

//builds task list and prints it to the DOM
const build = {
  tasksList: userId => {
    document.querySelector("#tasks-box").innerHTML = ""; //clears the existing content of the task box
    api.all(userId).then(tasks => { //api call for uncomplete tasks by the active user and loops through the tasks
      tasks.forEach(singleTask => {
          document.querySelector("#tasks-box").innerHTML += buildSingleTask(singleTask) //add single task item to items in the dom
      });
    });
  }
};

export default build;