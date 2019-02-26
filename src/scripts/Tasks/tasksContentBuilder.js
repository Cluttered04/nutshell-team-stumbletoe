//Michelle Tabor - This module builds the entire component HTML String

//imports
import api from "./taskAPIManager";
import buildSingleTask from "./tasksSingleComponentBuilder";

//builds task list and prints it to the DOM
const build = {
  tasksList: userId => {
    document.querySelector("#tasks-cont").innerHTML = `<div id="tasks-head">TASKS</div>
      <div id="tasks-box"></div>
      <div id="tasks-foot"><button type="button" class="new" id="tasks-new-btn-${userId}">Add New Task</button></div>`;
    api.all(userId).then(tasks => {
      tasks.forEach(singleTask => {
          if(tasks.complete !== true){
              console.log(singleTask)
            document.querySelector("#tasks-box").innerHTML += buildSingleTask(singleTask)
          } else{
              document.querySelector("#tasks-box").innerHTML = `<p class="error">All Caught Up!</p>`
          }
        ;
      });
    });
  }
};

export default build;