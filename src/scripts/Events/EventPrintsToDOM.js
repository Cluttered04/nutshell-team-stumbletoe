//Function to fetch and print list of events to DOM

import eventforms from "./EventFormBuilder.js";
import eventApiManager from "./EventApiManager.js";
import buildSingleComponent from "./EventComponentBuilder.js";


const printsEventsToDOM = {

     printEventHeader: function() {
        document.querySelector("#events-header").innerHTML = `<h3>Events</h3><button id="<button class="btn" id="add-event-button" class="add-event-button">Add Event</button>`
},
    printEvents: function() {
        const userId = sessionStorage.getItem("activeUser");
    eventApiManager.fetchAllEventsFunction(userId)
    .then(parsedEvents => {
        parsedEvents.forEach(event => {

            document.querySelector("#events-body").innerHTML += buildSingleComponent(event.name, event.date, event.location, event.id)
        })

    })
    }

}



//name, date, location, id
//need to fetch all and print list on page load, or after delete/post/put in event listeners print event form, need a button to add an event

export default printsEventsToDOM