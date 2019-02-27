import printsEventsToDOM from "./EventPrintsToDOM";
import eventEventListeners from "./EventEventListeners"


const eventDashboard = () => {
    printsEventsToDOM.printEventHeader();
    printsEventsToDOM.printEvents();
    eventEventListeners.addNewEventListener();
    eventEventListeners.saveNewEventListener();
    eventEventListeners.editEventEventListener();
    eventEventListeners.saveEventEditListener();
    eventEventListeners.deleteEventEventListener();

}



export default eventDashboard;


//Push all json objects into an array then sort by date using .sort. Check to see if dates come back as strings or dates. Use if/ternary statement to add class to the first on the list (array[0]) - then style. Display only 3-5 on the page at once.