//Fetch single/all, post, put, delete functions

const eventApiManager = {
    //fetches all events
    fetchAllEventsFunction: function(userId) {
       return  fetch(`http://localhost:8088/events/userId?=${userId}`, {})
        .then(response => response.json)

    },

    //fetches a single event
    fetchSingleEventFunction: function(id) {
       return fetch(`http://localhost:8088/events/${id}`)
        .then(response => response.json)

    },

    //adds a new event to the database
    addNewEventFunction: function(object) {
        return fetch(`http://localhost:8088/events`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(object)
        })
        },

    //edits an event ("PUT")
    editEventFunction: function(id, object) {
        return fetch(`http://localhost:8088/events/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(object)
        })

    },

    //deletes event
    deleteEventFunction: function(id) {
      return fetch(`http://localhost:8088/events/${id}`, {
          method: "DELETE"
      })
    }

}

export default eventApiManager;