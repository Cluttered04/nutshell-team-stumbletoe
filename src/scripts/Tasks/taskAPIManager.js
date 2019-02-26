//Michelle Tabor - This module will house API calls that are for the tasks element

//fetch calls

const api = {
    //Get all tasks
    all: (userId) => {
        return fetch(`http://localhost:8088/tasks?userId=${userId}&complete=false`)
            .then(r => r.json())
    },
    //POST new task
new:(taskObject)=>{
    return fetch("http://localhost:8088/tasks",{
        method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(taskObject)
        }).then(r => r.json())

}
    //PUT new edited task

    //PATCH completed task
}


export default api