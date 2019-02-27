//Function to fetch and print list of events to DOM

import eventforms from "./EventFormBuilder.js";
import eventApiManager from "./EventApiManager.js";
import buildEventComponents from "./EventComponentBuilder.js";

var moment = require('../../lib/node_modules/moment');
moment().format("MMM DD YYYY")




const printsEventsToDOM = {

     printEventHeader: function() {
        document.querySelector("#events-header").innerHTML = `<h2>Events</h2><button id="<button class="btn" id="add-event-button" class="add-event-button">Add Event</button>`
},
    printEvents: function() {
        //Pushes the json objects into a new array for sorting
        const eventDisplayArray = [];
        const userId = sessionStorage.getItem("activeUser");
        eventApiManager.fetchAllEventsFunction(userId)
        .then(parsedEvents => {
            parsedEvents.forEach(event => {
            eventDisplayArray.push(event);
            console.log(eventDisplayArray);

        })

    }).then(() => {
        //Sorts the new array by date property
        eventDisplayArray.sort(function(a,b){
            a = new Date(a.date);
            b = new Date (b.date);
            return a<b ? -1 : a>b ? 1 : 0
        }); for(let i = 0; i < 5; i ++){
            //converts the date to MM/DD/YYYY format
            const fixedEventDate = moment(eventDisplayArray[i].date).format("MMM DD YYYY")

            //Styles first upcoming event in list
            if(eventDisplayArray[i] === eventDisplayArray[0]){
                document.querySelector("#events-body").innerHTML += buildEventComponents.buildNewestComponent(eventDisplayArray[i].name, fixedEventDate, eventDisplayArray[i].location, eventDisplayArray[i].id)
            } else {
            document.querySelector("#events-body").innerHTML += buildEventComponents.buildSingleComponent(eventDisplayArray[i].name, fixedEventDate, eventDisplayArray[i].location, eventDisplayArray[i].id)
            }
        }
    })
    }

}



export default printsEventsToDOM