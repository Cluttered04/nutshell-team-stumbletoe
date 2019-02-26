//Function to fetch and print list of events to DOM

import eventforms from "./EventFormBuilder.js";
import eventApiManager from "./EventApiManager.js";
import buildSingleComponent from "./EventComponentBuilder.js";

const printEvents = () => {
    const userId = sessionStorage.getItem(activeUser);
    eventApiManager.fetchAllEventsFunction(userId)
    .then(parsedEvents => {
        const HTMLString = ""
        parsedEvents.forEach(event => {

            HTMLString += buildSingleComponent(event.name, event.date, event.location, event.id)
        })
        document.querySelector("#events-cont").innerHTML = `<button class="btn" id="add-event-button class="add-event-button">Add Event</button>`
    })
}


//name, date, location, id
//need to fetch all and print list on page load, or after delete/post/put in event listeners print event form, need a button to add an event

export default printEvents