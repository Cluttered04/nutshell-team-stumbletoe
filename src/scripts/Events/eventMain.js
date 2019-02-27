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


