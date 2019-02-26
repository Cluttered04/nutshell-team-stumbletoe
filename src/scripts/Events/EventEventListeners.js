//Event listeners for add event (pops up form), save (builds object for db), edit (fetches data from db and populates/ prints event form), save edit (builds object for db), and delete (delete request)
import printsEventsToDOM from "./EventPrintsToDOM.js";
import eventApiManager from "./EventApiManager.js"
import eventforms from "./EventFormBuilder.js";


const eventEventListeners = {
    addNewEventListener: function() {
        //Pops up form to enter new event
        document.querySelector("#events-header").addEventListener("click", () => {
            if(event.target.classList.contains("add-event-button")){
                document.querySelector("#events-form").innerHTML = eventforms.buildSaveEventForm()
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
                const activeUser = sessionStorage.getItem("activeUser")
                const eventObject = {
                    "name": eventName,
                    "date": eventDate,
                    "location": eventLocation,
                    "userId": activeUser
                }
                document.querySelector("#events-form").innerHTML = "";
                eventApiManager.addNewEventFunction(eventObject)
                .then(() => {
                    document.querySelector("#events-body").innerHTML =""
                })
                .then(() => {
                    eventApiManager.fetchAllEventsFunction()
                })
                .then(() => {
                    printsEventsToDOM.printEvents()
                })
            }
        })

    },

    editEventEventListener: function() {
        //pops up edit form and fetches data from db to populate
        document.querySelector("#events-cont").addEventListener("click", () => {
            if(event.target.classList.contains("edit-event-btn")){
                console.log("You clicked the edit button!")
                const eventId = event.target.id.split("-")[3];
                //name, date, location, id
                eventApiManager.fetchSingleEventFunction(eventId)
                .then((parsedResponse) => {
                    document.querySelector("#events-form").innerHTML = eventforms.buildEditEventForm(parsedResponse.name, parsedResponse.date, parsedResponse.location, eventId)
                })
            }
        })
    },

    saveEventEditListener: function() {
        //"PUT" to database - builds object for db - fetch to reprint article list
        document.querySelector("#events-cont").addEventListener("click", () => {
            if(event.target.classList.contains("save-edit-event")){
                const eventName =   document.querySelector("#edit-event-name").value;
                const eventDate =   document.querySelector("#edit-event-date").value;
                const eventLocation = document.querySelector("#edit-event-location").value;
                const eventId = event.target.id.split("-")[4];
                const activeUser = sessionStorage.getItem("activeUser")
                const eventObject = {
                    "name": eventName,
                    "date": eventDate,
                    "location": eventLocation,
                    "userId": activeUser
                }

                document.querySelector("#events-form").innerHTML = "";

                eventApiManager.editEventFunction(eventId, eventObject)
                .then(() => {
                    console.log(eventId, eventObject);
                    document.querySelector("#events-body").innerHTML = "";
                    printsEventsToDOM.printEvents();
                })
            }
        })
    },

    deleteEventEventListener: function() {
        //"DELETE" from database - fetch to reprint article list
        document.querySelector("#events-cont").addEventListener("click", () => {
            if(event.target.classList.contains("delete-event-btn")) {
                const eventId = event.target.id.split("-")[3]
                eventApiManager.deleteEventFunction(eventId)
                .then(() => {
                    document.querySelector("#events-body").innerHTML ="";
                    printsEventsToDOM.printEvents();
                })
            }
        })
    }
}


export default eventEventListeners;