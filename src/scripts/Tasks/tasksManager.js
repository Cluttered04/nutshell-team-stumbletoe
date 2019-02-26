//Michelle Tabor - This Module is the sub-main module that acts as the point of entry for the tasks module
//imports
import print from "./taskPrintToDOM";
import afterBuild from "./tasksboxAfterBuild"

//tasks manager main function
const tasks = {
  //after login
  afterLogin: (userId) => {
    if (sessionStorage.length > 0) {
      print.taskbox();
      afterBuild(userId)
    }
  },
};

export default tasks;