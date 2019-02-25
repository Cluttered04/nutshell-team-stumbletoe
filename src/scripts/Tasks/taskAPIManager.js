//Michelle Tabor - This module will house API calls that are for the tasks element

//fetch calls

const api = {
    //Get all tasks
    all: (userId) => {
        return fetch(`http://localhost:8088/tasks?userId=${userId}`)
            .then(r => r.json())
    }
    //POST new task

    //PUT new edited task

    //PATCH completed task
}


export default api