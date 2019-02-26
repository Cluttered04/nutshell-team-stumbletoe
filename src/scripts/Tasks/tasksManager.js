//Michelle Tabor - This Module is the sub-main module that houses the event listeners for the Tasks Element

//imports
import print from "./taskPrintToDOM";
import build from "./tasksContentBuilder";
import listen from "./taskListeners";

//tasks manager main function
const tasks = {
  //after login
  afterLogin: userId => {
    if (sessionStorage.length > 0) {
      build.tasksList(userId);
      print.button(userId);
      listen.activateNewTask(userId);
    }
  },
  //add new task button

  //edit task

  //completed task
  completed: () => {}
  //save edited task
};

export default tasks;
