//Michelle Tabor - This module builds objects that will be posted to the database
//imports

const object = {
  //use for new and edited tasks
  taskObject: (task, dueDate) => {
    return `{
        userId: ${sessionStorage.getItem("activeUser")},
        task: ${task},
        "dueDate": ${dueDate},
        "complete": false  
    }`;
  },
  //part of a task
  completeTaskObject: tf => {
    return `{complete: ${tf}}`;
  }
};

export default object
