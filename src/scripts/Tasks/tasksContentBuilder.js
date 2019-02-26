//Michelle Tabor - This module builds the entire component HTML String

//imports
import api from "./taskAPIManager";
import buildSingleTask from "./tasksSingleComponentBuilder";

//builds task list and prints it to the DOM
const build = {
  tasksList: userId => {
    document.querySelector("#tasks-cont").innerHTML = "";
    api.all(userId).then(tasks => {
      tasks.forEach(singleTask => {
          if(tasks.complete !== true){
              console.log(singleTask)
            document.querySelector("#tasks-cont").innerHTML += buildSingleTask(singleTask)
          } else{
              document.querySelector("#tasks-cont").innerHTML = `<p class="error">All Caught Up!</p>`
          }
        ;
      });
    });
  }
};

export default build;