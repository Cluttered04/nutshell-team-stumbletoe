//Event listeners for add event (pops up form), save (builds object for db), edit (fetches data from db and populates/ prints event form), save edit (builds object for db), and delete (delete request)
import printEvents from "./EventPrintsToDOM.js";
import eventApiManager from "./EventApiManager.js"
import eventforms from "./EventFormBuilder.js";


eventEventListeners = {
    addNewEventListener: function() {
        //Pops up form to enter new event
        document.querySelector("#events-cont").addEventListener("click", () => {
            if(event.target.classList.contains("add-event-button")){
                document.querySelector("#events-cont").innerHTML += buildSaveEventForm()
            }
        })
    },

    saveNewEventListener: function() {
        //Saves new event - builds object for db and posts
        document.querySelector("#events-cont").addEventListener("click", () => {
            if(event.target.id === "save-event-btn"){
                const eventName = document.querySelector("#event-name").value;
                const eventDate = document.querySelector("#event-date").value;
                const eventLocation = document.querySelector("#event-location").value;
                const eventObject = {
                    "name": eventName,
                    "date": eventDate,
                    "location": eventLocation
                }
                eventApiManager.addNewEventFunction(eventObject)
                .then(() => {
                    printEvents()
                })
            }
        })

    },

    editEventEventListener: function() {
        //pops up edit form and fetches data from db to populate
        document.querySelector("#events-cont").addEventListener("click", () => {
            if(event.target.classList.contains("event-edit-btn")){
                const eventId = event.target.id.split("-")[3];
                //name, date, location, id
                eventApiManager.fetchSingleEventFunction(eventId)
                .then((parsedResponse) => {
                    eventforms.buildEditEventForm(parsedResponse.name, parsedResponse.date, parsedResponse.location, eventId)
                })
            }
        })
    },

    saveEventEditListener: function() {
        //"PUT" to database - builds object for db - fetch to reprint article list
        document.querySelector("#events-cont").addEventListener("click", () => {
            if(event.target.classList.contains("save-edit-event")){
                const eventName =   document.querySelector("#event-name").value;
                const eventDate =   document.querySelector("#event-date").value;
                const eventLocation = document.querySelector("#event-location").value;
                const eventObject = {
                    name: eventName,
                    date: eventDate,
                    location: eventLocation,
                }
            }
        })
    },

    deleteEventEventListener: function() {
        //"DELETE" from database - fetch to reprint article list
        document.querySelector("#events-cont").addEventListener("click", () => {

        })
    }





}