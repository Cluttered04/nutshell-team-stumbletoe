//Michelle Tabor - This Module is the sub-main module that acts as the point of entry for the tasks module
//imports
import print from "./tasksDOMPrinters";
import manageContent from "./tasksContentManager"

//tasks manager main function
const tasks = {
  //after login
  tasksActivator: (userId) => {
    if (sessionStorage.length > 0) { //if there is anything stored in session storage, it may not be fool proof, but it works for right now
      print.taskbox(); //prints div structure for later use
      manageContent.buildCont(userId) //prints the content inside the built boxes
    }
  },
};

export default tasks;