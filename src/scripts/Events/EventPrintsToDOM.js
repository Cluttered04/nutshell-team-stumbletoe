//Function to fetch and print list of events to DOM

import eventforms from "./EventFormBuilder.js";
import eventApiManager from "./EventApiManager.js";
import buildSingleComponent from "./EventComponentBuilder.js";

var moment = require('../../lib/node_modules/moment');
moment().format("MMM DD YYYY")




const printsEventsToDOM = {

     printEventHeader: function() {
        document.querySelector("#events-header").innerHTML = `<h2>Events</h2><button id="<button class="btn" id="add-event-button" class="add-event-button">Add Event</button>`
},
    printEvents: function() {
        const eventDisplayArray = [];
        const userId = sessionStorage.getItem("activeUser");
        eventApiManager.fetchAllEventsFunction(userId)
        .then(parsedEvents => {
            parsedEvents.forEach(event => {
            eventDisplayArray.push(event);
            console.log(eventDisplayArray);

        })

    }).then(() => {
        eventDisplayArray.sort(function(a,b){
            a = new Date(a.date);
            b = new Date (b.date);
            return a>b ? -1 : a<b ? 1 : 0
        }); for(let i = 0; i < 5; i ++){
            const fixedEventDate = moment(eventDisplayArray[i].date).format("MMM DD YYYY")
            document.querySelector("#events-body").innerHTML += buildSingleComponent(eventDisplayArray[i].name, fixedEventDate, eventDisplayArray[i].location, eventDisplayArray[i].id)
        }
    })
    }

}



//name, date, location, id
//need to fetch all and print list on page load, or after delete/post/put in event listeners print event form, need a button to add an event

export default printsEventsToDOM