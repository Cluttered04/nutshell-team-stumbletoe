//Michelle Tabor - This module will house API calls that are for the tasks element

//fetch calls

const api = {
    //Get all tasks
    all: (userId) => {
        return fetch(`http://localhost:8088/tasks?userId=${userId}&complete=false`)
            .then(r => r.json())
    },
    //get single task
    single: (taskId) => {
        return fetch(`http://localhost:8088/tasks/${taskId}`)
            .then(r => r.json())
    },
    //POST new task
    new: (taskObject) => {
        return fetch("http://localhost:8088/tasks", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(taskObject)
        }).then(r => r.json())

    },
    //PUT new edited task
    edit: (taskId, taskObject) => {
        return fetch(`http://localhost:8088/tasks/${taskId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(taskObject)
        }).then(r => r.json())
    },
    //PATCH completed task
    checkbox: (taskId, taskPiece) => {
        return fetch(`http://localhost:8088/tasks/${taskId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(taskPiece)
        }).then(r => r.json())
    },
}



export default api