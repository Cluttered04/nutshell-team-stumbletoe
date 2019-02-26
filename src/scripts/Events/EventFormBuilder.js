//Form for saving or editing an event - name, date, location
//
const eventforms = {
    buildSaveEventForm: function() { '<div id="event-form"><input id="event-name" type="text" placeholder="Event Name"><input id="event-date" type="date"><input id="event-location" placeholder="event-location" type="text"><button class = "btn" id="save-event-btn">Save Event</button></div>'
    },

    buildEditEventForm: function(name, date, location, id) {
        `<div id="event-form"><input id="event-name" type="text" value="${name}><input id="event-date" value=${date} type="date"><input id="event-location" value=${location} type="text"><button class="btn save-edit-event" id="save-edit-event-btn-${id}">Save Edit</button></div>`
    }
}

export default eventforms;